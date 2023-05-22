import Answer from '@/models/Answer'
import Question from '@/models/Question'
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
  const createdBy: string = req.body.createdBy || ''

  const request: CreateCompletionRequest = {
    model: 'text-davinci-003',
    prompt: `I am a highly intelligent question answering bot. If you ask me ${question} that is rooted in truth, I will give you the answer to Korean. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with "잘 모르겠습니다.".\n`,
    temperature: 0,
    max_tokens: 100,
  }

  try {
    // ChatGPT로부터 답변 생성
    const response = await openai.createCompletion(request)
    const answerText = response.data.choices[0].text

    // 질문을 Question 모델에 저장
    const questionEntry = new Question({
      question, // questionText 필드 추가
      createdBy, // createdBy 필드 추가
    })
    await questionEntry.save()

    // 답변을 Answer 모델에 저장
    const answer = new Answer({
      answerText,
      question: questionEntry._id, // Question 모델의 ID를 저장
    })
    await answer.save()

    res.status(200).json({ result: answerText })
  } catch (error) {
    console.error('Failed to create chat GPT completion:', error)
    res.status(500).json({ error: { message: 'Failed to generate response' } })
  }
}
