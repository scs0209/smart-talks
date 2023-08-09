import { createTheaterAPI } from '@/redux/actions/theater'
import { AppDispatch } from '@/redux/store'
import React, { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

const CreateTheater = () => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(createTheaterAPI({ name, address }))
    setName('')
    setAddress('')
  }

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

export default CreateTheater
