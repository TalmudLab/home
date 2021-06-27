import fetchPosts, {fetchPost} from "../../fetch/posts"
import {docNameToAuthor, docNameToPath, docNameToTitle} from "../../utils/docNameParse";
import DocRenderer from "../../components/DocRenderer";
import {componentsFromDoc} from "google-docs-components";
import Heading from "../../components/Heading";
import Link from "next/link"
import {dateFormat} from "../../utils/docDateFormat";

export default function Post({document, author, date}) {

  const renderer = document?.body ?
    <DocRenderer content={document.body}></DocRenderer> : "Doc not loaded";

  return (
    <div className="flex justify-center h-screen">
      <div
        className="w-auto xl:w-1/2 rounded-lg border shadow-lg p-10">
        <Link href="/">← Home</Link>
        <Heading size={2}>
          {document?.title ? docNameToTitle(document.title) : "Loading..."}
        </Heading>
        <span className="text-gray-400">
          {author}, {date}
        </span>
        <article className={"prose lg:prose-xl max-w-none"}>
          {renderer}
        </article>

      </div>
    </div>);
}

/*
  Yes, we're fetching twice. It's unfortunately the easiest way to do this, see https://github.com/vercel/next.js/discussions/11272.
  Since this is all at "build" time, it isn't really a problem, but we can add filesystem caching if needed (see discussion there).
 */

export async function getStaticProps(context) {
  const docPath = context.params.docpath;

  const posts = await fetchPosts();

  const thisPost = posts.find(post => docNameToPath(post.name) == docPath)

  const document = await fetchPost(thisPost.id)

  const processed = componentsFromDoc({components: []}, document)
  return {
    props: {document: processed, author: docNameToAuthor(thisPost.name), date: dateFormat(thisPost.createdTime)},
    revalidate: 120
  }
}


export async function getStaticPaths() {
  const posts = await fetchPosts();
  if (posts) {
    return {
      paths: posts.map(post => (
        {
          params: {
            docpath: docNameToPath(post.name)
          }
        })),
      fallback: true,
    }
  }
}