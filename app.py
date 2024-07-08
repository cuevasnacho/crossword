from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/get_game')
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

@app.route('/api/<id>/<word_number>/<word>', methods=['GET'])
def is_correct_answer(id, word_number, word):
    data = {
        "word_number": 1,
        "is_correct": True
    }
    return data

if __name__ == '__main__':
    app.run(debug=True)
