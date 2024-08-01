// test-api.mjs
import { config } from "dotenv";
import { exec } from "child_process";

config();

const collectionUrl = process.env.COLLECTION_URL;
const command = `newman run ${collectionUrl} --env-var "baseUrl=http://localhost:3000"`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
