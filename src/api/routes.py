"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

import os

# Cloudinary
import cloudinary
import cloudinary.api
import cloudinary.uploader
from flask import Blueprint, Flask, jsonify, request, url_for
# para la autenticación y generar el token
from flask_jwt_extended import (create_access_token, get_jwt_identity,
                                jwt_required)

from api.models import List, Todo, User, db
from api.utils import APIException, generate_sitemap

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
        return jsonify({"message": "Usuario o contraseña incorrectos.", "status": "danger"}), 401
    
    # create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    return jsonify({"message": "Acceso correcto.", "status": "success", "token": access_token, "id": user.id, "name": user.name})

# GET INFO OF USER
# Protect a route with jwt_required, which will kick out requests without a valid JWT present.
@api.route('/user', methods=['GET'])
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

# MODIFY INFO OF USER
@api.route('/user', methods=['PUT'])
@jwt_required() # Cuando se recive una peticion, se valida que exista ese token y que sea valido
def setUserImg():
    """
    Single user
    """

    currentUserId = get_jwt_identity() # obtiene el id del usuario asociado al token (id == sub en jwt decode)
    user = User.query.get(currentUserId)

    # Data validation
    if user is None:
        raise APIException('User not found in data base.', status_code=404)

    # Query body
    request_body = request.json

    user.profile_image_url = request_body.get("profile_image_url", None)

    db.session.commit()
    return jsonify(user.serialize()), 200

# Obtiene todas las imágenes con el tag 'gusinette' o 'gusinet' de Cloudinary
@api.route('/images/<string:tag>')
def getImages(tag):
    resourcesByTag = cloudinary.api.resources_by_tag(tag, max_results=100)["resources"]
    images = [key["url"].replace('http', 'https') for key in resourcesByTag]
    return jsonify(images), 200

# Crea una nueva TodoList y la asocia al usuario
@api.route('/list', methods=['POST'])
@jwt_required()
def createNewList():
    """
    Create new list and link it to the user
    """

    currentUserId = get_jwt_identity() # obtiene el id del usuario asociado al token (id == sub en jwt decode)
    user = User.query.get(currentUserId)

    # Data validation
    if user is None:
        raise APIException('User not found in data base.', status_code=404)
    
    listToCreate = request.json

    newList = List(name = listToCreate.get("name", None), color = listToCreate.get("color", None), user_id = currentUserId)
    db.session.add(newList)
    db.session.commit()

    return jsonify(newList.serialize()), 200

# Modifica la list
@api.route('/list/<int:list_id>', methods=['PUT'])
@jwt_required() # Cuando se recive una peticion, se valida que exista ese token y que sea valido
def updateList(list_id):
    """
    Single list
    """

    currentUserId = get_jwt_identity() # obtiene el id del usuario asociado al token (id == sub en jwt decode)
    user = User.query.get(currentUserId)

    # Data validation
    if user is None:
        raise APIException('User not found in data base.', status_code=404)

    list = List.query.get(list_id)

    # Query body
    request_body = request.json

    if 'name' in request_body:
        list.name = request_body['name']
    if "color" in request_body:
        list.color = request_body["color"]
    if "share" in request_body:
        list.share = request_body["share"]

    db.session.commit()

    return jsonify(list.serialize()), 200

# Elimina una TodoList asociada al usuario
@api.route('/list/<int:list_id>', methods=['DELETE'])
@jwt_required()
def deleteList(list_id):
    """
    Delete new list and link it to the user
    """

    currentUserId = get_jwt_identity() # obtiene el id del usuario asociado al token (id == sub en jwt decode)
    user = User.query.get(currentUserId)

    # Data validation
    if user is None:
        raise APIException('User not found in data base.', status_code=404)
    
    listToDelete = List.query.get(list_id)

    db.session.delete(listToDelete)
    db.session.commit()
    return jsonify({"message": "La lista se ha eliminado correctamente.", "status": "success"}), 200

# Obtiene todas las listas (compartidas o no)
@api.route('/user/lists/<string:share>')
@jwt_required()
def getAllLists(share):
    """
    Get all Lists liked to current user
    """

    currentUserId = get_jwt_identity() # obtiene el id del usuario asociado al token (id == sub en jwt decode)
    user = User.query.get(currentUserId)

    # Data validation
    if user is None:
        raise APIException('User not found in data base.', status_code=404)
    
    if share == "false":
        allLists = List.query.filter_by(user_id = currentUserId).all()
    elif share == "true":
        allLists = List.query.filter_by(share = True).all()

    allLists = [list.serialize() for list in allLists]

    return jsonify(allLists), 200

# Crea un nuevo Todo y lo asocia a una lista
@api.route('/lists/<int:list_id>/todo', methods=['POST'])
@jwt_required()
def createNewTodo(list_id):
    """
    Create new todo and link it to the list
    """

    currentUserId = get_jwt_identity() # obtiene el id del usuario asociado al token (id == sub en jwt decode)
    user = User.query.get(currentUserId)

    # Data validation (Se podría chequear que exista la lista)
    if user is None:
        raise APIException('User not found in data base.', status_code=404)
    
    task = request.json

    newTodo = Todo(task = task, list_id = list_id)
    db.session.add(newTodo)
    db.session.commit()

    return jsonify(newTodo.serialize()), 200

# Obtiene todas las tareas de la lista asiciada a list_id
@api.route('/lists/<int:list_id>/todos')
@jwt_required()
def getAllTodos(list_id):
    """
    Get all Todos liked to list_id
    """

    currentUserId = get_jwt_identity() # obtiene el id del usuario asociado al token (id == sub en jwt decode)
    user = User.query.get(currentUserId)

    # Data validation
    if user is None:
        raise APIException('User not found in data base.', status_code=404)
    
    allTodos = Todo.query.filter_by(list_id = list_id).all()
    allTodos = [todo.serialize() for todo in allTodos]
    # allTodos = sorted(allTodos, key=lambda todo: todo["index"])

    return jsonify(allTodos), 200

# Modifica el todo
@api.route('/todo/<int:todo_id>', methods=['PUT'])
@jwt_required() # Cuando se recive una peticion, se valida que exista ese token y que sea valido
def updateTodo(todo_id):
    """
    Single todo
    """

    currentUserId = get_jwt_identity() # obtiene el id del usuario asociado al token (id == sub en jwt decode)
    user = User.query.get(currentUserId)

    # Data validation
    if user is None:
        raise APIException('User not found in data base.', status_code=404)

    todo = Todo.query.get(todo_id)

    # Query body
    request_body = request.json

    if 'complete' in request_body:
        todo.complete = request_body['complete']
    if "task" in request_body:
        todo.task = request_body["task"]
    if "index" in request_body:
        todo.index = request_body["index"]

    db.session.commit()
    return jsonify({"message": "Todo changed!", "status": "success"}), 200

# Elimina una TodoList asociada al usuario
@api.route('/todo/<int:todo_id>', methods=['DELETE'])
@jwt_required() # Cuando se recive una peticion, se valida que exista ese token y que sea valido
def deleteTodo(todo_id):
    """
    Delete todo
    """

    currentUserId = get_jwt_identity() # obtiene el id del usuario asociado al token (id == sub en jwt decode)
    user = User.query.get(currentUserId)

    # Data validation
    if user is None:
        raise APIException('User not found in data base.', status_code=404)
    
    todoToDelete = Todo.query.get(todo_id)

    db.session.delete(todoToDelete)
    db.session.commit()
    return jsonify({"message": "La tarea ha sido eliminada correctamente.", "status": "success"}), 200

# Drag & Drop: Reorder tasks
# mylist = ['a', 'b', 'c', 'd', 'e']
# myorder = [3, 2, 0, 1, 4]
# mylist = [mylist[i] for i in myorder]
# print(mylist)


# Reordena la lista
@api.route('/list/<int:list_id>/reorder', methods=['PUT'])
@jwt_required() # Cuando se recive una peticion, se valida que exista ese token y que sea valido
def reorderList(list_id):
    """
    Single list
    """

    currentUserId = get_jwt_identity() # obtiene el id del usuario asociado al token (id == sub en jwt decode)
    user = User.query.get(currentUserId)

    # Data validation
    if user is None:
        raise APIException('User not found in data base.', status_code=404)

    # Query body
    request_body = request.json

    sourceIndex = request_body['sourceIndex']
    destinationIndex = request_body['destinationIndex']
    
    allTodos = Todo.query.filter_by(list_id = list_id).all()

    todoMoving = allTodos.pop(sourceIndex)
    allTodos.insert(destinationIndex, todoMoving)

    for idx, todo in enumerate(allTodos):
        todo.index = idx
    
    db.session.commit()

    return jsonify({"message": "Ok", "status": "success"}), 200

# Para mover los completed todos a abajo, algo como:
# allTodos = sorted(allTodos, key=lambda todo: todo["id"])