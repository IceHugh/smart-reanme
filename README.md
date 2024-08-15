# SmartRename

**SmartRename** is a Visual Studio Code extension that intelligently suggests variable and function names using AI. With the help of OpenAI's powerful models, you can quickly rename your code elements to be more descriptive, consistent, and meaningful.

## Features

- **AI-Powered Renaming**: Automatically generate meaningful variable and function names based on selected code.
- **Customizable AI Model**: Choose the AI model that best fits your needs.
- **Base URL Configuration**: Set a custom base URL for the OpenAI API.
- **Inline Suggestions**: Preview suggested names directly in your code before accepting.
- **Quick Regeneration**: Easily regenerate new names with a click if the first suggestion doesn't fit.

## Installation

1. **Install the extension**:
   - Search for "SmartRename" in the VS Code Extensions Marketplace and install it.
   - Alternatively, you can install it by running:
     ```
     ext install your-extension-id
     ```

2. **Set your OpenAI API Key**:
   - Run the command `SmartRename: Set API Key` from the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac).
   - Enter your OpenAI API Key when prompted.

3. **Optional: Configure Base URL and AI Model**:
   - You can set a custom Base URL and select an AI model by editing the extension settings in the VS Code settings panel.

## Usage

1. **Rename a Variable or Function**:
   - Select the variable or function name you want to rename.
   - Right-click and choose `SmartRename: Rename Variable` from the context menu or use the shortcut `Ctrl+Alt+N` (`Cmd+Alt+N` on Mac).
   - A preview of the new name will appear in your code.
   - If satisfied, accept the suggestion or click the regenerate button to get a new suggestion.

2. **Regenerate a Name**:
   - If you're not happy with the generated name, you can regenerate a new name by clicking the refresh button in the inline suggestion or using the `SmartRename: Refresh Name` command.

## Commands

- **SmartRename: Rename Variable**: Generates a new name for the selected variable or function.
- **SmartRename: Set API Key**: Sets your OpenAI API Key.
- **SmartRename: Set Base URL**: Configures a custom base URL for the OpenAI API.
- **SmartRename: Set AI Model**: Chooses the AI model for name generation.
- **SmartRename: Refresh Name**: Regenerates a new name based on the previously selected text.

## Configuration

You can customize the behavior of the extension by configuring the following settings in the VS Code settings panel:

- **`smart-rename.openaiApiKey`**: Your OpenAI API Key (required).
- **`smart-rename.baseUrl`**: The base URL for the OpenAI API (default: `https://api.openai.com`).
- **`smart-rename.model`**: The AI model to use for generating names (default: `gpt-4o-mini`).

## Keybindings

- **`Ctrl+Alt+R`** (`Cmd+Alt+R` on Mac): Trigger the SmartRename command for renaming variables or functions.

## Contributing

Contributions are welcome! If you have any ideas, issues, or suggestions, feel free to open an issue or submit a pull request on GitHub.

## License

This extension is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

