import { Schema } from "mongoose";
import mongoose from 'mongoose';

var word_sentiment = new Schema({
    word: {
      type: String,
      required: true
    },
    sentiment: {
      type:Schema.Types.Decimal128,
      required: true
    },
    
  });
  
  

  mongoose.models = {};
  
  var Word_sentiment = mongoose.model('Word_sentiment', word_sentiment);
  
  export default Word_sentiment;