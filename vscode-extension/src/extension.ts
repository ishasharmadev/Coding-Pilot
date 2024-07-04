import * as vscode from 'vscode';
import axios from 'axios';

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension "code-translator" is now active!');

    let translateDisposable = vscode.commands.registerCommand('extension.translateCode', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const sourceCode = editor.document.getText(editor.selection);
            const sourceLang = 'python'; // Example, make this configurable
            const targetLang = 'java'; // Example, make this configurable

            try {
                const response = await axios.post('http://localhost:5000/translate', {
                    source_code: sourceCode,
                    source_lang: sourceLang,
                    target_lang: targetLang
                });

                const translatedCode = response.data.translated_code;
                vscode.window.showInformationMessage('Translation successful!');
                editor.edit(editBuilder => {
                    editBuilder.replace(editor.selection, translatedCode);
                });
            } catch (error) {
                vscode.window.showErrorMessage('Translation failed!');
            }
        }
    });

    let chatDisposable = vscode.commands.registerCommand('extension.chatWithBot', async () => {
        const userMessage = await vscode.window.showInputBox({ prompt: 'Ask the chatbot a question:' });
        if (userMessage) {
            try {
                const response = await axios.post('http://localhost:5000/chat', { message: userMessage });
                const botResponse = response.data.response;
                vscode.window.showInformationMessage(botResponse);
            } catch (error) {
                vscode.window.showErrorMessage('Chat failed!');
            }
        }
    });

    context.subscriptions.push(translateDisposable);
    context.subscriptions.push(chatDisposable);
}

export function deactivate() {}
