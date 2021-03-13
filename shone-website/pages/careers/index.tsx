import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ResponsiveContainer from '../../components/ResponsiveContainer'
// import Image from 'next/image'
import React from 'react'
import {
  AboutShone,
  Opportunity,
  Compensation,
  ReactNativeQualifications,
  Team,
} from '../../components/CareerFragments'

export default function CareersPage() {
  return (
    <div>
      <Navbar />
      <ResponsiveContainer>
        <AboutShone />
        <Opportunity />
        <ReactNativeQualifications />
        <Compensation />
        <Team />
      </ResponsiveContainer>
      <Footer />
    </div>
  )
}
