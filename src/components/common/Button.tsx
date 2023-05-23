import MUIButton, {
  ButtonProps as MUIButtonProps,
} from '@material-ui/core/Button'

const Button: React.FC<MUIButtonProps> = ({
  color = 'primary',
  variant = 'contained',
  ...props
}) => {
  return (
    <MUIButton {...props} color={color} variant={variant} disableElevation />
  )
}

export default Button
