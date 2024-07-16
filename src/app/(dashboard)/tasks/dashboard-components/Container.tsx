import ContentHeader from "./ContentHeader"
import Header from "./Header"
import SideBar from "./SideBar"
const Container = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div>
        <SideBar />
        <div
          className="relative md:px-0 lg:px-0 lg:left-[250px] left-0 top-[4.5rem] sm:top-14 min-h-screen sm:min-h-screen 2xl:min-h-screen mb-20 sm:mb-[5rem] lg:w-[calc(100%-250px)] w-[calc(100%-0px)]
    rounded rounded-b-md  shadow-md mx-0 bg-[#F1F2F2] lg:mx-6 3xl:mx-12 4xl:mx-24 4xl:w-[calc(100%-350px)]"
        >
          <div className={`drop-shadow-lg mb-4 rounded-b-md  h-auto `}>
            {/* <ContentHeader /> */}
            {children}
          </div>
          {/* <TextArea /> */}
        </div>
      </div>
    </>
  )
}

export default Container
