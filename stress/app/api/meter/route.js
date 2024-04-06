
export async function POST(req){
    const {text_corpus} = await req.json()
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    console.log(text_corpus)
  
    var raw = JSON.stringify({
      text_corpus: text_corpus,
    });
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      mode: 'no-cors'
    };
  
    const response = await fetch("http://localhost:5000/analyze_corpus_sentiments", requestOptions)
    const data = await response.json();

    // console.log(data)

    return new Response(JSON.stringify({data}))
    

};


