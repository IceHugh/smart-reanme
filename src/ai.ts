import * as vscode from 'vscode';
import {
  EXTENSION_NAME,
  API_KEY_CONFIG_KEY,
  BASE_URL_CONFIG_KEY,
  MODEL_CONFIG_KEY,
} from './constant';

export async function generateAiNameSuggestions(
  selectedText: string,
  languageId: string
): Promise<string> {
  const config = vscode.workspace.getConfiguration(EXTENSION_NAME);
  const apiKey = config.get<string>(API_KEY_CONFIG_KEY);
  const model = config.get<string>(MODEL_CONFIG_KEY);
  const baseUrl = config.get<string>(BASE_URL_CONFIG_KEY);
  if (!apiKey || !model || !baseUrl) {
    throw new Error('API key, model, or base URL is not set');
  }

  const requestBody = {
    model,
    temperature: 0.5,
    max_tokens: 512,
    messages: [
      {
        role: 'user',
        content: `你是一位专业的代码命名顾问，你的任务是根据提供的描述或现有名称，优化生成一个更加简洁、易懂且符合英语编程习惯的变量名或函数名。以下是一些指导原则： 
        1. 名称应该是描述性的，能够清楚地表达变量或函数的用途或含义。 
        2. 名称应该遵循驼峰命名法（CamelCase）或蛇形命名法（snake_case），具体取决于编程语言的习惯。 
        3. 使用一些常见的单词缩写或拼写，如“id”、“url”、“ip”、“xml”、“fun”等。 
        4. 避免使用拼音。 
        5. 考虑名称的可读性。 
        6. 名称应该避免与关键字、保留字或已存在的变量名、函数名冲突。 
        7. 名称应该避免使用易混淆的字符，如“l”、“1”、“O”等。 
        8. 名称应该避免使用过长的名称,尽量保持简短，考虑使用简写或者程序员常用的单词缩写，去掉可以忽略的单词。 
        9. 名称应该避免使用无意义的单词，如“temp”、“result”、“data”等。 
        10. 参考大型开源项目的命名规范，如JavaScript、Python、Java等。

        现在，请根据以下描述生成一个合适的名称： 
         -- 现有名称或者描述: ${selectedText} 
         -- 当前代码语言：${languageId}

        只返回重新生成的变量名或者函数名，请不要提供其他建议，返回内容不包含标点符合以及无意义的字符。`,
      },
    ],
  };

  const controller = new AbortController();
  const signal = controller.signal;

  // 设置超时时间为10秒
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${baseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
      signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`OpenAI API request failed with status ${response.status}`);
    }

    const completion = (await response.json()) as any;
    return completion.choices[0].message.content as unknown as string;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  }
}
