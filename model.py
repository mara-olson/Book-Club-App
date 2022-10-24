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
    # note_ids = db.Column(db.ARRAY)

    notes = db.relationship("Note", back_populates="book")
    
    @classmethod
    def create_book(cls, title, author, year_published=None, date_read=None, rating=None):
        """Add a new book to the database."""
        book = cls(title=title, author=author, year_published=year_published, date_read=date_read, rating=rating)
        
        db.session.add(book)
        db.session.commit()

        return book

    @classmethod
    def get_book_by_title(cls, title):
        """Retrieve a book by its title."""
        return Book.query.filter(Book.title==title).first()

    @classmethod
    def delete_book(cls, book_title):
        book = Book.get_book_by_title(book_title)

        db.session.delete(book)
        db.session.commit()

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

    book = db.relationship("Book", back_populates="notes")
    
    @classmethod
    def create_note(cls, book, content):
        """Add a new book to the database."""
        note = cls(book=book, content=content)
        db.session.add(note)
        db.session.commit()

        return note

    @classmethod
    def delete_note(cls, book_id, note_id):
        note = Note.query.get(note_id)

        db.session.delete(note)
        db.session.commit()
    

    def __repr__(self):
        return f'<Note id={self.note_id} content={self.content[:8]}'

def connect_to_db(flask_app, db_uri="postgresql:///bookclub", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")
    db.create_all()


if __name__ == "__main__":
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    connect_to_db(app)

