from app.models import db, Event, User
from datetime import datetime, date, time


def seed_events():
    event1 = Event(
        userId = 1,
        name = "Tahoe South",
        description = "Join us each Thursday for live music, beer, and food!",
        eventType = "Live Show/Event",
        entertainment = "DJ",
        imageUrl = "https://www.caesars.com/content/dam/empire/tah/things-to-do/shows/1920x1080/hlt-shows-outdoor-concert-venue-1920x1080.jpg.transform/featured-img/image.jpg",
        startDate = datetime(2022, 6, 5, 11, 12, 12, 10),
        startTime = datetime(2022, 6, 5, 10, 20, 10, 10),
        createdAt = datetime(2022, 6, 5, 10, 20, 10, 10),
        lat = 38.9594,
        lng = -119.9416
        # event_rsvp_users = [User.query.get(1),User.query.get(2) , User.query.get(3)]
    )
    event2 = Event(
        userId = 2,
        name = "Heavenly Lodge",
        description = "Come by on the daily for skiing, mountainbiking, live entertainment and dining",
        eventType = "Rager",
        entertainment = "DJ",
        imageUrl = "https://hctg-images.imgix.net/images/venues/lakeview-lodge-at-heavenly-resort/WD20211206HeavenlySkiResort01.jpeg",
        startDate = date(2022, 6, 5),
        startTime = date(2022, 6, 5),
        createdAt = date(2022, 6, 5),
        lat = 38.9349,
        lng = -119.9403
        # event_rsvp_users = [User.query.get(1),User.query.get(2) , User.query.get(3)]
    )
    event3 = Event(
        userId = 3,
        name = "BEER Party!!",
        description = "Fun while drunk",
        eventType = "Rager",
        entertainment = "DJ",
        imageUrl = "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__340.jpg",
        startDate = date(2022, 6, 5),
        startTime = date(2022, 6, 7),
        createdAt = date(2022, 6, 5),
        lat = 80,
        lng = 80

        # event_rsvp_users = [User.query.get(1),User.query.get(2) , User.query.get(3)]
    )
    event4 = Event(
        userId = 1,
        name = "DANCE Party!!",
        description = "Fun on the floor",
        eventType = "Rager",
        entertainment = "DJ",
        imageUrl = "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__340.jpg",
        startDate = date(2022, 6, 5),
        startTime = date(2022, 6, 3),
        createdAt = date(2022, 6, 5),
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
