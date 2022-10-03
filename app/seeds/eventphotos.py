from app.models import db, Eventphoto

def seed_eventphotos():
    photo1 = Eventphoto(
        user_id=1,
        eventId=1,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/sSDWCFmzukeeBLHxz8ghMg/o.jpg'
    )
    photo2 = Eventphoto(
        user_id=1,
        eventId=2,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/9BNcEF9QvwnFKp9HIrnv_A/o.jpg'
    )
    photo3 = Eventphoto(
        user_id=1,
        eventId=3,
        image_url='https://s3-media0.fl.yelpcdn.com/bphoto/Cq2f6H8PfDJco2njDOkeGA/o.jpg'
    )


    db.session.add(photo1)
    db.session.add(photo2)
    db.session.add(photo3)
    db.session.commit()


def undo_eventphotos():
    db.session.execute('TRUNCATE event_photos RESTART IDENTITY CASCADE;')
    db.session.commit()
