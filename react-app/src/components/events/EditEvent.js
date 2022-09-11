import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateEventThunk } from "../../store/event";


const EditEventForm = ({ event, hideModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState(event.name.trim())
  const [description, setDescription] = useState(event.description.trim())
  const [imageUrl, setImageUrl] = useState(event.imageUrl.trim())
  const [eventType, setEventType] = useState(event.eventType)
  const [entertainment, setEntertainment] = useState(event.entertainment)
  const [startDate, setStartDate] = useState(event.startDate)
  const [startTime, setStartTime] = useState(event.startTime)

  // const [lat, setLat] = useState(event.lat)
  // const [lng, setLng] = useState(event.lng)
  const [errors, setErrors] = useState([])
  let today = new Date();
  let todays_day = today.getDay() - 3;
  if (todays_day < 10) todays_day = `0${todays_day}`
  let todays_month = today.getMonth() + 1;
  if (todays_month < 10) todays_month = `0${todays_month}`
  let todays_year = today.getFullYear();
  let todays_date = `${todays_year}-${todays_month}-${todays_day}`



  const getTodaysDate = () => {
    let today = new Date();
    let todays_day = new Date().getDay() + 4;
    // console.log('todays_day', todays_day)
    if (todays_day < 10) todays_day = `0${todays_day}`
    let todays_month = new Date().getMonth() + 1;
    if (todays_month < 10) todays_month = `0${todays_month}`
    let todays_year = today.getFullYear();
    let todays_date = `${todays_year}-${todays_month}-${todays_day}`
    return todays_date
  }

  function checkImageUrl(imageUrl) {
    if (!imageUrl || imageUrl.trimEnd().length === 0) return false
    if (imageUrl && imageUrl.includes(' ')) return false
    if (imageUrl && imageUrl.includes("File:")) return false

    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imageUrl);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = {
      id: event.id,
      name,
      description,
      imageUrl,
      eventType,
      entertainment,
      startDate,
      startTime
      // lat,
      // lng
    };
    if (!errors.length) {
      dispatch(updateEventThunk(newEvent))
      history.push(`/events/${newEvent.id}`);
      hideModal()
      // .then(
      //   async (res) => {
      //     if (res.errors) {
      //       setErrors(res.errors)
      //     }
      //     else {
      //       hideModal()
      //     }

      //   })
    }
    // errors.push(['Cannot pick a date that has already happened'])
  }

  let newStartTime = startTime.split(':').join('')
  let hours = new Date().getHours()
  if (new Date().getMinutes() < 10) {
    var minutes = `0${new Date().getMinutes()}`
  } else if (new Date().getMinutes() >= 10) {
    var minutes = `${new Date().getMinutes()}`
  }
  useEffect(() => {
    let errors = [];
    if (startDate < getTodaysDate()) errors.push("Unable to reschedule to a date earlier than today's date")
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
  }, [name, newStartTime, description, imageUrl, eventType, entertainment, startDate, startTime, minutes, getTodaysDate()])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Edit Event</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'red', marginBottom: '8px', textDecoration: "underline" }}><span>**All fields required**</span></div>
          <div>
            <input
              type={'text'}
              placeholder={"Event Name*"}
              value={name.trim()}
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
            <input
              type={'text'}
              placeholder={"Event Cover Photo*"}
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
            />
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
            </select>
          </div>
          <div>
            <select value={entertainment} onChange={e => setEntertainment(e.target.value)}>
              <option value="-- Featured Entertainment --">-- Featured Entertainment --</option>
              <option value="Live-Band">Live-Band</option>
              <option value="DJ">DJ</option>
              <option value="Comedian">Comedian</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label style={{ fontWeight: 'bold', fontSize: '16px' }}>Start Date:</label>
            <input
              type="hidden"
              value={todays_date}
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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label style={{ fontWeight: 'bold', fontSize: '16px' }}>Start Time:</label>
            <input
              type={'time'}
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
            />
          </div>
          <div>
          </div>
          {/* <div>
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
          </div> */}
        </div>
        <div style={{ marginTop: '10px' }} className="bottom-button">
          <button style={{ marginRight: '15px' }} type="submit">Share</button>
          <button onClick={hideModal}>Cancel</button>
        </div>
        <ul style={{ width: '285px' }}>
          {errors.map((error, idx) => (
            <li style={{ color: 'red' }} key={idx} >**{error}**</li>
          ))}
        </ul>
      </form>
    </div>
  )
}


export default EditEventForm;
