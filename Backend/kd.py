import spacy
from spacy.matcher import Matcher
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from flask import Flask, request, jsonify
import string
import numpy as np
import requests

nlp = spacy.load('en_core_web_sm')
lemmatizer = WordNetLemmatizer

app = Flask(__name__)

def preprocess_text(text):
    text = text.lower()
    text = text.translate(str.maketrans('', '', string.punctuation))
    text = " ".join(text.split())
    text = " ".join([lemmatizer.lemmatize(word) for word in word_tokenize(text)])
    return text

def perform_keyword_detection(text, keywords):
    text = preprocess_text(text)
    keywords = [preprocess_text(keyword) for keyword in keywords]
    matcher = Matcher(nlp.vocab)
    patterns = [[{"LOWER": word} for word in keyword.split()] for keyword in keywords]
    matcher.add("KeywordPattern", patterns)
    doc = nlp(text)
    matches = matcher(doc)
    return [doc[start:end].text for match_id, start, end in matches]

def suggest_new_keywords(detect_keywords, text):
    doc = nlp(text)
    new_keywords = set([token.text for token in doc if token.pos_ == 'NOUN']) - set(detect_keywords)
    return list(new_keywords)

def update_keywords(new_keywords):
    if new_keywords:
        response = request.post("http://localhost:3000/api/Meter", json={"new_keywords": new_keywords})
        if response.status_code == 200:
            return response.json()
        else:
            return {"error": "failure to update keyword list"}
    return {"message": "failure to update."}

def perform_keyword_detection_with_embeddings(text, keywords):
    text = preprocess_text(text)
    keywords = [preprocess_text(keyword) for keyword in keywords]
    doc = nlp(text)
    keyword_docs = [nlp(keyword) for keyword in keywords]
    text_vector = np.mean([word.vector for word in doc if word.has_vector], axis=0)
    keyword_vectors = np.array([np.mean([word.vector for word in keyword_doc if word.has_vector], axis=0) for keyword_doc in keyword_docs])

    if np.any(text_vector) and np.any(keyword_vectors):
        similarities = cosine_similarity([text_vector], keyword_vectors)
        matches = [keywords[i] for i in np.where(similarities>0.5[1])]
        return matches
    return []

def detect_keywords(text, keywords):
    exact_matches = perform_keyword_detection(text, keywords)
    semantic_matches = perform_keyword_detection_with_embeddings(text, keywords)

    suggested_keywords = suggest_new_keywords(exact_matches + semantic_matches, text)
    update_response = update_keywords(suggested_keywords)

    return {
        "exact_matches":exact_matches,
        "semantic_matches": semantic_matches,
        "update_response": update_response
                }