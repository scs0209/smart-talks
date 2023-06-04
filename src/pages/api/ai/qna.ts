import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const openApiURL = 'http://aiopen.etri.re.kr:8000/WikiQA'
const accessKey = process.env.ETRI_API_KEY
const type = 'ENGINE_TYPE'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const { question } = req.body

      const requestJson = {
        argument: {
          question,
          type,
        },
      }

      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessKey,
        },
      }

      const response = await axios.post(openApiURL, requestJson, options)
      const responseData = JSON.stringify(response.data)

      console.log('responseCode = ' + response.status)
      console.log('responseBody = ' + JSON.stringify(response.data))

      res.status(200).json({
        success: true,
        response: responseData,
      })
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown error occurred'
      res.status(400).json({ success: false, message })
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' })
  }
}
