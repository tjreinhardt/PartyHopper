import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import HomePage from './components/homePage';
import EventDetail from './components/events/EventDetail';
import CreateEventForm from './components/events/CreateEvent';
import Footer from './components/Footer';
import CreateReviewForm from './components/reviews/CreateReview';
import MapGL from './components/Map/Map';
import MapGL2 from './components/Map/MapV2';
import EventPhotos from './components/images/EventPhotos';
import { useSelector } from 'react-redux';
import EventUploadImage from './components/events/EventUploadImage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const events = useSelector(state => state?.event)
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }


  return loaded && (
    <>
      <BrowserRouter>
        <Switch>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path='/map'>
            <MapGL />
          </ProtectedRoute>
          <ProtectedRoute path='/explore'>
            <MapGL2 />
          </ProtectedRoute>
          <ProtectedRoute path='/users' exact={true} >
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path='/' exact={true} >
            <HomePage />
          </ProtectedRoute>
          <ProtectedRoute path='/events/new' exact={true} >
            <CreateEventForm />
          </ProtectedRoute>
          <ProtectedRoute path='/events/:eventId' exact={true} >
            <EventDetail />
          </ProtectedRoute>
          <ProtectedRoute path='/event_user_photos/:eventId/upload' exact={true}>
            <EventUploadImage />
          </ProtectedRoute>
          <ProtectedRoute path='/users/:userId' exact={true} >
            <User />
          </ProtectedRoute>
          <Route path='/ev_photos/:eventId' exact={true}>
            <EventPhotos events={events} />
          </Route>
          <ProtectedRoute path='/events/:eventId/new_review' exact={true}>
            <CreateReviewForm />
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
