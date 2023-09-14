import { Footer } from 'flowbite-react'

const Footers = () => {
  return (
    <Footer container className="relative mt-3">
      <Footer.Copyright by="SCS - All rights reserved" year={2023} />
      <Footer.LinkGroup className="flex flex-col items-center justify-center gap-2 md:flex-row">
        <Footer.Link href="#">About</Footer.Link>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">Licensing</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  )
}

export default Footers
