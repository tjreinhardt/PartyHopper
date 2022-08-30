
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
# from sqlalchemy ForeignKey
from sqlalchemy.orm import relationship
from flask_login import UserMixin
from .event import Event, event_rsvps
class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    bio = db.Column(db.String(300))
    hashed_password = db.Column(db.String(255), nullable=False)
    lat = db.Column(db.Integer)
    lng = db.Column(db.Integer)


    rsvp_event = db.relationship(
        "Event",
        secondary=event_rsvps,
        back_populates="event_rsvp_users",
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
            'bio': self.bio
            # 'total_reviews': len(self.reviews)
            # 'total_rsvps': len(self.rsvps)
        }
