import watch from "../build.js";

const esbuildLogger = {
	"name": "esbuild-logger",
	setup(build) {
		build.onEnd(() => {
			console.log(`Build finished${watch ? "; watching for changes." : "."}`);
		});
	}
};

export default esbuildLogger;
