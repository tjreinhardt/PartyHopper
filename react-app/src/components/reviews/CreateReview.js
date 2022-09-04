

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createReviewThunk } from "../../store/review";
import { Rating } from 'react-simple-star-rating';
import { MdOutlineSentimentDissatisfied,
  MdOutlineSentimentNeutral,
  MdOutlineSentimentSatisfied,
  MdOutlineSentimentVeryDissatisfied,
  MdOutlineSentimentVerySatisfied,
  MdReviews
} from 'react-icons/md';

const customIcons = [
  { icon: <MdOutlineSentimentVeryDissatisfied size={50} /> },
  { icon: <MdOutlineSentimentDissatisfied size={50} /> },
  { icon: <MdOutlineSentimentNeutral size={50} /> },
  { icon: <MdOutlineSentimentSatisfied size={50} /> },
  { icon: <MdOutlineSentimentVerySatisfied size={50} /> }
]

const CreateReviewForm = ({ eventId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const session = useSelector(state => state.session.user);

    const [rating, setRating] = useState(3)
    // const [entertainmentRating, setEntertainmentRating] = useState(3)
    // const [atmosphereRating, setAtmosphereRating] = useState(3)
    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)



const handleRating = (rate:number) => {
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
                    } else {
                        setComment("")
                    }
                })
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="create-review-form">

                {/* <label>Review:</label> */}
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
                    {/* <div> The entertainment was:
                        <Rating 
                        value={entertainmentRating} 
                        onClick={handleEntertainmentRating} 
                        customIcons={customIcons}
                        showTooltip
                        tooltipArray={['Terrible', 'Bad', 'Average', 'Great', 'Perfect']}
                        />
                    </div>
                    <div> The overall vibe was:
                        <Rating 
                        value={atmosphereRating} 
                        onClick={handleAtmosphereRating} 
                        customIcons={customIcons}
                        showTooltip
                        tooltipArray={['Terrible', 'Bad', 'Average', 'Great', 'Perfect']}
                        />
                    </div> */}
                    <input
                        type={'textarea'}
                        style={{ fontSize: '16px', minWidth: '400px', marginTop: '6px', height: '30px' }}
                        value={comment}
                        placeholder="Please let us know about your experience"
                        onChange={e => setComment(e.target.value)}
                    /> 
                    {/* <input 
                        type={'number'}
                        value={concessionsRating}
                        placeholder='How was the food?'
                        onChange={e => setConcessionsRating(e.target.value)}
                    />
                    <input
                        type={'number'}
                        style={{ fontSize: '16px', minWidth: '400px', marginTop: '6px', height: '30px' }}
                        value={entertainmentRating}
                        placeholder="How was the entertainment?"
                        onChange={e => setEntertainmentRating(e.target.value)}
                        />
                    <input
                        type={'number'}
                        style={{ fontSize: '16px', minWidth: '400px', marginTop: '6px', height: '30px' }}
                        value={atmosphereRating}
                        placeholder="How was the vibe?"
                        onChange={e => setAtmosphereRating(e.target.value)}
                        />
                    */}
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