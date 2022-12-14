import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateEventThunk } from "../../store/event";
import '../../styles/EditEvent.css'
import { NavLink } from "react-router-dom";


const EditEventForm = ({ event, hideModal, lat, lng }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState(event.name.trim())
  const [description, setDescription] = useState(event.description.trim())
  const [eventType, setEventType] = useState(event.eventType)
  const [entertainment, setEntertainment] = useState(event.entertainment)
  const [startDate, setStartDate] = useState(event.startDate)
  const [startTime, setStartTime] = useState(event.startTime)
  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = {
      id: event.id,
      name,
      description,
      eventType,
      entertainment,
      startDate,
      startTime,
      lat: event.lat,
      lng: event.lng
    };
    if (!errors.length) {
      dispatch(updateEventThunk(newEvent))
      history.push(`/events/${newEvent.id}`);
      hideModal()
    }
  }

  useEffect(() => {
    let errors = [];
    if (name.trim().length === 0) errors.push("Please provide a name your event")
    if (name.trim().length > 50) errors.push("Name is too long!")
    if (description.trim().length === 0) errors.push("Please describe your event")
    if (description.trim().length > 500) errors.push("Description is too long!")
    if (!eventType || eventType === '-- Event Type --') errors.push("Please select a category for your event")
    if (!entertainment || entertainment === '-- Featured Entertainment --') errors.push("Please select entertainment type")
    if (!startDate) errors.push("What date is your event taking place?");
    if (!startTime) errors.push("What time does your event start?")
    setErrors(errors)
  }, [name, lng, description, eventType, entertainment, startDate, startTime])

  return (
    <div>
      <form className="form-wrapper" onSubmit={handleSubmit}>
        <div >
          <div className="event-title-wrapper">
            <h2>Edit Event</h2>
          </div>
          <div>
            <input
              type={'text'}
              placeholder={"Event Name*"}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type={'text'}
              placeholder={"Event Description*"}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div>
            <select style={{ width: '280px' }} value={eventType} className="edit-event-select-field" onChange={e => setEventType(e.target.value)}>
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
            <select style={{ width: '280px' }} value={entertainment} className="edit-event-select-field" onChange={e => setEntertainment(e.target.value)}>
              <option value="-- Featured Entertainment --">-- Featured Entertainment --</option>
              <option value="No Performers">No Performers</option>
              <option value="Live-Band">Live-Band</option>
              <option value="DJ">DJ</option>
              <option value="Comedian">Comedian</option>
            </select>
          </div>
          <div className="start-date-time-label-wrapper">
            <label className="start-date-time-label">Start Date:</label>
          </div>
          <div>
            <input
              type={'date'}
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </div>
        </div>
        <div className="start-date-time-label-wrapper">
          <label className="start-date-time-label">Start Time:</label>
          <input
            type={'time'}
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
          />
        </div>
        <div>
          <input
            type="hidden"
            value={event.lng}
          />
          <input
            type="hidden"
            value={event.lat}
          />
        </div>
        <div className="bottom-button">
          <button className="share-edit-button" type="submit" style={{ width: '130px', marginRight: '20px', marginLeft: '8px' }}>Save</button>
          <button onClick={hideModal} style={{ width: '130px' }}>Cancel</button>
        </div>
        <div style={{ marginTop: '12px' }}>
          <NavLink to={`/event_user_photos/${event.id}/upload`}>
            <button className="share-edit-button" style={{ marginLeft: '12px', width: '280px' }}>Edit Photos</button>
          </NavLink>
        </div>

        <ul className="edit-errors-list">
          {errors.map((error, idx) => (
            <li className="edit-errors-list-item" key={idx} >**{error}**</li>
          ))}
        </ul>
      </form >

    </div >
  )
}


export default EditEventForm;
