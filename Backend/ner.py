import spacy
import re
from spacy.matcher import PhraseMatcher
from spacy.tokens import Span
from kw import negkeywords, poskeywords

nlp = spacy.load('en_core_web_sm')

def preprocess_text(text):
    text = text.lower()

    emoticons = r'(?::|;|=)(?:-)?(?:\)|\(|D|P)', re.VERBOSE | re.IGNORECASE
    special_entities = r'\@\#', re.VERBOSE | re.IGNORECASE
    emoticons_pattern = re.compile(r'(?::|;|=)(?:-)?(?:\)|\(|D|P)', re.VERBOSE | re.IGNORECASE)
    special_entities = r'\@\#', re.VERBOSE | re.IGNORECASE
    special_entity_pattern = re.compile(r'\@\#', re.VERBOSE | re.IGNORECASE)

    text = emoticons_pattern.sub('', text)
    text = special_entity_pattern.sub('', text)
    text = ''.join(text.split())

    return text

def extend_entities_with_keywords(doc, keywords):
    matcher = PhraseMatcher(nlp.vocab)
    patterns = [nlp.make_doc(text) for text in keywords]
    matcher.add('KEYWORDS', patterns)

    matches = matcher(doc)
    for match_id, start, end in matches:
        span = Span(doc, start, end, Label="KEYWORD")
        doc.ents = list(doc.ents) + [span]

    return doc

def analyze_ner(text):
    processed_text = preprocess_text
    doc = nlp(processed_text)

    doc = extend_entities_with_keywords(doc, negkeywords + poskeywords)      

    entities = [(entity.text, entity.label_) for entity in doc.ents]
    return {"entities":entities}