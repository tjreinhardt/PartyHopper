import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createEventThunk } from "../../store/event";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


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
  const [startDate, setStartDate] = useState("")
  const [lat, setLat] = useState(1)
  const [lng, setLng] = useState(1)
  const [startAmPm, setStartAmPm] = useState("")
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
      startTime,
      endTime,
      startDate,
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
            <select value={eventType} onChange={e => setEventType(e.target.value)}>
              <option value="None">None</option>
              <option value="Party">Party</option>
              <option value="Kickback">Kickback</option>
              <option value="Live Show/Event">Live Show/Event</option>
              <option value="Rager">Rager</option>
              <option value="Block Party">Block Party</option>
              <option value="Local Community Event">Local Community Event</option>
              <option value="Charity Event">Charity Event</option>
              <option value="After Party">After Party</option>
              <option value="Grand Opening">Grand Opening</option>
            </select>
          </div>
          <div>
            <select value={entertainment} onChange={e => setEntertainment(e.target.value)}>
              <option value="None">None</option>
              <option value="Live-Band">Live-Band</option>
              <option value="DJ">DJ</option>
              <option value="Comedian">Comedian</option>
            </select>
          </div>
          <div>
            <input
              type={'number'}
              min={'1'}
              max={'12'}
              placeholder={"1"}
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
            />
            <select>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          <div>
          </div>
          <div>
            <input
              type={'number'}
              min={'1'}
              max={'12'}
              placeholder={"1"}
              value={endTime + startAmPm}
              onChange={e => setEndTime(e.target.value)}
            />
            <select value={startAmPm} onChange={e => setStartAmPm(e.target.value)}>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          <div>
          </div>
          <div>
            <input
              type={'text'}
              placeholder={"Start Date"}
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
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
