

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createReviewThunk } from "../../store/review";
import { Rating } from 'react-simple-star-rating';




const CreateReviewForm = ({ eventId }) => {
    const dispatch = useDispatch();
    const session = useSelector(state => state.session.user);

    const [rating, setRating] = useState(0)
    // const [entertainmentRating, setEntertainmentRating] = useState(3)
    // const [atmosphereRating, setAtmosphereRating] = useState(3)
    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState([])



    const handleRating = (rate) => {
        setRating(rate)
    }
    // const handleEntertainmentRating = (rate:number) => {
    //     setEntertainmentRating(rate)
    // }
    // const handleAtmosphereRating = (rate:number) => {
    //     setAtmosphereRating(rate)
    // }





    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const review = {
            rating,
            // entertainmentRating,
            // atmosphereRating,
            comment,
            eventId: eventId,
            userId: session.id
        }
        dispatch(createReviewThunk(eventId, review))
            .then(
                async (res) => {
                    if (res.errors) {
                        setErrors(res.errors)
                    }
                })
    }

    useEffect(() => {
        let errors = [];
        if (!rating) errors.push("Please rate the event")
        if (!comment) errors.push("Please describe the event")
        if (comment.length > 500) errors.push("Description exceeds max limit")
        // if (!lat) errors.push("Please enter a latitude")
        // if (!lng) errors.push("Please enter a longitude")
        // if (startDate < todays_date) errors.push("Fix your date fool")
        setErrors(errors)
    }, [rating, comment])


    return (
        <div>
            <form onSubmit={handleSubmit} className="create-review-form">

                {/* <label>Review:</label> */}
                <div>
                    <div>
                        <Rating
                            value={rating}
                            onClick={handleRating}
                            // customIcons={customIcons}
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
                    <button className="login-button" style={{ width: '60px' }}>Post</button>
                </div>

            </form>
        </div>
    )
}

export default CreateReviewForm
