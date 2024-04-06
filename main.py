import kd
import ed
import sa
import ner
from flask import Flask, request, jsonify, render_template
from sa import analyze_text_corpus

app = Flask(__name__, template_folder='.')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/detect_keywords', methods=['POST'])
def detect_keywords():
    data = request.get_json()
    text = data.get('text')
    keywords = data.get('keywords')

@app.route('/analyze_ner', methods=['POST'])
def analyze_ner_route():
    data = request.get_json()
    if 'text' not in data:
        return jsonify({"error: Missing 'text' field in request body"}), 400

    text = data['text']
    result = ner.analyze_ner(text)
    return jsonify(text)

@app.route('/analyze_sentiment', methods=['POST'])
def analyze_sentiment():
    data = request.get_json()
    if 'text' not in data:
        return jsonify ({"error: Missing 'text' field in request body "}), 400
    text = data['text']
    return jsonify(sa.analyze_sentiment(text))

@app.route('/analyze_corpus_sentiments', methods=['POST'])
def analyze_corpus_sentiments():
    sentiment_analysis_results = analyze_text_corpus()
    return jsonify(sentiment_analysis_results)

@app.route('/analyze_corpus', methods=['POST'])
def analyze_corpus_route():
    combined_statements = {**sa.negstatements, **sa.posstatements}
    sentiment_scores = sa.analyze_corpus(combined_statements)
    return jsonify(sentiment_scores)

@app.route('/analyze_emotion', methods=['POST'])
def analyze_emotion():
    data = request.get_json()
    if 'text' not in data:
        return jsonify({"error: Missing 'text' field in request body "}), 400
    text = data['text']
    return jsonify(ed.analyze_sentiment(text))

@app.route('/update_keywords', method=['POST'])
def update_keywords():
    data = request.get_json()
    if not all(key in data for key in ['new_negkeywords', 'new_poskeywords', 'new_negstatements', 'new_posstatements']):
        return jsonify({"error. Missing one or more required fields"}), 400
    
    sa.negkeywords.extend(data['new_negkeywords'])
    sa.poskeywords.extend(data['new_poskeywords'])
    sa.negstatements.extend(data['new_negstatements'])
    sa.posstatements.extend(data['new_posstatements'])

    return jsonify(["message: keywords and statements updated successfully"])

if __name__ == '__main__':
    app.run(debug=True)


