import { GuildMember, Message, TextChannel } from "discord.js";
import { Client } from "hypixel.ts";
import ICommand from "../../model/command/command";
import ECommandCategory from "../../model/command/command-category";
import ECommandResult from "../../model/command/command-result";

export default class SkinCommand implements ICommand {
    public name = "skin"
    public description = "Get a player's skin"
    public syntax = "skin <username>"
    public category = ECommandCategory.PLAYER
    public async execute(message: Message, args: string[], hpclient: Client): Promise<ECommandResult> {
        return ECommandResult.SUCCESS;
    }
}
