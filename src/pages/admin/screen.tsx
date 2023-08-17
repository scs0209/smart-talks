import { useCreateScreenMutation } from '@/redux/api/screenApi'
import { useGetTheatersQuery } from '@/redux/api/theaterApi'
import { Theater } from '@/redux/types/theater'
import { Button, Label, Select, TextInput } from 'flowbite-react'
import React, { useState, FormEvent } from 'react'

const CreateScreen = () => {
  const { data: theaters, isLoading, isError } = useGetTheatersQuery()
  const [screenName, setScreenName] = useState('')
  const [theaterId, setTheaterId] = useState('')
  const [locationId, setLocationId] = useState('')
  const [selectedTheater, setSelectedTheater] = useState<Theater | null>(null)
  const [
    createScreen,
    { isLoading: createScreenLoading, error: createScreenError },
  ] = useCreateScreenMutation()

  const handleTheaterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheaterId(e.target.value)
    if (theaters) {
      const chosenTheater = theaters.find((t) => t._id === e.target.value)
      setSelectedTheater(chosenTheater || null)
    }
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocationId(e.target.value)
    console.log(locationId)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (selectedTheater) {
      try {
        await createScreen({
          screenName,
          locationId,
        })

        alert('Screen created!')
      } catch (error: any) {
        // Handle error, e.g., show an error message
        alert(`Error creating screen: ${error.message}`)
      } finally {
        // Screen created successfully
        setScreenName('')
        setTheaterId('')
        setLocationId('')
      }
    }
  }

  return (
    <div className="h-screen max-w-screen-lg mx-auto mt-3">
      <h2>Create Screen</h2>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="screenName" value="Screen Name" />
        <TextInput
          type="text"
          id="screenName"
          value={screenName}
          onChange={(e) => setScreenName(e.target.value)}
        />

        <Label htmlFor="theaterId" value="Select Theater" />
        <Select id="theaterId" value={theaterId} onChange={handleTheaterChange}>
          <option value="">-- Select Theater --</option>
          {theaters?.map((theater) => (
            <option key={theater._id} value={theater._id}>
              {theater._id}
            </option>
          ))}
        </Select>

        <Label htmlFor="addressId" value="Select Address " />
        <Select
          id="addressId"
          onChange={handleLocationChange}
          value={locationId}
        >
          <option value="">-- Select Address --</option>
          {selectedTheater?.locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.address}
            </option>
          ))}
        </Select>

        <Button type="submit" className="w-full mt-3" color="gray">
          Create Screen
        </Button>
      </form>
    </div>
  )
}

CreateScreen.requireAuth = true
CreateScreen.allowRole = 'admin'

export default CreateScreen
