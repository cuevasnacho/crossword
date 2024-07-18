from flask import render_template, jsonify
from crossword import app
from crossword.database import get_random_words


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/get_game")
def get_data():
    words = [4, 5, 7, 5, 8, 4, 6]
    syllables = 10*["ab"]
    definitions = len(words)*["def"]
    data = {
        "words": words,
        "syllables": syllables,
        "definitions": definitions
    }
    return jsonify(data)

@app.route("/api/<id>/<word_number>/<word>", methods=["GET"])
def is_correct_answer(id, word_number, word):
    data = {
        "word_number": 1,
        "is_correct": True
    }
    return data

@app.route("/api/random_words", methods=["GET"])
def get_words():
    n = 2
    words = get_random_words(n)
    words_list = [{'word': row['word'], 'definition': row['definition']} for row in words]
    return jsonify(words_list)
