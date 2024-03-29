/* eslint-disable */
import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '@/services/dbConnect'
import Review, { IReview } from '@/models/Review'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB()

  if (req.method === 'GET') {
    const { movieId } = req.query // movieId를 쿼리 파라미터로 받음

    // movieId에 해당하는 모든 리뷰를 불러옴
    const reviews: IReview[] = await Review.find({ movieId }).populate('userId')

    res.status(200).json(reviews) // 불러온 리뷰를 반환
  } else if (req.method === 'POST') {
    const { movieId, review, rating, userId } = req.body // rating 추가

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const newReview: IReview = new Review({ movieId, review, rating, userId }) // rating 추가
    const savedReview = await newReview.save()

    const populatedReview = await Review.findById(savedReview._id).populate(
      'userId',
    )

    res.status(201).json({ message: 'Review added!', review: populatedReview })
  } else if (req.method === 'PUT') {
    const { id, review, userId } = req.body

    const reviewToUpdate = await Review.findById(id)

    if (!reviewToUpdate || reviewToUpdate.userId.toString() !== userId) {
      res.status(401).json({ message: 'Unauthorized' }) // 로그인되지 않았거나 사용자 ID가 일치하지 않는 경우
      return
    }

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { review },
      { new: true },
    ).populate('userId') // 리뷰를 수정하고 수정된 리뷰를 반환

    res.status(200).json({ message: 'Review updated!', review: updatedReview })
  } else if (req.method === 'DELETE') {
    const { id, userId } = req.query

    const reviewToDelete = await Review.findById(id)
    console.log('reviewToDelete:', reviewToDelete?.userId, reviewToDelete)

    if (!reviewToDelete || reviewToDelete.userId?.toString() !== userId) {
      res.status(401).json({ message: 'Unauthorized' }) // 로그인되지 않았거나 사용자 ID가 일치하지 않는 경우
      return
    }

    await Review.findByIdAndDelete(id) // 리뷰를 삭제

    res.status(200).json({ message: 'Review deleted!' })
  } else if (req.method === 'PATCH') {
    const { id, userId, action } = req.body // action: 'like' 또는 'dislike'

    const review = await Review.findById(id)
    if (!review) {
      res.status(404).json({ message: 'Review not found' })
      return
    }

    if (action === 'like') {
      if (review.likes.includes(userId)) {
        // 이미 좋아요를 누른 경우 좋아요 제거
        review.likes = review.likes.filter((id) => id.toString() !== userId)
      } else {
        // 좋아요를 누르지 않은 경우 좋아요 추가
        review.likes.push(userId)
        // 싫어요를 누른 경우 싫어요 제거
        review.dislikes = review.dislikes.filter(
          (id) => id.toString() !== userId,
        )
      }
    } else if (action === 'dislike') {
      if (review.dislikes.includes(userId)) {
        // 이미 싫어요를 누른 경우 싫어요 제거
        review.dislikes = review.dislikes.filter(
          (id) => id.toString() !== userId,
        )
      } else {
        // 싫어요를 누르지 않은 경우 싫어요 추가
        review.dislikes.push(userId)
        // 좋아요를 누른 경우 좋아요 제거
        review.likes = review.likes.filter((id) => id.toString() !== userId)
      }
    } else {
      res.status(400).json({ message: 'Invalid action' })
      return
    }

    const updatedReview = await review.save()
    res.status(200).json({ message: 'Review updated!', review: updatedReview })
  }
}
