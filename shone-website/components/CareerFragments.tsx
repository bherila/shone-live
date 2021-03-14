import NextLink from 'next/link'
import React from 'react'

export const Section = ({ children }): JSX.Element => (
  <div className="py-2">{children}</div>
)
export const Heading = ({ children }): JSX.Element => (
  <h2 className="text-lg font-bold py-2">{children}</h2>
)
export const List = ({ children }): JSX.Element => (
  <ul className="list-disc ml-5">{children}</ul>
)
export const ListItem = ({ children }): JSX.Element => (
  <li className="my-1">{children}</li>
)
export const P = ({ children }): JSX.Element => (
  <div className="my-2">{children}</div>
)

export const SHONE = (): JSX.Element => (
  <span>
    SH<i>O</i>NE
  </span>
)

export const BlueLink = ({ children, href }): JSX.Element => (
  <NextLink href={href}>
    <a className="text-blue-dark underline cursor-pointer">{children}</a>
  </NextLink>
)

export const CareerHeading = ({ children, showBreadcrumb }): JSX.Element => (
  <div className="py-10">
    {showBreadcrumb && (
      <div>
        <BlueLink href="/careers">Back to Careers</BlueLink>
      </div>
    )}
    <h1 className="text-3xl">{children}</h1>
  </div>
)

export const AboutShone = (): JSX.Element => (
  <Section>
    <Heading>
      About <SHONE />
    </Heading>
    <P>
      <SHONE /> is a live video selling marketplace focussed on fashion. Our
      software is tailored entirely to fashion with features such as voting
      about the product design. We are also building a training school to
      empower sellers to deliver an interactive immersive selling experience.
      Live video selling is most robust in China today, a $200 billion industry.
      It is fast growing in Europe and nascent in the USA. Our vision is to
      create an entirely immersive visual digital world as Ralph Lauren did for
      physical retail with his Disneyland-esque stores.
    </P>
    <P>
      We believe shopping should be a dialogue between customers, designers and
      tastemakers. We are starting with the simple concept of live video
      shopping, and we see tremendous potential. By combining the best software,
      show format and seller training we will deliver a superior way to engage
      and consume.
    </P>
  </Section>
)

export const Opportunity = (): JSX.Element => (
  <Section>
    <Heading>Opportunity</Heading>
    <P>
      We’re looking for a Mobile engineer who will be working as part of the
      founding engineering team to produce the first version of our iOS and
      Android apps. They will implement new features using React Native and
      Typescript, integrate native SDKs for video streaming, build automated
      tests, and interact with product/UX and peer engineers.
    </P>
    <P>
      The right candidate for this role is someone who takes ownership; cares
      deeply about the quality of work being produced, not just completing a
      task. Solid product intuition - ability to operate in ambiguity - and
      attention to detail are required.
    </P>
  </Section>
)

export const ReactNativeQualifications = (): JSX.Element => (
  <Section>
    <Heading>Preferred Qualifications</Heading>
    <List>
      <ListItem>
        At least 3 years of production React Native and/or React.js experience,
        ideally using Typescript.
      </ListItem>
      <ListItem>
        At least 2 years of production iOS and/or Android development
        experience.
      </ListItem>
      <ListItem>
        Excellent English communication skills (written and oral).
      </ListItem>
    </List>
  </Section>
)

export const Compensation = (): JSX.Element => (
  <Section>
    <Heading>Compensation &amp; Perks</Heading>
    <List>
      <ListItem>Competitive cash and equity.</ListItem>
      <ListItem>
        Company-provided tech setup (Latest MacBook Pro, 4K screen, and a desk
        &amp; chair if you need one).
      </ListItem>
      <ListItem>Home internet reimbursement and cell phone stipend.</ListItem>
      <ListItem>
        Rolling out benefits package including 401(k) and medical/dental/vision
        coverage over the coming months (we’re *that* new).
      </ListItem>
    </List>
  </Section>
)

export const Team = (): JSX.Element => (
  <Section>
    <Heading>Team</Heading>
    <List>
      <ListItem>
        <b>Bretton Auerbach, CEO.</b> Former CTO of Yoshi (YC S16) and grew the
        company to a $100M+ valuation. At Ralph Lauren, worked directly for the
        head of global digital commerce as the lead PM. At RL, trained 100’s of
        salespeople across dozens of stores, increasing sales 20% YoY.
        Co-valedictorian of Parsons School of Design. Harvard, HBS
      </ListItem>
      <ListItem>
        <b>Ben Herila, CTO.</b> Former CTO and co-founder of YC-backed
        e-commerce startup (Underground Cellar), growing it to $20m in sales. 5
        Years at Microsoft. At Airbnb, invented a new architecture to scale CMS
        throughput 400X during a global expansion to 32 new countries. Member of
        WWW tech council at Facebook Reality Labs. B.S, Applied math - Computer
        Science and B.A. Economics at Brown.
      </ListItem>
    </List>
  </Section>
)
