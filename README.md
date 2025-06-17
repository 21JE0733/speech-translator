# Real-Time Speech Translator

A powerful web application that enables real-time speech-to-text translation with text-to-speech capabilities. Built with React.js and Google Cloud APIs.

## 🌟 Features

- Real-time speech-to-text conversion
- Support for 100+ languages
- Text-to-speech output
- Manual text input translation
- Automatic language detection
- Responsive design
- Cross-browser compatibility

## 🛠️ Tech Stack

- **Frontend:** React.js, Material-UI, CSS3
- **APIs:** Google Cloud (Speech-to-Text, Translation, Text-to-Speech)
- **Tools:** Node.js, Git, ESLint
- **Libraries:** react-speech-recognition, @mui/material, @emotion/react

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Cloud account with enabled APIs

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/speech-translator.git
cd speech-translator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your Google Cloud credentials:
```
REACT_APP_GOOGLE_CLOUD_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

## 📝 Usage

1. Click the microphone icon to start speech recognition
2. Speak in your preferred language
3. The app will transcribe your speech and translate it to the selected target language
4. Click the speaker icon to hear the translation

## 🔧 Configuration

- Supported languages can be configured in the `src/config/languages.js` file
- API endpoints and settings can be modified in the respective service files

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Cloud Platform for providing the APIs
- React.js community for the amazing framework
- Material-UI for the beautiful components
