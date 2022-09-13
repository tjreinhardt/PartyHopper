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
import Map from './components/Map/Map';

function App() {
  const [loaded, setLoaded] = useState(false);
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
          {/* <ProtectedRoute path='/map'>
            <Map />
          </ProtectedRoute> */}
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
          <ProtectedRoute path='/users/:userId' exact={true} >
            <User />
          </ProtectedRoute>
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
