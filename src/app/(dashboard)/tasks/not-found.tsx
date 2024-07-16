import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function NotFound() {
  return (
    <main className="">
      <div className="  w-full h-full">
        <Image
          src="/hero-overlay.png"
          alt="men"
          width={2000}
          height={2000}
          quality={90}
          className=" w-full absolute z-10 h-full object-cover bg-black"
        />
      </div>
      <div className="fixed w-full h-full right-0 top-0 bottom-0 left-0 z-20 bg-black/70 flex justify-center items-center text-white"></div>
      <div className="absolute w-full h-full z-30 px-3 flex flex-col py-2 items-center justify-between">
        <div className=" text-white flex flex-col gap-y-5 items-center">
          <h1 className=" font-oswald font-bold  text-[10rem]">404</h1>
          <h1 className=" text-[24px]">Sorry we {"can't"} find that page</h1>
          <h1 className=" text-center">
            The page you are looking for was moved, removed, renamed or never
            existed
          </h1>
          <div>
            <Link
              href="/"
              className=" bg-[#F2A940] font-titilium px-4 rounded-full py-1 flex items-center"
            >
              <span className=" mr-2 text-[14px]">Back to Home</span>
              <ArrowUpRight className="w-4 h-4 inline-block" />
            </Link>
          </div>
        </div>
        <div>.</div>
      </div>{" "}
    </main>
  )
}
