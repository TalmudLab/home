import { ProcessedContent, ContentData } from "google-docs-components";
import {createElement, ReactNode} from "react";


type props = {
  content: ProcessedContent
}



function fromContent (data: ContentData): ReactNode | string | false {
  if (typeof data == "string") {
    return data;
  }

  if ("element" in data) {
    const attributes = {
      ...(data.style && {style: data.style}),
      ...(data.attrs)
    }
    return createElement(data.element, attributes, fromContentArray(data.children));
  }
  if ("component" in data) {

    return false;
  }
  if ("slot" in data) {

    return false;
  }
  return false;
}
function fromContentArray (contentArray: ProcessedContent) {
  return contentArray.map(data => fromContent(data)).filter(Boolean) as Array<ReactNode>;
}

export default function DocRenderer ({content}: props) {
  return (<div>
    {fromContentArray(content)}
  </div>)
}