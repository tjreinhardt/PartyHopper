import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createEventThunk } from "../../store/event";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import "react-datepicker/dist/react-datepicker.css";


const CreateEventForm = ({ hideModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [eventType, setEventType] = useState("")
  const [entertainment, setEntertainment] = useState("")
  const [startDate, setStartDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [lat, setLat] = useState(1)
  const [lng, setLng] = useState(1)
  const [errors, setErrors] = useState([])
  let today = new Date();
  let todays_day = today.getDay() - 3;
  if (todays_day < 10) todays_day = `0${todays_day}`
  let todays_month = today.getMonth() + 1;
  if (todays_month < 10) todays_month = `0${todays_month}`
  let todays_year = today.getFullYear();
  let todays_date = `${todays_year}-${todays_month}-${todays_day}`
  let start_comparison = startDate.split('-').join('')
  let today_comparison = todays_date.split('-').join('')


  console.log(start_comparison, 'start_comparison--------------------------')
  console.log(today_comparison, 'today_comparison--------------------------')


  const handleSubmit = async (e) => {
    e.preventDefault();
    // setErrors([]);
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
    const dispatchEvent = await dispatch(createEventThunk(newEvent));
    if (dispatchEvent) {
      hideModal()
    }
    // dispatch(createEventThunk(newEvent))
    //   .then(
    //     async (res) => {
    //       if (res.errors) {
    //         setErrors(res.errors)
    //         // e.preventDefault()
    //       }
    //       else {
    //         hideModal()
    //         history.push(`/events/${res.id}`);
    //       }
    //     })
  }


  console.log(startDate, 'startDate --------------------------------')
  console.log(today_comparison - start_comparison, 'todays_comparison - start_comparison --------------------------------------')


  useEffect(() => {
    let errors = [];
    if (today_comparison - start_comparison > 0) errors.push("Date invalid, cannot be set in the past");
    // if (startDate < todays_date) errors.push("Fix your date fool")
    setErrors(errors)
  }, [start_comparison, today_comparison, startDate, todays_date])


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
