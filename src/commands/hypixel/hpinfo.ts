import { GuildMember, TextChannel } from "discord.js";
import { Client } from "hypixel.ts";
import ICommand from "../../model/command/command";
import ECommandCategory from "../../model/command/command-category";
import ECommandResult from "../../model/command/command-result";

export default class HPInfo implements ICommand {
    public name = "hpinfo";
    public category = ECommandCategory.HYPIXEL;
    
    public async execute(hpclient: Client, author: GuildMember, channel: TextChannel, args: string[]): Promise<ECommandResult> {
        const playerCount = await hpclient.other.getPlayerCount();
        const punishment = await hpclient.other.getPunishmentStatistics();

        await channel.send(`Players online: ${playerCount.playerCount}`);
        await channel.send(`Punishment: ${punishment.staff_rollingDaily}`)

        return ECommandResult.SUCCESS;
    }
}
