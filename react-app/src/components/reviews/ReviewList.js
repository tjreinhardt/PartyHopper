import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getReviewsThunk, deleteReviewThunk, likeReviewThunk } from "../../store/review";





const GetReviews = ({ eventId }) => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.review);
    const session = useSelector(state => state.session.user);
    const [reviewsIsLoaded, setReviewsIsLoaded] = useState(false);
    const reviewsList = Object.values(reviews)
    reviewsList.reverse()

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
                    <div className="review-list-user-content">
                        <div>
                            <NavLink className="event-header-username" to={`/users/${review.userId}/events`}>
                                <img alt="" src={review.user.profileImage} className="review-list-user-image" />
                            </NavLink>
                        </div>
                        <div className="review-list-username-like">
                            <div className="review-list-username-content">
                                <NavLink className="event-header-username" to={`/users/${review.userId}/events`}>
                                    <div className="review-list-username">{review.user.username}</div>
                                </NavLink>
                                <div>{review.concessions_rating}</div>
                                <div>{review.entertainment_rating}</div>
                                <div>{review.atmosphere_rating}</div>
                                <div>{review.comment}</div>
                            </div>
                            <div className="review-list-create-like">
                                <p className="review-list-create">{timeAfterCreated(review.createdAt)}</p>
                                {/* {!!review.totalLikes && (review.totalLikes === 1 ? <p>1 like</p> : <p>{review.totalLikes} likes</p>)} */}

                            </div>
                        </div>
                    </div>
                    <div className="review-list-delete-like" style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                        {session.id === review.userId && <button onClick={() => handleDelete(eventId, review.id)}>Delete</button>}

                    </div>



                </div>)
            )}
        </div>
    )
}

export default GetReviews