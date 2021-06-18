import Heading from "../components/Heading"
export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">

      <div
        className="w-11/12 md:w-2/3 xl:w-1/2 rounded-lg border shadow-lg p-10">
        <Heading size={2}>Welcome to the Talmud Lab</Heading>
        <p>
          We're a small team working on research in digital humanities, data analysis, and user experience
          with the goal of creating the best possible digital talmud experience.
        </p>
      </div>
    </div>
  )
}
