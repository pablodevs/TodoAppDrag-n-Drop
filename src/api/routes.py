"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

# Cloudinary
import cloudinary
import cloudinary.uploader
import cloudinary.api
import os

# para la autenticación y generar el token
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)
app = Flask(__name__)

cloudinary.config( 
    cloud_name = os.getenv('CLOUD_NAME'), 
    api_key = os.getenv('API_KEY'), 
    api_secret = os.getenv('API_SECRET') 
)

# GENERATE TOKEN
@api.route('/token', methods=['POST'])
def generate_token():

    # fetch for create token
    name_received = request.json.get("name", None)
    password_received = request.json.get("password", None)
    # Query your database for username and password
    user = User.query.filter_by(name=name_received, password=password_received).first()
    if user is None:
        # the user was not found on the database
        return jsonify({"message": "Usuario o contraseña incorrectos."}), 401
    
    # create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    return jsonify({"message": "Acceso correcto.", "status": "success", "token": access_token, "id": user.id, "name": user.name})

# GET, MODIFY OR DELETE A USER
# Protect a route with jwt_required, which will kick out requests without a valid JWT present.
@api.route('/user', methods=['PUT', 'GET'])
@jwt_required() # Cuando se recive una peticion, se valida que exista ese token y que sea valido
def getUserInfo():
    """
    Single user
    """

    currentUserId = get_jwt_identity() # obtiene el id del usuario asociado al token (id == sub en jwt decode)
    user = User.query.get(currentUserId)

    # Data validation
    if user is None:
        raise APIException('User not found in data base.', status_code=404)

    return jsonify(user.serialize()), 200

# Obtiene todas las imágenes con el tag 'gusinette' o 'gusinet' de Cloudinary
@api.route('/images/<string:tag>')
def getImages(tag):
    resourcesByTag = cloudinary.api.resources_by_tag(tag, max_results=100)["resources"]
    images = [key["url"].replace('http', 'https') for key in resourcesByTag]
    return jsonify(images), 200