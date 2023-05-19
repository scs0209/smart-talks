import TextField, { TextFieldProps } from '@material-ui/core/TextField'

const Input = (props: TextFieldProps) => {
  return (
    <TextField
      {...props}
      fullWidth
      margin="normal"
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
    />
  )
}

export default Input
