import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateEventThunk } from "../../store/event";


const EditEventForm = ({ event, hideModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState(event.name)
  const [description, setDescription] = useState(event.description)
  const [errors, setErrors] = useState([])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const newEvent = {
      id: event.id,
      name,
      description
    };
    dispatch(updateEventThunk(newEvent))
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
          <label>Name: </label>
          <input
            type={'text'}
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Description: </label>
          <input
            type={'text'}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Done</button>
          <button type="button" onClick={() => hideModal()}>Cancel</button>

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


export default EditEventForm;
