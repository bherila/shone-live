import Navbar from './../components/Navbar'
import Footer from './../components/Footer'
import Image from 'next/image';

// import Logo from '/logo.png'
export const Home = (): JSX.Element => (
  <div>
    <Navbar />

    <div className="lg:flex flex-wrap lg:px-40 py-10 p-10">
      <div className="xl:w-1/2 lg:pt-20 pr-10">
        <span className="block font-bold text-xl" style={{ color: '#fcb345' }}>
          Meet Shone
        </span>
        <span className="block text-5xl font-bold pt-8 pb-10">
          Time to take your Store live
        </span>

        <div className="flex py-5 space-x-4 ">
          <Image src="/app-store-badge.png" width={150} height={150} layout="fixed" />
          <Image src="/google-play-badge.png" width={150} height={150} layout="fixed" />
        </div>
      </div>
      <div
        className="xl:w-1/2 "
        style={{ position: 'absolute', top: 0, right: 0 }}
      >
        <img
          src="/topbg.png"
          alt="Logo"
          style={{
            position: 'absolute',
            right: 0,
            height: 600,
            width: 800,
            zIndex: -1,
          }}
        />
      </div>
    </div>

    <div className="lg:flex flex-warp lg:px-0 py-10 p-0 items-center">
      <div className="xl:w-1/2 ">
        <img src="/middleLeft.png" alt="Altas Logo" className="w-100 h-100" />
      </div>
      <div className="xl:w-1/2 pt-20 lg:pr-40 md:pr-40">
        <span className="block text-5xl font-bold pt-5">
          An effortless way to tell your product’s story.
        </span>
        <span
          className="block text-1xl pt-5 text-1xl"
          style={{ color: '#55c09c' }}
        >
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium.
        </span>
        <div className="flex py-5">
          <button
            className="bg-white text-red font-bold py-2 px-4  border-solid"
            style={{
              borderRadius: '0px 20px 20px 20px',
              color: 'white',
              backgroundColor: '#ea3a77',
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
    {/* second section */}
    <div className="lg:flex flex-warp lg:px-0 py-10 p-0 pr-0 items-center">
      <div className="pt-20 lg:pl-40 sm:pl:0">
        <span className="block text-5xl font-bold pt-5">
          Let your customers buy LIVE!
        </span>
        <span
          className="block text-1xl pt-5 text-1xl"
          style={{ color: '#55c09c' }}
        >
          Sed ut perspiciatis unde omnis iste natus error sitvoluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo moditem
        </span>
        <div className="flex py-5">
          <button
            className="bg-white text-red font-bold py-2 px-4  border-solid"
            style={{
              borderRadius: '0px 20px 20px 20px',
              color: 'white',
              backgroundColor: '#ea3a77',
            }}
          >
            Learn More
          </button>
        </div>
      </div>
      <img
        src="/thirdSection.png"
        alt="Altas Logo"
        className="w-8/5"
      />
    </div>
    <div className="p-10 lg:px-40 py-10">
      <div className="text-center">
        <span className="font-bold text-4xl">App Screenshots</span>
        <div
          className="text-1.5xl pt-5 text-1xl lg:w-5/12"
          style={{ color: '#55c09c',margin:"auto"}}
        >
          Sed ut perspiciatis unde omnis iste natus error sitvoluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo moditem
        </div>
      </div>
    </div>
    <div>
      <img src="/fourthbg.png" alt="Altas Logo" style={{ width: '100%'}} />
    </div>
    {/* Footer Section */}
    <Footer />
  </div>
)

export default Home
