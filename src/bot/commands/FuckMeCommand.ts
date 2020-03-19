import { Message } from 'discord.js';

import Config from '@config/Config';
import Command from './base/Command';

export default class FuckMeCommand implements Command {
  public readonly TRIGGERS = ['fuckme'];
  private readonly config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  public run(message: Message) {
    message.channel.send("Fuck you, <@" + message.author.id + ">");
  }
}
