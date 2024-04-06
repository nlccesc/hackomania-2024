import requests
from flask import current_app as app
from kw import negkeywords, poskeywords
from tc import negstatements, posstatements

def send_update_keyword(new_negkeywords, new_poskeywords,
                        new_negstatements, new_posstatements):
    url = "http://127.0.0.1:5000/update_keywords"
    data = {
        'new_negkeywords': new_negkeywords,
        'new_poskeywords': new_poskeywords,
        'new_negstatements': new_negstatements,
        'new_posstatements': new_posstatements
            }
    
    # test case
    try: 
        response = requests.post(url, json=data)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}");

if __name__ == '__main__':
    new_negkeywords = ["example_neg_keyword1", "example_neg_keyword1"]
    new_poskeywords = ["example_pos_keyword1", "example_pos_keyword1"]
    new_negstatements = ["example_neg_statement1", "example_neg_statement1"]
    new_posstatements = ["example_pos_statement1", "example_pos_statement1"]

    response = send_update_keyword(new_negkeywords, new_poskeywords, 
                                   new_negstatements, new_posstatements)
    print(response)
