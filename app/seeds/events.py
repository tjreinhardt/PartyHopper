from app.models import db, Event, User


def seed_events():
    event1 = Event(
        userId = 1,
        name = "Beach Party!!",
        description = "Fun in the sun",
        eventType = "Rager",
        entertainment = "DJ",
        imageUrl = "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__340.jpg"
        # event_rsvp_users = [User.query.get(1),User.query.get(2) , User.query.get(3)]
    )



    db.session.add(event1)


    db.session.commit()




def undo_events():
    db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
    db.session.commit()
