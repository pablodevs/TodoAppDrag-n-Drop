from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    profile_image_url = db.Column(db.String(200), unique=True, nullable=True)
    password = db.Column(db.String(80), unique=False, nullable=False)
    lists = db.relationship('List', backref='user')

    def __repr__(self):
        return '<User %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "profile_image_url": self.profile_image_url
        }

class List(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    todos = db.relationship('Todo', backref='list')
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return '<List>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "todos": self.todos
        }

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String(120), nullable=False)
    complete = db.Column(db.Boolean(), nullable=False, default=False)
    list_id = db.Column(db.Integer, db.ForeignKey('list.id'))

    def __repr__(self):
        return '<Todo>'

    def serialize(self):
        return {
            "id": self.id,
            "list_id": self.list_id,
            "task": self.task,
            "complete": self.complete
        }