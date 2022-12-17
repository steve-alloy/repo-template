import dotenv from "dotenv";

dotenv.config();

const envObj = {
	"port": process.env.PORT,
	"nodeEnv": process.env.NODE_ENV
};

export default envObj;
