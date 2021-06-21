
import {getDoc, getFilesInFolder, parseDoc} from "google-docs-parser";

let config;
if (process.env.NODE_ENV == "production") {

  config = {
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/gm, '\n')
  };

  console.log("Config is set to", config);

} else {
  config = require("../docsconfig.json")
}


const folder = "1DV0L1n7SBVZCUIhtONhvdOcceWmftSM-";

type file = {createdTime: string, name: string, id: string};
export default async function (): Promise<Array<file>| false> {
  const data = await getFilesInFolder(config, folder, {fields: "files/createdTime, files/name, files/mimeType, files/kind, files/id", orderBy: "createdTime desc"});

  const docMimeType = "application/vnd.google-apps.document";
  if (data && Array.isArray(data)) {
    return data.filter(d => d.mimeType == docMimeType) as Array<file>;
  }

  return false;
}

export async function fetchPost (id: string) {
  const data = await getDoc(config, id);
  if (data) {
    return parseDoc(data);
  }
}

