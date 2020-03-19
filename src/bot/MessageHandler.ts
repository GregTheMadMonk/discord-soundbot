import { Message } from 'discord.js';
import { GuildChannel } from 'discord.js';
import './discord/Message';

import Config from '@config/Config'
import localize from '@util/i18n/localize';
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

    if ((config.channelWhitelist.length != 0) &&
	(config.channelWhitelist.find(function(element) { return element == (message.channel as GuildChannel).name; }) == undefined))
    {
        if (config.enableInsults)
        {
            const channels = config.channelWhitelist;
            const authorId = message.author.id;
            message.channel.send(localize.t('insults.wrongChannel' + (config.SFWMode ? 'SFW' : ''), { channels, authorId }));
        }
    }
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
