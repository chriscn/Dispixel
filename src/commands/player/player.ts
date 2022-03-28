import { GuildMember, TextChannel } from "discord.js";
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
        const information = await hpclient.players.fetch(args[0]);

        channel.send(information.lastLogin || "");

        return ECommandResult.SUCCESS;
    }
}
