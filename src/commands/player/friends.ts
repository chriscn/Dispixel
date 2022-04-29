import { Message } from 'discord.js'
import { Client } from 'hypixel.ts'
import ICommand from '../../model/command/command'
import ECommandCategory from '../../model/command/command-category'
import ECommandResult from '../../model/command/command-result'

export default class FriendsCommand implements ICommand {
  public name = 'friends'
  public syntax = 'friends <playername>'
  public aliases = ['f']
  public category = ECommandCategory.PLAYER
  public async execute (message: Message, args: string[], hpclient: Client): Promise<ECommandResult> {
    return ECommandResult.SUCCESS
  }
}
