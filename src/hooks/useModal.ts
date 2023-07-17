import { useState, useCallback } from 'react'

type ModalReturnType = {
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const useModal = (): ModalReturnType => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return { isModalOpen, openModal, closeModal }
}

export default useModal
