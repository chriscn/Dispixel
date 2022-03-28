import { GuildMember, TextChannel } from "discord.js";
import { Client } from "hypixel.ts";
import ECommandCategory from "./command-category";
import ECommandResult from "./command-result";

export default interface ICommand {
    name: string;
    aliases?: string[];
    syntax?: string;
    description?: string;
    category: ECommandCategory;
    execute(author: GuildMember, channel: TextChannel, args: string[], hpclient?: Client): Promise<ECommandResult>;
}
