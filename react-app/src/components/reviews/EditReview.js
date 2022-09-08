import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateReviewThunk, getReviewsThunk } from "../../store/review";
import { Rating } from "react-simple-star-rating";





const EditReviewForm = ({ eventId, id, showModal, setShowModal }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const session = useSelector(state => state.session.user);

    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(getReviewsThunk(eventId))
    }, [dispatch, eventId])





    const handleSubmit = async (e) => {
        e.preventDefault();
        if (errors.length === 0) {
            history.push(`/events/${eventId}`)
            setShowModal(!showModal)

        }

        const newReview = {
            id: id,
            rating,
            comment,
            eventId: eventId,
            userId: session.id
        }
        console.log(newReview, '---------------newReview')
        if (comment.length !== 0 && rating) {

            return dispatch(updateReviewThunk(newReview))
        }

    }
    const handleRating = (rate) => {
        setRating(rate)
    }
    useEffect(() => {
        let errors = [];
        if (!rating) errors.push("Please rate the event")
        // if (!comment) errors.push("Feeling different about this experience?")
        if (comment.length < 10) errors.push("Please provide a review")
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
                    <button className="login-button" style={{ width: '60px' }} type="submit">Edit</button>
                    {/* <button onClick={hideModal}>Cancel</button> */}
                </div>

            </form>
        </div>
    )




}
export default EditReviewForm;
