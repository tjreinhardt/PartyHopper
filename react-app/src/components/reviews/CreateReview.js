

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createReviewThunk } from "../../store/review";
import { Rating } from 'react-simple-star-rating';
import { useHistory } from "react-router-dom";




const CreateReviewForm = ({ eventId }) => {
    const dispatch = useDispatch();
    const history = useHistory()
    const session = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState();
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
        if (errors.length === 0) {
            history.push(`/events/${eventId}`)
            setShowModal(showModal)

        }
        const review = {
            rating,
            // entertainmentRating,
            // atmosphereRating,
            comment,
            eventId: eventId,
            userId: session.id
        }
        if (errors) {
            return dispatch(createReviewThunk(eventId, review))

        }

    }

    useEffect(() => {
        let errors = [];
        if (rating === 0) errors.push("Please rate the event")
        if (comment.length === 0) errors.push("Please provide a review")
        if (comment.length < 10) errors.push("Review is too short (10 characters minimum)")
        // if (startDate < todays_date) errors.push("Fix your date fool")
        setErrors(errors)
    }, [rating, comment])


    return (
        <div style={{ margin: '12px', width: '440px', padding: '20px', border: '1px solid gray' }}>
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
                </div>
                <div>
                    <button className="login-button" style={{ width: '420px', height: '35px', marginBottom: '12px' }}>Post</button>
                </div>
                <div style={{ textAlign: 'center' }}>
                    {errors.map((error, idx) => (
                        <div style={{ color: 'red' }} key={idx} >*{error}</div>
                    ))}
                </div>

            </form>
        </div>
    )
}

export default CreateReviewForm
