import connectDB from '../../../utils/connectDB';
import Word_sentiment from '@/utils/models/word_sentiment';

export async function handler(req,res){
    if(req.method === 'POST'){
        const {word, sentiment} = req.body;
        if(word, sentiment){
            try{
                let wordSentiment = new Word_sentiment({
                    word,
                    sentiment
                })

                var wordSentimentCreated = await wordSentiment.save();
                return res.status(200).send(wordSentimentCreated);

            } catch(err){                
                console.log("error saving to db", err)
                return res.status(500).send(err.message);
            }
        }else{
            res.status(422).send('data_incomplete');

        }
    }
    else{
        res.status(422).send('req_method_not_supported');
    }
}

export default connectDB(handler);



