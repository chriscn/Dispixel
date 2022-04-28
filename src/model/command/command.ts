import { GuildMember, TextChannel, DMChannel, Message } from "discord.js";
import { Client } from "hypixel.ts";
import ECommandCategory from "./command-category";
import ECommandResult from "./command-result";

export default interface ICommand {
    name: string;
    aliases?: string[];
    syntax?: string;
    description?: string;
    category: ECommandCategory;
    execute(message: Message, args: string[], hpclient: Client): Promise<ECommandResult>;
}
