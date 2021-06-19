import fetchPosts, { fetchPost } from "../../fetch/posts"
import docNameToPath from "../../utils/docNameToPath";
import DocRenderer from "../../components/DocRenderer";

export default function Post({document}) {
  return (<div>
    <DocRenderer document={document}></DocRenderer>
  </div>)
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
  return {
    props: {document}
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