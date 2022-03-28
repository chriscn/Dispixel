import { GuildMember, TextChannel } from "discord.js";
import { Client } from "hypixel.ts";
import ICommand from "../../model/command/command";
import ECommandCategory from "../../model/command/command-category";
import ECommandResult from "../../model/command/command-result";

export default class NameHistory implements ICommand {
    public name = "namehistory"
    public description = "Get a player's username history"
    public syntax = "namehistory <username>"
    public aliases = ['nh']
    public category = ECommandCategory.PLAYER
    public async execute(author: GuildMember, channel: TextChannel, args: string[], hpclient: Client): Promise<ECommandResult> {
        return ECommandResult.SUCCESS;
    }
}