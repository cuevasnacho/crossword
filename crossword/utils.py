import re


def split_word_es(word: str):
    word = re.sub(r'([aeiouáéíóúü])([bdfgklmnprstvwxy])', r'\1-\2', word)
    word = re.sub(r'([bdfgklmnprstvwxy])([aeiouáéíóúü])', r'\1-\2', word)
    word = re.sub(r'([aeiouáéíóúü])([aeiouáéíóúü])', r'\1-\2', word)
    return word
