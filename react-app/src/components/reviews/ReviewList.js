import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from 'react-simple-star-rating';
// import { NavLink } from "react-router-dom";
import { getReviewsThunk, deleteReviewThunk } from "../../store/review";
import { MdOutlineSentimentDissatisfied,
  MdOutlineSentimentNeutral,
  MdOutlineSentimentSatisfied,
  MdOutlineSentimentVeryDissatisfied,
  MdOutlineSentimentVerySatisfied
} from 'react-icons/md';


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
    const session = useSelector(state => state.session.user);
    const [rating, setRating] = useState(100)
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

    const handleRating = (rate:number) => {
        setRating(rate)
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
                                    <Rating 
                                        ratingValue={review.rating} 
                                        // onClick={handleRating} 
                                        customIcons={customIcons}
                                        // showTooltip
                                        // tooltipArray={['Terrible', 'Bad', 'Average', 'Great', 'Perfect']}
                                        // readonly
                                        allowHover={false}
                                    />  
                                    <div>{review.rating}</div>
                                {/* <div>Entertainment Quality:{review.entertainmentRating}%</div>
                                <div>Overall vibe/atmosphere{review.atmosphereRating}%</div> */}
                                <div>{review.comment}</div>
                                {/* <div>Overall rating:{(review.concessionsRating + review.entertainmentRating + review.atmosphereRating) / 3}%</div> */}
                                <div className="review-list-create">{timeAfterCreated(review.reviewDate)}</div>
                            </div>
                        {session.id === review.userId && <button onClick={() => handleDelete(eventId, review.id)}>Delete</button>}

                </div>)
            )}
        </div>
    )
}

export default GetReviews