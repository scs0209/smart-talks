import React, { VFC } from 'react'

interface Props {
  genres: any[]
}

const Genres: VFC<Props> = ({ genres }) => {
  return (
    <>
      {genres?.map((genre) => (
        <span key={genre} className="badges">
          {genre}
        </span>
      ))}
    </>
  )
}

export default Genres
