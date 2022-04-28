import { GuildMember, Message, TextChannel } from "discord.js";
import { Client } from "hypixel.ts";
import { version, author, description } from "../../../package.json";
import ICommand from "../../model/command/command";
import ECommandCategory from "../../model/command/command-category";
import ECommandResult from "../../model/command/command-result";

export default class InfoCommand implements ICommand {
    public name = "info";
    public description: string = "Gather information about the plugin";
    public category = ECommandCategory.UTILITY;
    public async execute(message: Message, args: string[], hpclient: Client): Promise<ECommandResult> {
        await message.channel.send(`Dispixel Info: ${message.author}`)

        return ECommandResult.SUCCESS;
    }
}
