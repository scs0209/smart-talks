import { BASE_URL } from '@/redux/api/client'
import { useRouter } from 'next/router'
import React from 'react'
import {
  FaEnvelopeSquare,
  FaFacebookSquare,
  FaTwitterSquare,
} from 'react-icons/fa'
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from 'react-share'

const SocialShareBtn = () => {
  const router = useRouter()

  const shareUrl = `${BASE_URL}${router.asPath}`
  return (
    <div className="flex space-x-4 mt-4">
      <FacebookShareButton url={shareUrl}>
        <FaFacebookSquare
          size={24}
          color="#3b5998"
          className="transition-colors duration-200 hover:text-blue-600"
        />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl}>
        <FaTwitterSquare
          size={24}
          color="#1da1f2"
          className="transition-colors duration-200 hover:text-blue-400"
        />
      </TwitterShareButton>
      <EmailShareButton url={shareUrl}>
        <FaEnvelopeSquare
          size={24}
          color="#D44638"
          className="transition-colors duration-200 hover:text-red-600"
        />
      </EmailShareButton>
    </div>
  )
}

export default SocialShareBtn
