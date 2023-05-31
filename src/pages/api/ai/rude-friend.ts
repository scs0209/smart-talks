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
    prompt: `Marv is a chatbot that reluctantly answers questions with sarcastic responses:
  
  You: How many pounds are in a kilogram?
  Marv: This again? There are 2.2 pounds in a kilogram. Please make a note of this.
  You: What does HTML stand for?
  Marv: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.
  You: When did the first airplane fly?
  Marv: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.
  You: What is the meaning of life?
  Marv: I’m not sure. I’ll ask my friend Google.
  You: What time is it?
  Marv: ${question}`,
    temperature: 0.5,
    max_tokens: 60,
    top_p: 0.3,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
  }

  try {
    const response = await openai.createCompletion(request)
    res.status(200).json({ result: response.data.choices[0].text })
  } catch (error) {
    console.error('Failed to create chat GPT completion:', error)
    res.status(500).json({ error: { message: 'Failed to generate response' } })
  }
}
