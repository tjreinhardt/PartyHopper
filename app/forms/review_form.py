from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Review

class ReviewForm(FlaskForm):
    concessions_rating = IntegerField('concessions_rating', validators=[(DataRequired())])
    entertainment_rating = IntegerField('entertainment_rating', validators=[(DataRequired())])
    atmosphere_rating = IntegerField('atmosphere_rating', validators=[(DataRequired())])
    comment = StringField('comment', validators=[DataRequired()])
