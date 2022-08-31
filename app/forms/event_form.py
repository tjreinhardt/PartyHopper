from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SelectField, DateTimeField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Event

class CreateEventForm(FlaskForm):
    name = StringField('name')
    description = StringField('description')
    image_url = StringField('image')
    # eventType = SelectField('eventType', choices=[('None', 'None'),('Party', 'Party'),('Kickback', 'Kickback'),('Live Show/Event', 'Live Show/Event'),('Rager', 'Rager'),('Block Party', 'Block Party'),('Local Community Event', 'Local Community Event'),('Charity Event', 'Charity Event'),('After Party', 'After Party'),('Grand Opening', 'Grand Opening')])
    eventType = StringField('event type')
    # entertainment = SelectField('entertainment', choices=[('None', 'None'),('Live-Band', 'Live-Band'),('DJ', 'DJ'),('Comedian', 'Comedian')])
    entertainment = StringField('entertainment')
    start_time = DateTimeField('start_time')
    end_time = DateTimeField('end_time')
    lat = IntegerField('lat')
    lng = IntegerField('lng')
