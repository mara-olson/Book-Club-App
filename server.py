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


@app.route("/api/library/add-book", methods=["POST"])
def add_book():
    """Add a new book to the database."""
    data = request.json

    new_book_title = data.get("new_book_title")
    new_book_author = data.get("new_book_author")
    new_book_year = data.get("new_book_year")
    new_book_date_read = data.get("new_book_date_read")
    new_book_rating = data.get("new_book_rating")
    new_book_read = True

    new_book = Book.create_book(title=new_book_title, author=new_book_author, year_published=new_book_year, date_read=new_book_date_read, rating=new_book_rating, read=new_book_read)

    return jsonify({"bookTitle": new_book.title, "bookAuthor": new_book.author, "bookPubYr": new_book.year_published, "bookDateRead": new_book.date_read, "bookRating": new_book.rating})


@app.route("/api/umbertos-library/add-book", methods=["POST"])
def add_umberto_book():
    """Add a new book to the database."""
    data = request.json

    new_book_title = data.get("new_book_title")
    new_book_author = data.get("new_book_author")
    new_book_year = data.get("new_book_year")
    new_book_date_read = data.get("new_book_date_read")
    new_book_rating = data.get("new_book_rating")
    new_book_read = False

    new_book = Book.create_book(title=new_book_title, author=new_book_author, year_published=new_book_year, date_read=new_book_date_read, rating=new_book_rating, read=new_book_read)

    return jsonify({"bookTitle": new_book.title, "bookAuthor": new_book.author, "bookPubYr": new_book.year_published, "bookDateRead": new_book.date_read, "bookRating": new_book.rating})

@app.route("/api/umbertos-library")
def all_books_to_read():
    """All book titles in database."""
    books = []
    book_titles =[]

    all_books = Book.query.filter_by(read = False).all()
    print("ALL UMB BOOKS: ", all_books, "*"*40)
    # if all_books:
    for book in all_books:
        if book.title not in book_titles:
            new_book = {
                "book_id": book.book_id, "title": book.title,
                "author": book.author,
                "year_published": book.year_published,
                "date_read": str(book.date_read)[:10],
                "rating": book.rating,
                "read":False
            }
            # book.date_read = str(book.date_read)[:10]
            book_titles.append(book.title)
            books.append(new_book)

    session["all_titles"] = book_titles
        
    books.sort(key=lambda x: x['date_read'], reverse=True)
    print(books, "*"*35)

    if all_books:
        last_book = books[-1]
    else:
        last_book = None

    return jsonify({"books": books, "last_book": last_book})


@app.route("/api/library")
def all_books():
    """All book titles in database."""
    books = []
    book_titles =[]

    all_books = Book.query.filter(Book.read==True).all()
    # if all_books:
    for book in all_books:
        if book.title not in book_titles:
            new_book = {
                "book_id": book.book_id, "title": book.title,
                "author": book.author,
                "year_published": book.year_published,
                "date_read": str(book.date_read)[:10],
                "rating": book.rating
            }
            # book.date_read = str(book.date_read)[:10]
            book_titles.append(book.title)
            books.append(new_book)

    session["all_titles"] = book_titles
        
    books.sort(key=lambda x: x['date_read'], reverse=True)
    print(books, "*"*35)

    if all_books:
        last_book = books[-1]
    else:
        last_book = None

    return jsonify({"books": books, "last_book": last_book})

@app.route("/umbertos-library")
def umbertos_library_page():
    """Display all book titles in database."""
    return render_template("umbertos_library.html")


@app.route("/library")
def library_page():
    """Display all book titles in database."""
    return render_template("library.html")


@app.route("/library/<book_title>")
def book_details(book_title):
    """Specific details about a particular book."""
    book = Book.get_book_by_title(book_title)
    session["title"] = book.title

    date_read = str(book.date_read)[:10]
    notes = book.notes
    
    return render_template("book_details.html", title=book.title, author = book.author, published=book.year_published, read=date_read, rating=book.rating, notes=notes)


@app.route("/api/library/<book_title>/all-notes")
def all_notes(book_title):
    """All notes for a given book."""
    notes = []
    book = Book.get_book_by_title(book_title)

    all_notes = Note.query.filter(Note.book_id == book.book_id).all()

    sorted_notes = sorted(all_notes, key=lambda x:x.note_id)

    for note in sorted_notes:
        new_note = {
            "note_id": note.note_id, 
            "content": note.content,
            "category": note.category,
            "quote": note.quote,
        }
        notes.append(new_note)

    if all_notes:
       last_note = notes[-1]
    else:
        last_note = None

    return jsonify({"notes": notes, "last_note": last_note})



@app.route("/api/library/<book_title>/add-notes", methods=["POST"])
def save_book_notes(book_title):
    """Add and save user-entered notes."""
    book = Book.get_book_by_title(book_title)
    print("BOOK IS: ", book, "*"*20)

    notes = request.json.get("notes")
    print("NOTES ARE: ", book, "*"*20)

    category = request.json.get("category")
    print("CATEGORY IS: ", book, "*"*20)

    new_note = Note.create_note(book, notes)

    new_note.category = category

    db.session.commit()
    print("NEW NOTE: ", new_note.content, "!!!!!!!")

    return jsonify({"noteContent": new_note.content, "noteId": new_note.note_id})


@app.route("/api/library/<book_title>/all-notes", methods=["POST"])
def edit_note(book_title):
    """Edit and save user-entered notes."""
    book_title = request.json.get("book_title") 

    note_id = request.json.get("note_id")
    note_content = request.json.get("note_content")
    note_category = request.json.get("category")

    note_to_edit = Note.query.filter(Note.note_id == note_id).first()

    note_to_edit.content = note_content
    note_to_edit.category = note_category

    print("EDITING: ", note_to_edit.note_id, "*"*20)

    db.session.commit()

    return jsonify({"noteContent": note_to_edit.content, "noteId": note_to_edit.note_id})


@app.route("/api/library/<book_title>", methods=["DELETE"])
def delete_book(book_title):
    """Remove book from library."""
    book_title = request.json.get("book_title")
    
    Book.delete_book(book_title)

    if not Book.get_book_by_title(book_title):
        print("DELETED: ", book_title)
        return jsonify({
        "success": True})
    else:
        return jsonify({
        "success": False})


@app.route("/api/library/<book_title>/<note_id>", methods=["DELETE"])
def delete_note(book_title, note_id):
    """Remove note."""
    book_title = request.json.get("book_title")

    book = Book.get_book_by_title(book_title)
    book_id = book.book_id

    print("TITLE: ",book_title, "*"*25)

    note_id = request.json.get("note_id")

    print("NOTE ID: ", note_id, "*"*25)
    
    Note.delete_note(book_id, note_id)

    if not Note.query.get(note_id):
        print("DELETED: ", note_id)
        return jsonify({
        "success": True})
    else:
        return jsonify({
        "success": False})



if __name__ == "__main__":
    # DebugToolbarExtension(app)
    connect_to_db(app)
    app.run(host="0.0.0.0", port="5001", debug=True)