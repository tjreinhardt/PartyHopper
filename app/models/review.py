# from .db import db
# from sqlalchemy.orm import relationship
# from sqlalchemy import ForeignKey
# # from flask_login import UserMixin

# review_likes = db.Table(
#   "review_likes",
#   db.Column("reviewId", db.Integer, db.ForeignKey("reviews.id", ondelete="CASCADE"), primary_key=True),
#   db.Column("userId", db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
# )

# class Review(db.Model):
#   __tablename__ = "reviews"

#   id = db.Column(db.Integer, primary_key=True)
#   userId = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
#   eventId = db.Column(db.Integer, db.ForeignKey("events.id", ondelete="CASCADE"), nullable=False)
#   concessions_rating = db.Column(db.Integer, nullable=False)
#   entertainment_rating = db.Column(db.Integer, nullable=False)
#   atmosphere_rating = db.Column(db.Integer, nullable=False)
#   comment = db.Column(db.String(500), nullable=False)
#   review_date = db.Column(db.DateTime(timezone=True), server_default=db.func.now())

#   user = relationship("User", back_populates="reviews")
#   event = relationship("Event", back_populates="reviews")

#   # review_like_users = db.relationship(
#   #       "User",
#   #       secondary=review_likes,
#   #       back_populates="like_reviews",
#   #       passive_deletes=True
#   # )

#   def to_dict(self):
#     return {
#       "id": self.id,
#       "userId": self.userId,
#       "eventId": self.eventId,
#       "concessionsRating": self.concessions_rating,
#       "entertainmentRating": self.entertainment_rating,
#       "atmosphereRating": self.atmosphere_rating,
#       "comment": self.comment,
#       "reviewDate": self.review_date,
#       "user": {
#                 "profileImage": self.user.profile_image,
#                 "username": self.user.username
#             },
#       "totalReviews": len(self.review_like_users)
#     }
