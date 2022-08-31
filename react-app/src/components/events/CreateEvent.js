import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createEventThunk } from "../../store/event";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';

const CreateEventForm = ({ hideModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [eventType, setEventType] = useState("")
  const [entertainment, setEntertainment] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [lat, setLat] = useState(1)
  const [lng, setLng] = useState(1)
  const [errors, setErrors] = useState([])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const newEvent = {
      name,
      description,
      imageUrl,
      eventType,
      entertainment,
      lat,
      lng
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
              placeholder={"Event Name"}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type={'text'}
              placeholder={"Event Description"}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div>
            <input
              type={'text'}
              placeholder={"Event Cover Photo"}
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
            />
          </div>
          <div>
            <input
              type={'text'}
              placeholder={"Event Type"}
              value={eventType}
              onChange={e => setEventType(e.target.value)}
            />
          </div>
          <div>
            <input
              type={'text'}
              placeholder={"Event Entertainment"}
              value={entertainment}
              onChange={e => setEntertainment(e.target.value)}
            />
          </div>
          <div>
            <input
              type={'time'}
              placeholder={"Start Time"}
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
            />
          </div>
          <div>
            <input
              type={'date'}
              placeholder={"End Time"}
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
            />
          </div>
          <div>
            <input
              type={'number'}
              placeholder={"Lat"}
              value={lat}
              onChange={e => setLat(e.target.value)}
            />
          </div>
          <div>
            <input
              type={'number'}
              placeholder={"Lng"}
              value={lng}
              onChange={e => setLng(e.target.value)}
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
