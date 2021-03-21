// import Image from 'next/image'
import React from 'react'

import {
  AboutShone,
  CareerHeading,
  Compensation,
  Opportunity,
  ReactNativeQualifications,
  Team,
} from '../../components/CareerFragments'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import ResponsiveContainer from '../../components/ResponsiveContainer'

export default function ReactNativeEngineer(): JSX.Element {
  return (
    <div>
      <Navbar />
      <ResponsiveContainer>
        <CareerHeading showBreadcrumb>React Native Engineer</CareerHeading>
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
