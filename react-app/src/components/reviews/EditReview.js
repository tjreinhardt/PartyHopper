import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateReviewThunk, getReviewsThunk } from "../../store/review";
import { FaStar } from 'react-icons/fa'





const EditReviewForm = ({ eventId, userId, id, showModal, setShowModal }) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const session = useSelector(state => state.session.user);
    const review = useSelector(state => state.review)
    const review_ = Object.values(review)
    // const userReview = useSelector(state => state.)
    const user = useSelector(state => state?.session?.user);
    // console.log('review_    ------', review_)
    const [errors, setErrors] = useState([])
    const [onHoverRating, setOnHoverRating] = useState(null);

    let rev = review_.filter(rev => {
        return (rev?.eventId === Number(eventId) && rev?.userId === user.id)
    })

    rev = rev[0]
    // const user = useSelector(state => state?.session?.user);

    // const reviewList = review_.filter((rev) => {
    //     // console.log('rev.userId', rev?.userId)
    //     // const result = rev?.userId === userId
    //     const result = (rev?.eventId === Number(eventId) && rev?.userId === userId)
    //     console.log('return from filter function', result)
    //     return result
    // })
    const [rating, setRating] = useState(rev?.rating)
    const [comment, setComment] = useState(rev?.comment)
    // console.log(reviewList)

    const reviewFinder = (review_) => {
        let result;
        for (let i = 0; i < review_.length; i++) {
            if (review_[i].userId === session?.id) {
                result = review_[i].userId
            }
            console.log('result', result)
            return result
        }
    }

    reviewFinder(review_)
    // for (let i = 0; i < review_.length; i++) {
    //     if (review[i].userId === session?.id) {
    //         return review[i].userId
    //     }
    // }


    useEffect(() => {
        dispatch(getReviewsThunk(eventId))
    }, [dispatch, eventId, userId])



    const colors = {
        'yellow': "rgb(219, 142, 0)",
        'gray': "#a9a9a9"
    }

    const rate = Array(5).fill(0)


    // const [editRating, setEditRating] = useState(review?.rating);
    // const [editContent, setEditContent] = useState(review?.comment)
    const handleMouseover = value => {
        setOnHoverRating(value)
    };
    const handleMousoverExit = () => {
        setOnHoverRating(null)
    };



    console.log('reviewList', review_)
    console.log('session?.id', session?.id)
    console.log('userId ------------------', userId)
    // console.log(' ------',)
    // console.log('review?.id', review.user.id)

    const handleCancel = async (e) => {
        setShowModal(!showModal)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let result;
        for (let i = 0; i < review_.length; i++) {
            if (review_[i].userId === session?.id) {
                result = review_[i].userId
            }
            // console.log('result', result)
            userId = result
        }
        // if (!errors) {
        // console.log('session?.id', session?.id)
        // console.log('result', result)

        const newReview = {
            id: rev?.id,
            rating,
            comment,
            eventId: eventId,
            userId: session?.id
        }
        // console.log('newReview ===================================', newReview)

        if (!errors.length) {
            dispatch(updateReviewThunk(newReview))
            history.push(`/events/${eventId}`)
            setShowModal(!showModal)
            // }
        }

    }
    useEffect(() => {
        let errors = [];
        if (rating === 0) errors.push("Please rate the event from 0-5 stars")
        if (session?.id !== userId) errors.push("Cannot edit another users review")
        if (comment.trim().length < 10 && comment.trim().length >= 1) errors.push("Review is too short (10 characters minimum)")
        if (comment.trim().length > 500) errors.push("Review is too long (500)")
        if (comment.trim().length === 0) errors.push("Please provide a comment for your review")
        setErrors(errors)
    }, [rating, comment])


    return (
        <div>
            <form style={{ padding: '20px' }} onSubmit={handleSubmit} className="edit-review-form">
                <h2>Edit Your Review</h2>
                <div>
                    <div>
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
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                        <button className="login-button" style={{ width: '420px' }} type="submit">Submit</button>
                        <button className="login-button" style={{ width: '420px', marginTop: '16px' }} onClick={handleCancel}>Cancel</button>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
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
