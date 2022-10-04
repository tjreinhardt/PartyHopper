import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createImage } from "../../store/image";

function UploadImageModal() {
  const history = useHistory();
  const { eventId } = useParams();
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // const hadnleClose = () => setShowModal(false);

  const user = useSelector(state => state?.session?.user);

  const fileExtensions = '([a-zA-Z0-9\s_\\.\-:])+(.png|.jpg|.gif|.jpeg|.pdf)$'

  useEffect(() => {
    const errors = [];
    if (!image?.name.match(fileExtensions)) errors.push('Please select a valid image type');
    // if (image?.size > 1e6) errors.push('Please upload an image smaller than 1MB');
    setValidationErrors(errors);
  }, [image?.name, image?.size]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setImageLoading(true);
    setHasSubmitted(true);

    console.log(eventId, "eventId")
    if (!validationErrors.length) {
      const payload = {
        user_id: user.id,
        eventId: Number(eventId),
        image_url: image
      }
      const uploadedImage = await dispatch(createImage(payload));
      console.log('uploadedimage', uploadedImage)
      if (uploadedImage) {
        reset();
        setHasSubmitted(false);
        setImageLoading(false);
        setValidationErrors([]);
        hideForm();
        history.push(`/event_user_photos/${eventId}/upload`)
      }
    }
  }
  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }

  // console.log('image', image, image?.name, image?.size)
  const reset = () => {
    setImage(null);
  }

  const hideForm = () => {
    setShowModal(false);
  }

  return (
    <div>
      <div className='add-photos-icon-container'>
        <button className='add-photo-btn' onClick={() => setShowModal(true)}>
          Add
        </button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className='add-photos-modal'>
            <form onSubmit={handleSubmit}>
              <div className='event-img-upload-errors-div'>
                {hasSubmitted && validationErrors.length > 0 && (
                  <ul>
                    {validationErrors.map(error => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className='attach-photos-container'>
                <h2 className='select-your-photos'>Add Photo</h2>
                <input
                  className='choose-file-btn'
                  type="file"
                  accept="image/*"
                  onChange={updateImage}
                />
              </div>
              <div className='cancel-submit-pic-div'>
                <button className='cancel-upload-image-btn' type='button' onClick={() => setShowModal(false)}>Cancel</button>
                <button className='upload-image-btn' type='submit'>Attach</button>
              </div>
              {!validationErrors.length && imageLoading && <img className='loading-pic' style={{ height: '50px', width: '50px' }} src={"https://media4.giphy.com/media/3o7TKtnuHOHHUjR38Y/giphy.gif?cid=790b7611af1a457ad0c32d64f1aefccfb38f5f6d2e80f83f&rid=giphy.gif"}></img>}
            </form>
          </div>
        </Modal>
      )}
    </div>
  )
};

export default UploadImageModal;
