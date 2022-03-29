import { GuildMember, Message, TextChannel } from "discord.js";
import { Client } from "hypixel.ts";
import ICommand from "../../model/command/command";
import ECommandCategory from "../../model/command/command-category";
import ECommandResult from "../../model/command/command-result";

export default class GuildCommand implements ICommand {
    public name: string = "guild";
    public syntax = "guild <guildname>";
    public category = ECommandCategory.GUILD;

    public async execute(message: Message, author: GuildMember, channel: TextChannel, args: string[], hpclient: Client): Promise<ECommandResult> {
        return ECommandResult.SUCCESS;
    }
}
