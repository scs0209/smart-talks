import React from 'react'

const SkeletonCard = () => {
  return (
    <div className="p-4 animate-pulse">
      <div className="w-full h-64 bg-gray-300 rounded" />
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-300 rounded" />
        <div className="h-4 bg-gray-300 rounded w-5/6" />
      </div>
      <div className="mt-2 w-16 h-4 bg-gray-300 rounded" />
    </div>
  )
}

export default SkeletonCard
