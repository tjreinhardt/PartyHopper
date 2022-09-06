import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateReviewThunk, getReviewsThunk } from "../../store/review";
import { Rating } from "react-simple-star-rating";
import {
    MdOutlineSentimentDissatisfied,
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


const EditReviewForm = ({ eventId, id }) => {
    const dispatch = useDispatch()
    const reviews = useSelector(state => state.review)
    // console.log(reviews, "------------------ reviews")
    const session = useSelector(state => state.session.user);
    const [reviewsIsLoaded, setReviewsIsLoaded] = useState(false);
    const reviewsList = Object.values(reviews)

    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState([])
    // console.log("review", review)
    // console.log("event", event)
    // const history = useHistory()
    // const reviews = useSelector(state => state.review)
    // const reviewsList = Object.values(reviews)

    useEffect(() => {
        dispatch(getReviewsThunk(eventId)).then(() => setReviewsIsLoaded(true))
    }, [dispatch, eventId])





    const handleSubmit = async (e) => {
        e.preventDefault();

        const newReview = {
            id: id,
            rating,
            comment,
            eventId: eventId,
            userId: session.id
        }
        console.log(newReview, '---------------newReview')
        return dispatch(updateReviewThunk(newReview))
        // .then(
        //     async (res) => {
        //         if (res.errors) {
        //             setErrors(res.errors)
        //         } else {
        //             history.push('/events')
        //         }
        //     }
        // )
    }
    const handleRating = (rate) => {
        setRating(rate)
    }
    useEffect(() => {
        let errors = [];
        if (!rating) errors.push("Please rate your experience")
        if (!comment) errors.push("Please leave a detailed review")
        // if (startDate < todays_date) errors.push("Fix your date fool")
        setErrors(errors)
    }, [rating, comment])


    return (
        <div>
            <form onSubmit={handleSubmit} className="edit-review-form">
                <div>
                    <div>
                        <Rating
                            value={rating}
                            onClick={handleRating}
                            customIcons={customIcons}
                            showTooltip
                            fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}
                            tooltipArray={['Terrible', 'Bad', 'Average', 'Great', 'Perfect']}
                        />
                    </div>
                    <input
                        type={'textarea'}
                        style={{ fontSize: '16px', minWidth: '400px', marginTop: '6px', height: '30px' }}
                        value={comment}
                        placeholder="Please let us know about your experience"
                        onChange={e => setComment(e.target.value)}
                    />
                    {errors.map((error, idx) => (
                        <li key={idx} >{error}</li>
                    ))}
                </div>
                <div>
                    <button className="login-button" style={{ width: '60px' }} type="submit">Edit</button>
                    {/* <button onClick={hideModal}>Cancel</button> */}
                </div>

            </form>
        </div>
    )




}
export default EditReviewForm;
