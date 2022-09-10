import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createEventThunk } from "../../store/event";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/CreateEvent.css'
// import NavBar from "../NavBar";

const CreateEventForm = ({ hideModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [eventType, setEventType] = useState("")
  const [entertainment, setEntertainment] = useState("")
  const [startDate, setStartDate] = useState("")
  const [startTime, setStartTime] = useState("")
  // const [lat, setLat] = useState(1)
  // const [lng, setLng] = useState(1)
  const [errors, setErrors] = useState([])
  // const [currentTime, setCurrentTime] = useState(null)

  // const [today, setToday] = useState(today_)
  const [todayDate, setTodayDate] = useState(null)
  // const setCurrentDate = () => {
  //   setTodayDate(today)
  // }



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

  const getCurrentTime = () => {
    let today = new Date();
    if (new Date().getMinutes() < 10) {
      var minutes = `0${new Date().getMinutes()}`
    } else minutes = new Date().getMinutes()
    var currentTime = (new Date().getHours() + ':' + minutes).split(":").join("")
    // setCurrentTime(currentTime)
    // console.log(currentTime, "currenttime")
    return currentTime
  }

  const timeConversion = () => {
    let parts = startTime.split(":")
    if (parts[0] > 12) {
      return `${(parts[0]) - 12}:${parts[1]} PM`
    } else return `${startTime} AM`
  }

  // console.log(getTodaysDate(), "getTodaysDate()")

  function checkImageUrl(imageUrl) {
    if (!imageUrl || imageUrl.trimEnd().length === 0) return false
    if (imageUrl && imageUrl.includes(' ')) return false
    if (imageUrl && imageUrl.includes("File:")) return false

    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imageUrl);
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
      // lat,
      // lng
    };
    if (!errors.length) {

      dispatch(createEventThunk(newEvent))
        .then(
          async (res) => {
            if (res.errors) {
              setErrors(res.errors)
              // e.preventDefault()
            }
            else {
              hideModal()
              history.push(`/events/${res.id}`);
            }
          })
    }
    errors.push(['Cannot pick a date that has already happened'])
  }
  let newStartTime = startTime.split(':').join('')
  let hours = new Date().getHours()
  if (new Date().getMinutes() < 10) {
    var minutes = `0${new Date().getMinutes()}`
  } else if (new Date().getMinutes() >= 10) {
    var minutes = `${new Date().getMinutes()}`
  }
  // let newCurrentTime =
  // var minutes = `0${new Date().getMinutes()}`
  useEffect(() => {
    let errors = [];
    // console.log(startDate)
    // console.log(todays_date)
    // console.log(newStartTime, 'newStartTime')
    // console.log(getCurrentTime(), 'currentTime()')
    // if (startDate < getTodaysDate() && parseInt(newStartTime) < ((new Date().getHours() + ':' + minutes).split(":").join(""))) errors.push("Time is set before current time")
    // if (parseInt(newStartTime) < ((new Date().getHours() + ':' + minutes).split(":").join("")) && (startDate < getTodaysDate())) errors.push("Time must be set after the current date's time")
    // if (timeConversion(startTime) < timeConversion(getCurrentTime)) errors.push("Time is in the past")
    if (startDate < getTodaysDate()) errors.push("Oops! Event date must be after today's date")
    if (name.trim().length === 0) errors.push("Please name your event")
    if (name.trim().length > 50) errors.push("Name is too long!")
    if (description.trim().length === 0) errors.push("Please describe your event")
    if (description.trim().length > 500) errors.push("Description is too long!")
    // if (imageUrl.trim().length === 0) errors.push("Please upload an image for your event")
    if (imageUrl.trim().length === 0 || (/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imageUrl) === false)) errors.push("ImageUrl is not valid")
    if (imageUrl.trim().length > 500) errors.push("Image URL address is too long!")
    if (!eventType || eventType === 'None') errors.push("Please select a category for your event")
    if (!entertainment || entertainment === 'None') errors.push("Please select entertainment type")
    if (!startDate) errors.push("What date is your event taking place?");
    // if (Number(startDate.split('-').join('')) + 1 < Number(todays_date.split('-').join(''))) errors.push("Start Date must be on/later than today's date")
    if (!startTime) errors.push("What time does your event start?")
    // if (!lat) errors.push("Please enter a latitude")
    // if (!lng) errors.push("Please enter a longitude")
    // if (startDate < todays_date) errors.push("Fix your date fool")
    setErrors(errors)
  }, [name, newStartTime, description, imageUrl, eventType, entertainment, startDate, startTime, minutes, getTodaysDate()])


  return (
    <div style={{ marginTop: '20px' }}>
      {/* <NavBar /> */}
      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '5%',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '5rem'
        }}>

          <div style={{ color: 'red', marginBottom: '14px', wordBreak: 'break-word', textAlign: 'center', width: '300px' }}>** An event can be scheduled at any time, <span style={{
            textDecoration: 'underline',
            fontWeight: '550',
            color: 'red'
          }}>on</span>/<span style={{
            textDecoration: 'underline',
            fontWeight: '550'
          }}>after</span> today's date **</div>
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
          {/* <div>
            <input
              type={'text'}
              placeholder={"Event Image URL"}
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
            />
          </div> */}
          <div className='event-image-wrapper'>
            <input className="event_imageUrl"
              placeholder='Image URL Address (https://www.example.jpg)'
              onChange={(e) => {
                setImageUrl(e.target.value)
                setIsValid(checkImageUrl(e.target.value))
                // console.log("*******check image imageUrl",checkImageUrl(e.target.value) )
                setErrors([])
              }}
              value={imageUrl}
              type="url"
            >
            </input>
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
          <button type="submit" style={{
            margin: '10px'
          }}>Share</button>
          <br />
          {/* ) */}
          {/* } */}
          <button onClick={hideModal} style={{
            margin: '10px'
          }}>Cancel</button>
          <br />
        </div>
        <ul style={{ paddingBottom: '5rem', lineHeight: '20px' }}>
          {errors.map((error, idx) => (
            <li key={idx} >{error}</li>
          ))}
        </ul>
      </form>
    </div>
  )


}


export default CreateEventForm;
