import { useEffect, useRef } from 'react'

type CallbackFunction = () => void

interface ObserverOptions {
  threshold: number
  loading: boolean
}

const useInfiniteScroll = (
  callback: CallbackFunction,
  { threshold, loading }: ObserverOptions,
): React.MutableRefObject<HTMLDivElement | null> => {
  const observerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0]
      if (entry.isIntersecting && !loading) {
        callback()
      }
    }

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold,
    }

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions,
    )
    if (observerRef.current) observer.observe(observerRef.current)

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current)
    }
  }, [loading, observerRef, callback, threshold])

  return observerRef
}

export default useInfiniteScroll
