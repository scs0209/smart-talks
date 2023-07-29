import { Button, Grid, Modal, TextField, Typography } from '@mui/material'
import { FC } from 'react'

import useInput from '@/hooks/useInput'
import { sendTempPasswordEmail } from '@/redux/api/user'
import { useStyles } from '@/styles/FindPasswordStyle'

interface Props {
  open: boolean
  onClose: () => void
}

const FindPasswordModal: FC<Props> = ({ open, onClose }) => {
  const classes = useStyles()
  const email = useInput('')
  const receiveEmail = useInput('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await sendTempPasswordEmail(email.value, receiveEmail.value)
      alert('Temporary password email sent successfully')
    } catch (error: any) {
      console.log('Failed to send temporary password email:', error.message)
    }
  }

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <div className={classes.modalContent}>
          <Typography variant="h5" gutterBottom>
            비밀번호 찾기
          </Typography>
          <Typography variant="body1" gutterBottom>
            등록한 이메일 주소를 입력해주세요. 임시 비밀번호가 해당 이메일로
            전송됩니다.
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} className={classes.formContainer}>
              <Grid item xs={12} className={classes.inputField}>
                <TextField
                  id="email"
                  label="Email:"
                  variant="outlined"
                  required
                  value={email.value}
                  onChange={email.onChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} className={classes.inputField}>
                <TextField
                  id="receive-email"
                  label="Receive Email:"
                  variant="outlined"
                  required
                  value={receiveEmail.value}
                  onChange={receiveEmail.onChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} className={classes.buttonContainer}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disableElevation
                  style={{ width: '100%' }}
                >
                  임시 비밀번호 전송
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default FindPasswordModal
