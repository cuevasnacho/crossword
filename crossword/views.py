from flask import render_template, jsonify
from crossword import app
from crossword.database import get_random_words
from crossword.utils import get_words_number, get_syllables


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/get_game")
def get_data():
    n = get_words_number(n=12, var=2)
    words = get_random_words(n)
    syllables = []
    for word, _ in words:
        syllables += get_syllables(word)
    definitions = [d for _, d in words]
    data = {
        "words": [len(w) for w, _ in words],
        "syllables": sorted(syllables),
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
