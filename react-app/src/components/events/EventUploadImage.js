import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import AllImages from '../images/AllImages';
import UploadImageModal from '../UploadImageModal';
import { createImage, loadImages, deleteImage } from '../../store/image';
import { Modal } from '../../context/Modal';

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
    // if (eventTotalImages.length < 5) errors.push('Business owner must upload at least 5 photos.');
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
      <div className='image-upload-container'>
        <h1 className='image-upload-h1'>Photos</h1>
        <div className='upload-manage-div'>
          <h3 className='image-upload-h3'>Upload and manage photos</h3>
        </div>
        <div className='image-upload-div'>
          <div className='add-your-photos'>Add your photo below</div>
          <div className='uploadpg-view-add-div'>
            <div className='upload-pg-errors-div'>
              {hasSubmitted && validationErrors.length > 0 && (
                <ul>
                  {validationErrors.map(error => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              )}
            </div>
            <UploadImageModal />
            <div className='uploadpg-imgs-div'>
              {eventImages.map(image => (
                <div className='uploadpg-img-delete-div'>
                  <img className='upload-pg-img' src={image.image_url} style={{ height: 'auto', width: '50vmin', maxHeight: '400px' }} />
                  <button className='uploadpg-delete-pic-btn' type='button' onClick={() => onDeletePic(image.id)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* {image && (
                            <div>
                                <img
                                    className='image-preview'
                                    src={URL.createObjectURL(image)}
                                    alt='image-preview'
                                />
                            </div>
                        )} */}
          {/* <div className='choose-file-container'>
                            <input
                                className='choose-file-btn'
                                id='choose-file-btn'
                                type="file"
                                accept="image/*"
                                onChange={updateImage}
                            />
                        </div> */}
        </div>
        <div className='upload-image-save-div'>
          <button style={{ marginBottom: '200px' }} className='upload-image-save-btn' type='submit' onClick={onSave}>Save <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
        {/* </form> */}
      </div>
    </>
  )
};

export default EventUploadImage;
