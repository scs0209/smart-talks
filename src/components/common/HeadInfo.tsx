import Head from 'next/head'
import React, { VFC } from 'react'

type HeaderProps = {
  title: string
}

const HeadInfo: VFC<HeaderProps> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}

export default HeadInfo
