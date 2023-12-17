import { app, BrowserWindow, globalShortcut } from "electron";
import { StateManager } from "./state/StateManager";
import { Queue } from "./queue/Queue";

const state = new StateManager();
const queue = new Queue();

setInterval(() => {
	const workspace = state.workspace();
	if (!workspace) {
		return;
	}
	queue.commandAdd(...workspace.loop);
}, 10_000);

app.whenReady().then(() => {
	new BrowserWindow({
		width: 200,
		height: 200,
	});
	state.write();
	const workspace = state.workspace();
	if (!workspace) {
		return;
	}
	for (const hotkey of workspace.hotkeys) {
		globalShortcut.register(hotkey.trigger, () => {
			queue.commandAdd(...hotkey.commands);
		});
	}
});

app.on("will-quit", () => {
	// Unregister a shortcut.
	state.write();
	globalShortcut.unregisterAll();
});

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") {
		state.write();
		app.quit();
	}
});
