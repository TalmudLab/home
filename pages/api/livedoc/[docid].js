import { getDoc, parseDoc} from "google-docs-parser";

import config from "../../../docsconfig.json";

export default async function handler (req, res) {
  const { docid } = req.query;

  const raw = await getDoc(config, docid);
  if (raw) {
    const parsed = parseDoc(raw);
    res.json(parsed);
  }
  res.end("Not found")
}