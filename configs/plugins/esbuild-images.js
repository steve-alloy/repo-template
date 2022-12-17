import fs from "node:fs";
const baseImageDir = "./web/public/images";

const esbuildImages = {
	"name": "esbuild-images",
	setup(build) {
		build.onStart(() => {			
			const checkFile = (file, imageDir = baseImageDir) => {
				fs.stat(`${imageDir}/${file}`, (err, stat) => {
					if (err) {
						return console.log(err);
					}
			
					if (stat.isFile()) {
						return fs.copyFileSync(`${baseImageDir}/${file}`, `./build/${file}`);
					}
			
					const newDir = `${imageDir}/${file}`;
			
					fs.readdir(newDir, (err, files) => {
						if (err) {
							return console.log(err);
						}
					
						files.forEach(file => {
							checkFile(file, newDir);
						});
					});
				});
			};
			
			fs.readdir(baseImageDir, (err, files) => {
				if (err) {
					return console.log(err);
				}
			
				files.forEach(file => {
					checkFile(file);
				});
			});
		});
	}
};

export default esbuildImages;
