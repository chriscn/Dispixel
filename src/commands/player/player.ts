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

    public async execute(hpclient: Client, author: GuildMember, channel: TextChannel, args: string[]): Promise<ECommandResult> {
        const player = await hpclient.players.fetch(args[0]);

        channel.send(new RichEmbed()
            .setTitle(
                `${player.displayname} **(Currently online)`
            )
            .setThumbnail('https://visage.surgeplay.com/face/' + player.uuid)
            .addField('Rank:', player.packageRank || "", true)
            .addField('Level', player.networkExp, true)
            .addField('Karma', player.karma || 0, true)
            .addField('Achievement Points:', player.achievementPoints || 0, true)
            .addField('Joined', player.firstLogin || "Hasn't joined", true)
        );

        return ECommandResult.SUCCESS;
    }
}
