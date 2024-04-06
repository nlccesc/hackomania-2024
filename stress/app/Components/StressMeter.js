"use client";
import React, { useEffect, useState } from "react";
import Meter from "./Meter";
import Meter2 from "./Meter2";
import Input from "./Input";
import {useCompletion} from "ai/react"
import Notification from "./Notification";

const StressMeter = () => {

  const [text, setText] = useState("");
  const [meter, setMeter] = useState(1);
  const [data, setData] = useState(null)
  const [meterValue, setMeterValue] = useState(0);

  const [posCounter, setPosCounter] = useState(0)
  const [negCounter, setNegCounter] = useState(0)

    // useCompletion setting 
    const { complete, completion, handleInputChange, isLoading } = useCompletion({
      api: "/api/anthropic",
      
      // error handling
      onError: (err) => {
        const error = "AI is not able to produce a result at the moment, please try again later"
        console.log("error: " + err);
  
        // add toast
      },
  
      onFinish: (prompt, completion) => {
        console.log("prompt", prompt);
        console.log("completion", completion);
        const positive_pattern = /<Positive_words>\[(.*?)\]<\/Positive_words>/;
        const negative_pattern = /<Negative_words>\[(.*?)\]<\/Negative_words>/;
        const pos_data = completion.match(positive_pattern)[1];
        const neg_data = completion.match(negative_pattern)[1];

        if(pos_data.includes(",")){
          setPosCounter(pos_data.split(",").length)
        }else{
          setPosCounter(1)
        }
        console.log(posCounter)


        if(neg_data.includes(",")){
          setPosCounter(neg_data.split(",").length)
        }else{
          setPosCounter(1)
        }
        console.log(negCounter)
        // add success
      },
    });
  

  // --------------------------------ANTRHOPIC API CALLS------------------------------------------------
  async function handleAnalyse(text) {
    try {

      // AZURE AI to generate positive and negative words
      await complete({messages: text});

      

      const response = await fetch("/api/meter", {
        method: "POST",
        body: JSON.stringify({ text_corpus: text }),
      });

      // NLP static words
      const { data } = await response.json();
      const pos = data.positive_sentiment_count
      const neg = data.negative_sentiment_count
      
      let rating = 0;
      
      // -------------------------------------------------------------------------------------------
      
      if(pos > 0 && neg > 0){
        rating = 1 + (neg / (pos + neg)) * 9; 
      }
      if(pos > neg && neg == 0){
        rating = 1;
      }

      if(neg > pos && pos == 0){
        rating = 11;
      }
      // else{
      //   if (pos > 0) rating = -pos;
      //   if (neg > 0) rating = neg
      // }
      setMeterValue(Math.floor(rating))

      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  }

 


  const handleTextSubmit = async (text) => await handleAnalyse(text);
  

  return (
    <div className="w-full border border-solid my-10 p-20 rounded-3xl">
      <p>{JSON.stringify(data)}</p>
      <Notification value={meterValue}/>
      <button
        onClick={() => setMeter(1)}
        className="px-3 py-2 m-2 bg-gray-200 rounded-lg"
      >
        V1
      </button>
      <button
        onClick={() => setMeter(2)}
        className="px-3 py-2 bg-gray-200 rounded-lg"
      >
        V2
      </button>

      <Input
        text={text}
        setText={setText}
        handleTextSubmit={handleTextSubmit}
        isLoading={isLoading}
      />
      {meter == 1 ? <Meter2 value={meterValue} /> : <Meter value={meterValue} />}
      {/* <p>{completion}</p> */}
      
     
    </div>
  );
};

export default StressMeter;

// To aggregate the final data and get a rating between 1 (all good) and 10 (worse), you can follow a simple normalization process. Here's a basic method you can use:

// 1. Calculate the total sentiment count by adding the positive sentiment count and negative sentiment count.
// 2. Determine the ratio of positive sentiment count to the total sentiment count. This ratio represents the proportion of positive sentiments in the data.
// 3. Scale this ratio to fit within the range of 1 to 10.

// Here's the formula:

// \[ \text{Rating} = 1 + (\text{Positive Sentiment Ratio}) \times 9 \]

// Let's apply this to your data:

// 1. Total sentiment count = negative_sentiment_count + positive_sentiment_count
//    Total sentiment count = 5 + 2 = 7

// 2. Positive sentiment ratio = positive_sentiment_count / total_sentiment_count
//    Positive sentiment ratio = 2 / 7 ≈ 0.2857

// 3. Rating = 1 + (0.2857) * 9 ≈ 3.571

// Round this to an integer value to fit within the range of 1 to 10. So, the final rating would be approximately 4.