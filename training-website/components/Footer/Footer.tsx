import Link from 'next/link'
import React from 'react'
interface NavbarProps {
  isLoggedIn: boolean
}

const Footer = ({ isLoggedIn }: NavbarProps): JSX.Element => {
  // const [navbarOpen, setNavbarOpen] = React.useState(false)
  const logout = async (e) => {
    e.preventDefault()
    try {
      await fetch('/api/logout')
    } catch (error) {
      console.info('Can not logout')
    }
  }

  return (
    <footer className="bg-gray-100  ">
      <div className="max-w-screen-xl mx-auto mt-10 lg:mt-32 px-2 sm:px-5 xl:px-14 pt-10  md:pt-20">
        <div className="flex flex-wrap sm:flex-nowrap">
          <div className="w-full sm:w-auto pb-5 md:w-1/2">
            <a href="#" className="block">
              <img src="logo.svg" alt="logo" className="w-60" />
            </a>

            <div className="grid grid-cols-2 gap-5 mt-10">
              <dl className="flex flex-col space-y-5">
                <dt className="font-playfair text-xl font-black ">Company</dt>
                <dd className="flex flex-col space-y-5 text-base font-normal">
                  <a href="javacript:void(0)" className="hover:text-space-500">
                    Reviews
                  </a>
                  <a href="javacript:void(0)" className="hover:text-space-500">
                    Privacy
                  </a>
                  <a href="javacript:void(0)" className="hover:text-space-500">
                    Terms
                  </a>

                  {!isLoggedIn && (
                    <Link href="/signin">
                      <a className="hover:text-space-500">Login</a>
                    </Link>
                  )}
                  {!isLoggedIn && (
                    <Link href="/signup">
                      <a className="hover:text-space-500">Sign up</a>
                    </Link>
                  )}
                  {isLoggedIn && (
                    <Link href="/account">
                      <a className="hover:text-space-500">Account</a>
                    </Link>
                  )}

                  {isLoggedIn && (
                    <Link href="/">
                      <a className="hover:text-space-500" onClick={logout}>
                        Logout
                      </a>
                    </Link>
                  )}
                </dd>
              </dl>
              <dl className="flex flex-col space-y-5">
                <dt className="font-playfair text-xl font-black ">Courses</dt>
                <dd className="flex flex-col space-y-5 text-base font-normal">
                  <a href="javacript:void(0)" className="hover:text-space-500">
                    Reviews
                  </a>
                  <a href="javacript:void(0)" className="hover:text-space-500">
                    Privacy
                  </a>
                  <a href="javacript:void(0)" className="hover:text-space-500">
                    Terms
                  </a>
                  <a href="javacript:void(0)" className="hover:text-space-500">
                    Login
                  </a>
                </dd>
              </dl>
            </div>
          </div>
          <div className="w-full sm:w-auto md:w-1/2 sm:mr-0 sm:pl-16 md:pl-0">
            <div className="relative mt-10 sm:mt-0 sm:max-w-md ml-auto mr-0  flex justify-center flex-col">
              <div className="sm:text-left text-center">
                <h2 className="md:text-3xl text-2xl font-black leading-none xl:leading-snug lg:leading-relaxed md:leading-snug   font-playfair">
                  Sign-up to our newsletter
                </h2>
                <p className="font-light leading-normal py-3 max-w-60 mx-auto">
                  We have helped 100s of stores just like you 2x their entire
                  business by successfully selling over video live streams.{' '}
                </p>
              </div>
              <form>
                <div className="relative space-y-5 mx-auto ">
                  <div className="relative">
                    <input
                      type="text"
                      className="rounded-full bg-transparent py-4 px-5 border border-gray-300 w-full focus:outline-none focus:border-space-500 focus:text-space-500 focus:bg-white"
                      placeholder="Email Address"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-full mx-auto sm:ml-0 w-40 font-bold py-4 px-5 uppercase text-sm text-white block mt-3 hover:no-underline tracking-wide bg-space-500 hover:bg-space-600 focus:outline-none"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-10 pb-10 flex flex-col-reverse sm:flex-row text-center">
          <div className="sm:mr-auto sm:ml-0 ">
            <p className="font-light leading-normal py-3">
              &copy; 2021. All rights reserved
            </p>
          </div>
          <div className="sm:ml-auto sm:mr-0 flex space-x-3 justify-center">
            <a
              href="javascript:void(0)"
              className="rounded-full w-12 h-12 items-center justify-center border border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white inline-flex"
            >
              <svg
                width="25"
                height="19"
                viewBox="0 0 25 19"
                fill="none"
                className="w-5 relative  "
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.4776 3.72557C24.1901 2.61698 23.3429 1.74388 22.2673 1.44759C20.3177 0.90918 12.5 0.90918 12.5 0.90918C12.5 0.90918 4.68232 0.90918 2.73266 1.44759C1.65706 1.74393 0.80992 2.61698 0.522399 3.72557C1.45281e-07 5.73496 0 9.92737 0 9.92737C0 9.92737 1.45281e-07 14.1198 0.522399 16.1292C0.80992 17.2378 1.65706 18.0745 2.73266 18.3708C4.68232 18.9092 12.5 18.9092 12.5 18.9092C12.5 18.9092 20.3177 18.9092 22.2673 18.3708C23.3429 18.0745 24.1901 17.2378 24.4776 16.1292C25 14.1198 25 9.92737 25 9.92737C25 9.92737 25 5.73496 24.4776 3.72557ZM9.94316 13.7338V6.12098L16.4772 9.92746L9.94316 13.7338Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a
              href="javascript:void(0)"
              className="rounded-full w-12 h-12 items-center justify-center border border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white inline-flex"
            >
              <svg
                width="23"
                height="24"
                viewBox="0 0 23 24"
                fill="none"
                className="w-5 relative  "
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5026 6.51227C8.23921 6.51227 5.60697 9.14509 5.60697 12.4092C5.60697 15.6733 8.23921 18.3061 11.5026 18.3061C14.7659 18.3061 17.3982 15.6733 17.3982 12.4092C17.3982 9.14509 14.7659 6.51227 11.5026 6.51227ZM11.5026 16.2429C9.3937 16.2429 7.66966 14.5237 7.66966 12.4092C7.66966 10.2947 9.38857 8.57542 11.5026 8.57542C13.6166 8.57542 15.3355 10.2947 15.3355 12.4092C15.3355 14.5237 13.6114 16.2429 11.5026 16.2429ZM19.0144 6.27106C19.0144 7.03576 18.3987 7.64649 17.6393 7.64649C16.8748 7.64649 16.2642 7.03062 16.2642 6.27106C16.2642 5.51149 16.8799 4.89562 17.6393 4.89562C18.3987 4.89562 19.0144 5.51149 19.0144 6.27106ZM22.9192 7.66702C22.832 5.82455 22.4112 4.19251 21.0617 2.84787C19.7174 1.50323 18.0857 1.08239 16.2437 0.990012C14.3452 0.882236 8.65482 0.882236 6.75633 0.990012C4.91941 1.07726 3.28773 1.4981 1.93826 2.84274C0.58879 4.18738 0.173173 5.81942 0.0808143 7.66189C-0.0269381 9.5608 -0.0269381 15.2524 0.0808143 17.1513C0.168042 18.9938 0.58879 20.6258 1.93826 21.9705C3.28773 23.3151 4.91428 23.736 6.75633 23.8284C8.65482 23.9361 14.3452 23.9361 16.2437 23.8284C18.0857 23.7411 19.7174 23.3203 21.0617 21.9705C22.4061 20.6258 22.8268 18.9938 22.9192 17.1513C23.0269 15.2524 23.0269 9.56594 22.9192 7.66702ZM20.4665 19.1888C20.0663 20.1947 19.2915 20.9697 18.2807 21.3752C16.767 21.9756 13.1753 21.8371 11.5026 21.8371C9.82984 21.8371 6.23296 21.9705 4.72443 21.3752C3.71874 20.9748 2.94395 20.1999 2.53859 19.1888C1.93826 17.6748 2.0768 14.0823 2.0768 12.4092C2.0768 10.7361 1.94339 7.1384 2.53859 5.62953C2.93882 4.62362 3.71361 3.84865 4.72443 3.44321C6.23809 2.84274 9.82984 2.98131 11.5026 2.98131C13.1753 2.98131 16.7722 2.84787 18.2807 3.44321C19.2864 3.84352 20.0612 4.61848 20.4665 5.62953C21.0669 7.14353 20.9283 10.7361 20.9283 12.4092C20.9283 14.0823 21.0669 17.68 20.4665 19.1888Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a
              href="javascript:void(0)"
              className="rounded-full w-12 h-12 items-center justify-center border border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white inline-flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-4 relative  "
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
