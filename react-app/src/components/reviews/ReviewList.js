import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from 'react-simple-star-rating';
import { getReviewsThunk, deleteReviewThunk, updateReviewThunk } from "../../store/review";
import EditReviewForm from "./EditReview";
import { Modal } from "../../context/Modal";
import "../../styles/ReviewsList.css"




const GetReviews = ({ eventId }) => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.review);
    const [showModal, setShowModal] = useState();
    const session = useSelector(state => state.session.user);
    const [reviewsIsLoaded, setReviewsIsLoaded] = useState(false);
    const reviewsList = Object.values(reviews)

    useEffect(() => {
        dispatch(getReviewsThunk(eventId)).then(() => setReviewsIsLoaded(true))
    }, [dispatch, showModal, eventId])



    const handleDelete = async (eventId, reviewId) => {

        return dispatch(deleteReviewThunk(eventId, reviewId))
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        setShowModal(true);

    }

    if (!reviews) {
        return null
    }

    const timeAfterCreated = (createdAt) => {
        const age = Date.now() - Date.parse(createdAt);
        let res;
        const second = Math.floor(age / 1000)
        const minute = Math.floor(second / 60);
        const hour = Math.floor(minute / 60);
        const day = Math.floor(hour / 24);
        const week = Math.floor(day / 7)
        if (week > 0) {
            res = `${week} weeks`
        }
        else if (day > 0) {
            res = `${day} days`
        }
        else if (hour > 0) {
            res = `${hour} hours`
        }
        else if (minute > 0) {
            res = `${minute} min`
        }
        else {
            res = `${second}s`
        }

        return res
    }




    return (reviewsIsLoaded &&

        <div className="review-details-container">
            {reviewsList.map((review) =>
            (
                <div key={review.id} className="review-list-review-container">
                    <div className="review-list-username-content">
                        <div className="review-list-username">{review.user.username}</div>
                        <Rating
                            ratingValue={review.rating}
                            allowHover={false}
                            readonly={true}
                            size={25}
                        />
                        <div className="reviews-list-comment-div-wrapper">
                            <div className="review-list-username" style={{ marginRight: '3px', fontSize: '16px' }}>{review.user.username} said:</div>
                            <div className="reviews-list-comment">"{review.comment}"</div>
                        </div>
                        {/* <div>{review.id} reviewId</div> */}
                        <div className="review-list-create">{timeAfterCreated(review.reviewDate)}</div>
                    </div>
                    {showModal && (<Modal onClose={() => setShowModal(false)}>
                        <EditReviewForm id={review.id} eventId={Number(eventId)} showModal={showModal} setShowModal={setShowModal} />
                    </Modal>)}
                    <div className="rating-edit-delete-button-wrapper">
                        {session.id === review.userId && <button className="delete-review-button" onClick={() => handleDelete(eventId, review.id)}>Delete</button>}
                        {session.id === review.userId && <div>
                            <button className="edit-review-button" onClick={(e) => handleEdit(e, review.id)}>Edit</button>
                        </div>}
                    </div>
                </div>)
            )}
        </div>
    )
}

export default GetReviews
