from flask import Blueprint, request
from app.models import db, Eventphoto
from flask_login import current_user, login_required
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)
from app.forms import ImageForm

image_routes = Blueprint("images", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@image_routes.route('/')
def all_images():
    images=Eventphoto.query.all()
    return {'images': [image.to_dict() for image in images]}

@image_routes.route('', methods=['GET', 'POST'])
# @login_required
def upload_image():
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('backend', form.data)
    if form.validate_on_submit():
        if 'image_url' in request.files:
            image = request.files['image_url']

        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        print('backend, upload', upload)

        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
            return upload, 400

        image_url = upload['url']

        new_image = Eventphoto(
                            user_id=form.data['user_id'],
                            eventId=form.data['eventId'],
                            image_url=image_url
        )

        db.session.add(new_image)
        db.session.commit()

        return new_image.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@image_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_image(id):
    image = Eventphoto.query.get(id)
    db.session.delete(image)
    db.session.commit()
    return image.to_dict()
