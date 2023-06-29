import { Footer } from 'flowbite-react'

const Footers = () => {
  return (
    <Footer container className="mt-3">
      <Footer.Copyright by="SCS - All rights reserved" year={2023} />
      <Footer.LinkGroup>
        <Footer.Link href="#">About</Footer.Link>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">Licensing</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  )
}

export default Footers
