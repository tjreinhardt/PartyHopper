import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsThunk, deleteReviewThunk } from "../../store/review";
import EditReviewForm from "./EditReview";
import { Modal } from "../../context/Modal";
import "../../styles/ReviewsList.css"
import { useHistory } from "react-router-dom";
import { FaStar } from 'react-icons/fa'
import Footer from "../Footer";



const GetReviews = ({ eventId }) => {
    const dispatch = useDispatch();
    const history = useHistory()
    const reviews = useSelector(state => state.review);
    const [showModal, setShowModal] = useState(false);
    const session = useSelector(state => state.session.user);
    const [reviewsIsLoaded, setReviewsIsLoaded] = useState(false);
    const [hoveredReviewId, setHoveredReviewId] = useState(null)
    // const [sessionUser, setSessionUser] = useState(session.id)
    const reviewsList = Object.values(reviews)


    const colors = {
        'yellow': "rgb(219, 142, 0)",
        'gray': "#a9a9a9"
    }


    const rate = Array(5).fill(0)

    const shouldChangeCurrentId = (currentId) => {
        if (!hoveredReviewId) {
            return true
        };
        if (hoveredReviewId && hoveredReviewId !== Number(currentId)) {
            return true
        }
        return false
    }


    useEffect(() => {
        dispatch(getReviewsThunk(eventId)).then(() => setReviewsIsLoaded(true))
    }, [dispatch, showModal, eventId])

    useEffect(() => {
        console.log('hoveredReviewId', hoveredReviewId)
    }, [hoveredReviewId])

    const handleOnMouseOver = (event) => {
        let { id } = event.currentTarget;
        if (shouldChangeCurrentId(id)) {
            setHoveredReviewId(Number(id))
        }
    }


    const handleDelete = async (eventId, reviewId) => {
        history.push(`/events/${eventId}`)
        return dispatch(deleteReviewThunk(eventId, reviewId))
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        setShowModal(true);

    }



    if (!reviews) {
        return null
    }

    let reviewTitle;
    if (reviewsList.length === 0) {
        reviewTitle = (
            <div>

                <h1 style={{ fontWeight: '600' }}>This event does not have any reviews... yet!</h1>
            </div>
        )
    } else if (reviewsList.length) {
        reviewTitle = (
            <div>
                <h2 style={{ marginLeft: '0px', maxWidth: '100%', width: '400px', fontWeight: '600' }}>Recommended Reviews</h2>
            </div>
        )
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
            res = `${week} weeks`
        }
        else if (day > 0) {
            res = `${day} days`
        }
        else if (hour > 0) {
            res = `${hour} hours`
        }
        else if (minute > 0) {
            res = `${minute} min`
        }
        else {
            res = `${second}s`
        }

        return res
    }




    return (reviewsIsLoaded &&

        <div className="review-details-container">
            {reviewTitle}
            {reviewsList.map((review) =>
            (
                <div id={review.id} onMouseOver={handleOnMouseOver} key={review.id} className="review-list-review-container">
                    <div className="review-list-username-content" style={{ maxWidth: '85vw' }}>
                        <div style={{
                            fontSize: '20px',
                            marginBottom: '2px'
                        }} className="review-list-username">{review.user.username}</div>
                        <div className='star-chart-wrapper'>
                            <div className='star-chart-inner-div' style={{ display: 'flex' }}>
                                {rate.map((_, i) => {
                                    // const input = i + 1;
                                    return (
                                        <div key={i} style={{ display: 'flex', flexDirection: 'row' }}>
                                            <FaStar
                                                key={i}
                                                size={25}
                                                isFilled={review.rating}
                                                style={{
                                                    marginRight: 10
                                                }}
                                                color={i <= (review.rating - 1) ? colors.yellow : colors.gray}
                                            ></FaStar>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div style={{ marginTop: '4px' }} className="reviews-list-comment-div-wrapper">
                            <div className="review-list-username" style={{
                                marginRight: '3px',
                                fontSize: '16px'
                            }}>{review.user.username} said:</div>
                            <div className="reviews-list-comment">"{review.comment}"</div>
                        </div>
                        {/* <div>{review.id} reviewId</div> */}
                        <div className="rating-edit-delete-button-wrapper">
                            <div style={{
                                fontSize: '12px',
                                marginTop: '6px',
                                textAlign: 'left'
                            }} className="review-list-create">{timeAfterCreated(review.reviewDate)}</div>
                            {session.id === review.userId && <div>
                                <button style={{
                                    width: '50px',
                                    marginLeft: '12px',
                                    border: 'none',
                                    color: 'red',
                                    backgroundColor: 'white'
                                }} className="edit-review-button" onClick={(e) => handleEdit(e, review.id)}>Edit</button>
                            </div>}
                            {session.id === review.userId && <button style={{
                                width: '50px',
                                border: 'none',
                                color: 'red',
                                backgroundColor: 'white'
                            }} className="delete-review-button" onClick={() => handleDelete(eventId, review.id)}>Delete</button>}
                        </div>
                    </div>
                    {showModal && !!hoveredReviewId && (<Modal onClose={() => setShowModal(false)}>
                        <EditReviewForm id={hoveredReviewId} userId={session?.id} eventId={Number(eventId)} showModal={showModal} setShowModal={setShowModal} />
                    </Modal>)}
                </div>)
            )}
        </div>
    )
}
// .reverse()
export default GetReviews
