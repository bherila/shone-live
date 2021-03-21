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
  CareerHeading,
} from '../../components/CareerFragments'

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
