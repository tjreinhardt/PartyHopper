import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink} from "react-router-dom";
import { getReviewsThunk, deleteReviewThunk } from "../../store/review";





const GetReviews = ({ eventId }) => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.review);
    const session = useSelector(state => state.session.user);
    const [reviewsIsLoaded, setReviewsIsLoaded] = useState(false);
    const reviewsList = Object.values(reviews)
    reviewsList.reverse()
    console.log('reviewsList========================', reviewsList)

    useEffect(() => {
        dispatch(getReviewsThunk(eventId)).then(() => setReviewsIsLoaded(true))
    }, [dispatch, eventId])

    const handleDelete = async (eventId, reviewId) => {

        return dispatch(deleteReviewThunk(eventId, reviewId))
    }

    // const handleLikes = async (eventId, reviewId) => {

    //     return dispatch(likeReviewThunk(eventId, reviewId))
    // }

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
            res = `${week}w`
        }
        else if (day > 0) {
            res = `${day}d`
        }
        else if (hour > 0) {
            res = `${hour}h`
        }
        else if (minute > 0) {
            res = `${minute}m`
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
                                <div>{review.concessionsRating}</div>
                                <div>{review.entertainmentRating}</div>
                                <div>{review.atmosphereRating}</div>
                                <div>{review.comment}</div>
                                <div>{(review.concessionsRating + review.entertainmentRating + review.atmosphereRating) / 3}</div>
                            </div>
                            {/* <div className="review-list-create-like"> */}
                                <p className="review-list-create">{timeAfterCreated(review.createdAt)}</p>
                                {/* {!!review.totalLikes && (review.totalLikes === 1 ? <p>1 like</p> : <p>{review.totalLikes} likes</p>)} */}
                    {/* </div> */}
                        {session.id === review.userId && <button onClick={() => handleDelete(eventId, review.id)}>Delete</button>}

                </div>)
            )}
        </div>
    )
}

export default GetReviews