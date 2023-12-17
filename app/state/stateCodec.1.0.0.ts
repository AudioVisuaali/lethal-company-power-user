import * as C from "io-ts/Codec";

export const StateVersion1_0_0 = "1.0.0";

const HotkeyCodec = C.struct({
	trigger: C.string,
	command: C.string,
});

const WorkspaceCodec = C.struct({
	id: C.string,
	name: C.string,
	hotkeys: C.array(HotkeyCodec),
	commands: C.struct({
		loopInsert: C.string,
		loopClear: C.string,
	}),
	actions: C.struct({
		flash: C.nullable(HotkeyCodec),
	}),
	devices: C.struct({
		flash: C.nullable(HotkeyCodec),
	}),
});

export const State1_0_0Codec = C.struct({
	version: C.literal(StateVersion1_0_0),
	selectedWorkspaceId: C.string,
	workspaces: C.array(WorkspaceCodec),
});

export type State1_0_0Encoded = C.OutputOf<typeof State1_0_0Codec>;
export type State1_0_0Decoded = C.TypeOf<typeof State1_0_0Codec>;
