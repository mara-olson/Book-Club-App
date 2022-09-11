from flask import Flask, render_template, json, jsonify, request, flash, session, redirect;
import os
from model import connect_to_db, db, Book, Note
from datetime import datetime
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

    return jsonify({"bookTitle": new_book.title})

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
        

    return jsonify({"books": books})

@app.route("/library")
def library_page():
    """Display all book titles in database."""
    return render_template("library.html")


if __name__ == "__main__":
    # DebugToolbarExtension(app)
    connect_to_db(app)
    app.run(host="0.0.0.0", port="5001", debug=True)