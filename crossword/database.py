from crossword import get_db


def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv

def get_random_words(n: int):
    db = get_db()
    random_words = db.execute("""
        SELECT word, definition
        FROM dictionary
        ORDER BY RANDOM()
        LIMIT ?
    """, (n,)).fetchall()
    return random_words
