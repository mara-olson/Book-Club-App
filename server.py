from flask import Flask, render_template, json, jsonify, request, flash, session, redirect;
import os
from model import connect_to_db, db, Book, Note
import datetime
import crud

from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined
API_KEY = 'KEY'


@app.route("/")
def homepage():
    """Landing page for bookclub app."""
    
    return render_template('base.html')


@app.route("/api/add-book", methods=["POST"])
def add_book():
    """Add a new book to the database."""
    data = request.json

    print("*"*20, data)

    new_book_title = data.get("new_book_title")
    print(new_book_title)
    new_book_author = data.get("new_book_author")
    new_book_year = data.get("new_book_year")
    new_book_date_read = data.get("new_book_date_read")
    new_book_rating = data.get("new_book_rating")

    new_book = Book.create_book(title=new_book_title, author=new_book_author, year_published=new_book_year, date_read=new_book_date_read, rating=new_book_rating)

    return jsonify({"bookTitle": new_book.title, "bookAuthor": new_book.author, "bookPubYr": new_book.year_published, "bookDateRead": new_book["date_read"][:10], "bookRating": new_book.rating})


@app.route("/api/library")
def all_books():
    """All book titles in database."""
    books = []
    book_titles =[]

    all_books = Book.query.all()
    for book in all_books:
        print("*"*5,book)
        if book.title not in book_titles:
            new_book = {
                "book_id": book.book_id, "title": book.title,
                "author": book.author,
                "year_published": book.year_published,
                "date_read": book.date_read,
                "rating": book.rating
            }
            book_titles.append(book.title)
            books.append(new_book)

    last_book = books[-1]
    print("LAST BOOK: ", last_book)

    return jsonify({"books": books, "last_book": last_book})


@app.route("/library")
def library_page():
    """Display all book titles in database."""
    return render_template("library.html")


@app.route("/library/<book_title>")
def book_details(book_title):
    """Specific details about a particular book."""
    book = Book.get_book_by_title(book_title)
    date_read = str(book.date_read)[:10]
    notes = Book.notes
    
    return render_template("book_details.html", title=book_title, author = book.author, published=book.year_published, read=date_read, rating=book.rating, notes=book.notes)


@app.route("/api/library/<book_title>/add-notes", methods=["POST"])
def save_book_notes(book_title):
    """Add and save user-entered notes."""

    book = Book.get_book_by_title(book_title)
    data = request.json
    notes = data.get("notes")


    print(notes, "!!!!!!!!!!!!!!!")


    return jsonify({"author": book.author})



if __name__ == "__main__":
    # DebugToolbarExtension(app)
    connect_to_db(app)
    app.run(host="0.0.0.0", port="5001", debug=True)