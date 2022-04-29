import { GuildMember, Message, RichEmbed, TextChannel } from "discord.js";
import { Client, Player } from "hypixel.ts";
import ICommand from "../../model/command/command";
import ECommandCategory from "../../model/command/command-category";
import ECommandResult from "../../model/command/command-result";

export default class PlayerCommand implements ICommand {
    public name = "player";
    public aliases = ["p"];
    public syntax = "player <username>"
    public description = "Get information about a player"
    public category = ECommandCategory.PLAYER;

    public async execute(message: Message, args: string[], hpclient: Client): Promise<ECommandResult> {
        if (args.length != 1) {
            return ECommandResult.INVALID_SYNTAX;
        }

        try {
            const player = await hpclient.players.fetch(args[0]);

            message.channel.send(new RichEmbed()
                .setTitle(
                    `${player.displayname ?? args[0]} (Currently ${(player.lastLogin > player.lastLogout) ? 'Online' : 'Offline'})`
                )
                .setThumbnail('https://visage.surgeplay.com/face/' + player.uuid)
                .addField('Rank', parseRank(player), true)
                .addField('Guild', (await hpclient.guilds.fetch(await hpclient.util.getUUID(args[0]), 'player')).name ?? 'None')
                .addField('Level', networkLevel(player.networkExp ?? 0), true)
                .addField('Karma', player.karma ?? 0, true)
                .addField('Achievement Points', player.achievementPoints ?? 0, true)
                .addField('Joined', new Date(player.firstLogin).toUTCString() ?? "Hasn't joined", true)
            );
        } catch {
            message.reply(`Can't find ${args[0]} details on the API, have you joined the network?`)
        }

       

        return ECommandResult.SUCCESS;
    }
}

function networkLevel(networkExp: number): number {
    const REVERSE_PQ_PREFIX = -3.5;
	const REVERSE_CONST = 12.25;
	const GROWTH_DIVIDES_2 = 0.0008;
	return (networkExp < 0) ? 1 : Math.floor(1 + REVERSE_PQ_PREFIX + Math.sqrt(REVERSE_CONST + GROWTH_DIVIDES_2 * networkExp));
}

function parseRank(player: Player): string {
    let fullRank: string;
    let baseRank = 'Default';
    let permRank: string | undefined; 
    let displayRank: string | undefined;

    if (player.packageRank) baseRank = replaceRank(player.packageRank);
    if (player.newPackageRank) baseRank = replaceRank(player.newPackageRank);
    if (player.monthlyPackageRank == 'SUPERSTAR') baseRank = 'MVP++';
    if (player.rank && player.rank != 'NORMAL') permRank = player.rank.replace('MODERATOR', 'MOD'); 

    function replaceRank(toReplace: string): string {
        return toReplace
            .replace('VIP_PLUS', 'VIP+')
            .replace('MVP_PLUS', 'MVP+')
            .replace('NONE', 'Default')
    }

    fullRank = `**[${baseRank}]**`
    if (permRank) fullRank = `**[${permRank}]** *(actually ${baseRank})*`;
	if (displayRank) {
		fullRank = `**[${displayRank}]** *(${permRank ?? ''} actually ${baseRank})*`;
	}
	return fullRank;
}
