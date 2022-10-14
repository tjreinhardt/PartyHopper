import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createEventThunk } from "../../store/event";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/CreateEvent.css'
import { isPast, isEqual } from "date-fns";


const CreateEventForm = ({ lat, lng }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [eventType, setEventType] = useState("")
  const [entertainment, setEntertainment] = useState("")
  const [startDate, setStartDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [repeats, setRepeats] = useState('')
  const [errors, setErrors] = useState([])

  const startDateConversion = () => {
    let parts = startDate.split('-')
    let year = parts[0]
    let month = parts[1] - 1
    let day = parts[2]
    day = Number(day) + 1
    const result = isPast(new Date(year, month, day))
    return result
  }

  const dateEquality = () => {
    let parts = startDate.split('-')
    let year = parts[0]
    let month = parts[1] - 1
    let day = parts[2]
    const result = isEqual(startDate, new Date(year, month, day))
    return result
  }

  startDateConversion()


  const getTodaysDate = () => {
    let today = new Date();
    let todays_day = new Date().getDay() + 18;
    if (todays_day < 10) todays_day = `0${todays_day}`
    let todays_month = new Date().getMonth() + 1;
    if (todays_month < 10) todays_month = `0${todays_month}`
    let todays_year = today.getFullYear();
    let todays_date = `${todays_year}-${todays_month}-${todays_day}`
    return todays_date
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!errors.length) {
      const newEvent = {
        name,
        description,
        eventType,
        entertainment,
        startDate,
        startTime,
        repeats,
        lat,
        lng
      };

      const createdEvent = await dispatch(createEventThunk(newEvent));
      if (createdEvent) {
        history.push(`/event_user_photos/${createdEvent.id}/upload`);
      };
    }
  }

  useEffect(() => {
    let errors = [];
    if (startDateConversion(startDate) === true && (!dateEquality())) errors.push("Date must be no earlier than today!")
    if (!lng) errors.push("Create a pin for your event")
    if (name.trim().length === 0) errors.push("Name your event")
    if (name.trim().length > 50) errors.push("Name is too long!")
    if (description.trim().length === 0) errors.push("Describe your event")
    if (description.trim().length > 500) errors.push("Description is too long!")
    if (!startDate) errors.push("Select a date");
    if (!startTime) errors.push("Select a time")
    if (!eventType || eventType === '-- Event Type --') errors.push("Select a category")
    if (!entertainment || entertainment === '-- Featured Entertainment --') errors.push("Select Featured Entertainment")
    setErrors(errors)
  }, [name, lng, description, eventType, entertainment, startDate, startTime])


  return (
    <div className={'create-event-form-wrap2'}>
      <h2 className="create-event-label">Create Event</h2>
      <h4 className="steps-label">Steps:</h4>
      <ol className="create-directions-list">
        <li className="steps-list-item">Use the map tool to find the location for your event</li>
        <li className="steps-list-item">Double click to create a map marker for your event</li>
        <li className="steps-list-item">Fill out the rest of the form fields</li>
        <li className="steps-list-item">Start Partying!</li>
      </ol>
      <form onSubmit={handleSubmit}>
        <div className="form-inner-wrapper">
          <div>
            <input className="event-input"
              type={'text'}
              placeholder={"Event Name*"}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <input className="event-input"
              type={'text'}
              placeholder={"Event Description*"}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="date-time-label">Start Date:</label>
            <input
              type="hidden"
              value={getTodaysDate}
            >
            </input>
          </div>
          <div>
            <input className="event-input"
              type={'date'}
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </div>
          <div>
          </div>
          <label className="date-time-label">Start Time:</label>
          <div>
            <input className="event-input"
              type={'time'}
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
            />
          </div>
          <div>
            <input className="event-input"
              type={'text'}
              value={repeats}
              placeholder={'How often does this event happen?'}
              onChange={e => setRepeats(e.target.value)}
            />
          </div>
          <div>
            <select className="create-select-field" value={eventType} onChange={e => setEventType(e.target.value)}>
              <option value="-- Event Type --">-- Event Type --</option>
              <option value="Party">Party</option>
              <option value="Kickback">Kickback</option>
              <option value="Live Show/Event">Live Show/Event</option>
              <option value="Rager">Rager</option>
              <option value="Block Party">Block Party</option>
              <option value="Local Community Event">Local Community Event</option>
              <option value="Charity Event">Charity Event</option>
              <option value="After Party">After Party</option>
              <option value="Grand Opening">Grand Opening</option>
              <option value="Custom Event">Custom Event</option>
            </select>
          </div>
          <div>
            <select className="create-select-field" value={entertainment} onChange={e => setEntertainment(e.target.value)}>
              <option value="-- Featured Entertainment --">-- Featured Entertainment --</option>
              <option value="No Performers">No Performers</option>
              <option value="Live-Band">Live-Band</option>
              <option value="DJ">DJ</option>
              <option value="Comedian">Comedian</option>
            </select>
          </div>
          <input
            type="hidden"
            placeholder="Longitude"
            value={lng}
            readOnly
          />
          <input
            type="hidden"
            placeholder="Latitude"
            value={lat}
            readOnly
          />

        </div>
        <div className="bottom-button">
          <button type="submit" className="share-button">Continue</button>
          <br />
        </div>
        <ul className="errors-list">
          {errors.map((error, idx) => (
            <li className="errors-list-items" key={idx} >{error}</li>
          ))}
        </ul>
      </form>
    </div>
  )


}


export default CreateEventForm;
