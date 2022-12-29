

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createReviewThunk } from "../../store/review";
import { useHistory } from "react-router-dom";
import { FaStar } from 'react-icons/fa'




const CreateReviewForm = ({ eventId }) => {
    const dispatch = useDispatch();
    const history = useHistory()
    const session = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState();
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState([])
    const [onHoverRating, setOnHoverRating] = useState(null);

    const colors = {
        'yellow': "rgb(219, 142, 0)",
        'gray': "#a9a9a9"
    }
    const rate = Array(5).fill(0)
    const handleMouseover = value => {
        setOnHoverRating(value)
    };
    const handleMousoverExit = () => {
        setOnHoverRating(null)
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        const review = {
            rating,
            comment,
            eventId: eventId,
            userId: session.id
        };

        if (!errors.length) {
            dispatch(createReviewThunk(eventId, review))
            history.push(`/events/${eventId}`)
            setShowModal(showModal)

        }

    }



    useEffect(() => {
        let errors = [];
        if (rating === 0) errors.push("Please rate the event")
        // if (comment.length === 0) errors.push("Please provide a review")
        if (comment.trim().length < 10 && comment.trim().length >= 1) errors.push("Review is too short (10 characters minimum)")
        if (comment.trim().length > 500) errors.push("Review is too long (500)")
        if (comment.trim().length === 0) errors.push("Please provide a review")
        setErrors(errors)
    }, [rating, comment])




    return (
        <div style={{ margin: '8px', marginTop: '20px', maxWidth: '440px', padding: '20px', border: '1px solid gray' }}>
            <form onSubmit={handleSubmit} className="create-review-form">
                <div>
                    <div>
                        <div className='star-chart-wrapper'>
                            <div className='star-chart-inner-div' style={{ display: 'flex', justifyContent: 'center' }}>
                                {rate.map((_, i) => {
                                    const input = i + 1;
                                    return (
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <FaStar
                                                key={i}
                                                size={30}
                                                style={{
                                                    marginRight: 10,
                                                    cursor: 'pointer'
                                                }}
                                                color={input <= (rating || onHoverRating) ? colors.yellow : colors.gray}

                                                onClick={() => setRating(input)}
                                                onMouseEnter={() => handleMouseover(input)}
                                                onMouseLeave={handleMousoverExit}
                                            ></FaStar>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <input
                        type={'textarea'}
                        style={{ fontSize: '14px', maxWidth: '389px', marginTop: '6px', height: '30px', paddingRight: '-10px', marginRight: '0px', width: '400px' }}
                        value={comment}
                        placeholder="My experience.."
                        onChange={e => setComment(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit" className="login-button" style={{
                        maxWidth: '409px',
                        width: '100%',
                        height: '35px',
                        marginBottom: '12px'
                    }}>Post</button>
                    <div style={{ textAlign: 'center' }}>
                        {errors.map((error, idx) => (
                            <div style={{ color: 'red' }} key={idx} >*{error}</div>
                        ))}
                    </div>
                </div>

            </form>
        </div>
    )
}

export default CreateReviewForm
