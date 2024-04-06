import { AzureKeyCredential, OpenAIClient } from "@azure/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { generate_positive_negative_words } from "@/utils/toolMethods";


// tool example
const filter_words = {
  name: "generate_positive_negative_words",
  description: "Locate me the positive and the negative word from the given text",
  parameters: {
    type: "object",
    properties: {
      "positive_words": {
        type: "array",
        description: "An array of postive words from the given text",
        items: {
          type: "string",
        },
      },

      "negative_words": {
        type: "array",
        description: "An array of negative words from the given text",
        items: {
          type: "string",
        },
      },    
    },
    required: ["positive_words", "negative_words"],
  },
};

// Azure OpenAI connection setup
const endpoint = process.env.AZURE_OPENAI_ENDPOINT || "";
const deployment= process.env.AZURE_OPENAI_DEPLOYMENT_MODEL || "";
const credential = new AzureKeyCredential(
  process.env.AZURE_OPENAI_API_KEY || ""
);

// Azure OpenAI connection
const client = new OpenAIClient(endpoint, credential);

// POST request
export async function POST(req) {

  try {
    const { prompt } = await req.json();
    const text = prompt.messages; // Ensure this matches the expected request structure

    const summaryPrompt = `Provide me the positive words and negative words of ${text}`;

    const prompts = [{ role: "user", content: summaryPrompt }];

    const response = await client.streamChatCompletions(deployment, prompts, {
      maxTokens: 500, // lower it if testing
      tools: [
        {
          type: "function",
          function: filter_words,
        }
      ],
      toolChoice: "auto",
    });

    const stream = OpenAIStream(response, {
      experimental_onFunctionCall: async (call, appendToCallMessage)=>{
        if(call.name == "generate_positive_negative_words"){
          const result = generate_positive_negative_words(call.arguments);
          appendToCallMessage(result)
        }
      },
    });

    return new StreamingTextResponse(stream);
  } 
  catch (error) {
    console.log(error)
    // let errorData = null;

    // httpStatusCodes.map((err)=>{
    //   if(err.referenceError === error.message){
    //     errorData = err;
    //   }
    // })


    // return new Response(errorData?.referenceError, {status: errorData?.code});
  }
}