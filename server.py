# from asyncio.windows_events import NULL
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
    # print(new_book_title, "*"*20)
    new_book_author = data.get("new_book_author")
    new_book_year = data.get("new_book_year")
    new_book_date_read = data.get("new_book_date_read")
    new_book_rating = data.get("new_book_rating")

    new_book = Book.create_book(title=new_book_title, author=new_book_author, year_published=new_book_year, date_read=new_book_date_read, rating=new_book_rating)

    return jsonify({"bookTitle": new_book.title, "bookAuthor": new_book.author, "bookPubYr": new_book.year_published, "bookDateRead": new_book.date_read, "bookRating": new_book.rating})

@app.route("/api/library")
def all_books():
    """All book titles in database."""
    books = []
    book_titles =[]

    all_books = Book.query.all()
    # if all_books:
    for book in all_books:
        # print("*"*5,book)
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

    session["all_titles"] = book_titles

    if all_books:
        last_book = books[-1]
        print("LAST BOOK: ", last_book)
    else:
        last_book = None

    return jsonify({"books": books, "last_book": last_book})


@app.route("/library")
def library_page():
    """Display all book titles in database."""
    return render_template("library.html")


@app.route("/library/<book_title>")
def book_details(book_title):
    """Specific details about a particular book."""
    book = Book.get_book_by_title(book_title)
    session['title'] = book.title

    date_read = str(book.date_read)[:10]
    notes = book.notes
    
    return render_template("book_details.html", title=book.title, author = book.author, published=book.year_published, read=date_read, rating=book.rating, notes=notes)


@app.route("/api/library/<book_title>/all-notes")
def all_notes(book_title):
    """All notes for a given book."""
    notes = []
    book = Book.get_book_by_title(book_title)

    all_notes = Note.query.filter(Note.book_id == book.book_id).all()

    for note in all_notes:
        # print("*"*5,note)
        new_note = {
            "note_id": note.note_id, "content": note.content,
            "category": note.category,
            "quote": note.quote,
        }
        notes.append(new_note)

    last_note = notes[-1]
    print("LAST NOTE: ", last_note)

    return jsonify({"notes": notes, "last_note": last_note})



@app.route("/api/library/<book_title>/add-notes", methods=["POST"])
def save_book_notes(book_title):
    """Add and save user-entered notes."""

    book = Book.get_book_by_title(book_title)

    notes = request.json.get("notes")

    new_note = Note.create_note(book, notes)

    return jsonify({"noteContent": new_note.content})


@app.route("/api/library/<book_title>", methods=["DELETE"])
def delete_book():
    """Remove book from library."""
    # note_content = request.json.get("content")

    book_title = session['title']
    # NOTE: Needed? ^^
    
    # book = Book.get_book_by_title(book_title)
    # print(book_title,"*"*20)
    # NOTE: ^^ Replacing above with direct placement in delete_book argument

    # Book.delete_book(Book.get_book_by_title(book_title))
    Book.delete_book(session['title'])
    # NOTE: seeing if session works

    if not Book.get_book_by_title(session['title']):
        print("DELETED: ", session["title"])
        return jsonify({
        "success": True})
    else:
        return jsonify({
        "success": False})

    # Note.delete_note(note.note_id)

    # print(f"Activity {note.note_id} deleted")

    # check_note = Note.query.filter(Note.content == note_content).all()

    # if not check_note:
    #     return jsonify({
    #     "success": True})



if __name__ == "__main__":
    # DebugToolbarExtension(app)
    connect_to_db(app)
    app.run(host="0.0.0.0", port="5001", debug=True)