import { ChangeEvent, useState } from 'react'

export default function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return {
    value,
    onChange: handleChange,
  }
}
