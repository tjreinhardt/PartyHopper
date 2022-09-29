import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createEventThunk } from "../../store/event";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/CreateEvent.css'
import { isFuture, isPast, isEqual } from "date-fns";

const CreateEventForm = ({ hideModal, lat, lng }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [eventType, setEventType] = useState("")
  const [entertainment, setEntertainment] = useState("")
  const [startDate, setStartDate] = useState("")
  const [startTime, setStartTime] = useState("")
  // const [lat, setLat] = useState('');
  // const [lng, setLng] = useState('');
  const [errors, setErrors] = useState([])

  const startDateConversion = () => {
    let parts = startDate.split('-')
    let year = parts[0]
    let month = parts[1] - 1
    let day = parts[2]
    day = Number(day) + 1
    console.log(year)
    console.log(month)
    console.log(day)
    const result = isPast(new Date(year, month, day))
    return result
  }

  const dateEquality = () => {
    let parts = startDate.split('-')
    let year = parts[0]
    let month = parts[1] - 1
    let day = parts[2]
    console.log(day, 'day')
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
              // hideModal()
              history.push(`/explore`);
            }
          })
    }
    // errors.push(['Cannot pick a date that has already happened'])
    // console.log(errors)
  }
  let newStartTime = startTime.split(':').join('')
  if (new Date().getMinutes() < 10) {
    var minutes = `0${new Date().getMinutes()}`
  } else if (new Date().getMinutes() >= 10) {
    minutes = `${new Date().getMinutes()}`
  }

  // console.log(!isEqual(startDate, new Date()))
  console.log(dateEquality(), 'eeeeeeeeeeeeeeeee')
  useEffect(() => {
    let errors = [];
    if (startDateConversion(startDate) === true && (!dateEquality())) errors.push("Date must be no earlier than today!")
    // if (startDate < getTodaysDate()) errors.push("Events must be scheduled at least 1 day in advance")
    if (!lng) errors.push("Create a pin for your event")
    if (name.trim().length === 0) errors.push("Name your event")
    if (name.trim().length > 50) errors.push("Name is too long!")
    if (description.trim().length === 0) errors.push("Describe your event")
    if (description.trim().length > 500) errors.push("Description is too long!")
    // if (imageUrl.trim().length === 0 || (/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imageUrl) === false)) errors.push("Add an image URL -- Format: '.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif' or '.svg' format, and must include: 'https://'")
    // if (imageUrl.trim().length > 500) errors.push("Image URL address is too long!")
    if (!eventType || eventType === '-- Event Type --') errors.push("Select a category")
    if (!entertainment || entertainment === '-- Featured Entertainment --') errors.push("Select Entertainment Options")
    if (!startDate) errors.push("Select a date");
    if (!startTime) errors.push("Select a time")
    setErrors(errors)
  }, [name, newStartTime, lng, description, imageUrl, eventType, entertainment, startDate, startTime, minutes])

  console.log(startDate, "startDate")

  return (
    <div className={'create-event-form-wrap2'}>
      <h2 style={{ display: 'flex', justifyContent: 'center' }}>Create Event</h2>
      {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'red', marginBottom: '8px', textDecoration: "underline", maxWidth: '300px', textAlign: 'center' }}><span>Map functionality is still in beta, therefore, all event locations will be temporarily assigned a default location, and may be edited following an upcoming patch release</span></div> */}
      <h3>Steps:</h3>
      <ol style={{ lineHeight: '20px', width: '280px', paddingLeft: "20px", paddingRight: '20px' }}>
        <li style={{ marginRight: '10px', wordBreak: 'break-word' }}>Use the map tool to find the location for your event</li>
        <li style={{ marginRight: '10px', minWidth: 'auto', wordBreak: 'break-word' }}>Double click to create a map marker for your event</li>
        <li style={{ marginRight: '10px', minWidth: 'auto', wordBreak: 'break-word' }}>Fill out the rest of the form fields</li>
        <li style={{ marginRight: '10px', minWidth: 'auto', wordBreak: 'break-word' }}>Start Partying!</li>
      </ol>
      <form onSubmit={handleSubmit}>
        <div className="form-inner-wrapper">
          <div>
            <input
              type={'text'}
              style={{ minWidth: 'auto' }}
              placeholder={"Event Name*"}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type={'text'}
              style={{ minWidth: 'auto' }}
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
              style={{ minWidth: 'auto' }}
              value={imageUrl}
              type="url"
            >
            </input>
          </div>
          <div>
            <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Start Date:</label>
            <input
              type="hidden"
              value={getTodaysDate}
            >
            </input>
          </div>
          <div>
            <input
              type={'date'}
              style={{ minWidth: 'auto' }}
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </div>
          <div>
          </div>
          <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Start Time:</label>
          <div>
            <input
              type={'time'}
              value={startTime}
              style={{ minWidth: 'auto' }}
              onChange={e => setStartTime(e.target.value)}
            />
          </div>
          <div>

            <select style={{ minWidth: 'auto', width: '280px' }} value={eventType} onChange={e => setEventType(e.target.value)}>
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
            <select style={{ minWidth: 'auto', width: '280px' }} value={entertainment} onChange={e => setEntertainment(e.target.value)}>
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
          // onChange={updateLng}
          // required
          />
          <input
            type="hidden"
            placeholder="Latitude"
            value={lat}
            readOnly
          // onChange={updateLat}
          // required
          />

        </div>
        <div className="bottom-button">
          <button type="submit" style={{
            // margin: '10px'
          }}>Share</button>
          <br />
          {/* <button onClick={hideModal} style={{
            marginLeft: '10px'
          }}>Cancel</button>
          <br /> */}
        </div>
        <ul style={{ lineHeight: '20px', padding: '0px', marginLeft: '0px' }}>
          {errors.map((error, idx) => (
            <li style={{ color: 'red', width: 'auto', lineHeight: "22px", marginRight: '0px', fontSize: '14px' }} key={idx} >{error}</li>
          ))}
        </ul>
      </form>
    </div>
  )


}


export default CreateEventForm;
