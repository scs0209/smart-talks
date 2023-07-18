import { useEffect, useState } from 'react'

import { AppDispatch } from '@/redux/store'

interface FetchOptions {
  dispatch: AppDispatch
  action: Function
}

function useFetchData(options: FetchOptions) {
  const { dispatch, action } = options
  const [isFetched, setIsFetched] = useState(false)

  useEffect(() => {
    if (!isFetched) {
      dispatch(action())
      setIsFetched(true)
    }
  }, [dispatch, action, isFetched])

  return { isFetched }
}

export default useFetchData
