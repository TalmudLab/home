
import {getDoc, getFilesInFolder, parseDoc} from "google-docs-parser";

import config from "../docsconfig.json";


const folder = "1DV0L1n7SBVZCUIhtONhvdOcceWmftSM-";

type file = {createdTime: string, name: string, id: string};
export default async function (): Promise<Array<file>| false> {
  const data = await getFilesInFolder(config, folder, {fields: "files/createdTime, files/name, files/id", orderBy: "createdTime desc"});

  if (data && Array.isArray(data)) {
    return data as Array<file>;
  }

  return false;
}

export async function fetchPost (id: string) {
  const data = await getDoc(config, id);
  if (data) {
    return parseDoc(data);
  }
}

