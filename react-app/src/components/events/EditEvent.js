import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateEventThunk } from "../../store/event";


const EditEventForm = ({ event, hideModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState(event.name)
  const [description, setDescription] = useState(event.description)
  const [imageUrl, setImageUrl] = useState(event.imageUrl)
  const [eventType, setEventType] = useState(event.eventType)
  const [entertainment, setEntertainment] = useState(event.entertainment)
  const [startDate, setStartDate] = useState(event.startDate)
  const [startTime, setStartTime] = useState(event.startTime)
  const [lat, setLat] = useState(event.lat)
  const [lng, setLng] = useState(event.lng)
  const [errors, setErrors] = useState([])
  let today = new Date();
  let todays_day = today.getDay() - 3;
  if (todays_day < 10) todays_day = `0${todays_day}`
  let todays_month = today.getMonth() + 1;
  if (todays_month < 10) todays_month = `0${todays_month}`
  let todays_year = today.getFullYear();
  let todays_date = `${todays_year}-${todays_month}-${todays_day}`


  const handleSubmit = async (e) => {
    e.preventDefault();
    // setErrors([]);
    const newEvent = {
      id: event.id,
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
    if (startDate + 1 > todays_date) {
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
    errors.push(['Cannot pick a date that has already happened'])
  }
  useEffect(() => {
    let errors = [];
    if (!name) errors.push("Please name your event")
    if (name.length > 50) errors.push("Name length exceeds max limit")
    if (!description) errors.push("Please enter a description for your event")
    if (description.length > 500) errors.push("Description length exceeds max limit")
    if (!imageUrl) errors.push("Please upload an image for your event")
    if (imageUrl.length > 500) errors.push("Image URL length exceeds max limit")
    if (!eventType || eventType === 'None') errors.push("Please enter a category for your event")
    if (!entertainment || entertainment === 'None') errors.push("Please select entertainment type")
    if (!startDate) errors.push("Please add a date for your event");
    if (Number(startDate.split('-').join('')) + 1 < Number(todays_date.split('-').join(''))) errors.push("Start Date must be on/later than today's date")
    if (!startTime) errors.push("Please enter a start-time for your event")
    // if (!lat) errors.push("Please enter a latitude")
    // if (!lng) errors.push("Please enter a longitude")
    // if (startDate < todays_date) errors.push("Fix your date fool")
    setErrors(errors)
  }, [name, description, imageUrl, eventType, entertainment, startDate, startTime, todays_date])

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
          <div>
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
        <div className="bottom-button">
          {/* {!errors && ( */}
          <button type="submit">Share</button>
          {/* ) */}
          {/* } */}
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


export default EditEventForm;
