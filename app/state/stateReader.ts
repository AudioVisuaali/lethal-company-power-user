import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { normalize, join, dirname } from "path";
import { userInfo, platform } from "os";
import { Try, toFailure, toSuccess } from "../validation";
import { State, createDefaultState } from "./state";
import { State1_0_0Codec } from "./stateCodec.1.0.0";

const settingsPath = (): string | null => {
	const username = userInfo().username;
	switch (platform()) {
		case "win32":
			return normalize(
				join(
					`C:\\Users\\${username}\\AppData\\Roaming\\Director\\`,
					"settings.json",
				),
			);

		case "darwin":
			return join(`/Users/${username}/Library/Application\ Support/Director`);

		case "linux":
			return join(`/home/${username}/.config/director/settings.json`);

		default:
			return null;
	}
};

const expectFile = (path: string): boolean => {
	try {
		const dirName = dirname(path);
		if (!existsSync(dirName)) {
			mkdirSync(dirName, { recursive: true });
		}
		writeFileSync(path, "");
		return true;
	} catch (error) {
		return false;
	}
};

export const readState = (): State => {
	try {
		const path = settingsPath();
		if (path === null) {
			return createDefaultState();
		}

		expectFile(path);
		const exists = existsSync(path);
		if (!exists) {
			return createDefaultState();
		}

		const data = readFileSync(path);
		const parsed = JSON.parse(data.toString());

		const decoded = State1_0_0Codec.decode(parsed);
		if (decoded._tag === "Left") {
			return createDefaultState();
		}

		const [workspace1] = decoded.right.workspaces;
		if (!workspace1) {
			return createDefaultState();
		}

		return {
			version: decoded.right.version,
			selectedWorkspaceId: workspace1.id,
			workspaces: decoded.right.workspaces.map((workspace) => ({
				...workspace,
				history: [],
				loop: [],
			})),
		};
	} catch (error) {
		return createDefaultState();
	}
};

export const writeState = (state: State): Try<true, Error> => {
	try {
		const path = settingsPath();
		if (!path) {
			return toFailure(new Error("Invalid platform"));
		}

		expectFile(path);
		writeFileSync(path, state.toString());

		return toSuccess(true);
	} catch (error) {
		return toFailure(error as Error);
	}
};
