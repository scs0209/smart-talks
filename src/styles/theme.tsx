import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  spacing: 3,
  palette: {
    primary: {
      main: '#000000', // 원하는 primary 색상 값으로 수정해주세요.
    },
    secondary: {
      main: '#ffffff', // 원하는 secondary 색상 값으로 수정해주세요.
    },
  },
  typography: {
    // 원하는 텍스트 스타일 설정
  },
  // 추가적인 테마 구성
})

export default theme
