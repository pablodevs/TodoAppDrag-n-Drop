from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    lists = db.relationship('List', cascade="all, delete-orphan", backref='user')

    def __repr__(self):
        return '<User %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }

class List(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    color = db.Column(db.String(7), nullable=False)
    todos = db.relationship('Todo', cascade="all, delete-orphan", backref='list')
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return '<List %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "color": self.color,
            "user_id": self.user_id,
        }

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String(120), nullable=False)
    complete = db.Column(db.Boolean(), nullable=False, default=False)
    index = db.Column(db.Integer, nullable=True)
    list_id = db.Column(db.Integer, db.ForeignKey('list.id'))

    def __repr__(self):
        return '<Todo %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "list_id": self.list_id,
            "task": self.task,
            "index": self.index,
            "complete": self.complete
        }