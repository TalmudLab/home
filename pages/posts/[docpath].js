import fetchPosts, {fetchPost} from "../../fetch/posts"
import docNameToPath from "../../utils/docNameToPath";
import DocRenderer from "../../components/DocRenderer";
import {componentsFromDoc} from "google-docs-components";

export default function Post({document}) {

  const renderer = document?.body ?
    <DocRenderer content={document.body}></DocRenderer> : "Doc not loaded";

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="w-11/12 md:w-2/3 xl:w-1/2 rounded-lg border shadow-lg p-10">
        <div>
          {renderer}
        </div>
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
    props: {document: processed}
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
      fallback: false,
    }
  }
}