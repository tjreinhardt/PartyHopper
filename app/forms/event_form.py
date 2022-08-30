from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, DateTimeField, FileField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Event

class EventForm(FlaskForm):
    name = StringField('name')
    description = StringField('description')
    eventType = SelectField('eventType', choices=[('None', 'None'),('Party', 'Party'),('Kickback', 'Kickback'),('Live Show/Event', 'Live Show/Event'),('Rager', 'Rager'),('Block Party', 'Block Party'),('Local Community Event', 'Local Community Event'),('Charity Event', 'Charity Event'),('After Party', 'After Party'),('Grand Opening', 'Grand Opening')])
    entertainment = SelectField('entertainment', choices=[('None', 'None'),('Live-Band', 'Live-Band'),('DJ', 'DJ'),('Comedian', 'Comedian')])
    image_url = FileField(u'Image File', [validators.regexp(u'^[^/\\]\.jpg$')])
    start_time = DateTimeField('start_time')
    end_time = DateTimeField('end_time')
    lat = db.Column(db.Integer)
    lng = db.Column(db.Integer)
