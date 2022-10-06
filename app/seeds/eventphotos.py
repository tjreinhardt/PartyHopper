from app.models import db, Eventphoto

def seed_eventphotos():
    photo1 = Eventphoto(
        user_id=1,
        eventId=1,
        image_url='https://disneycruiselineblog.com/wp-content/uploads/2015/02/DCL-Port-Adventures-Frozen-Norway-Kayaking-in-Geirangerfjord-POV.jpg'
    )
    photo2 = Eventphoto(
        user_id=1,
        eventId=2,
        image_url='https://www.jetsetter.com/uploads/sites/7/2018/04/YjRgZpVh-1380x1035.jpeg'
    )
    photo3 = Eventphoto(
        user_id=1,
        eventId=3,
        image_url='https://images.squarespace-cdn.com/content/v1/52f29591e4b0d3acccdd6286/1512148906579-J57HO2F9X9JETLDPWXJA/matera+adventure+hike+wilderness_DSC8393.jpg'
    )


    db.session.add(photo1)
    db.session.add(photo2)
    db.session.add(photo3)
    db.session.commit()


def undo_eventphotos():
    db.session.execute('TRUNCATE event_photos RESTART IDENTITY CASCADE;')
    db.session.commit()
