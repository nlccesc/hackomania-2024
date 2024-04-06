// to provide the tool information 
export async function construct_format_tool_for_claude_prompt(
  name,
  description,
  parameters
) {
  const constructed_prompt = `
    <tool_description>
      <tool_name>${name}</tool_name>
      <description>
        ${description}
      </description>
      <parameters>
        ${await construct_format_parameters_prompt(parameters)}
      </parameters>
    </tool_description>`;

  return constructed_prompt;
}

// to provide the tool parameters
export async function construct_format_parameters_prompt(parameters) {
  const constructedPrompt = parameters.map((parameter) => {
    return `<parameter>\n<name>${parameter.name}</name>\n<type>${parameter.type}</type>\n<description>${parameter.description}</description>\n</parameter>`;
  })
  .join("\n");

  return constructedPrompt;
}

// to provide the client/AI to use the tool
export async function constructToolUseSystemPrompt(tools) {
    const toolUseSystemPrompt = `
      In this environment you have access to a set of tools you can use to answer the user's question.
      
      You may call them like this:
      <function_calls>
        <invoke>
          <tool_name>$TOOL_NAME</tool_name>
          <parameters>
            <$PARAMETER_NAME>$PARAMETER_VALUE</$PARAMETER_NAME>
            ...
          </parameters>
        </invoke>
      </function_calls>
      
      Here are the tools available:
      <tools>
        ${tools.map(tool => tool).join('\n')}
      </tools>`;
  
    return toolUseSystemPrompt;
  }
  