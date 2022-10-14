import React, { useEffect } from "react";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadImages } from "../../store/image";
import '../../styles/EventDetail.css';

const AllImages = () => {
  const history = useHistory();
  const { eventId } = useParams();
  const dispatch = useDispatch();

  const images = useSelector(state => state?.images);

  const evImagesArr = images ? Object.values(images) : null;

  useEffect(() => {
    dispatch(loadImages());
  }, [dispatch])

  const evImages = evImagesArr?.filter(image => {
    return image.eventId === Number(eventId);
  })

  console.log('evimages', evImages)

  return (
    <>
      <div className="images-container">
        {evImages && evImages.map((image, idx) => (
          <div className="ev-img-container" key={idx}>
            <div className="ev-img" style={{ backgroundImage: `linear-gradient(180deg,#0000 31.42%,#000), url(${image.image_url})` }}></div>
          </div>
        ))}
      </div>
      <div className="see-all-photos-div">
      </div>
      <NavLink to={`/ev_photos/${eventId}`}>
        <button className="see-all-photos-btn">See {evImages.length} Photos</button>
      </NavLink>
    </>
  )
};

export default AllImages;
