/* eslint-disable */
import { ChangeEvent, VFC } from 'react'

interface Props {
  labelName: string
  inputType: string
  inputValue: string
  inputOnChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholderText: string
}

const InputWithLabel: VFC<Props> = ({
  labelName,
  inputType,
  inputValue,
  inputOnChange,
  placeholderText,
}) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {labelName}
      </label>
      <input
        type={inputType}
        value={inputValue}
        onChange={inputOnChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholderText}
      />
    </div>
  )
}

export default InputWithLabel
