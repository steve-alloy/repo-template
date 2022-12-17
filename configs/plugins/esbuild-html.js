import fs from "node:fs";

const esbuildHTML = {
	"name": "esbuild-html",
	setup(build) {
		build.onStart(() => {
			if (!fs.existsSync("./build/index.html")) {
				fs.mkdirSync("./build");
				fs.writeFileSync("./build/index.html", "");
			}

			fs.copyFileSync("./web/public/index.html", "./build/index.html");
		});
	}
};

export default esbuildHTML;
