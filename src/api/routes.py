"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

# Cloudinary
import cloudinary
import cloudinary.uploader
import os

#para la autenticación y generar el token
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)
app = Flask(__name__)

# CANCEL (DELETE) CLOUDINARY IMAGE UPLOAD
@api.route('/cancel', methods=['PUT'])
def cancel_cloudinary_upload():
    """
    Cancel upload to Cloudinary
    """
    request_body = request.json

    cloudinaryResponse = cloudinary.uploader.destroy(request_body["public_id"])
    if cloudinaryResponse["result"] != "ok":
        raise APIException('La imagen no existe o el public id es erróneo.', status_code=404)

    return jsonify({ "message": cloudinaryResponse["result"] }), 200

# GET, MODIFY OR DELETE A USER
# Protect a route with jwt_required, which will kick out requests without a valid JWT present.
@api.route('/user', methods=['PUT', 'GET'])
@jwt_required() # Cuando se recive una peticion, se valida que exista ese token y que sea valido
def handle_single_user():
    """
    Single user
    """

    current_user_id = get_jwt_identity() # obtiene el id del usuario asociado al token (id == sub en jwt decode)
    user = User.query.get(current_user_id)

    # Data validation
    if user is None:
        raise APIException('User not found in data base.', status_code=404)

    # Modify (PUT) a user
    if request.method == 'PUT':
        # Query body
        request_body = request.form

        # Admin validation
        if "user_id" in request_body and user.serialize()["is_admin"] == True:
            user = User.query.get(request_body.get("user_id", None))

        # Check body's info
        if "name" in request_body:
            if len(request_body.get("name", None)) > 120:
                raise APIException('Nombre demasiado largo.', status_code=400)
            user.name = request_body.get("name", None)
        if "lastname" in request_body:
            if len(request_body.get("lastname", None)) > 120:
                raise APIException('Apellido demasiado largo.', status_code=400)
            user.lastname = request_body.get("lastname", None)

        # Verifica que el email no exista en otro usuario
        if "email" in request_body:
            if len(request_body.get("email", None)) > 120:
                raise APIException('Introduce una dirección de correo electrónico válida.', status_code=400)
            email_received = request_body.get("email", None)
            findUser = User.query.filter_by(email = email_received).first()
            if findUser and findUser != user:
                raise APIException('Ya existe una cuenta asociada a ese correo.', status_code=404)
            else:
                user.email = email_received

        if "phone" in request_body:
            user.phone = request_body.get("phone", None)

        db.session.commit()
        return jsonify(user.serialize()), 200
        
    # GET a user
    elif request.method == 'GET':
        return jsonify(user.serialize()), 200
    
    return jsonify({"message": "Invalid Method."}), 404