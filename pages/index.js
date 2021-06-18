import Heading from "../components/Heading"
import Image from "next/image"
import mainPic from "../public/shaun_dan.jpg"
export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">

      <div
        className="w-11/12 md:w-2/3 xl:w-1/2 rounded-lg border shadow-lg p-10">
        <Heading size={2} centered={true}>Welcome to the Talmud Lab</Heading>
        <p>
          We're a small team working on open-source research in digital humanities, data analysis, and UX
          with the goal of creating the best possible digital talmud experience.
        </p>
      </div>
    </div>
  )
}
