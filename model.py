from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Book(db.Model):
    """A book."""
    __tablename__ = "books"

    book_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    title = db.Column(db.String)
    author = db.Column(db.String)
    year_published = db.Column(db.Integer)
    date_read = db.Column(db.DateTime)
    rating = db.Column(db.Integer)
    note_ids = db.Column(db.Array)

    def __repr__(self):
        return f'<Book id={self.book_id} title={self.title}'


class Note(db.Model):
    """A book."""
    __tablename__ = "notes"

    note_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey("books.book_id"))
    content = db.Column(db.Text)
    category = db.Column(db.String)
    quote = db.Column(db.Boolean)

    def __repr__(self):
        return f'<Note id={self.note_id} content={self.content[:8]}'

