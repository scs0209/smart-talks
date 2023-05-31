import Link from 'next/link'
import { Card, CardContent, CardActionArea, Typography } from '@mui/material'
import { FC } from 'react'
import Image from 'next/image'
import { makeStyles } from '@mui/styles'

interface ServiceCardProps {
  title: string
  description: string
  link: string
  image: string
}
const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
})

// ServiceCard 컴포넌트
const ServiceCard: FC<ServiceCardProps> = ({
  title,
  description,
  link,
  image,
}: ServiceCardProps) => {
  const classes = useStyles()

  // mt: mt는 margin-top을 나타내며, 요소의 위쪽 여백을 조정합니다.
  // mr: mr은 margin-right을 나타내며, 요소의 오른쪽 여백을 조정합니다.
  // mb: mb는 margin-bottom을 나타내며, 요소의 아래쪽 여백을 조정합니다.
  return (
    <Link className={classes.link} href={link} passHref>
      <Card sx={{ width: 300, height: 300, mr: 2, mb: 2 }}>
        <CardActionArea>
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              sx={{
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              {title}
            </Typography>
            <div className={classes.imageContainer}>
              <Image src={image} alt={title} width={300} height={200} />
            </div>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: 'none', textAlign: 'center' }}
            >
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}

export default ServiceCard
