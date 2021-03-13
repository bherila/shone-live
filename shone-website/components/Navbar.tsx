import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header(): React.ReactElement {
  const [isExpanded, toggleExpansion] = useState(false)
  const [navLinks] = useState(['About', 'Features', 'Blogs'])
  return (
    <div className="flex flex-wrap mb-6 p-2 lg:px-40 bg-transparent-800 ">
      <nav className="flex-1 items-center justify-between flex-wrap bg-transparent-800 py-5">
        <div className="block lg:hidden">
          <button
            onClick={() => toggleExpansion(!isExpanded)}
            className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isExpanded ? `block` : `hidden`
          } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
        >
          <div className="flex items-center flex-shrink-0 text-white">
            <Link href="/">
              <Image src="/shone-logo.svg" width={140} height={70} />
            </Link>
          </div>
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-1 justify-end flex-col lg:h-auto">
            {navLinks.map((v, i) => {
              return (
                <a
                  key={i}
                  href="#"
                  className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center"
                >
                  <span className="text-black">{v}</span>
                </a>
              )
            })}
          </div>
          <div>
            <button
              className="bg-white text-red font-bold py-2 px-4  border-solid"
              style={{
                borderRadius: '0px 20px 20px 20px',
                color: '#c86bb5',
                backgroundColor: 'white',
              }}
            >
              Contact now
            </button>{' '}
          </div>
        </div>
      </nav>
    </div>
  )
}
