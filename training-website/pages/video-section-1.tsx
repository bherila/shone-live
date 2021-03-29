// import Head from 'next/head'
// import Image from 'next/image'

import CheckLogin from '../lib/CheckLogin'
import Layout from '../components/Layout/Layout'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { GetServerSideProps } from 'next'

interface HomepageType {
  isUserLoggedIn: boolean
}

export const Home = ({ isUserLoggedIn }: HomepageType): JSX.Element => {
  // const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <Layout isLoggedIn={isUserLoggedIn}>
      {/*--Whole Structure Wrapper--*/}
      <div id="root" className="max-w-full overflow-hidden">
        {/*--Header Section--*/}
        <Navbar isLoggedIn={false} />
        {/*-- End Header Section--*/}

        {/* main Section */}
        <main className="relative">
          <section className="relative mt-20">
            <div className="mx-auto object-fit absolute h-full md:h-auto overflow-hidden flex justify-center items-end min-h-xs md:min-h-none md:relative">
              <img
                src="background.svg"
                alt="slider"
                className="  w-full  md:h-full h-auto max-h-none  xl:max-w-screen-2xl 2xl:-mt-5 lg:-mt-12 opacity-0 xl:opacity-100"
              />
              <div className="xl:hidden absolute inset-0 flex max-w-5xl mx-auto">
                <div className="ml-0 relative -left-20">
                  <img
                    src="hero-bg-left.svg"
                    alt="slider"
                    className="w-80 h-80"
                  />
                </div>
              </div>
            </div>

            <div className="md:absolute inset-0 pt-12 2xl:pt-36">
              <div className="flex items-center justify-center">
                <div className="w-auto  sm:max-w-3xl max-w-full px-2 sm:px-5 text-center">
                  <h1 className="xl:text-5xl sm:text-4xl text-2xl font-black leading-none xl:leading-snug  leading-snug   font-playfair">
                    Turn <i>any store</i> into a profitable Live Streaming{' '}
                    <i>extravaganza</i>
                  </h1>
                  <p className="font-light leading-normal py-6 max-w-2xl text-lg mx-auto">
                    Everyone from bakers to candlestick makers is raving about
                    live seller training. We have helped 100s of stores just
                    like you 2x their entire business by successfully selling
                    over video live streams. Join today for Free!
                  </p>
                  <a
                    href="jaavascript:void(0)"
                    className="rounded-full w-48 font-bold py-3 px-5 uppercase text-sm text-white inline-block mt-3 hover:no-underline tracking-wide bg-space-500 hover:bg-space-600 hidden"
                  >
                    Get Start Now
                  </a>
                </div>
              </div>
              {/* Form */}

              <div className="mt-10 px-2 sm:px-5">
                <form>
                  <div className="relative  max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="relative">
                      <input
                        type="text"
                        className="rounded-full py-4 px-5 border border-gray-200 w-full focus:outline-none focus:border-space-500 focus:text-space-500"
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        className="rounded-full py-4 px-5 border border-gray-200 w-full focus:outline-none focus:border-space-500 focus:text-space-500"
                        placeholder="Email Address"
                      />
                    </div>
                    <button
                      type="submit"
                      className="rounded-full w-full font-bold py-4 px-5 uppercase text-sm text-white inline-block   hover:no-underline tracking-wide bg-space-500 hover:bg-space-600 focus:outline-none"
                    >
                      Join
                    </button>
                  </div>
                </form>
              </div>

              {/* End Form */}
            </div>

            <div className="max-w-screen-2xl mx-auto px-2 sm:px-5 xl:px-14 xl:-mt-16 relative z-99 mt-10 lg:mt-0">
              <div className="bg-gray-300 min-h-lg flex items-center justify-center">
                <div className="w-16 h-16 text-white">
                  <svg
                    width="134"
                    height="134"
                    viewBox="0 0 134 134"
                    fill="none"
                    className="w-16 h-16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M67 11.725C77.9324 11.725 88.6192 14.9668 97.7092 21.0405C106.799 27.1142 113.884 35.747 118.067 45.8472C122.251 55.9473 123.346 67.0613 121.213 77.7836C119.08 88.5059 113.816 98.355 106.085 106.085C98.355 113.816 88.5059 119.08 77.7836 121.213C67.0613 123.346 55.9474 122.251 45.8472 118.067C35.747 113.884 27.1142 106.799 21.0405 97.7091C14.9668 88.6192 11.725 77.9323 11.725 67C11.7472 52.347 17.5779 38.3004 27.9392 27.9391C38.3004 17.5779 52.347 11.7471 67 11.725ZM67 0C53.7487 0 40.7949 3.92948 29.7768 11.2915C18.7587 18.6536 10.1712 29.1176 5.1001 41.3602C0.0290298 53.6028 -1.29779 67.0743 1.28742 80.071C3.87263 93.0678 10.2538 105.006 19.6239 114.376C28.994 123.746 40.9322 130.127 53.929 132.713C66.9257 135.298 80.3971 133.971 92.6398 128.9C104.882 123.829 115.346 115.241 122.708 104.223C130.071 93.2051 134 80.2513 134 67C134 49.2305 126.941 32.1888 114.376 19.6238C101.811 7.05891 84.7695 0 67 0V0Z"
                      fill="currentColor"
                    />
                    <path
                      d="M88.3564 68.8429L55.9452 87.5191C55.6259 87.6938 55.2666 87.7823 54.9027 87.7758C54.5388 87.7693 54.1829 87.668 53.8701 87.482C53.5573 87.296 53.2983 87.0317 53.1188 86.7151C52.9393 86.3985 52.8454 86.0406 52.8464 85.6766V48.2404C52.8366 47.8642 52.9284 47.4923 53.1121 47.1638C53.2958 46.8353 53.5647 46.5625 53.8904 46.3739C54.2161 46.1853 54.5866 46.088 54.963 46.0923C55.3393 46.0965 55.7075 46.2021 56.0289 46.3979L88.4402 65.1579C88.7686 65.3447 89.0404 65.617 89.2267 65.9458C89.4129 66.2746 89.5067 66.6476 89.4982 67.0254C89.4896 67.4032 89.3789 67.7716 89.1779 68.0916C88.9769 68.4116 88.693 68.6712 88.3564 68.8429Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </section>
        </main>
        {/* End main Section */}

        {/* Footer Section */}
        <Footer isLoggedIn={false} />
        {/* End Footer Section */}
      </div>
    </Layout>
  )
}
export default Home

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const userInfo = CheckLogin(ctx)

  return {
    props: { ...userInfo },
  }
}
