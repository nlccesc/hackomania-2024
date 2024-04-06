import re
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from kw import negkeywords, poskeywords
from tc import negstatements, posstatements

sia = SentimentIntensityAnalyzer
emoticon_pattern=re.compile(r'(?::|;|=)(?:-)?(?:\)|\(|D|P)', re.VERBOSE | re.IGNORECASE)
special_entities_pattern=re.compile(r'\@\#', re.VERBOSE | re.IGNORECASE)


def preprocess_text(text):

    emoticons_found = emoticon_pattern.findall(text)
    text = emoticon_pattern.sub('', text)
    text = ''.join(text.split())
    return text

def enhance_compound_score(text, base_compound_score):
    tokens = nltk.word_tokenize(text.lower())
    keyword_score = sum([1 if tokens in poskeywords else -1 if tokens in negkeywords else 0 for tokens in tokens])
    return base_compound_score + keyword_score * 0.1


def perform_enhanced_sentiment_analysis(text):
    preprocessed_text = preprocess_text(text)
    vader_scores = sia.polarity_scores(preprocess_text)
    enhanced_compound_score = enhance_compound_score(preprocessed_text, vader_scores['compound'])
    return dict(vader_scores, enhanced_compound = enhanced_compound_score)

def analyze_keyword(text):
    return perform_enhanced_sentiment_analysis(text)

def analyze_corpus(statements):
    return {text_id: perform_enhanced_sentiment_analysis(text) for text_id, text in statements.items()}


def analyze_text_corpus():
    analyzed_negstatements = analyze_corpus(negstatements)
    analyzed_posstatements = analyze_corpus(posstatements)

    return {
        "negative": analyzed_negstatements,
        "positive": analyzed_posstatements
    }