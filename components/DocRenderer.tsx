import { componentsFromDoc } from "google-docs-components";
import { document} from "google-docs-parser";

export default function DocRenderer ({document: document}) {
  return (<div>
    Render {document.title}
    </div>)
}