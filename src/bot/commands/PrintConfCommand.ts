import { Message } from 'discord.js';

import Config from '@config/Config';
import Command from './base/Command';

export default class PrintConfCommand implements Command {
	public readonly TRIGGERS = ['printconfig'];
	private readonly config: Config;

	constructor(config: Config) {
		this.config = config;
	}

	public run(message: Message) {
		message.channel.send("Config:" +
			"\nPrefix: " + this.config.prefix +
			"\nGame: " + this.config.game +
			"\nChannel Whitelist: " + this.config.channel_whitelist);
	}
}
