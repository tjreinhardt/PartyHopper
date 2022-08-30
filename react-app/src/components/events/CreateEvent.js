import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createEventThunk } from "../../store/event";

const CreateEventForm = ({ hideModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [errors, setErrors] = useState([])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const newEvent = {
      name,
      description
    };
    dispatch(createEventThunk(newEvent))
      .then(
        async (res) => {
          if (res.errors) {
            setErrors(res.errors)
          }
          else {
            hideModal()
            history.push(`/events/${res.id}`);
          }
        })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input
              type={'text'}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type={'text'}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="bottom-button">
          <button type="submit">Share</button>
          <button onClick={hideModal}>Cancel</button>
        </div>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} >{error}</li>
          ))}
        </ul>
      </form>
    </div>
  )


}


export default CreateEventForm;
