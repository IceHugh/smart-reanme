import * as vscode from 'vscode';
import { generateAiNameSuggestions } from './ai';
import {
  EXTENSION_NAME,
  API_KEY_CONFIG_KEY,
  BASE_URL_CONFIG_KEY,
  MODEL_CONFIG_KEY,
  Command,
} from './constant';

async function generateAndReplace(
  editor: vscode.TextEditor,
  selection: vscode.Selection,
  selectedText: string,
  languageId: string
) {
  try {
    const newName = await generateAiNameSuggestions(selectedText, languageId);
    await editor.edit((editBuilder) => {
      editBuilder.replace(selection, newName);
    });
  } catch (error) {
    vscode.window.showErrorMessage(
      `Error generating AI name suggestions: ${error}`
    );
  }
}

export function activate(context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration(EXTENSION_NAME);

  const setApiKeyCommand = vscode.commands.registerCommand(
    Command.SET_API_KEY,
    async () => {
      const apiKey = await vscode.window.showInputBox({
        prompt: 'Enter your OpenAI API Key',
        ignoreFocusOut: true,
        password: true,
      });

      if (apiKey) {
        await config.update(API_KEY_CONFIG_KEY, apiKey, true);
        vscode.window.showInformationMessage('API Key set successfully!');
      }
    }
  );

  const setBaseUrlCommand = vscode.commands.registerCommand(
    Command.SET_BASE_URL,
    async () => {
      const baseUrl = await vscode.window.showInputBox({
        prompt: 'Enter the OpenAI API base URL',
        ignoreFocusOut: true,
        value: config.get<string>(
          BASE_URL_CONFIG_KEY,
          'https://api.openai.com'
        ),
      });

      if (baseUrl) {
        await config.update(BASE_URL_CONFIG_KEY, baseUrl, true);
        vscode.window.showInformationMessage(`Base URL set to: ${baseUrl}`);
      }
    }
  );

  const setModelCommand = vscode.commands.registerCommand(
    Command.SET_MODEL,
    async () => {
      const model = await vscode.window.showInputBox({
        prompt: 'Enter the AI model to use (e.g., gpt-4o-mini)',
        ignoreFocusOut: true,
        value: config.get<string>(MODEL_CONFIG_KEY, 'gpt-4o-mini'),
      });

      if (model) {
        await config.update(MODEL_CONFIG_KEY, model, true);

        vscode.window.showInformationMessage(`AI Model set to: ${model}`);
      }
    }
  );

  context.subscriptions.push(
    setApiKeyCommand,
    setBaseUrlCommand,
    setModelCommand
  );

  const renameCommand = vscode.commands.registerCommand(
    Command.RENAME,
    async () => {
      const newConfig = vscode.workspace.getConfiguration(EXTENSION_NAME);
      const apiKey = newConfig.get<string>(API_KEY_CONFIG_KEY);
      console.log(apiKey);

      if (!apiKey) {
        const result = await vscode.window.showWarningMessage(
          'LLM API Key is not set. Would you like to set it now?',
          'Yes',
          'No'
        );

        if (result === 'Yes') {
          await vscode.commands.executeCommand(Command.SET_API_KEY);
        }
        return;
      }

      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const languageId = editor.document.languageId;
        console.log(languageId);

        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        if (!selectedText) {
          vscode.window.showErrorMessage('No text selected.');
          return;
        }

        await generateAndReplace(editor, selection, selectedText, languageId);
      }
    }
  );

  context.subscriptions.push(renameCommand);
}

export function deactivate() {}
