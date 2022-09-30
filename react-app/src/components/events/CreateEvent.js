import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createEventThunk } from "../../store/event";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/CreateEvent.css'
import { startDateConversion, dateEquality, getTodaysDate } from "../HelperFunctions/CreateEventHelp";


const CreateEventForm = ({ lat, lng }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [eventType, setEventType] = useState("")
  const [entertainment, setEntertainment] = useState("")
  const [startDate, setStartDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [errors, setErrors] = useState([])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = {
      name,
      description,
      imageUrl,
      eventType,
      entertainment,
      startDate,
      startTime,
      lat,
      lng
    };
    if (!errors.length) {

      dispatch(createEventThunk(newEvent))
        .then(
          async (res) => {
            if (res.errors) {
              setErrors(res.errors)
            }
            else {
              history.push(`/explore`);
            }
          })
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
  }, [name, lng, description, imageUrl, eventType, entertainment, startDate, startTime])


  return (
    <div className={'create-event-form-wrap2'}>
      <h2
        style={{
          display: 'flex'
        }}>Create Event</h2>
      <h4>Steps:</h4>
      <ol
        style={{
          lineHeight: '20px',
          width: 'auto',
          paddingLeft: "20px",
          paddingRight: '20px'
        }}>
        <li
          style={{
            marginRight: '10px',
            minWidth: 'auto',
            wordBreak: 'break-word'
          }}>Use the map tool to find the location for your event</li>
        <li
          style={{
            marginRight: '10px',
            minWidth: 'auto',
            wordBreak: 'break-word'
          }}>Double click to create a map marker for your event</li>
        <li
          style={{
            marginRight: '10px',
            minWidth: 'auto',
            wordBreak: 'break-word'
          }}>Fill out the rest of the form fields</li>
        <li
          style={{
            marginRight: '10px',
            minWidth: 'auto',
            wordBreak: 'break-word'
          }}>Start Partying!</li>
      </ol>
      <form onSubmit={handleSubmit}>
        <div className="form-inner-wrapper">
          <div>
            <input
              type={'text'}
              style={{
                minWidth: 'auto'
              }}
              placeholder={"Event Name*"}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type={'text'}
              style={{
                minWidth: 'auto'
              }}
              placeholder={"Event Description*"}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div className='event-image-wrapper'>
            <input className="event_imageUrl"
              placeholder='Image URL Address* (https://www.example.jpg)'
              onChange={(e) => {
                setImageUrl(e.target.value)
                setErrors([])
              }}
              style={{
                minWidth: 'auto'
              }}
              value={imageUrl}
              type="url"
            >
            </input>
          </div>
          <div>
            <label
              style={{
                fontWeight: 'bold',
                fontSize: '14px'
              }}>Start Date:</label>
            <input
              type="hidden"
              value={getTodaysDate}
            >
            </input>
          </div>
          <div>
            <input
              type={'date'}
              style={{
                minWidth: 'auto'
              }}
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </div>
          <div>
          </div>
          <label
            style={{
              fontWeight: 'bold',
              fontSize: '14px'
            }}>Start Time:</label>
          <div>
            <input
              type={'time'}
              value={startTime}
              style={{
                minWidth: 'auto'
              }}
              onChange={e => setStartTime(e.target.value)}
            />
          </div>
          <div>

            <select
              style={{
                minWidth: 'auto',
                width: '280px'
              }} value={eventType} onChange={e => setEventType(e.target.value)}>
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
            <select
              style={{
                minWidth: 'auto',
                width: '280px'
              }} value={entertainment} onChange={e => setEntertainment(e.target.value)}>
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
          <button type="submit" style={{
            width: '280px',
          }}>Share</button>
          <br />
        </div>
        <ul
          style={{
            lineHeight: '20px',
            padding: '0px',
            marginLeft: '40px'
          }}>
          {errors.map((error, idx) => (
            <li
              style={{
                color: 'red',
                width: 'auto',
                lineHeight: "18px",
                marginRight: '0px',
                fontSize: '14px'
              }} key={idx} >{error}</li>
          ))}
        </ul>
      </form>
    </div>
  )


}


export default CreateEventForm;
