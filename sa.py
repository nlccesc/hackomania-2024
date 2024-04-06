import re
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from kw import negkeywords, poskeywords
from tc import negstatements, posstatements

sia = SentimentIntensityAnalyzer()
emoticon_pattern=re.compile(r'(?::|;|=)(?:-)?(?:\)|\(|D|P)', re.VERBOSE | re.IGNORECASE)
special_entities_pattern=re.compile(r'\@\#', re.VERBOSE | re.IGNORECASE)


def preprocess_text(text):
    emoticons_found = emoticon_pattern.findall(text)
    text = emoticon_pattern.sub('', text)
    text = ''.join(text.split())
    return text

def enhance_compound_score(text, base_compound_score):
    tokens = nltk.word_tokenize(text.lower())
    keyword_score = sum([1 if token in poskeywords else -1 if token in negkeywords else 0 for token in tokens])
    return base_compound_score + keyword_score * 0.1

def perform_enhanced_sentiment_analysis(text):
    preprocessed_text = preprocess_text(text)
    vader_scores = sia.polarity_scores(preprocessed_text)
    enhanced_compound_score = enhance_compound_score(preprocessed_text, vader_scores['compound'])
    return dict(vader_scores, enhanced_compound = enhanced_compound_score)

def analyze_keyword(text):
    return perform_enhanced_sentiment_analysis(text)

def analyze_keywords(keywords):
    return {keyword: perform_enhanced_sentiment_analysis(keyword) for keyword in keywords}

def analyze_all_keywords():
    negkeywords_analysis = analyze_keywords(negkeywords)
    poskeywords_analysis = analyze_keywords(poskeywords)
    return {"negative": negkeywords_analysis, "positive": poskeywords_analysis}

def analyze_corpus(statements):
    return {text_id: perform_enhanced_sentiment_analysis(text) for text_id, text in enumerate(statements)}

def analyze_text_corpus():
    analyzed_negstatements = analyze_corpus(negstatements)
    analyzed_posstatements = analyze_corpus(posstatements)

    return {
        "negative": analyzed_negstatements,
        "positive": analyzed_posstatements
    }

sentiment_scores_statements = analyze_text_corpus()
sentiment_scores_keywords = analyze_all_keywords()

print("Sentiment scores for statements:")
print(sentiment_scores_statements)
print("\nSentiment scores for keywords:")
print(sentiment_scores_keywords)
