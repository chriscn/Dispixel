import { GuildMember, RichEmbed, TextChannel } from "discord.js";
import { Client } from "hypixel.ts";
import ICommand from "../../model/command/command";
import ECommandCategory from "../../model/command/command-category";
import ECommandResult from "../../model/command/command-result";

export default class Player implements ICommand {
    public name = "player";
    public aliases = ["p"];
    public syntax = "player <username>"
    public description = "Get information about a player"
    public category = ECommandCategory.PLAYER;

    public async execute(author: GuildMember, channel: TextChannel, args: string[], hpclient: Client): Promise<ECommandResult> {
        if (args.length > 1) {
            return ECommandResult.INVALID_SYNTAX;
        }

        const player = await hpclient.players.fetch(args[0]);

        channel.send(new RichEmbed()
            .setTitle(
                `${player.displayname} (Currently ${(player.lastLogin > player.lastLogout) ? 'Online' : 'Offline'})`
            )
            .setThumbnail('https://visage.surgeplay.com/face/' + player.uuid)
            .addField('Rank', player.packageRank ?? "", true)
            .addField('Level', networkLevel(player.networkExp ?? 0), true)
            .addField('Karma', player.karma ?? 0, true)
            .addField('Achievement Points', player.achievementPoints ?? 0, true)
            .addField('Joined', new Date(player.firstLogin).toUTCString() ?? "Hasn't joined", true)
        );

        return ECommandResult.SUCCESS;
    }
}

function networkLevel(networkExp: number): number {
    const REVERSE_PQ_PREFIX = -3.5;
	const REVERSE_CONST = 12.25;
	const GROWTH_DIVIDES_2 = 0.0008;
	return (networkExp < 0) ? 1 : Math.floor(
			1 +
					REVERSE_PQ_PREFIX +
					Math.sqrt(REVERSE_CONST + GROWTH_DIVIDES_2 * networkExp)
		);
}
