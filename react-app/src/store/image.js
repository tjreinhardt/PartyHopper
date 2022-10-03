const LOAD = '/imagesLOAD';
const CREATE = '/images/CREATE';
const REMOVE = '/images/REMOVE';

const load = images => ({
  type: LOAD,
  images
})

const create = image => ({
  type: CREATE,
  image
})


const remove = imageId => ({
  type: REMOVE,
  imageId
})

export const loadImages = () => async (dispatch) => {
  const res = await fetch('/api/images/');

  if (res.ok) {
    const images = await res.json();
    dispatch(load(images));
  };
};

export const createImage = (payload) => async (dispatch) => {
  console.log('inside create', payload)
  const { user_id, eventId, image_url } = payload;
  const formData = new FormData();
  formData.append('user_id', user_id);
  formData.append('eventId', eventId);
  formData.append('image_url', image_url);

  const res = await fetch('/api/images', {
    method: 'POST',
    body: formData
  });

  if (res.ok) {
    const image = await res.json();
    dispatch(create(image));
    return image;
  };
};


export const deleteImage = imageId => async (dispatch) => {
  const res = await fetch(`/api/images/${imageId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(remove(imageId));
  };
};

let newState;

export default function imagesReducer(state = {}, action) {
  switch (action.type) {
    case LOAD:
      newState = {};
      const imagesList = action.images['images']
      imagesList.forEach(image => {
        newState[image.id] = image
      });
      return newState;

    case CREATE:
      newState = { ...state };
      newState[action.image.id] = action.image;
      return newState;

    // case EDIT:
    //     newState = { ...state };
    //     newState[action.image.id] = action.image;
    //     return newState;

    case REMOVE:
      newState = { ...state };
      delete newState[action.imageId];
      return newState;

    default:
      return state;
  }
}
