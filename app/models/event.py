from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
# from flask_login import UserMixin

event_rsvps = db.Table(
  "event_rsvps",
  db.Column("eventId", db.Integer, db.ForeignKey("events.id", ondelete="CASCADE"), primary_key=True),
  db.Column("userId", db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
)

class Event(db.Model):
  __tablename__ = "events"

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
  name = db.Column(db.String(125))
  description = db.Column(db.String(500))
  imageUrl = db.Column(db.String(500))
  eventType = db.Column(db.String(50))
  entertainment = db.Column(db.String(50))
  createdAt = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
  startTime = db.Column(db.DateTime(timezone=True))
  endTime = db.Column(db.DateTime(timezone=True))
  rating = db.Column(db.Integer)
  lat = db.Column(db.Integer)
  lng = db.Column(db.Integer)
  user = db.relationship("User", back_populates="events")
  reviews = db.relationship("Review", back_populates="event", cascade="all, delete")

  event_rsvp_users = db.relationship(
        "User",
        secondary=event_rsvps,
        back_populates="rsvp_event",
        passive_deletes=True
  )


  def to_dict(self):
    return {
      "id": self.id,
      "userId": self.userId,
      "name": self.name,
      "description": self.description,
      "imageUrl": self.imageUrl,
      "eventType": self.eventType,
      "entertainment": self.entertainment,
      "createdAt": self.createdAt,
      "startTime": self.startTime,
      "endTime": self.endTime,
      "rating": self.rating,
      "lat": self.lat,
      "lng": self.lng,
      # "user": {
      #     "profileImage":self.user.profileImage,
      #     "username":self.user.username,
      #     'totalRsvps': self.user.followers.count(),
      #     'totalFollowings': self.user.following.count(),
      #     'totalEvents': len(self.user.events),
      #     'fullname': self.user.fullname
      # },
      "totalReviews": len(self.reviews),
      "totalRsvps": len(self.event_rsvp_users)
    }
