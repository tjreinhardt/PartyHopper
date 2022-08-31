from app.models import db, Event, User
from datetime import datetime


def seed_events():
    event1 = Event(
        userId = 1,
        name = "BEACH Party!!",
        description = "Fun in the sun",
        eventType = "Rager",
        entertainment = "DJ",
        imageUrl = "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__340.jpg",
        startTime = datetime(2015, 6, 5, 11, 12, 12, 10),
        endTime = datetime(2015, 6, 5, 10, 20, 10, 10),
        createdAt = datetime(2015, 6, 5, 10, 20, 10, 10),
        lat = 1,
        lng = 1
        # event_rsvp_users = [User.query.get(1),User.query.get(2) , User.query.get(3)]
    )
    event2 = Event(
        userId = 2,
        name = "HOUSE Party!!",
        description = "Fun in the casa",
        eventType = "Rager",
        entertainment = "DJ",
        imageUrl = "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__340.jpg",
        startTime = datetime(2015, 6, 5, 8, 10, 10, 10),
        endTime = datetime(2015, 6, 5, 10, 20, 10, 10),
        createdAt = datetime(2015, 6, 5, 10, 20, 10, 10),
        lat = 5,
        lng = 5
        # event_rsvp_users = [User.query.get(1),User.query.get(2) , User.query.get(3)]
    )
    event3 = Event(
        userId = 3,
        name = "BEER Party!!",
        description = "Fun while drunk",
        eventType = "Rager",
        entertainment = "DJ",
        imageUrl = "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__340.jpg",
        startTime = datetime(2015, 6, 5, 11, 12, 12, 10),
        endTime = datetime(2015, 6, 5, 10, 20, 10, 10),
        createdAt = datetime(2015, 6, 5, 10, 20, 10, 10),
        lat = 10,
        lng = 10

        # event_rsvp_users = [User.query.get(1),User.query.get(2) , User.query.get(3)]
    )
    event4 = Event(
        userId = 4,
        name = "DANCE Party!!",
        description = "Fun on the floor",
        eventType = "Rager",
        entertainment = "DJ",
        imageUrl = "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__340.jpg",
        startTime = datetime(2015, 6, 5, 11, 12, 12, 10),
        endTime = datetime(2015, 6, 5, 10, 20, 10, 10),
        createdAt = datetime(2015, 6, 5, 10, 20, 10, 10),
        event_rsvp_users = [User.query.get(1),User.query.get(3) , User.query.get(2)],
        lat = 15,
        lng = 15
        # event_rsvp_users = [User.query.get(1),User.query.get(2) , User.query.get(3)]
    )



    db.session.add(event1)
    db.session.add(event2)
    db.session.add(event3)
    db.session.add(event4)


    db.session.commit()




def undo_events():
    db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
    db.session.commit()
