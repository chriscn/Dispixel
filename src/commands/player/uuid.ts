import { GuildMember, Message, TextChannel } from 'discord.js'
import { Client } from 'hypixel.ts'
import ICommand from '../../model/command/command'
import ECommandCategory from '../../model/command/command-category'
import ECommandResult from '../../model/command/command-result'

export default class UUIDCommand implements ICommand {
  public name = 'uuid'
  public description = "Get a player's unique identifier"
  public syntax = 'uuid <username>'
  public category = ECommandCategory.PLAYER
  public async execute (message: Message, args: string[], hpclient: Client): Promise<ECommandResult> {
    if (args.length != 1) {
      return ECommandResult.INVALID_SYNTAX
    }

    try {
      const uuid = await hpclient.util.getUUID(args[0])

      await message.channel.send(`${args[0]} is ${uuid}`)
    } catch {
      await message.channel.send(`${args[0]} was not found.`)
    }

    return ECommandResult.SUCCESS
  }
}
