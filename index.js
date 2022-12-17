import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import express from "express";
import envObj from "./configs/environment.js";
import entitySchema from "./configs/schema.js";

const schema = entitySchema;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "./build");
const port = envObj.port;
const app = express();

app.use(express.urlencoded({ "extended": true }));
app.use(express.json());
app.use(express.static(publicPath));
app.use(cors());

app.get("/", (req, res) => {
	res.sendFile(path.resolve(publicPath, "index.html"));
});

app.post("/list", (req, res) => {
	console.log(req.body);
	try {
		schema.parse(req.body);
	} catch (err) {
		const errInfo = JSON.parse(err.message)[0];
		return res
			.status(400)
			.json({
				"error": {
					"message": errInfo.message,
					"type": errInfo.code
				},
				"ok": false
			});
	}

	res
		.status(200)
		.json({
			"data": "Hello"
		});
});

app.listen(port, () => {
	console.log(`Listening on port ${port}.`);
});
