import React, { useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const response = await axios.post('/api/chatGptService', { question })
      setAnswer(response.data.result)
    } catch (error) {
      console.error('Failed to fetch answer:', error)
    }
  }

  return (
    <>
      <h1>Home</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask a question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button type="submit">Ask</button>
      </form>
      {answer && <div>{answer}</div>}
    </>
  )
}
