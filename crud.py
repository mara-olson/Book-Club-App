"""CRUD operations."""

from model import db, Book, Note, connect_to_db

def create_book(title, author):
    """Add a new book to the database."""
    book = Book(title=title, author=author)

    return book


def create_note(book, content):
    """Add a new book to the database."""
    note = Note(book=book, conent=content)

    return note


if __name__ == '__main__':
    from server import app
    connect_to_db(app)