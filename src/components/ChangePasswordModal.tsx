import { Typography, Button, Modal, Box, TextField } from '@mui/material'
import { FC, useState } from 'react'
import useInput from '@/hooks/useInput'
import { changePassword } from '@/services/apiServices'

interface Props {
  open: boolean
  handleClose: () => void
}

const ChangePasswordModal: FC<Props> = ({ open, handleClose }) => {
  const currentPassword = useInput('')
  const newPassword = useInput('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChangePassword = async () => {
    setError('')
    setLoading(true)

    try {
      await changePassword(currentPassword.value, newPassword.value)
      handleClose()
      // 비밀번호 변경 성공 처리
    } catch (error) {
      setError('Failed to update password')
    }

    setLoading(false)
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
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Change Password'}
        </Button>
      </Box>
    </Modal>
  )
}

export default ChangePasswordModal
