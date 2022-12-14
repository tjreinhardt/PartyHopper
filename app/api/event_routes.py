from flask import Blueprint, jsonify, Response,request
# from flask_api import status
from flask_login import login_required, current_user
from app.models import Event, db, Review
from app.forms.event_form import CreateEventForm
from app.forms.create_review import ReviewForm
from datetime import datetime

import json


event_routes = Blueprint('events', __name__)

@event_routes.route('/all')
def get_all_events():
  events = Event.query.all()
  res = {}

  for event in events:
    rsvp_status=list(filter(lambda user: user.id==current_user.id, event.event_rsvp_users))
    event_dict = event.to_dict()
    event_dict['rsvpStatus'] = 1 if len(rsvp_status) > 0 else 0
    res[event.id] = event_dict

  return {"Events": res}

#get all events for the session user
@event_routes.route('/user/session')
@login_required
def get_all_events_from_user():
    events = Event.query.filter(Event.userId == current_user.id).all()
    res = {}

    for event in events:
        rsvp_status=list(filter(lambda user: user.id==current_user.id, event.event_rsvp_users))
        event_dict = event.to_dict()
        event_dict["rsvpStatus"] = 1 if len(rsvp_status) > 0 else 0
        res[event.id] = event_dict

    return {"Events": res}


#get all events from other user
@event_routes.route('/user/<int:id>')
@login_required
def get_others_events(id):
    events = Event.query.filter(Event.userId == id).all()
    res = {}
    for event in events:
        rsvp_status=list(filter(lambda user: user.id==current_user.id, event.event_rsvp_users))
        event_dict = event.to_dict()
        event_dict["rsvpStatus"] = 1 if len(rsvp_status) > 0 else 0
        res[event.id] = event_dict

    return {"Events": res}


#get the detail from a selected event
@event_routes.route('/<int:eventId>')
@login_required
def get_event_detail(eventId):
    event = Event.query.get(eventId)
    if not event:
        return {'errors': ['event can not be found']},404

    rsvp_status=list(filter(lambda user: user.id==current_user.id, event.event_rsvp_users))
    event_dict = event.to_dict()
    event_dict["rsvpStatus"] = 1 if len(rsvp_status) > 0 else 0
    return event_dict






#create an event
@event_routes.route('/new', methods=['POST'])
# @login_required
def create_event():
    form = CreateEventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        event = Event(
        name=form.data['name'],
        description=form.data['description'],
        # imageUrl=form.data['imageUrl'],
        eventType=form.data['eventType'],
        entertainment=form.data['entertainment'],
        startDate=form.data['startDate'],
        startTime=form.data['startTime'],
        repeats=form.data['repeats'],
        lat=form.data['lat'],
        lng=form.data['lng']
        )


        event.userId = current_user.id
        db.session.add(event)
        db.session.commit()

        res=event.to_dict()
        res["rsvpStatus"] = 0
        return res
    return {'errors': ['Please fill out all fields']}, 400









#update an event
@event_routes.route('/<int:eventId>',methods=['PUT'])
# @login_required
def update_event(eventId):
    event = Event.query.get(eventId)
    if event.userId != current_user.id:
        return {"errors": ['Unauthorized']}, 401

    form = CreateEventForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    event.name=(form.data['name'])
    event.description=(form.data['description'])
    # event.imageUrl=(form.data['imageUrl'])
    event.eventType=(form.data['eventType'])
    event.entertainment=(form.data['entertainment'])
    event.startDate=(form.data['startDate'])
    event.startTime=(form.data['startTime'])
    event.repeats=(form.data['repeats'])
    event.lat=(form.data['lat'])
    event.lng=(form.data['lng'])
    db.session.commit()
    rsvp_status=list(filter(lambda user: user.id==current_user.id, event.event_rsvp_users))
    res = event.to_dict()
    res["rsvpStatus"] = 1 if len(rsvp_status) > 0 else 0

    return res

#delete an event
@event_routes.route('/<int:eventId>',methods=['DELETE'])
# @login_required
def delete_event(eventId):
    event = Event.query.get(eventId)
    if not event:
        return {'errors': ['event cannot be found']}, 400

    if event.userId != current_user.id:
        return {"errors": ['Unauthorized']}, 401

    db.session.delete(event)
    db.session.commit()
    return {"message":"Successfully deleted"}


#get all reviews for a specified event
@event_routes.route('/<int:eventId>/reviews')
@login_required
def get_all_reviews(eventId):
    event = Event.query.get(eventId)
    if not event:
        return {'errors': ['event can not be found']}, 404
    reviews = Review.query.filter(Review.eventId == eventId).all()
    res = {}
    for review in reviews:
        like_status = list(filter(lambda user: user.id==current_user.id, review.review_like_users))
        review_dict = review.to_dict()
        review_dict["likeStatus"] = 1 if len(like_status) > 0 else 0
        res[review.id] = review_dict
    return {"Reviews": res}


#Create a review
@event_routes.route('/<int:eventId>/reviews/new', methods=["POST"])
# @login_required
def create_reviews(eventId):
    event = Event.query.get(eventId)
    if not event:
        return {'errors': ['event can not be found']}, 404

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            rating=form.data['rating'],
            comment=form.data['comment']
        )
        review.userId = current_user.id
        review.eventId = eventId
        db.session.add(review)
        db.session.commit()

        res = review.to_dict()
        res["rsvpStatus"] = 0
        return res
    return  {'errors': ['All fields are required']}, 400


#Update a review
@event_routes.route('/<int:eventId>/reviews/<int:reviewId>/edit', methods=["PATCH"])
# @login_required
def update_reviews(eventId, reviewId):
    event = Event.query.get(eventId)
    if not event:
        return {'errors': ['event can not be found']}, 404

    review = Review.query.get(reviewId)
    if not review:
        return {'errors': ['review can not be found']}, 404

    if review.userId != current_user.id:
        return {"errors": ['Unauthorized']}, 401

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review.rating=(form.data['rating'])
        review.comment=(form.data['comment'])
        review.userId=current_user.id
        review.eventId=eventId
        db.session.commit()
        res = review.to_dict()
        return res
    # return  {'errors': ['content is required']}, 400



#delete a review
@event_routes.route('/<int:eventId>/reviews/<int:reviewId>',methods=['DELETE'])
@login_required
def delete_review(eventId, reviewId):
    event = Event.query.get(eventId)
    if not event:
        return {'errors': ['event cannot be found']}, 400

    review = Review.query.get(reviewId)
    if not review:
        return {'errors': ['review cannot be found']}, 400

    if review.userId != current_user.id:
        return {"errors": ['Unauthorized']}, 401

    db.session.delete(review)
    db.session.commit()
    return {"message":"Successfully deleted"}


#Get all rsvps of specified event
@event_routes.route('/<int:eventId>/rsvps')
@login_required
def get_event_rsvps(eventId):
    event = Event.query.get(eventId)
    if not event:
        return {'errors': ['event cannot be found']}, 400
    rsvp_users = list(event.event_rsvp_users)
    res = {}
    for user in rsvp_users:
        res[user.id] = {
            "username": user.username
        }

    return {"rsvp_users": res}

#update the rsvp status for a specified event
@event_routes.route('/<int:eventId>/rsvps', methods=["PUT"])
@login_required
def update_event_rsvps(eventId):

    event = Event.query.get(eventId)
    if not event:
        return {'errors': ['event cannot be found']}, 400
    rsvp_users = list(event.event_rsvp_users)
    current_user_rsvp = list(filter(lambda user: user.id == current_user.id, rsvp_users))
    if len(current_user_rsvp) == 0:
        event.event_rsvp_users.append(current_user)
        db.session.commit()
    else:
        event.event_rsvp_users.remove(current_user)
        db.session.commit()


    updated_event = Event.query.get(eventId)
    updated_rsvp_users = list(updated_event.event_rsvp_users)
    updated_current_user_rsvp = list(filter(lambda user: user.id == current_user.id, updated_rsvp_users))
    current_user_rsvp_status = 1 if len(updated_current_user_rsvp) else 0
    return {"eventId": eventId, "rsvpStatus": current_user_rsvp_status, "totalRsvps": len(updated_event.event_rsvp_users)}
