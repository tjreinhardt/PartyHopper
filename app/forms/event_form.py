from flask_wtf import FlaskForm
from wtforms import IntegerField, TimeField, StringField, SelectField, DateTimeField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Event

class CreateEventForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    imageUrl = StringField('image', validators=[DataRequired()])
    eventType = SelectField('eventType', choices=[('None', 'None'),('Party', 'Party'),('Kickback', 'Kickback'),('Live Show/Event', 'Live Show/Event'),('Rager', 'Rager'),('Block Party', 'Block Party'),('Local Community Event', 'Local Community Event'),('Charity Event', 'Charity Event'),('After Party', 'After Party'),('Grand Opening', 'Grand Opening')])
    # eventType = StringField('event type', validators=[DataRequired()])
    entertainment = SelectField('entertainment', choices=[('None', 'None'),('Live-Band', 'Live-Band'),('DJ', 'DJ'),('Comedian', 'Comedian')])
    # entertainment = StringField('entertainment', validators=[DataRequired()])
    startDate = StringField('startDate', validators=[DataRequired()])
    startTime = StringField('startTime', validators=[DataRequired()])
    # lat = IntegerField('lat', validators=[DataRequired()])
    # lng = IntegerField('lng', validators=[DataRequired()])
