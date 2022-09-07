import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from 'react-simple-star-rating';
import { getReviewsThunk, deleteReviewThunk, updateReviewThunk } from "../../store/review";
import {
    MdOutlineSentimentDissatisfied,
    MdOutlineSentimentNeutral,
    MdOutlineSentimentSatisfied,
    MdOutlineSentimentVeryDissatisfied,
    MdOutlineSentimentVerySatisfied
} from 'react-icons/md';
import EditReviewForm from "./EditReview";
import { Modal } from "../../context/Modal";


const customIcons = [
    { icon: <MdOutlineSentimentVeryDissatisfied size={50} /> },
    { icon: <MdOutlineSentimentDissatisfied size={50} /> },
    { icon: <MdOutlineSentimentNeutral size={50} /> },
    { icon: <MdOutlineSentimentSatisfied size={50} /> },
    { icon: <MdOutlineSentimentVerySatisfied size={50} /> }
]

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
            res = `${second}seconds`
        }

        return res
    }



    return (reviewsIsLoaded &&

        <div className="review-details-container">
            {reviewsList.map((review) =>
            (
                <div key={review.id} className="review-list-review-container">
                    <div className="review-list-username-content">
                        <h2>{review.user.username}</h2>
                        <Rating
                            ratingValue={review.rating}
                            customIcons={customIcons}
                            allowHover={false}
                        />
                        <div>{review.comment}</div>
                        <div>{review.id} reviewId</div>
                        <div className="review-list-create">{timeAfterCreated(review.reviewDate)}</div>
                    </div>
                    {showModal && (<Modal onClose={() => setShowModal(false)}>
                        <EditReviewForm id={review.id} eventId={Number(eventId)} showModal={showModal} setShowModal={setShowModal} />
                    </Modal>)}
                    {session.id === review.userId && <button onClick={() => handleDelete(eventId, review.id)}>Delete</button>}
                    <div>
                        <button onClick={(e) => handleEdit(e, review.id)}>Manage/Edit</button>
                    </div>
                </div>)
            )}
        </div>
    )
}

export default GetReviews
