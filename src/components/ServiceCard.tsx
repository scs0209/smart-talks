import { Card, CardContent, CardActionArea, Typography } from '@mui/material'
import { FC, useCallback, useState } from 'react'
import Image from 'next/image'
import { useStyles } from '@/styles/ServiceCardStyle'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

interface ServiceCardProps {
  title: string
  description: string
  link: string
  image: string
}

const ServiceCard: FC<ServiceCardProps> = ({
  title,
  description,
  link,
  image,
}: ServiceCardProps) => {
  const classes = useStyles()
  const router = useRouter()
  const [isAnimating, setAnimating] = useState(false)

  const handleCardClick = useCallback(() => {
    setAnimating(true)
    setTimeout(() => {
      router.push(link)
    }, 500) // 애니메이션 시간 후 페이지 이동
  }, [link, router])

  return (
    <Card sx={{ width: 300, height: 300, mr: 2, mb: 2 }}>
      <CardActionArea onClick={handleCardClick}>
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
          <motion.div
            className={classes.imageContainer}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            animate={{ opacity: isAnimating ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Image src={image} alt={title} width={300} height={200} />
          </motion.div>
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
  )
}

export default ServiceCard
