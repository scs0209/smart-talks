import { useRouter } from 'next/router'

const ExplorePage = () => {
  const router = useRouter()
  const { mediatype } = router.query

  return (
    <div className="max-w-screen-lg min-h-screen px-4 py-16 mx-auto ">
      <h2 className="text-4xl font-semibold">{mediatype}</h2>
    </div>
  )
}

export default ExplorePage
