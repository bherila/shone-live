import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import MainResponsiveContainer from '../../components/MainContainer'
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
      <MainResponsiveContainer>
        <AboutShone />
        <Opportunity />
        <ReactNativeQualifications />
        <Compensation />
        <Team />
      </MainResponsiveContainer>
      <Footer />
    </div>
  )
}
