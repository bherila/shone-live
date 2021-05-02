// import Image from 'next/image'
// import Link from 'next/link'
// import PropTypes from 'prop-types'
import React from 'react'
// import {
//   FaFacebookF,
//   FaLinkedinIn,
//   FaPinterestP,
//   FaTwitter,
// } from 'react-icons/fa'

export default function Header(): React.ReactElement {
  return (
    <div className="fixed top-0 z-50 right-0 left-0 p-3">
      <div className="flex justify-between w-full items-center">
        <div className="rounded">
          <img src="/user-image.png" alt="" />
        </div>
        <div className="px-3 w-40">
          <img src="/shone-log-white.svg" alt="" />
        </div>
        <div className="px-3">
          <img src="/user-icon.svg" alt="" />
        </div>
      </div>
    </div>
  )
}
