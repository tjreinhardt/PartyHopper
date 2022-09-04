from app.models import db, Event, User, Review


def seed_reviews():
    review1 = Review(
        userId = 1,
        eventId = 1,
        concessionsRating = 5,
        entertainmentRating = 4,
        atmosphereRating = 5,
        comment = "SO DOPE!"
       
    )

    review2 = Review(
        userId = 2,
        eventId = 1,
        concessionsRating = 4,
        entertainmentRating = 4,
        atmosphereRating = 3,
        comment = "Had a weird experience with the bartender!"
        
       
    )

    review3 = Review(
        userId = 3,
        eventId = 1,
        concessionsRating = 5,
        entertainmentRating = 3,
        atmosphereRating = 5,
        comment = "Food and vibes were awesome, but the band sucked"
    )




    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)


    db.session.commit()


def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()