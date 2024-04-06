import { constructToolUseSystemPrompt, construct_format_tool_for_claude_prompt } from "../../../utils/anthropicToolHelper";
import Anthropic from "@anthropic-ai/sdk";
import { AnthropicStream, StreamingTextResponse } from "ai";

// Create an Anthropic API client (that's edge friendly)
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});


// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {

  try {
    // // Extract the `prompt` from the body of the request
    const { prompt } = await req.json();
    const { messages: text } = prompt;

    console.log("text: "+text)
    // console.log(url)

    // regex to find any the array when it is surrounded with >[]<

    // tool setting
    const tool_name = "generate_positive_negative_words"
    const tool_description = `Locate me the positive and the negative word used from the given ${text}, if there is none, dont put it, (in JSON format please no html/xml) Just provide me the answer with regex matching ">\[\]<(.*?)>\[\]<"    `
    const parameters = [
      {
        "name": "Positive words",
        "type": "array",
        "description": `An array of postive words from the given ${text}`
      },
      {
        "name": "Negative words",
        "type": "array",
        "description": `An array of negative words from the given ${text}`
      },
    ];

    // blog outline tool
    const tool = await construct_format_tool_for_claude_prompt(tool_name, tool_description, parameters)
    const system_prompt = await constructToolUseSystemPrompt([tool])
  

    // Ask Claud to provide chat completions using tool
    const response = await anthropic.messages.create({
      model:"claude-2.0",
      max_tokens: 4000,
      stream: true,
      messages: [{
        role: "user",
        content: `Locate me the positive and the negative word used from the given ${text}, if there is none, dont put it (in JSON format)`
      }],
      system:system_prompt,
      stop_sequences: ["\n\nHuman:", "\n\nAssistant", "</function_calls>",]
    })
    

    // // Convert the response into a friendly text-stream
    const stream = AnthropicStream(response)

    // // Respond with the stream
    return new StreamingTextResponse(stream);

  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
