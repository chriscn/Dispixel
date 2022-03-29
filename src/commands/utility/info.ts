import { GuildMember, RichEmbed, TextChannel } from "discord.js";
import { Client } from "hypixel.ts";
import { version, author, description } from "../../../package.json";
import ICommand from "../../model/command/command";
import ECommandCategory from "../../model/command/command-category";
import ECommandResult from "../../model/command/command-result";

export default class InfoCommand implements ICommand {
    public name = "info";
    public description: string = "Gather information about the plugin";
    public category = ECommandCategory.UTILITY;
    public async execute(author: GuildMember, channel: TextChannel, args: string[], hpclient: Client): Promise<ECommandResult> {
        await channel.send(new RichEmbed()
            .setTitle('Dispixel')
            .addField('Version', version)
            .addField('Author', author)
            .setFooter(description)
            .setColor('F3D360')
            .setImage('https://raw.githubusercontent.com/chriscn/Dispixel/main/Dispixel.jpg')
        );
        
        return ECommandResult.SUCCESS;
    }
}
