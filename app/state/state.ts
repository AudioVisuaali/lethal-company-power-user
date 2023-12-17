import { StateVersion1_0_0 } from "./stateCodec.1.0.0";

export type Hotkey = {
	trigger: string;
	commands: string[];
};

export type StateWorkspace = {
	id: string;
	name: string;
	hotkeys: Hotkey[];
	commands: {
		loopInsert: string;
		loopClear: string;
	};
	actions: {
		flash: Hotkey | null;
	};
	history: Hotkey[];
	loop: string[];
};

export type State = {
	version: string;
	selectedWorkspaceId: string;
	workspaces: StateWorkspace[];
};

export const STATE_VERSION_LATEST = StateVersion1_0_0;

export const createDefaultState = (): State => ({
	version: STATE_VERSION_LATEST,
	selectedWorkspaceId: "1",
	workspaces: [
		{
			id: "1",
			name: "Workspace 1",
			hotkeys: [
				{
					trigger: "F1",
					commands: ["switch player1"],
				},
				{
					trigger: "F8",
					commands: ["moons"],
				},
				{
					trigger: "F10",
					commands: ["buy pro 1", "con"],
				},
			],
			commands: {
				loopInsert: "I",
				loopClear: "C",
			},
			actions: {
				flash: {
					trigger: "F12",
					commands: ["flash"],
				},
			},
			history: [],
			loop: [],
		},
	],
});
