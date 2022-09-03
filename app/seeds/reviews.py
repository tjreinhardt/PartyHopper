from app.models import db, Event, User, Review


def seed_reviews():
    review1 = Review(
        userId = 1,
        eventId = 1,
        concessions_rating = 5,
        entertainment_rating = 4,
        atmosphere_rating = 5,
        comment = "SO DOPE!"
       
    )

    review2 = Review(
        userId = 2,
        eventId = 1,
        concessions_rating = 4,
        entertainment_rating = 4,
        atmosphere_rating = 3,
        comment = "Had a weird experience with the bartender!"
        
       
    )

    review3 = Review(
        userId = 3,
        eventId = 1,
        concessions_rating = 5,
        entertainment_rating = 3,
        atmosphere_rating = 5,
        comment = "Food and vibes were awesome, but the band sucked"
    )




    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)


    db.session.commit()


def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()