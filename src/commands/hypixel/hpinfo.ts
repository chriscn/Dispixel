import { GuildMember, Message, TextChannel } from "discord.js";
import { Client } from "hypixel.ts";
import ICommand from "../../model/command/command";
import ECommandCategory from "../../model/command/command-category";
import ECommandResult from "../../model/command/command-result";

export default class HPInfoCommand implements ICommand {
    public name = "hpinfo";
    public description = "Returns information about the Hypixel Network"
    public category = ECommandCategory.HYPIXEL;
    
    public async execute(message: Message, args: string[], hpclient: Client): Promise<ECommandResult> {
        const playerCount = await hpclient.other.getPlayerCount();
        const punishment = await hpclient.other.getPunishmentStatistics();

        await message.channel.send(`Players online: ${playerCount.playerCount}`);
        await message.channel.send(`Punishment: ${punishment.staff_rollingDaily}`)

        return ECommandResult.SUCCESS;
    }
}
