import { GuildMember, Message, TextChannel } from "discord.js";
import { Client } from "hypixel.ts";
import ICommand from "../../model/command/command";
import ECommandCategory from "../../model/command/command-category";
import ECommandResult from "../../model/command/command-result";

export default class PingCommand implements ICommand {
    public name = "ping"
    public description = "Pong!"
    public syntax = "ping"
    public category = ECommandCategory.PLAYER
    public async execute(message: Message, args: string[], hpclient: Client): Promise<ECommandResult> {
        await message.channel.send(`Pong!`)
        
        return ECommandResult.SUCCESS;
    }
}
