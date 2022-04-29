import { GuildMember, Message, RichEmbed, TextChannel } from 'discord.js'
import { APIGuildMember, Client } from 'hypixel.ts'
import ICommand from '../../model/command/command'
import ECommandCategory from '../../model/command/command-category'
import ECommandResult from '../../model/command/command-result'

export default class GuildCommand implements ICommand {
  public name: string = 'guild'
  public syntax = 'guild <name>'
  public category = ECommandCategory.GUILD

  public async execute (message: Message, args: string[], hpclient: Client): Promise<ECommandResult> {
    if (args.length != 1) {
      return ECommandResult.INVALID_SYNTAX
    }

    const guild = await hpclient.guilds.fetch(args[0], 'name')

    message.channel.send(guild.name)

    await message.channel.send(new RichEmbed()
      .setTitle(guild.name)
      .addBlankField()
      .addField('Current coins', guild.coins)
      .addField('Total coins', guild.coinsEver)
      .addField('Current members', guild.members.length)
      .addBlankField()
      .addField('Leader', getGuildLeader(guild.members).name)
    )

    return ECommandResult.SUCCESS
  }
}

function getGuildLeader (members: APIGuildMember[]): APIGuildMember {
  for (const member of members) {
    if (member.rank.toLowerCase() == 'guild master') {
      return member
    }
  }

  return members[0]
}
