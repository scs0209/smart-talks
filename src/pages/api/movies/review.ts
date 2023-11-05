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
    const { movieId, review, userId } = req.body

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' }) // 사용자 ID가 없는 경우 401 Unauthorized 응답 반환
      return
    }

    const newReview: IReview = new Review({ movieId, review, userId })
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
  }
}
