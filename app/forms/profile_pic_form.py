from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class ProfilePicForm(FlaskForm):
    profile_pic = StringField('profile_pic', validators=[DataRequired()])
