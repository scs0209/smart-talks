import Link from 'next/link'
import { Card, CardContent, CardActionArea, Typography } from '@mui/material'
import { FC } from 'react'

interface ServiceCardProps {
  title: string
  description: string
  link: string
}

// ServiceCard 컴포넌트
const ServiceCard: FC<ServiceCardProps> = ({
  title,
  description,
  link,
}: any) => {
  return (
    <Link href={link} passHref>
      <Card sx={{ width: 300, mr: 2, mb: 2 }}>
        <CardActionArea>
          <CardContent>
            <Typography variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}

export default ServiceCard
