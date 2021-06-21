import Heading from "../components/Heading"
import Image from "next/image"
import Link from "next/link"
import mainPic from "../public/shaun_dan.jpg"
import {docNameToPath, docNameToAuthor, docNameToTitle} from "../utils/docNameParse";
import fetchPosts from "../fetch/posts"
import {dateFormat} from "../utils/docDateFormat";
export default function Home({posts}) {
  return (
    <div className="flex items-center justify-center h-screen">

      <div
        className="w-11/12 md:w-2/3 xl:w-1/2 rounded-lg border shadow-lg p-10">
        <Heading size={4} centered={true}>Welcome to the Talmud Lab</Heading>
        <p className="pt-2">
          We're a small team working on open-source research in digital humanities, data analysis, and UX
          with the goal of creating the best possible digital talmud experience.
        </p>

        <Heading size={2} centered>Projects</Heading>

        <Heading size={2} centered>Blog Posts</Heading>

        {posts.map(post => (
          <div className="flex items-center" key={post.path}>
            <Heading>
              <span className="hover:text-blue-400">
              <Link href={`/posts/${post.path}`}>{post.name}</Link>
              </span>
            </Heading>
            <div className="ml-2 font-spectral text-gray-400">
              · {post.author} · {post.date}
            </div >
          </div>
        ))}
      </div>

    </div>
  )
}


export async function getStaticProps(context) {

  const rawPosts = await fetchPosts();

  if (!rawPosts) {
    return {}
  }

  const mapped = rawPosts.map( post => (
    {
      name: docNameToTitle(post.name),
      path: docNameToPath(post.name),
      date: dateFormat(post.createdTime),
      author: docNameToAuthor(post.name)
    }));

  console.log(mapped);
  return {
    props: { posts: mapped }, // will be passed to the page component as props
    revalidate: 120
  }
}