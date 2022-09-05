from flask import Flask, render_template,json, jsonify, request, flash, session, redirect;
from model import connect_to_db, db, Book, Note
from datetime import datetime
import crud

from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined


@app.route("/")
def homepage():
    """Landing page for bookclub app."""
    
    return render_template('base.html')

@app.route("/add-book", methods=["POST"])
def add_book():
    """Add a new book to the database."""
    data = request.json
    new_book_title = data.get("new_book_title")
    new_book_author = data.get("new_book_author")
    new_book_year = data.get("new_book_year")
    new_book_date_read = data.get("new_book_date_read")
    new_book_rating = data.get("new_book_rating")

    new_book = Book.create_book(title=new_book_title, author=new_book_author, year_published=new_book_year, date_read=new_book_date_read, rating=new_book_rating)

    return jsonify({"bookTitle": new_book.title})



if __name__ == "__main__":
    # DebugToolbarExtension(app)
    connect_to_db(app)
    app.run(host="0.0.0.0", port="5001", debug=True)