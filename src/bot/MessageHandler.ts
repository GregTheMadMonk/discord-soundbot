import { Message } from 'discord.js';
import { GuildChannel } from 'discord.js';
import './discord/Message';

import Config from '@config/Config'
import * as ignoreList from '@util/db/IgnoreList';
import { config } from '@util/Container';
import CommandCollection from './CommandCollection';

export default class MessageHandler {
  private readonly commands: CommandCollection;

  constructor(commands: CommandCollection) {
    this.commands = commands;
  }

  public handle(message: Message) {
    if (!this.isValidMessage(message)) return;

    const messageToHandle = message;
    messageToHandle.content = message.content.substring(config.prefix.length);

    if ((config.channel_whitelist.length != 0) &&
	(config.channel_whitelist.find(function(element) { return element == (message.channel as GuildChannel).name; }) == undefined))
	    message.channel.send("Fuck off. I only talk to people in " + config.channel_whitelist + ", <@" + message.author.id + ">");
    else this.commands.execute(message);
  }

  private isValidMessage(message: Message) {
    return (
      !message.author.bot &&
      !message.isDirectMessage() &&
      message.hasPrefix(config.prefix) &&
      !ignoreList.exists(message.author.id)
    );
  }
}
