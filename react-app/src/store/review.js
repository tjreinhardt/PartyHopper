const GET_REVIEWS = "review/GET_REVIEWS"
const CREATE_REVIEW = "review/CREATE_REVIEW"
const DELETE_REVIEW = "review/DELETE_REVIEW"
const LIKE_REVIEW = "review/LIKE_REVIEW"


const getReviews = (reviews) =>{
  return {
    type:GET_REVIEWS,
    reviews
  }
}

const createReview = (review) =>{
  return {
    type:CREATE_REVIEW,
    review
  }
}

const deleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId
  }
}

const likeReview = (reviewId, totalLikes, likeStatus) => {
  return {
    type: LIKE_REVIEW,
    reviewId,
    totalLikes,
    likeStatus
  }

}

export const getReviewsThunk = (eventId) => async dispatch =>{
  const response = await fetch(`/api/events/${eventId}/reviews`);
  if(response.ok){
    const reviews = await response.json();
    dispatch(getReviews(reviews))
  }
  return response
}

export const createReviewThunk = (eventId,review)=> async dispatch =>{
  const response = await fetch(`/api/events/${eventId}/reviews/new`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(review)
    }
  )
  const data = await response.json()
  if (response.ok){
    dispatch(createReview(data))
  }
  return data
}

export const deleteReviewThunk = (eventId, reviewId) => async dispatch => {
  const response = await fetch(`/api/events/${eventId}/reviews/${reviewId}`, {
    method:'DELETE'
  })
  if (response.ok) {
    dispatch(deleteReview(reviewId))
  }
  return response
}

export const likeReviewThunk = (eventId, reviewId) => async dispatch => {
  const response = await fetch(`/api/events/${eventId}/reviews/${reviewId}/likes`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({})
  });
  if (response.ok) {
    const data = await response.json();
  
    dispatch(likeReview(reviewId, data.totalLikes, data.likeStatus ))
  }
  return response
}

const initialState = { };

export default function reducer(state = initialState, action) {
    let newState
    switch (action.type) {
      case GET_REVIEWS:{
        newState = action.reviews.Reviews
        return newState
      }
      case CREATE_REVIEW:{
        newState = {...state}
        newState[action.review.id]=action.review
        return newState
      }
      case DELETE_REVIEW: {
        newState = {...state}
        delete newState[action.reviewId]
        return newState
      }
      case LIKE_REVIEW: {
        newState = {...state}
        newState[action.reviewId] = {...newState[action.reviewId], totalLikes:action.totalLikes, likeStatus: action.likeStatus }
        return newState
      }
      default:
        return state;
    }
  }