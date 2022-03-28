import { GuildMember, TextChannel } from "discord.js";
import { Client } from "hypixel.ts";
import ICommand from "../../model/command/command";
import ECommandCategory from "../../model/command/command-category";
import ECommandResult from "../../model/command/command-result";

export default class Information implements ICommand {
    public name = "info";
    public description: string = "Gather information about the plugin";
    public category = ECommandCategory.UTILITY;
    public async execute(author: GuildMember, channel: TextChannel, args: string[], hpclient: Client): Promise<ECommandResult> {
        return ECommandResult.SUCCESS;
    }
}
