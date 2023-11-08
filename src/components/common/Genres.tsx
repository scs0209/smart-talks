import React, { VFC } from 'react'

interface Props {
  genres: any[]
}

const Genres: VFC<Props> = ({ genres }) => {
  return (
    <div>
      {genres?.map((genre) => (
        <span key={genre} className="badges">
          {genre}
        </span>
      ))}
    </div>
  )
}

export default Genres
