from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Review

class ReviewForm(FlaskForm):
    rating = IntegerField('rating', validators=[(DataRequired())])
    # entertainmentRating = IntegerField('entertainmentRating', validators=[(DataRequired())])
    # atmosphereRating = IntegerField('atmosphereRating', validators=[(DataRequired())])
    comment = StringField('comment', validators=[DataRequired()])
