import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { FC, useState } from 'react'

import useInput from '@/hooks/useInput'
import { changePassword } from '@/services/apiServices'

interface Props {
  open: boolean
  handleClose: () => void
}

const ChangePasswordModal: FC<Props> = ({ open, handleClose }) => {
  const { data: session, status } = useSession() // 세션 정보 로딩 상태
  const currentPassword = useInput('')
  const newPassword = useInput('')
  const [error, setError] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)

  const isLoading = status === 'loading'

  const handleChangePassword = async () => {
    setError('')
    setPasswordLoading(true)

    try {
      await changePassword(currentPassword.value, newPassword.value, session)
      alert('비밀번호 변경 완료')
      handleClose()
      // 비밀번호 변경 성공 처리
    } catch (err) {
      setError('Failed to update password')
    }

    setPasswordLoading(false)
  }

  if (isLoading) {
    // 세션 로딩 중이면 로딩 표시
    return <div>Loading...</div>
  }

  if (!session) {
    // 세션이 없으면 로그인 요청
    return <div>Please sign in to continue.</div>
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          width: 400,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" mb={2}>
          Change Password
        </Typography>
        <Box mb={2}>
          <TextField
            type="password"
            label="Current Password"
            value={currentPassword.value}
            onChange={currentPassword.onChange}
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <TextField
            type="password"
            label="New Password"
            value={newPassword.value}
            onChange={newPassword.onChange}
            fullWidth
          />
        </Box>
        {error && (
          <Typography variant="body1" color="error" align="center" mb={2}>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          onClick={handleChangePassword}
          disabled={passwordLoading}
        >
          {passwordLoading ? 'Loading...' : 'Change Password'}
        </Button>
      </Box>
    </Modal>
  )
}

export default ChangePasswordModal
