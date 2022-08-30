from flask import Blueprint, jsonify, Response,request
# from flask_api import status
from flask_login import login_required, current_user
from app.models import Event,db
from app.forms.event_form import CreateEventForm
# from app.forms.review_form import ReviewForm
import json


event_routes = Blueprint('events', __name__)

@event_routes.route('/all')
def get_all_events():
  events = Event.query.all()
  res = {}

  for event in events:
    # rsvp_status=list(filter(lambda user: user.id==current_user.id, user))
    event_dict = event.to_dict()
    # event_dict['rsvpStatus'] = 1 if len(rsvp_status) > 0 else 0
    res[event.id] = event_dict

  return {"Events": res}

#get all events for the session user
@event_routes.route('/user/session')
@login_required
def get_all_events_from_user():
    events = Event.query.filter(Event.userId == current_user.id).all()
    res = {}

    for event in events:
        # rsvp_status=list(filter(lambda user: user.id==current_user.id, event.event_rsvp_users))
        event_dict = event.to_dict()
        # event_dict["rsvpStatus"] = 1 if len(rsvp_status) > 0 else 0
        res[event.id] = event_dict

    return {"Events": res}


#get all events from other user
@event_routes.route('/user/<int:id>')
# @login_required
def get_others_events(id):
    events = Event.query.filter(Event.userId == id).all()
    res = {}
    for event in events:
        # rsvp_status=list(filter(lambda user: user.id==current_user.id, event.event_rsvp_users))
        event_dict = event.to_dict()
        # event_dict["rsvpStatus"] = 1 if len(rsvp_status) > 0 else 0
        res[event.id] = event_dict

    return {"Events": res}


#get the detail from a selected event
@event_routes.route('/<int:eventId>')
# @login_required
def get_event_detail(eventId):
    event = Event.query.get(eventId)
    if not event:
        return {'errors': ['event can not be found']},404

    # rsvp_status=list(filter(lambda user: user.id==current_user.id, event.event_rsvp_users))
    event_dict = event.to_dict()
    # event_dict["rsvpStatus"] = 1 if len(rsvp_status) > 0 else 0
    return event_dict

#create an event
@event_routes.route('/new',methods=['POST'])
# @login_required
def create_event():
    form = CreateEventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        event = Event(
            name=form.data['name'],
            description=form.data['description']
        )
        event.userId = current_user.id
        db.session.add(event)
        db.session.commit()

        res=event.to_dict()
        res["rsvpStatus"] = 0
        return res
    return {'errors': ['Oof']}, 400


#update an event
@event_routes.route('/<int:eventId>',methods=['PUT'])
# @login_required
def update_event(eventId):
    event = Event.query.get(eventId)
    if event.userId != current_user.id:
        return {"errors": ['Unauthorized']}, 401

    form = CreateEventForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # if event.image_url != form.data['image_url']:
    #     return {'errors': ['image cannot be changed']}, 400
    event.name=(form.data['name'])
    event.description=(form.data['description'])
    db.session.commit()
    # rsvp_status=list(filter(lambda user: user.id==current_user.id, event.event_rsvp_users))
    res = event.to_dict()
    # res["rsvpStatus"] = 1 if len(rsvp_status) > 0 else 0

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
