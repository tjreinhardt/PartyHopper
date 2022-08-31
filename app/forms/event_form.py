from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SelectField, DateTimeField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Event

class CreateEventForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    imageUrl = StringField('image', validators=[DataRequired()])
    # eventType = SelectField('eventType', choices=[('None', 'None'),('Party', 'Party'),('Kickback', 'Kickback'),('Live Show/Event', 'Live Show/Event'),('Rager', 'Rager'),('Block Party', 'Block Party'),('Local Community Event', 'Local Community Event'),('Charity Event', 'Charity Event'),('After Party', 'After Party'),('Grand Opening', 'Grand Opening')])
    eventType = StringField('event type', validators=[DataRequired()])
    # entertainment = SelectField('entertainment', choices=[('None', 'None'),('Live-Band', 'Live-Band'),('DJ', 'DJ'),('Comedian', 'Comedian')])
    entertainment = StringField('entertainment', validators=[DataRequired()])
    startTime = DateTimeField('startTime', format='%Y-%m-%d %H:%M:%S')
    endTime = DateTimeField('endTime', format='%Y-%m-%d %H:%M:%S')
    lat = IntegerField('lat', validators=[DataRequired()])
    lng = IntegerField('lng', validators=[DataRequired()])
