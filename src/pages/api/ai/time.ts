import { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi, CreateCompletionRequest } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.CHAT_GPT_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: 'OpenAI API key not configured',
      },
    })
    return
  }

  const question: string = req.body.question || ''

  const request: CreateCompletionRequest = {
    model: 'text-davinci-003',
    prompt: `def foo(n, k):\naccum = 0\nfor i in range(n):\n    for l in range(k):\n        accum += i\nreturn accum\n"""\nThe time complexity of this function is ${question}`,
    temperature: 0,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ['\n'],
  }

  try {
    const response = await openai.createCompletion(request)
    res.status(200).json({ result: response.data.choices[0].text })
  } catch (error) {
    console.error('Failed to create chat GPT completion:', error)
    res.status(500).json({ error: { message: 'Failed to generate response' } })
  }
}
