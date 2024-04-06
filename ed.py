import torch
import re
import requests
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from flask import Flask, request, jsonify

tokenizer = AutoTokenizer.from_pretrained("bhadresh-savani/distilbert-base-uncased-emotion")
model = AutoModelForSequenceClassification.from_pretrained("bhadresh-savani/distilbert-base-uncased-emotion")

app = Flask(__name__)

def preprocess_text(text):
    emoticons = r'(?::|;|=)(?:-)?(?:\)|\(|D|P)'
    emoticon_pattern = re.compile(r'(?::|;|=)(?:-)?(?:\)|\(|D|P)', re.VERBOSE | re.IGNORECASE)

    emoticon_found = emoticon_pattern.findall(text)
    text = emoticon_pattern.sub('', text)
    text = " ".join(text.split())
    return text

def update_keywords_based_on_emotion(emotion):
    emotion_to_keywords = {
        "anger": ["furious", "angry", "pissed"],
        "joy": ["happy", "elated", "joyful"],
        "sad": ["sadness", "morose", "hurt"]
    }
    new_keywords = emotion_to_keywords.get(emotion, [])
    if new_keywords:

        response = request.post("http://link", json={"new_negative_keywords": new_keywords})
        return response.json()
    return{"message": "No new keywords to update for this emotion. "}

def analyze_emotion():
    text = preprocess_text(text)

    inputs = tokenizer(text, return_tensors="pt", padding = True, truncation = True, max_length=32)

    with torch.no_grad():
        logits = model(**inputs).logits

    probabilities = torch.nn.functional.softmax(logits, dim=1)

    emotion = model.config.id2label[probabilities.argmax().item()]

    return {"emotion": emotion}

    