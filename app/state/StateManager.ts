import { readState, writeState } from "./stateReader";
import { State, StateWorkspace } from "./state";

export class StateManager {
	private state: State;

	constructor() {
		this.state = readState();
	}

	write = async () => {
		const result = writeState(this.state);
		if (!result.success) {
			console.error(result.failure);
		}
	};

	workspace = (): StateWorkspace | null => {
		const result = this.state.workspaces.find(
			(workspace) => workspace.id === this.state.selectedWorkspaceId,
		);

		return result ?? null;
	};
}
