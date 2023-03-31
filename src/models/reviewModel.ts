import { AppDataSource } from '../dataSource';
import { Review } from '../entities/Review';
import { User } from '../entities/User';
import { Book } from '../entities/Book';

const reviewRepository = AppDataSource.getRepository(Review);

async function addReview(
  rating: number,
  reviewText: string,
  byUser: User,
  forBook: Book
): Promise<Review> {
  let newReview = new Review();
  newReview.rating = rating;
  newReview.reviewText = reviewText;
  newReview.user = byUser;
  newReview.book = forBook;

  newReview = await reviewRepository.save(newReview);
  return newReview;
}

async function getReviewById(reviewId: string): Promise<Review | null> {
  return await reviewRepository.findOne({ where: { reviewId } });
}

async function getAllReviews(): Promise<Review[]> {
  return await reviewRepository.find();
}

async function deleteReviewById(reviewId: string): Promise<void> {
  await reviewRepository
    .createQueryBuilder('review')
    .delete()
    .from(Review)
    .where('reviewId = :reviewId', { reviewId })
    .execute();
}

async function deleteAllUserReviews(userId: string): Promise<void> {
  await reviewRepository
    .createQueryBuilder('review')
    .delete()
    .from(Review)
    .where('user.userId = :userId', { userId })
    .execute();
}

export { addReview, getReviewById, getAllReviews, deleteReviewById, deleteAllUserReviews };
