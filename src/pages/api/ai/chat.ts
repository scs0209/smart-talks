/* eslint-disable */
import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const openApiURL = 'http://aiopen.etri.re.kr:8000/MRCServlet'
const accessKey = process.env.ETRI_API_KEY
const passage = '안녕'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const { question } = req.body

      const requestJson = {
        argument: {
          question: question,
          passage: passage,
        },
      }

      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessKey,
        },
      }

      const response = await axios.post(openApiURL, requestJson, options)

      console.log('responseCode = ' + response.status)
      console.log('responseBody = ' + JSON.stringify(response.data))

      res.status(200).json({
        success: true,
        response: response.data,
      })
    } catch (error: unknown) {
      console.log(error)
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred'
      res.status(400).json({ success: false, message })
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' })
  }
}
