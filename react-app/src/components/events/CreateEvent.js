import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createEventThunk } from "../../store/event";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/CreateEvent.css'

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



  const getTodaysDate = () => {
    let today = new Date();
    let todays_day = new Date().getDay() + 19;
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
  useEffect(() => {
    let errors = [];
    // if (startDate < getTodaysDate()) errors.push("Events must be scheduled at least 1 day in advance")
    if (!lng) errors.push("Double click a location on the map to add a location!")
    if (name.trim().length === 0) errors.push("Please provide a name your event")
    if (name.trim().length > 50) errors.push("Name is too long!")
    if (description.trim().length === 0) errors.push("Please describe your event")
    if (description.trim().length > 500) errors.push("Description is too long!")
    if (imageUrl.trim().length === 0 || (/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imageUrl) === false)) errors.push("Image URL address appears to be invalid. Must be '.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif' or '.svg' format, and must include: 'https://'")
    if (imageUrl.trim().length > 500) errors.push("Image URL address is too long!")
    if (!eventType || eventType === '-- Event Type --') errors.push("Please select a category for your event")
    if (!entertainment || entertainment === '-- Featured Entertainment --') errors.push("Please select entertainment type")
    if (!startDate) errors.push("What date is your event taking place?");
    if (!startTime) errors.push("What time does your event start?")
    setErrors(errors)
  }, [name, newStartTime, lng, description, imageUrl, eventType, entertainment, startDate, startTime, minutes])

  console.log(lat, "lat")
  console.log(lng, "lng")

  return (
    <div style={{ marginTop: '100px', width: '20vw' }}>
      <h2 style={{ display: 'flex', justifyContent: 'center' }}>Create Event</h2>
      {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'red', marginBottom: '8px', textDecoration: "underline", maxWidth: '300px', textAlign: 'center' }}><span>Map functionality is still in beta, therefore, all event locations will be temporarily assigned a default location, and may be edited following an upcoming patch release</span></div> */}
      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
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
          <div className='event-image-wrapper'>
            <input className="event_imageUrl"
              placeholder='Image URL Address* (https://www.example.jpg)'
              onChange={(e) => {
                setImageUrl(e.target.value)
                setErrors([])
              }}
              value={imageUrl}
              type="url"
            >
            </input>
          </div>
          <div>

            <select value={eventType} onChange={e => setEventType(e.target.value)}>
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
            <select value={entertainment} onChange={e => setEntertainment(e.target.value)}>
              <option value="-- Featured Entertainment --">-- Featured Entertainment --</option>
              <option value="No Performers">No Performers</option>
              <option value="Live-Band">Live-Band</option>
              <option value="DJ">DJ</option>
              <option value="Comedian">Comedian</option>
            </select>
          </div>
          <div>
            <label style={{ fontWeight: 'bold', fontSize: '16px' }}>Start Date:</label>
            <input
              type="hidden"
              value={getTodaysDate}
            >
            </input>
          </div>
          <div>
            <input
              type={'date'}
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </div>
          <div>
          </div>
          <label style={{ fontWeight: 'bold', fontSize: '16px' }}>Start Time:</label>
          <div>
            <input
              type={'time'}
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
            />
          </div>
          <input
            type="text"
            placeholder="Longitude"
            value={lng}
            readOnly
          // onChange={updateLng}
          // required
          />
          <input
            type="text"
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
        <ul style={{ lineHeight: '20px', margin: '0px', padding: '0px' }}>
          {errors.map((error, idx) => (
            <li style={{ color: 'red', width: 'auto', lineHeight: "22px", marginRight: '0px', fontSize: '14px' }} key={idx} >{error}</li>
          ))}
        </ul>
      </form>
    </div>
  )


}


export default CreateEventForm;
