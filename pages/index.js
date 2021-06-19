import Heading from "../components/Heading"
import Image from "next/image"
import mainPic from "../public/shaun_dan.jpg"
import docNameToPath from "../utils/docNameToPath";
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

        {posts.map(post => (<Heading>{post.name}</Heading>))}
      </div>

    </div>
  )
}


import fetchPosts from "../fetch/posts"


export async function getStaticProps(context) {

  const rawPosts = await fetchPosts();

  if (!rawPosts) {
    return {}
  }

  console.log(rawPosts);
  const mapped = rawPosts.map( post => ({name: post.name, path: docNameToPath(post.name)}));

  return {
    props: { posts: mapped }, // will be passed to the page component as props
    revalidate: 100
  }
}