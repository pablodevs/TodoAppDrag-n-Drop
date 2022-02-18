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

#para la autenticación y generar el token
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

# Obtiene todas las imágenes con el tag 'gusinette' o 'gusinet' de Cloudinary
@api.route('/images/<string:tag>')
def getImages(tag):
    resourcesByTag = cloudinary.api.resources_by_tag(tag, max_results=100)["resources"]
    images = [key["url"] for key in resourcesByTag]
    return jsonify(images), 200