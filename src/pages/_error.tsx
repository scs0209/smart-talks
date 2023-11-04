/* eslint-disable */
import { NextPageContext } from 'next'
import Image from 'next/image'

const Error = ({ statusCode }: any) => {
  const errorMessage = statusCode
    ? `An error ${statusCode} occurred on server`
    : `An error ${statusCode} occurred on client`

  console.log(errorMessage)

  return (
    <div>
      <Image src="/image/no-results.png" alt="Error Image" fill />
      {/* 이미지 태그 추가 */}
      <p>{errorMessage}</p>
    </div>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404

  if (err) {
    console.error('err: ', err)
  }
  return { statusCode }
}

export default Error
