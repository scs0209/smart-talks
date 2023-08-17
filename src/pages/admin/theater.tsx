import { useCreateTheaterMutation } from '@/redux/api/theaterApi'
import { Button, Label, TextInput } from 'flowbite-react'
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
    <div className="h-screen max-w-screen-lg mx-auto mt-3">
      <h2 className="text-2xl font-bold">Create Theater</h2>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="name" value="Name" />
        <TextInput
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Label htmlFor="address" value="Address" />
        <TextInput
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <Button type="submit" className="mt-3 w-full" color="gray">
          Create Theater
        </Button>
      </form>
    </div>
  )
}

CreateTheater.requireAuth = true
CreateTheater.allowRole = 'admin'

export default CreateTheater
