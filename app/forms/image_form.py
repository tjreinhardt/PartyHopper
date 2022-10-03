from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class ImageForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    eventId = IntegerField('eventId', validators=[DataRequired()])
    image_url = StringField('image_url', validators=[DataRequired()])
