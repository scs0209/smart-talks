/* eslint-disable */
import { NextPageContext } from 'next'

const Error = ({ statusCode }: any) => {
  const errorMessage = statusCode
    ? `An error ${statusCode} occurred on server`
    : `An error ${statusCode} occurred on client`

  return <p>{errorMessage}</p>
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
