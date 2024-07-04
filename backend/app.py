from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

translator = pipeline("translation", model="Helsinki-NLP/opus-mt-en-de")
chatbot = pipeline("conversational", model="microsoft/DialoGPT-medium")

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    source_code = data['source_code']
    source_lang = data['source_lang']
    target_lang = data['target_lang']
    # Implement your translation logic here
    translated_code = f"// Translated from {source_lang} to {target_lang}\n{source_code}"
    return jsonify({"translated_code": translated_code})

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data['message']
    # Implement your chatbot logic here
    bot_response = f"You said: {user_message}. I am a bot!"
    return jsonify({"response": bot_response})

if __name__ == '__main__':
    app.run(debug=True)
