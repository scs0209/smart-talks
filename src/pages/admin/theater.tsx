import { useCreateTheaterMutation } from '@/redux/api/theaterApi'
import React, { FormEvent, useState } from 'react'

const CreateTheater = () => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [createTheater, { isLoading, isError, isSuccess }] =
    useCreateTheaterMutation()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await createTheater({ name, address })
      alert('createTheater success')
    } catch (error: any) {
      alert(error)
    }

    setName('')
    setAddress('')
  }

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>{isError}</div>

  return (
    <div>
      <h2>Create Theater</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button type="submit">Create Theater</button>
      </form>
    </div>
  )
}

CreateTheater.requireAuth = true
CreateTheater.allowRole = 'admin'

export default CreateTheater
