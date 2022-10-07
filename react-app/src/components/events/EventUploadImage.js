import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import AllImages from '../images/AllImages';
import UploadImageModal from '../UploadImageModal';
import { createImage, loadImages, deleteImage } from '../../store/image';
import { Modal } from '../../context/Modal';
import '../../styles/EventUploadImage.css'
import NavBar from '../NavBar';

const EventUploadImage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { eventId } = useParams();

  const user = useSelector(state => state?.session.user);
  const images = useSelector(state => state?.images);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const eventImages = Object.values(images)?.filter(image => {
    return (image.eventId === Number(eventId) && image.user_id === user.id);
  });

  const eventTotalImages = Object.values(images)?.filter(image => {
    return (image.eventId === Number(eventId));
  })

  // console.log('event', eventTotalImages)


  useEffect(() => {
    dispatch(loadImages());
  }, [dispatch, eventId]);

  useEffect(() => {
    const errors = [];
    if (eventTotalImages.length < 5) errors.push('Event owner must upload at least 5 photos.');
    setValidationErrors(errors);
  }, [dispatch, eventImages?.length])

  const onSave = (e) => {
    e.preventDefault();
    setHasSubmitted(true)
    if (!validationErrors.length) {
      setHasSubmitted(false);
      setValidationErrors([]);
      history.push(`/events/${eventId}`);
    }
  }

  const onDeletePic = async (id) => {
    await dispatch(deleteImage(id));
  }

  return (
    <>
      <NavBar />
      <div className='image-upload-container'>
        <h1 className='image-upload-title'>Add Photos</h1>
        <div className='upload-message-div' >
          <h3 className='image-upload-message-content'>Upload and manage photos (5 minimum)</h3>
        </div>
        <div className='image-upload-div'>
          <div className='content-container'>

            <div className='errors-div' style={{ display: 'flex', justifyContent: 'center' }}>
              {hasSubmitted && validationErrors.length > 0 && (
                <ul>
                  {validationErrors.map(error => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              )}
            </div>
            <UploadImageModal />
            <div className='image-uploads-div'>
              {eventImages.map(image => (
                <div className='delete-div'>
                  <img className='image-upload' src={image.image_url} style={{ maxHeight: '400px', border: '1px solid grey', borderRadius: '4px' }} />
                  <button className='delete-image-button' type='button' onClick={() => onDeletePic(image.id)} style={{ borderTopLeftRadius: '0px', borderTopRightRadius: '0px' }}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='upload-image-save-div'>
          <button style={{ marginBottom: '200px', width: '270px' }} className='upload-image-save-button' type='submit' onClick={onSave}>Save / Continue<i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </>
  )
};

export default EventUploadImage;
