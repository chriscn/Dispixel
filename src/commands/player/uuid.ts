import { GuildMember, Message, TextChannel } from "discord.js";
import { Client } from "hypixel.ts";
import ICommand from "../../model/command/command";
import ECommandCategory from "../../model/command/command-category";
import ECommandResult from "../../model/command/command-result";

export default class UUIDCommand implements ICommand {
    public name = "uuid"
    public description = "Get a player's unique identifier"
    public syntax = "uuid <username>"
    public category = ECommandCategory.PLAYER
    public async execute(message: Message, args: string[], hpclient: Client): Promise<ECommandResult> {
        try {
            const uuid = await hpclient.util.getUUID(args[0]);
            await message.reply(`Your UUID is ${uuid}`);
        } catch {
            await message.reply(`Couldn't find UUID for **${args[0]}**, make sure it is spelled correctly.`);
        }

        return ECommandResult.SUCCESS;
    }
}
