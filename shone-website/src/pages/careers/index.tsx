// import Image from 'next/image'
import React from 'react'

import {
  AboutShone,
  BlueLink,
  CareerHeading,
  Heading,
  List,
  ListItem,
  SHONE,
} from '../../components/CareerFragments'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import ResponsiveContainer from '../../components/ResponsiveContainer'

export default function CareersPage(): JSX.Element {
  return (
    <div>
      <Navbar />
      <ResponsiveContainer>
        <CareerHeading showBreadcrumb={false}>
          Careers at <SHONE />
        </CareerHeading>
        <Heading>Current Openings</Heading>
        <List>
          <ListItem>
            <BlueLink href="/careers/react-native-engineer">
              React Native Engineer
            </BlueLink>
          </ListItem>
        </List>
        <AboutShone />
      </ResponsiveContainer>
      <Footer />
    </div>
  )
}
