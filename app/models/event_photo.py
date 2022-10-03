from .db import db

class Eventphoto(db.Model):
    __tablename__="event_photos"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    eventId = db.Column(db.Integer, db.ForeignKey("events.id"), nullable=False)
    image_url = db.Column(db.String(500), nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'eventId': self.eventId,
            'image_url': self.image_url
        }

    image_owner = db.relationship('User', back_populates='image_uploaded')
    event = db.relationship('Event', back_populates='event_photos')
    # review = db.relationship('Review', back_populates='review_photos')
