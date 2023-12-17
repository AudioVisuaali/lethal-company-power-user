import { keyboard, Key } from "@nut-tree/nut-js";

export class Queue {
	private commands: string[];

	constructor() {
		keyboard.config.autoDelayMs = 0;
		this.commands = [];
	}

	commandAdd = (...commands: string[]) => {
		this.commands.push(...commands);
		this.nextCommand();
	};

	private nextCommand = () => {
		const nextCommand = this.commands.shift();
		if (!nextCommand) {
			return;
		}

		keyboard.type(nextCommand);
		keyboard.type(Key.Enter);

		if (this.commands.length === 0) {
			return;
		}
		this.nextCommand();
	};
}
