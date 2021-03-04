import Head from 'next/head'
import Image from 'next/image'

export const Home = (): JSX.Element => (
  <div>
      <div className="container mx-auto px-4 grid grid-cols-2">
          <div>
              <h1>Meet Shone</h1>
              <h2>Time to take your Store Live</h2>
              <div>
                  [Google Play]
                  [App Store]
              </div>
          </div>
          <div className={'static overflow-visible'}>
              <div className={'absolute top-0 left-0 object-cover h-64 w-96 relative overflow-visible'}>
                  <Image src={'/home1b.svg'} layout={'fill'} objectFit={'cover'} />
                  <Image src={'/home1a.webp'} layout={'fill'} objectFit={'cover'} />
              </div>
          </div>
      </div>

      <div className="container mx-auto px-4 ">
          {/*<div>*/}
          {/*    <div>*/}
          {/*        <Image src={'/home2b.svg'} layout={'fill'} className={'object-contain '} />*/}
          {/*    </div>*/}
          {/*    <div>*/}
          {/*        <Image src={'/home2a.webp'} layout={'fill'} className={'object-contain '} />*/}
          {/*    </div>*/}
          {/*</div>*/}
          <div>
              <h1>An effortless way to
                  tell your product’s story.</h1>
              <p>Sed ut perspiciatis unde omnis iste natus error sit
                  voluptatem accusantium doloremque laudantium.</p>
              <div>
                  [Learn More]
              </div>
          </div>
      </div>
  </div>
)

export default Home
