import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateReviewThunk, getReviewsThunk } from "../../store/review";
import { FaStar } from 'react-icons/fa'





const EditReviewForm = ({ eventId, id, showModal, setShowModal, review }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const session = useSelector(state => state.session.user);

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
    useEffect(() => {
        dispatch(getReviewsThunk(eventId))
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


        // console.log(newReview, '---------------newReview')
        if (!errors.length) {
            dispatch(updateReviewThunk(newReview))
            history.push(`/events/${eventId}`)
            setShowModal(!showModal)
        }

    }
    // const handleRating = (rate) => {
    //     setRating(rate)
    // }
    useEffect(() => {
        let errors = [];
        if (rating === 0) errors.push("Please rate the event")
        if (comment.length === 0) errors.push("Please provide a review")
        if (comment.trim().length < 10 && comment.trim().length >= 1) errors.push("Review is too short (10 characters minimum)")
        if (comment.trim().length > 500) errors.push("Review is too long (500)")
        if (comment.trim().length === 0) errors.push("Review cannot be blank")
        setErrors(errors)
    }, [rating, comment])


    return (
        <div>
            <form style={{ padding: '20px' }} onSubmit={handleSubmit} className="edit-review-form">
                <div>
                    <div>
                        {/* <Rating
                            value={rating}
                            onClick={handleRating}
                            showTooltip
                            fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}
                            tooltipArray={['Terrible', 'Bad', 'Average', 'Great', 'Perfect']}
                        /> */}
                        <div className='star-chart-wrapper'>
                            <div className='star-chart-inner-div' style={{ display: 'flex' }}>
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
                        rows={"15"}
                        columns={"15"}
                        style={{
                            overflowX: 'scroll',
                            display: 'inline-block',
                            textOverflow: 'clip',
                            wordWrap: 'break-word',
                            fontSize: '16px',
                            minWidth: '400px',
                            marginTop: '6px',
                            height: '30px'
                        }}
                        value={comment}
                        placeholder="Please let us know about your experience"
                        onChange={e => setComment(e.target.value)}
                    />
                </div>
                <div>
                    <button className="login-button" style={{ width: '420px' }} type="submit">Edit</button>
                    {/* <button onClick={hideModal}>Cancel</button> */}
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
export default EditReviewForm;
