import MUIButton, {
  ButtonProps as MUIButtonProps,
} from '@material-ui/core/Button'

const Button = (props: MUIButtonProps) => {
  return (
    <MUIButton
      {...props}
      color={props.color || 'primary'}
      variant={props.variant || 'contained'}
      disableElevation
    />
  )
}

export default Button
