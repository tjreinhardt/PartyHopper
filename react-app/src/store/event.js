const GET_OWN_EVENTS = "event/GET_OWN_EVENTS"
const GET_OTHERS_EVENTS = "event/GET_OTHERS_EVENTS"
const GET_EVENT_DETAIL = "event/GET_EVENT_DETAIL"
const CREATE_EVENT = "event/CREATE_EVENT"
const UPDATE_EVENT = "event/UPDATE_EVENT"
const DELETE_EVENT = "event/DELETE_EVENT"

const LIKE_EVENT = "event/LIKE_EVENT"

const GET_ALL_EVENTS = 'event/GET_ALL_EVENTS'


const getOwnEvents = (events) => {
  return {
    type: GET_OWN_EVENTS,
    events
  }
}

const getOthersEvents = (events) => {
  return {
    type: GET_OTHERS_EVENTS,
    events
  }
}

const getEventDetail = (event) => {
  return {
    type: GET_EVENT_DETAIL,
    event
  }
}

const createEvent = (newEvent) => {
  return {
    type: CREATE_EVENT,
    newEvent
  }
}

const updateEvent = (event) => {
  return {
    type: UPDATE_EVENT,
    event
  }
}

const deleteEvent = (eventId) => {
  return {
    type: DELETE_EVENT,
    eventId
  }
}

const likeEvent = (eventId, totalLikes, likeStatus) => {
  return {
    type: LIKE_EVENT,
    eventId,
    totalLikes,
    likeStatus
  }
}

const getAllEvents = (events) => {
  return {
    type: GET_ALL_EVENTS,
    events
  }
}

export const getOwnEventsThunk = () => async dispatch => {
  const response = await fetch('/api/events/user/session');
  if (response.ok) {
    const events = await response.json();
    dispatch(getOwnEvents(events))
  }

  return response
}

export const getOthersEventsThunk = (id) => async dispatch => {
  const response = await fetch(`/api/events/user/${id}`);
  if (response.ok) {
    const events = await response.json();
    dispatch(getOthersEvents(events))
  }

  return response
}

export const getAllEventsThunk = () => async dispatch => {
  const response = await fetch('/api/events/all');
  if (response.ok) {
    const events = await response.json()
    dispatch(getAllEvents(events))
  }
}

export const getEventDetailThunk = (eventId) => async dispatch => {
  const response = await fetch(`/api/events/${eventId}`);
  if (response.ok) {
    const event = await response.json();
    dispatch(getEventDetail(event));
  }

  return response
}

export const createEventThunk = (newEvent) => async dispatch => {
  const response = await fetch('/api/events/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newEvent)
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createEvent(data))
    return data
  }
  const res = await response.json()
  return res
}

export const updateEventThunk = (event) => async dispatch => {

  const response = await fetch(`/api/events/${event.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  });
  const res = await response.json()
  if (response.ok) {
    // const editedEvent = await response.json();
    dispatch(updateEvent(res));
    // return res
  }
  return res
}

export const deleteEventThunk = (eventId) => async dispatch => {
  const response = await fetch(`/api/events/${eventId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(deleteEvent(eventId))

  }
  return response
}

export const likeEventThunk = (eventId) => async dispatch => {
  const response = await fetch(`/api/events/${eventId}/likes`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
  if (response.ok) {
    const data = await response.json();

    dispatch(likeEvent(eventId, data.totalLikes, data.likeStatus))
  }
  return response
}



const initialState = {};

export default function reducer(state = initialState, action) {

  let newState;
  switch (action.type) {
    case GET_OWN_EVENTS: {
      newState = action.events.Events;
      return newState;
    }
    case GET_OTHERS_EVENTS: {
      newState = action.events.Events;
      return newState;
    }
    case GET_EVENT_DETAIL: {
      newState = { ...state }
      newState[action.event.id] = action.event
      return newState
    }
    case CREATE_EVENT: {
      newState = { ...state }
      newState[action.newEvent.id] = action.newEvent
      return newState
    }
    case UPDATE_EVENT: {
      newState = { ...state }
      newState[action.event.id] = action.event
      return newState
    }
    case DELETE_EVENT: {
      newState = { ...state }
      delete newState[action.eventId]
      return newState
    }
    case LIKE_EVENT: {
      newState = { ...state }
      newState[action.eventId] = { ...newState[action.eventId], totalLikes: action.totalLikes, likeStatus: action.likeStatus }
      return newState
    }
    case GET_ALL_EVENTS:
      newState = { ...state }

      Object.values(action.events.Events).forEach(event => {
        newState[event.id] = event
      })
      return newState

    default:
      return state;
  }
}
