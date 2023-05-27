import Link from 'next/link'
import { Card, CardContent, CardActionArea, Typography } from '@mui/material'
import { FC } from 'react'
import Image from 'next/image'

interface ServiceCardProps {
  title: string
  description: string
  link: string
  image: string
}

// ServiceCard 컴포넌트
const ServiceCard: FC<ServiceCardProps> = ({
  title,
  description,
  link,
  image,
}: ServiceCardProps) => {
  return (
    <Link href={link} passHref>
      <Card sx={{ width: 300, mr: 2, mb: 2 }}>
        <CardActionArea>
          <CardContent>
            <Typography variant="h6" component="div">
              {title}
            </Typography>
            <Image src={image} alt={title} width={300} height={200} />
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
