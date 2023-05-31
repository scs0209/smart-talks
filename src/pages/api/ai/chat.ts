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
    prompt: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.
  
  Human: Hello, who are you?
  AI: I am an AI created by OpenAI. How can I help you today?
  Human: ${question}
  AI:`,
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.6,
    stop: [' Human:', ' AI:'],
  }

  try {
    const response = await openai.createCompletion(request)
    res.status(200).json({ result: response.data.choices[0].text })
  } catch (error) {
    console.error('Failed to create chat GPT completion:', error)
    res.status(500).json({ error: { message: 'Failed to generate response' } })
  }
}
