
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
# from sqlalchemy ForeignKey
from sqlalchemy.orm import relationship
from flask_login import UserMixin
from .event import Event, event_rsvps
from .reviews import review_likes


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    bio = db.Column(db.String(300))
    profile_pic = db.Column(db.String(255), default='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVAsYAAWUbB2YPxq9pECm6rDAjpJlwnUnfKA&usqp=CAU')
    # imageUrl = db.column(db.String(500))
    hashed_password = db.Column(db.String(255), nullable=False)
    lat = db.Column(db.Float(precision=12, asdecimal=False))
    lng = db.Column(db.Float(precision=12, asdecimal=False))


    rsvp_event = db.relationship(
        "Event",
        secondary=event_rsvps,
        back_populates="event_rsvp_users",
        cascade="all, delete"
    )

    like_reviews = db.relationship(
        "Review",
        secondary=review_likes,
        back_populates="review_like_users",
        cascade="all, delete"
    )

    events = db.relationship("Event", back_populates="user", cascade="all, delete")
    reviews = db.relationship("Review", back_populates="user", cascade="all, delete")



    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'bio': self.bio,
            "lat": self.lat,
            "lng": self.lng,
            'total_reviews': len(self.reviews)
            # 'total_rsvps': len(self.rsvps)
        }

    image_uploaded = db.relationship('Eventphoto', back_populates='image_owner')
