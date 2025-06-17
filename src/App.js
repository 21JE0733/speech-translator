import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { FaRegCopy, FaVolumeUp, FaCheck, FaTimes } from 'react-icons/fa';

// Unique SVG icons (inline for demo, you can replace with imports from a library)
const MicIcon = ({ className }) => (
  <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>
);
const KeyboardIcon = ({ className }) => (
  <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M10 14h.01M14 14h.01M18 14h.01"/></svg>
);
const PauseIcon = ({ className }) => (
  <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
);
const StopIcon = ({ className }) => (
  <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
);
const PlayIcon = ({ className }) => (
  <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
);

// Country flags for each language (emoji for simplicity)
const languageFlags = {
  'en-US': '🇺🇸',
  'hi-IN': '🇮🇳',
  'es-ES': '🇪🇸',
  'fr-FR': '🇫🇷',
  'de-DE': '🇩🇪',
  'it-IT': '🇮🇹',
  'pt-BR': '🇧🇷',
  'ja-JP': '🇯🇵',
  'ko-KR': '🇰🇷',
  'zh-CN': '🇨🇳',
  'ru-RU': '🇷🇺',
  'ar-SA': '🇸🇦',
  'tr-TR': '🇹🇷',
};

// ZooZoo SVG (simple cartoon, can be improved)
const ZooZoo = ({ speaking, style, lang }) => (
  <div className={`zoozoo ${speaking ? 'speaking' : ''}`} style={style} title={lang}>
    <svg width="120" height="160" viewBox="0 0 60 80" fill="none">
      <ellipse cx="30" cy="30" rx="28" ry="28" fill="#fff" stroke="#222" strokeWidth="3"/>
      <ellipse cx="20" cy="28" rx="4" ry="6" fill="#222"/>
      <ellipse cx="40" cy="28" rx="4" ry="6" fill="#222"/>
      <ellipse cx="30" cy="50" rx="10" ry="6" fill="#fff" stroke="#222" strokeWidth="2"/>
      <ellipse cx="30" cy="50" rx={speaking ? 10 : 7} ry={speaking ? 6 : 3} fill="#fff" stroke="#222" strokeWidth="2" data-mouth="true"/>
      <ellipse cx="30" cy="70" rx="12" ry="6" fill="#fff" stroke="#222" strokeWidth="2"/>
    </svg>
    <div className="zoozoo-lang">{lang}</div>
    {speaking && <div className="zoozoo-bubble">💬</div>}
  </div>
);

// Animated background component (12 visually distinct letters, evenly spaced)
const languageCircleLetters = [
  { char: 'A', lang: 'English' },      // English
  { char: 'अ', lang: 'Hindi' },       // Hindi
  { char: 'B', lang: 'Spanish' },     // Spanish
  { char: 'Ç', lang: 'French' },      // French
  { char: 'ß', lang: 'German' },      // German
  { char: 'È', lang: 'Italian' },     // Italian
  { char: 'Õ', lang: 'Portuguese' },  // Portuguese
  { char: 'あ', lang: 'Japanese' },    // Japanese
  { char: '가', lang: 'Korean' },     // Korean
  { char: '文', lang: 'Chinese' },    // Chinese
  { char: 'Я', lang: 'Russian' },     // Russian
  { char: 'م', lang: 'Arabic' },      // Arabic
  { char: 'Ş', lang: 'Turkish' },    // Turkish
];

const AnimatedBackground = () => {
  const chars = languageCircleLetters;
  const N = chars.length;
  // Dynamically increase radius for more letters
  const baseRadius = 60;
  const radius = Math.max(baseRadius, 85 + (N - 12) * 4); // 85vw for 13+ letters, scale up if more
  return (
    <div className="animated-bg">
      <div className="circle-bg">
        {chars.map((item, i) => {
          const angle = (360 / N) * i;
          const delay = -(40 / N) * i;
          return (
            <span
              key={i}
              className="bg-char glitter"
              style={{
                transform: `rotate(${angle}deg) translateX(${radius}vw)`,
                animationDelay: `${delay}s`,
              }}
              title={item.lang}
            >
              {item.char}
            </span>
          );
        })}
      </div>
    </div>
  );
};

// Quotes in different languages
const quotes = [
  { lang: 'English', text: 'Translation unites people of different languages.', author: 'MultiLing' },
  { lang: 'Hindi', text: 'अनुवाद विभिन्न भाषाओं के लोगों को एकजुट करता है।', author: 'मल्टीलिंग' },
  { lang: 'Spanish', text: 'La traducción une a personas de diferentes idiomas.', author: 'MultiLing' },
  { lang: 'French', text: 'La traduction unit les personnes de différentes langues.', author: 'MultiLing' },
  { lang: 'German', text: 'Übersetzung vereint Menschen verschiedener Sprachen.', author: 'MultiLing' },
  { lang: 'Chinese', text: '翻译让不同语言的人们团结在一起。', author: 'MultiLing' },
  { lang: 'Arabic', text: 'الترجمة توحد الناس من لغات مختلفة.', author: 'MultiLing' },
  { lang: 'Russian', text: 'Перевод объединяет людей разных языков.', author: 'MultiLing' },
  { lang: 'Japanese', text: '翻訳は異なる言語の人々を結びつけます。', author: 'MultiLing' },
  { lang: 'Korean', text: '번역은 다양한 언어의 사람들을 하나로 만듭니다.', author: 'MultiLing' },
];

// Multilingual welcome messages for the typewriter
const welcomeMessages = [
  { text: "Welcome to MultiLing! Bridging languages, connecting worlds.", lang: 'English' },
  { text: "मल्टीलिंग में आपका स्वागत है! भाषाओं को जोड़ना, दुनिया को जोड़ना।", lang: 'Hindi' },
  { text: "¡Bienvenido a MultiLing! Uniendo idiomas, conectando mundos.", lang: 'Spanish' },
  { text: "Bienvenue sur MultiLing ! Relier les langues, connecter les mondes.", lang: 'French' },
  { text: "Willkommen bei MultiLing! Sprachen verbinden, Welten verbinden.", lang: 'German' },
  { text: "Benvenuto su MultiLing! Unire le lingue, connettere i mondi.", lang: 'Italian' },
  { text: "Bem-vindo ao MultiLing! Unindo idiomas, conectando mundos.", lang: 'Portuguese' },
  { text: "マルチリングへようこそ！言語をつなぎ、世界をつなぐ。", lang: 'Japanese' },
  { text: "멀티링에 오신 것을 환영합니다! 언어를 잇고, 세상을 연결합니다.", lang: 'Korean' },
  { text: "欢迎来到MultiLing！连接语言，连接世界。", lang: 'Chinese' },
  { text: "Добро пожаловать в MultiLing! Объединяя языки, соединяя миры.", lang: 'Russian' },
  { text: "مرحبًا بك في MultiLing! ربط اللغات وربط العوالم.", lang: 'Arabic' },
];

// Typewriter Welcome Component (multilingual)
function TypewriterWelcome() {
  const [msgIdx, setMsgIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);
  const message = welcomeMessages[msgIdx].text;

  useEffect(() => {
    if (pause) {
      const timeout = setTimeout(() => setPause(false), 1200);
      return () => clearTimeout(timeout);
    }
    if (!deleting && idx < message.length) {
      const timeout = setTimeout(() => {
        setDisplayed(message.slice(0, idx + 1));
        setIdx(idx + 1);
      }, 110);
      return () => clearTimeout(timeout);
    } else if (!deleting && idx === message.length) {
      setPause(true);
      setDeleting(true);
    } else if (deleting && idx > 0) {
      const timeout = setTimeout(() => {
        setDisplayed(message.slice(0, idx - 1));
        setIdx(idx - 1);
      }, 30);
      return () => clearTimeout(timeout);
    } else if (deleting && idx === 0) {
      setDeleting(false);
      setMsgIdx((msgIdx + 1) % welcomeMessages.length);
    }
  }, [idx, deleting, pause, message, msgIdx]);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      fontFamily: 'Inter, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '1.1rem',
      color: 'rgba(255,255,255,0.7)',
      margin: 0,
      padding: '1.5rem 0 0.5rem 0',
      letterSpacing: '0.5px',
      textAlign: 'center',
      textShadow: '0 2px 8px #0004',
      whiteSpace: 'pre',
      zIndex: 100
    }}>
      {displayed}
      <span className="typewriter-cursor" style={{ color: 'rgba(255,255,255,0.7)' }}>|</span>
    </div>
  );
}

// Add a swap icon component
const SwapIcon = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Swap languages"
    style={{
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      margin: '0 0.5em',
      fontSize: '2rem',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.2s',
    }}
    title="Swap languages"
  >
    {/* Unicode double arrow or SVG */}
    <span style={{ filter: 'drop-shadow(0 2px 4px #0008)' }}>⇄</span>
  </button>
);

function RotatingQuote({ useWelcomeMessages = false }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const data = useWelcomeMessages ? welcomeMessages : quotes;
  const item = data[idx];

  useEffect(() => {
    let timeout;
    if (!deleting && charIdx < item.text.length) {
      timeout = setTimeout(() => {
        setDisplayed(item.text.slice(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      }, 40);
    } else if (!deleting && charIdx === item.text.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplayed(item.text.slice(0, charIdx - 1));
        setCharIdx(charIdx - 1);
      }, 15);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setIdx((idx + 1) % data.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, item.text, idx, data]);

  return (
    <div className="rotating-quote">
      <q>
        {displayed}
        <span className="typewriter-cursor" style={{
          display: 'inline-block',
          width: '1ch',
          animation: 'blink 1s steps(1) infinite'
        }}>|</span>
      </q>
      <div className="quote-author">— {item.lang ? `MultiLing (${item.lang})` : ''}</div>
      <style>
        {`@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }`}
      </style>
    </div>
  );
}

// Add this function near the top-level helpers
function isLikelyEnglish(text) {
  const commonEnglishWords = ['the', 'is', 'and', 'of', 'to', 'in', 'that', 'it', 'for', 'on', 'with', 'as', 'was', 'at', 'by', 'an', 'be', 'this', 'have', 'from', 'or', 'one', 'had', 'but', 'not', 'what', 'all', 'were', 'we', 'when', 'your', 'can', 'there', 'use', 'how', 'said', 'each', 'she'];
  const lower = text.toLowerCase();
  let count = 0;
  for (const word of commonEnglishWords) {
    if (lower.includes(` ${word} `) || lower.startsWith(word + ' ') || lower.endsWith(' ' + word) || lower === word) {
      count++;
    }
  }
  return count >= 2;
}

// Add the TypewriterPrompt component near the top of the file
function TypewriterPrompt({ text }) {
  const [displayed, setDisplayed] = React.useState('');
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    if (idx < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, idx + 1));
        setIdx(idx + 1);
      }, 45);
      return () => clearTimeout(timeout);
    }
  }, [idx, text]);

  React.useEffect(() => {
    setDisplayed('');
    setIdx(0);
  }, [text]);

  return (
    <div className="detect-prompt" style={{
      color: '#fff',
      fontWeight: 500,
      margin: '0.5em 0 0.5em 0',
      textAlign: 'center',
      fontSize: '1.05rem',
      background: 'transparent',
      borderRadius: '8px',
      padding: '0.2em 0',
      maxWidth: 500,
      marginLeft: 'auto',
      marginRight: 'auto',
      position: 'relative',
      zIndex: 10
    }}>
      {displayed}
      <span className="typewriter-cursor" style={{ color: '#fff' }}>|</span>
    </div>
  );
}

function App() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [translation, setTranslation] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [inputLanguage, setInputLanguage] = useState('auto');
  const [manualInput, setManualInput] = useState('');
  const [inputMode, setInputMode] = useState('text');
  const [error, setError] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const recognitionRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const gainNodeRef = useRef(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [lastProcessedText, setLastProcessedText] = useState('');
  const shouldRestartRecognition = useRef(false);
  const forceStop = useRef(false);
  const [isPaused, setIsPaused] = useState(false);
  // Store last 3 transcripts and translations
  const [recentTranscripts, setRecentTranscripts] = useState([]);
  const [recentTranslations, setRecentTranslations] = useState([]);
  // Add state for ZooZoo animation
  const [isZooZooSpeaking, setIsZooZooSpeaking] = useState(false);
  const [copiedTranscript, setCopiedTranscript] = useState(false);
  const [copiedTranslation, setCopiedTranslation] = useState(false);
  const [speakingTranscript, setSpeakingTranscript] = useState(false);
  const [speakingTranslation, setSpeakingTranslation] = useState(false);
  const [spokenTranscriptIdx, setSpokenTranscriptIdx] = useState(0);
  const [spokenTranslationIdx, setSpokenTranslationIdx] = useState(0);
  const [detectSpeechError, setDetectSpeechError] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [shouldReadAloud, setShouldReadAloud] = useState(false);
  const [detectedInputLangNativeName, setDetectedInputLangNativeName] = useState('');
  const [lastTranslatedInput, setLastTranslatedInput] = useState('');
  const [liveTranslation, setLiveTranslation] = useState('');
  // Add state for translated interim transcript
  const [translatedInterimTranscript, setTranslatedInterimTranscript] = useState('');
  // Add a ref for the target language
  const targetLanguageRef = useRef(targetLanguage);
  // Add a state flag for final read aloud after mic off
  const [shouldReadAloudFinal, setShouldReadAloudFinal] = useState(false);
  // Add accumulatedTranslation state
  const [accumulatedTranslation, setAccumulatedTranslation] = useState('');
  // Add state for last spoken index in accumulated translation
  const [lastSpokenIdx, setLastSpokenIdx] = useState(0);
  // Add lastReadIdx state to track how much of the output has been read aloud
  const [lastReadIdx, setLastReadIdx] = useState(0);
  // Add ttsQueue state to queue output segments for reading
  const [ttsQueue, setTtsQueue] = useState([]);
  // Add readUptoIdx state to track up to which letter in the output has been read aloud
  const [readUptoIdx, setReadUptoIdx] = useState(0);
  // Add a ref to track if mic was manually stopped
  const manualMicStop = useRef(false);
  // Add a ref to block auto-restart on reset or manual stop
  const blockAutoRestart = useRef(false);
  // Debounced translation function for manual input
  const manualInputTimeout = useRef(null);
  const lastManualInput = useRef('');
  const [sessionDetectedLang, setSessionDetectedLang] = useState('auto');
  const [readPhrases, setReadPhrases] = useState([]); // All previously read phrases
  const [currentReadingPhrase, setCurrentReadingPhrase] = useState(''); // Phrase currently being read
  const [forceOutputClear, setForceOutputClear] = useState(false);
  // Add isTTSPlaying state
  const [isTTSPlaying, setIsTTSPlaying] = useState(false);
  // Add a ref to track the last spoken translation
  const lastSpokenManualTranslation = useRef('');

  const CHARACTER_LIMIT = 5000;

  const languageOptions = [
    { code: 'auto', name: 'Detect Language', targetCode: 'auto', nativeName: 'Detect', nativeAlphabet: '', flag: '' },
    { code: 'en-US', name: 'English (US)', targetCode: 'en', nativeName: 'English', nativeAlphabet: 'A', flag: '🇺🇸' },
    { code: 'en-IN', name: 'English (India)', targetCode: 'en-IN', nativeName: 'English (India)', nativeAlphabet: 'A', flag: '🇮🇳' },
    { code: 'hi-IN', name: 'Hindi', targetCode: 'hi', nativeName: 'हिंदी', nativeAlphabet: 'अ', flag: '🇮🇳' },
    { code: 'es-ES', name: 'Spanish', targetCode: 'es', nativeName: 'Español', nativeAlphabet: 'A', flag: '🇪🇸' },
    { code: 'fr-FR', name: 'French', targetCode: 'fr', nativeName: 'Français', nativeAlphabet: 'A', flag: '🇫🇷' },
    { code: 'de-DE', name: 'German', targetCode: 'de', nativeName: 'Deutsch', nativeAlphabet: 'A', flag: '🇩🇪' },
    { code: 'it-IT', name: 'Italian', targetCode: 'it', nativeName: 'Italiano', nativeAlphabet: 'A', flag: '🇮🇹' },
    { code: 'pt-BR', name: 'Portuguese', targetCode: 'pt', nativeName: 'Português', nativeAlphabet: 'A', flag: '🇧🇷' },
    { code: 'ja-JP', name: 'Japanese', targetCode: 'ja', nativeName: '日本語', nativeAlphabet: 'あ', flag: '🇯🇵' },
    { code: 'ko-KR', name: 'Korean', targetCode: 'ko', nativeName: '한국어', nativeAlphabet: '가', flag: '🇰🇷' },
    { code: 'zh-CN', name: 'Chinese', targetCode: 'zh', nativeName: '中文', nativeAlphabet: '一', flag: '🇨🇳' },
    { code: 'ru-RU', name: 'Russian', targetCode: 'ru', nativeName: 'Русский', nativeAlphabet: 'А', flag: '🇷🇺' },
    { code: 'ar-SA', name: 'Arabic', targetCode: 'ar', nativeName: 'العربية', nativeAlphabet: 'ا', flag: '🇸🇦' },
    { code: 'tr-TR', name: 'Turkish', targetCode: 'tr', nativeName: 'Türkçe', nativeAlphabet: 'Ş', flag: '🇹🇷' },
  ];

  // Utility: Get display/native name for a language code
  function getDisplayLanguageName(code) {
    if (!code) return '';
    if (code === 'auto') return 'Detect';
    const lang = languageOptions.find(
      l =>
        l.code === code ||
        l.targetCode === code ||
        l.code.split('-')[0] === code ||
        l.targetCode.split('-')[0] === code
    );
    return lang ? lang.nativeName : code;
  }

  // Filter out 'auto' (Detect) from targetLanguageOptions
  const targetLanguageOptions = languageOptions
    .filter(lang => lang.targetCode !== 'auto')
    .map(lang => ({
      code: lang.targetCode,
      name: lang.code === 'en-US' ? 'English (US)' : lang.name.split(' ')[0],
      nativeName: lang.nativeName,
      nativeAlphabet: lang.nativeAlphabet,
      flag: lang.flag
    }));

  const initializeAudioProcessing = async (stream) => {
    try {
      // Create audio context
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const audioContext = audioContextRef.current;

      // Create source from stream
      const source = audioContext.createMediaStreamSource(stream);

      // Create gain node for amplification
      gainNodeRef.current = audioContext.createGain();
      gainNodeRef.current.gain.value = 2.0; // Amplify the input

      // Create analyser for audio processing
      analyserRef.current = audioContext.createAnalyser();
      analyserRef.current.fftSize = 2048;
      analyserRef.current.smoothingTimeConstant = 0.8;

      // Create compressor for better voice detection
      const compressor = audioContext.createDynamicsCompressor();
      compressor.threshold.value = -50;
      compressor.knee.value = 40;
      compressor.ratio.value = 12;
      compressor.attack.value = 0;
      compressor.release.value = 0.25;

      // Create filter to reduce noise
      const filter = audioContext.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1000; // Focus on human voice frequencies
      filter.Q.value = 1;

      // Connect the audio processing chain but don't connect to destination
      source
        .connect(filter)
        .connect(compressor)
        .connect(gainNodeRef.current)
        .connect(analyserRef.current);
      // Removed connection to audioContext.destination to prevent feedback

      return true;
    } catch (error) {
      console.error('Error initializing audio processing:', error);
      return false;
    }
  };

  // Debounce utility
  function debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Update debouncedLiveTranslate to accept targetLang argument
  const debouncedLiveTranslate = debounce(async (text, targetLang) => {
    const translated = await translateText(text, false, inputLanguage, targetLang);
    setLiveTranslation(translated);
  }, 300);

  // Add this function near the top-level helpers
  async function restorePunctuation(text) {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/oliverguhr/fullstop-punctuation-multilang-large',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: text })
      }
    );
    const data = await response.json();
    return data[0]?.generated_text || text;
  }

  // In handleSpeechResult, use restorePunctuation for final results
  const handleSpeechResult = async (event) => {
    if (isTTSPlaying) return; // Ignore recognition during TTS
    console.log('Speech recognition result received');
    const current = event.resultIndex;
    let rawTranscript = event.results[current][0].transcript;
    rawTranscript = limitWords(rawTranscript.trim(), 50);
    if (rawTranscript.length > CHARACTER_LIMIT) rawTranscript = rawTranscript.slice(0, CHARACTER_LIMIT);

    // Use inputLanguage as the source language for translation (bypass detectLanguage)
    let sourceLang = inputLanguage === 'auto' ? 'es' : inputLanguage.split('-')[0]; // Default to Spanish if auto

    if (event.results[current].isFinal) {
      console.log('Final transcript:', rawTranscript);
      // Use punctuation restoration API
      let punctuated = await restorePunctuation(rawTranscript);
      // Append the final transcript to manualInput (accumulate all spoken text)
      setManualInput(prev => {
        let newText = (prev ? prev + ' ' : '') + punctuated;
        return newText.replace(/\s+/g, ' ').trim().slice(0, CHARACTER_LIMIT);
      });
      setTranscript('');
      setInterimTranscript('');
      setTranslatedInterimTranscript('');
      setRecentTranscripts([]);
      // Translate only the new final segment
      console.log('[DEBUG] Translating (final):', punctuated, '| Source:', inputLanguage, '| Target:', targetLanguageRef.current);
      const translatedSegment = await translateText(punctuated, true, inputLanguage, targetLanguageRef.current);
      // Store the current length before appending
      const prevAccumLen = accumulatedTranslation.length;
      const newAccum = (accumulatedTranslation ? accumulatedTranslation + ' ' : '') + translatedSegment;
      setAccumulatedTranslation(newAccum);
      setLiveTranslation(newAccum);
      setTranslation(newAccum);
      // Only queue and read the new part beyond readUptoIdx
      setTimeout(() => {
        setTtsQueue(queue => {
          if (newAccum.length > readUptoIdx) {
            console.log('[DEBUG] Queuing for TTS:', newAccum.slice(readUptoIdx), '| TTS lang:', getTargetLanguageCode(targetLanguageRef.current));
            return [...queue, { segment: newAccum.slice(readUptoIdx), startIdx: readUptoIdx, type: 'final' }];
          }
          return queue;
        });
      }, 0);
      setLastSpokenIdx(lastSpokenIdx + translatedSegment.length);
    } else {
      console.log('Interim transcript:', rawTranscript);
      setInterimTranscript(rawTranscript);
      // Translate only the new interim segment
      console.log('[DEBUG] Translating (interim):', rawTranscript, '| Source:', inputLanguage, '| Target:', targetLanguageRef.current);
      const translatedInterim = await translateText(rawTranscript, false, inputLanguage, targetLanguageRef.current);
      setLiveTranslation(accumulatedTranslation + (translatedInterim ? ' ' + translatedInterim : ''));
      setTranslatedInterimTranscript('');
      // Do NOT queue or read interim for TTS or highlight
    }
  };

  const pauseListening = () => {
    console.log('=== Pause Button Clicked ===');
    console.log('Current state:', { isListening, isPaused, isInitialized });
    console.log('recognitionRef exists:', !!recognitionRef.current);
    
    if (isListening && recognitionRef.current) {
      console.log('Attempting to pause recognition...');
      setIsPaused(true);
      setIsListening(false);
      try {
        recognitionRef.current.stop();
        console.log('Recognition stopped successfully');
      } catch (error) {
        console.error('Error stopping recognition:', error);
      }
      console.log('Paused listening - State updated');
    } else {
      console.log('Cannot pause - Conditions not met:', {
        isListening,
        hasRecognition: !!recognitionRef.current
      });
    }
  };

  const resumeListening = async () => {
    console.log('=== Resume Button Clicked ===');
    console.log('Current state:', { isListening, isPaused, isInitialized });
    console.log('recognitionRef exists:', !!recognitionRef.current);
    
    if (!isListening && isPaused && recognitionRef.current) {
      console.log('Checking recognition object validity...');
      if (recognitionRef.current && typeof recognitionRef.current.start === 'function') {
        console.log('Recognition object is valid, attempting to resume...');
        try {
          recognitionRef.current.lang = inputLanguage;
          recognitionRef.current.start();
          setIsListening(true);
          setIsPaused(false);
          setError('');
        } catch (error) {
          console.error('Error resuming recognition:', error);
          setError('Failed to resume listening. Please try again.');
        }
      } else {
        console.error('Recognition object is invalid:', recognitionRef.current);
        setError('Recognition object is no longer valid. Please refresh the page and try again.');
      }
    } else {
      console.log('Cannot resume - Conditions not met:', {
        isListening,
        isPaused,
        hasRecognition: !!recognitionRef.current
      });
    }
  };

  const toggleListening = async () => {
    console.log('=== Toggle Button Clicked ===');
    console.log('Current state:', { isInitialized, isListening, isPaused, error });
    
    if (!isInitialized) {
      console.log('Speech recognition not initialized');
      setError('Speech recognition not initialized. Please refresh the page and try again.');
      return;
    }

    try {
      if (!isListening && !isPaused) {
        // Clear all text areas and related state
        setManualInput('');
        setAccumulatedTranslation('');
        setLiveTranslation('');
        setTranslation('');
        setReadPhrases([]);
        setCurrentReadingPhrase('');
        setInterimTranscript('');
        setTranscript('');
        setError('');
        setTtsQueue([]);
        setForceOutputClear(true);
        setLastSpokenIdx(0);
        setLastReadIdx(0);
        setReadUptoIdx(0);
        setSpokenTranscriptIdx(0);
        setSpokenTranslationIdx(0);
        setSpeakingTranscript(false);
        setSpeakingTranslation(false);
        window.speechSynthesis.cancel();
        // Start listening
        console.log('Starting new listening session...');
        if (!mediaStreamRef.current) {
          console.log('Requesting microphone access...');
          const stream = await navigator.mediaDevices.getUserMedia({ 
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true
            } 
          });
          mediaStreamRef.current = stream;
          console.log('Microphone access granted');
        }
        console.log('Configuring recognition...');
        console.log('[DEBUG] Setting recognition language to:', inputLanguage);
        recognitionRef.current.lang = inputLanguage;
        forceStop.current = false;
        setAccumulatedTranslation('');
        setLastSpokenIdx(0);
        setLastReadIdx(0);
        setTtsQueue([]);
        setReadUptoIdx(0);
        blockAutoRestart.current = false;
        if (inputLanguage === 'auto') {
          setSessionDetectedLang('auto');
          console.log('[MIC ON] Input language is set to Detect.');
        } else {
          setSessionDetectedLang(inputLanguage);
          console.log('[MIC ON] Input language is set to:', inputLanguage);
        }
        try {
          recognitionRef.current.start();
          console.log('Recognition started successfully');
          setIsListening(true);
          setIsPaused(false);
          setError('');
        } catch (error) {
          console.error('Error starting recognition:', error);
          throw error;
        }
      } else {
        // Always perform a full reset when Stop Listening is pressed
        console.log('Stopping listening session and resetting state...');
        setIsListening(false);
        setIsPaused(false);
        forceStop.current = true;
        manualMicStop.current = true;
        if (recognitionRef.current) {
          try {
            recognitionRef.current.stop();
            recognitionRef.current.abort();
            console.log('Recognition stopped successfully');
          } catch (error) {
            console.error('Error stopping recognition:', error);
          }
        }
        if (mediaStreamRef.current) {
          mediaStreamRef.current.getTracks().forEach(track => {
            track.stop();
          });
          mediaStreamRef.current = null;
        }
        if (audioContextRef.current) {
          await audioContextRef.current.close();
          audioContextRef.current = null;
        }
        setError('');
        console.log('Listening session stopped and state reset');
        blockAutoRestart.current = true;

        // After stopping, ensure output matches input translation
        if (manualInput.trim()) {
          // Wait for any ongoing TTS to complete
          const checkTTSAndTranslate = () => {
            if (!speakingTranslation) {
              // TTS is complete, now translate the final input
              translateText(manualInput, true, inputLanguage, targetLanguageRef.current)
                .then(finalTranslation => {
                  setAccumulatedTranslation(finalTranslation);
                  setLiveTranslation(finalTranslation);
                  setTranslation(finalTranslation);
                });
            } else {
              // TTS still in progress, check again in 100ms
              setTimeout(checkTTSAndTranslate, 100);
            }
          };
          checkTTSAndTranslate();
        }
        // Only reset to 'auto' if no language was detected during this session
        if (inputLanguage === 'auto') {
          if (sessionDetectedLang === 'auto') {
            setSessionDetectedLang('auto');
          }
          console.log('[MIC OFF] Input language is Detect.');
        } else {
          setSessionDetectedLang(inputLanguage);
          console.log('[MIC OFF] Input language was:', inputLanguage);
        }
      }
    } catch (error) {
      console.error('Error in toggleListening:', error);
      setError(`Error with speech recognition: ${error.message}`);
      setIsListening(false);
      setIsPaused(false);
    }
  };

  const initializeSpeechRecognition = async () => {
    try {
      if (!('webkitSpeechRecognition' in window)) {
        setError('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
        return;
      }
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.maxAlternatives = 1;
      // If inputLanguage is 'auto', default to English for recognition (since browser can't auto-detect speech lang)
      recognitionRef.current.lang = inputLanguage === 'auto' ? 'en-US' : inputLanguage;
      recognitionRef.current.onstart = () => {
        console.log('Speech recognition started (onstart event)');
        setIsListening(true);
        setError('');
        console.log('setIsListening(true) called from onstart');
      };
      recognitionRef.current.onresult = handleSpeechResult;
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        switch (event.error) {
          case 'no-speech':
            return;
          case 'audio-capture':
            setError('No microphone detected. Please connect a microphone and try again.');
            break;
          case 'not-allowed':
            setError('Microphone access denied. Please allow microphone access and try again.');
            break;
          default:
            setError(`Speech recognition error: ${event.error}`);
        }
        setIsListening(false);
        console.log('setIsListening(false) called from onerror');
      };
      recognitionRef.current.onend = () => {
        console.log('Speech recognition ended (onend event fired)');
        setIsListening(false);
        console.log('setIsListening(false) called from onend');
        // Only trigger TTS if NOT a manual stop
        setTimeout(() => {
          if (!manualMicStop.current && translation && translation.trim()) {
            console.log('Reading translation:', translation);
            setShouldReadAloud(true);
          }
          manualMicStop.current = false; // Reset after onend
        }, 500);
        // If not blocked, auto-restart recognition
        if (!blockAutoRestart.current && !manualMicStop.current && !isPaused) {
          try {
            recognitionRef.current.start();
            setIsListening(true);
            console.log('Auto-restarted recognition');
          } catch (e) {
            console.error('Failed to auto-restart recognition:', e);
          }
        }
      };
      setIsInitialized(true);
      console.log('setIsInitialized(true) called');
    } catch (error) {
      console.error('Error initializing speech recognition:', error);
      setError(`Error initializing speech recognition: ${error.message}`);
    }
  };

  useEffect(() => {
    initializeSpeechRecognition();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => {
          track.stop();
          track.enabled = false;
        });
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const triggerManualTranslation = async (text, targetLangOverride = null) => {
    if (!text.trim()) {
      setAccumulatedTranslation('');
      setLiveTranslation('');
      setTranslation('');
      return;
    }

    try {
      const translatedOutput = await translateText(text, true, inputLanguage, targetLangOverride || targetLanguageRef.current);
      console.log('[OUTPUT BLOCK] Setting translation to:', translatedOutput);
      setAccumulatedTranslation(translatedOutput);
      setLiveTranslation(translatedOutput);
      setTranslation(translatedOutput);
    } catch (error) {
      console.error('Translation error:', error);
      setError('Translation failed. Please try again.');
    }
  };

  const handleManualInput = (text) => {
    if (text.length > CHARACTER_LIMIT) text = text.slice(0, CHARACTER_LIMIT);
    setManualInput(text);
    lastManualInput.current = text;
    if (inputLanguage !== 'auto') {
      if (/\s|[.,!?;:]/.test(text.slice(-1))) {
        if (manualInputTimeout.current) clearTimeout(manualInputTimeout.current);
        console.log('[INPUT] Triggering translation for:', text);
        triggerManualTranslation(text);
      } else {
        if (manualInputTimeout.current) clearTimeout(manualInputTimeout.current);
        manualInputTimeout.current = setTimeout(() => {
          console.log('[INPUT] Debounced translation for:', lastManualInput.current);
          triggerManualTranslation(lastManualInput.current);
        }, 300); // 300ms debounce for near real-time
      }
    } else {
      if (manualInputTimeout.current) clearTimeout(manualInputTimeout.current);
      manualInputTimeout.current = setTimeout(() => {
        console.log('[INPUT] Debounced auto-detect translation for:', lastManualInput.current);
        triggerManualTranslationWithDetect(lastManualInput.current);
      }, 300); // 300ms debounce for near real-time
    }
  };

  // New: trigger translation and detect language if inputLanguage is 'auto'
  const triggerManualTranslationWithDetect = async (text) => {
    if (inputLanguage === 'auto' && text.trim()) {
      let detectedLang = null;
      try {
        detectedLang = await detectLanguage(text);
      } catch (err) {
        detectedLang = null;
      }
      // Fallback: use heuristic if detection fails
      if (!detectedLang || detectedLang === 'und') {
        detectedLang = guessLanguageByScript(text);
      }
      const matchingLang = languageOptions.find(l =>
        l.code.toLowerCase() === (detectedLang || '').toLowerCase() ||
        l.code.split('-')[0].toLowerCase() === (detectedLang || '').toLowerCase() ||
        l.targetCode.toLowerCase() === (detectedLang || '').toLowerCase() ||
        l.targetCode.split('-')[0].toLowerCase() === (detectedLang || '').toLowerCase()
      );
      if (matchingLang) {
        setInputLanguage(matchingLang.code);
        setSessionDetectedLang(matchingLang.code);
        // Immediately translate using the detected language as source
        const translatedOutput = await translateText(text, true, matchingLang.code, targetLanguageRef.current);
        setAccumulatedTranslation(translatedOutput);
        setLiveTranslation(translatedOutput);
        setTranscript('');
        return; // Do not call triggerManualTranslation again
      }
    }
    triggerManualTranslation(text);
  };

  const getLanguageCode = (languageCode) => {
    // Map input language code (e.g., 'hi-IN') to translation code (e.g., 'hi')
    if (languageCode === 'auto') return 'auto';
    const lang = languageOptions.find(l => l.code === languageCode);
    return lang ? lang.targetCode : (languageCode.split('-')[0] || languageCode);
  };

  const formatText = (text) => {
    if (!text) return '';
    
    // First, normalize spaces and remove any existing punctuation
    text = text.replace(/\s+/g, ' ').trim();
    
    // Add space before question marks and exclamation marks (and optionally other punctuation)
    text = text.replace(/([\w\d])([?!])/g, '$1 $2');
    // Add space after punctuation if followed by a letter
    text = text.replace(/([.,!?])([a-zA-Z])/g, '$1 $2');
    
    // Capitalize first letter of sentences
    text = text.replace(/(^\w|\.\s+\w)/g, letter => letter.toUpperCase());
    
    // Add periods at the end if missing
    if (!/[.!?]$/.test(text)) {
      text += '.';
    }
    
    // Handle common sentence patterns
    text = text
      // Add space after periods, exclamation marks, and question marks
      .replace(/([.!?])\s*([A-Z])/g, '$1 $2')
      // Add space after commas
      .replace(/,([a-zA-Z])/g, ', $1')
      // Fix spacing around parentheses
      .replace(/\(\s+/g, '(')
      .replace(/\s+\)/g, ')')
      // Fix spacing around quotes
      .replace(/"\s+/g, '"')
      .replace(/\s+"/g, '"')
      // Fix spacing around apostrophes
      .replace(/'s\b/g, "'s")
      // Remove multiple spaces
      .replace(/\s+/g, ' ')
      // Add space after colons and semicolons
      .replace(/([:;])([a-zA-Z])/g, '$1 $2')
      // Fix spacing around dashes
      .replace(/\s*-\s*/g, ' - ')
      // Ensure proper spacing for common abbreviations
      .replace(/\b(e\.g\.|i\.e\.|etc\.|vs\.)\b/gi, '$1 ')
      // Add space after numbers followed by letters
      .replace(/(\d)([a-zA-Z])/g, '$1 $2')
      // Add space before numbers preceded by letters
      .replace(/([a-zA-Z])(\d)/g, '$1 $2')
      // Fix spacing around ampersands
      .replace(/\s*&\s*/g, ' & ')
      // Ensure proper spacing for common units
      .replace(/(\d)\s*(kg|g|m|cm|mm|km|ml|l|oz|lb|in|ft|yd|mi)\b/gi, '$1 $2')
      // Fix spacing for common currency symbols
      .replace(/([$€£¥])\s*(\d)/g, '$1$2')
      // Add space after currency amounts
      .replace(/(\d)\s*([$€£¥])/g, '$1 $2')
      // Fix spacing for percentages
      .replace(/(\d)\s*%/g, '$1%')
      // Add space after percentages
      .replace(/%\s*([a-zA-Z])/g, '% $1')
      // Fix spacing for common time formats
      .replace(/(\d{1,2}):(\d{2})\s*(am|pm)/gi, '$1:$2 $3')
      // Fix spacing for common date formats
      .replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/g, '$1/$2/$3')
      // Add space after common titles
      .replace(/(Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.)\s*([A-Z])/g, '$1 $2')
      // Fix spacing for common contractions
      .replace(/\b(n't|'ll|'re|'ve|'d|'s)\b/g, '$1 ')
      // Remove spaces before punctuation
      .replace(/\s+([.,!?;:])/g, '$1')
      // Ensure proper spacing for lists
      .replace(/(\d+\.)\s*([A-Z])/g, '$1 $2')
      // Fix spacing for common mathematical operators
      .replace(/\s*([+\-*/=])\s*/g, ' $1 ')
      // Remove multiple spaces again
      .replace(/\s+/g, ' ')
      .trim();

    // Add proper sentence spacing (double space after periods)
    text = text.replace(/\.\s+/g, '.  ');

    // Ensure proper spacing for question marks and exclamation marks
    text = text.replace(/([?!])\s+/g, '$1  ');

    // Fix any remaining double spaces
    text = text.replace(/\s{2,}/g, ' ');

    return text;
  };

  const detectLanguage = async (text) => {
    try {
      const apiKey = 'AIzaSyDONYmPh8mhA5hUyuTYAlgmy4NV7n7odhI';
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2/detect?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: text
          })
        }
      );
      const data = await response.json();
      return data.data.detections[0][0].language;
    } catch (error) {
      console.error('Language detection error:', error);
      return null;
    }
  };

  // Utility: Always resolve a language code to the correct API code (for input or output)
  function resolveLanguageCode(code, forTarget = false) {
    if (!code) return 'auto';
    if (code === 'auto') return 'auto';
    // Try to find in languageOptions by code or targetCode
    const lang = languageOptions.find(
      l => l.code === code || l.targetCode === code || l.code.split('-')[0] === code || l.targetCode.split('-')[0] === code
    );
    if (!lang) return code;
    return forTarget ? lang.targetCode : lang.code;
  }

  // Refactored handleLanguageChange for robust input/target language handling
  const handleLanguageChange = async (newLanguage, isInputLanguage = true) => {
    console.log('[handleLanguageChange] newLanguage:', newLanguage, '| isInputLanguage:', isInputLanguage);
    if (isInputLanguage) {
      const validLang = languageOptions.find(l => l.code === newLanguage);
      if (!validLang) return;
      // If there is text in the input block, translate it to the new input language
      if (manualInput && manualInput.trim() !== '' && inputLanguage !== newLanguage) {
        // Translate the input text to the new input language
        const translatedInput = await translateText(manualInput, true, inputLanguage, newLanguage);
        setManualInput(translatedInput);
        // Also translate the output block to match the new input and current target language
        if (translatedInput) {
          const translatedOutput = await translateText(translatedInput, true, newLanguage, targetLanguageRef.current);
          setAccumulatedTranslation(translatedOutput);
          setLiveTranslation(translatedOutput);
        }
      } else {
        setManualInput('');
        setAccumulatedTranslation('');
        setLiveTranslation('');
      }
      setInputLanguage(validLang.code);
      setTranscript('');
      setDetectedInputLangNativeName('');
      console.log('Input language set to:', validLang.code);
      if (navigator.clipboard) {
        navigator.clipboard.writeText(''); // Update clipboard to match cleared/changed input
      }
      if (isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
      setTranslation('');
      setError('');
      if (validLang.code === 'auto') setInputMode('text');
      // Update recognition language if recognitionRef exists
      if (recognitionRef.current) {
        recognitionRef.current.lang = validLang.code;
      }
    } else {
      // newLanguage is the targetCode (e.g., 'hi', 'es')
      const validLang = languageOptions.find(l => l.targetCode === newLanguage);
      if (!validLang) return;
      console.log('[handleLanguageChange] Setting targetLanguage to:', newLanguage);
      setTargetLanguage(newLanguage);
      targetLanguageRef.current = newLanguage; // <-- update ref
      // If there is text in the input block, re-translate it to the new target language
      if (manualInput && manualInput.trim() !== '') {
        const translated = await translateText(manualInput, true, inputLanguage, newLanguage);
        setLiveTranslation(translated);
        setAccumulatedTranslation(translated);
        setTranslation(translated);
      }
    }
  };

  // Utility to keep only the last N words in a string
  function limitWords(str, maxWords) {
    if (!str) return '';
    const words = str.split(/\s+/);
    return words.slice(-maxWords).join(' ');
  }

  // Helper to get the correct target language code for the API and TTS
  const getTargetLanguageCode = (targetLanguage) => {
    const lang = languageOptions.find(l => l.targetCode === targetLanguage || l.code === targetLanguage);
    return lang ? lang.targetCode : targetLanguage;
  };

  // Utility: Split text into sentences for better translation
  function splitIntoSentences(text) {
    // Simple sentence splitter (handles . ! ?)
    return text.match(/[^.!?]+[.!?]?/g) || [text];
  }

  // Add detailed console logging to translateText for debugging
  const translateText = async (text, isFinal = false, sourceLangOverride = null, targetLangOverride = null) => {
    if (!text.trim()) return '';
    if (isTranslating) return '';
    setError('');
    setIsTranslating(true);
    try {
      const formattedText = formatText(text);
      const sourceLang = sourceLangOverride
        ? resolveLanguageCode(sourceLangOverride)
        : (inputLanguage === 'auto' ? undefined : resolveLanguageCode(inputLanguage));
      const targetLang = targetLangOverride
        ? resolveLanguageCode(targetLangOverride, true)
        : resolveLanguageCode(targetLanguage, true);
      const apiKey = 'AIzaSyDONYmPh8mhA5hUyuTYAlgmy4NV7n7odhI'; // <-- Replace with your actual API key
      const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
      const body = {
        q: formattedText,
        target: targetLang,
        format: 'text'
      };
      if (sourceLang && sourceLang !== 'auto') body.source = sourceLang;
      console.log('[TRANSLATE] Request body:', body);
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      console.log('[TRANSLATE] Response status:', response.status);
      const data = await response.json();
      console.log('[TRANSLATE] Response data:', data);
      if (!response.ok || !data.data || !data.data.translations || !data.data.translations[0]) {
        console.error('[TRANSLATE] API error:', data.error);
        throw new Error(data.error?.message || 'Translation service error.');
      }
      const translated = data.data.translations.map(t => t.translatedText).join(' ');
      console.log('[TRANSLATE] Translated text:', translated);
      setLastProcessedText(formattedText);
      if (isFinal) setRecentTranslations([]);
      setIsTranslating(false);
      return translated;
    } catch (error) {
      console.error('[TRANSLATE] Exception:', error);
      setError(error.message || 'Translation service error. Please try again.');
      setIsTranslating(false);
      return text;
    }
  };

  // Debounced version of translateText for interim results (must be after translateText is defined)
  const debouncedTranslateText = debounce((text) => translateText(text, false), 200);

  // Helper to get flag emoji or SVG for a language code
  const getFlag = (code) => languageFlags[code] || '';

  // Find the language object for the current targetLanguage
  const targetLangObj = languageOptions.find(l => l.targetCode === targetLanguage || l.code === targetLanguage);

  const handleSwapLanguages = async () => {
    if (inputLanguage === 'auto') return;
    // Store current texts
    const tempInput = manualInput;
    const tempOutput = accumulatedTranslation;

    // Swap input and target language
    const inputLang = inputLanguage;
    const targetLang = targetLanguage;
    const newInputLang = languageOptions.find(l => l.targetCode === targetLang)?.code || inputLang;
    const newTargetLang = languageOptions.find(l => l.code === inputLang)?.targetCode || targetLang;
    setInputLanguage(newInputLang);
    setSessionDetectedLang(newInputLang); // Ensure label updates to new input language
    setTargetLanguage(newTargetLang);
    targetLanguageRef.current = newTargetLang; // <-- ensure output language ref is updated

    // Update recognition language if recognitionRef exists
    if (recognitionRef.current) {
      recognitionRef.current.lang = newInputLang;
    }

    // Swap the text in the input and output blocks using a temp variable
    setManualInput(tempOutput || '');
    setAccumulatedTranslation(tempInput || '');
    setLiveTranslation(tempInput || '');
    setTranscript('');
    setInterimTranscript('');
    setTranslation('');
    setTranslatedInterimTranscript('');

    // Only re-translate if there is text in the new input (old output)
    if (tempOutput && tempOutput.trim() !== '') {
      const translated = await translateText(tempOutput, true, newInputLang, newTargetLang);
      setAccumulatedTranslation(translated);
      setLiveTranslation(translated);
    }
  };

  // Helper to get two-letter country code for a language code
  const getCountryCode = (code) => {
    if (!code) return '';
    const map = {
      'en-US': 'US', 'hi-IN': 'IN', 'es-ES': 'ES', 'fr-FR': 'FR', 'de-DE': 'DE',
      'it-IT': 'IT', 'pt-BR': 'BR', 'ja-JP': 'JP', 'ko-KR': 'KR', 'zh-CN': 'CN',
      'ru-RU': 'RU', 'ar-SA': 'SA',
    };
    return map[code] || code.slice(-2).toUpperCase();
  };

  // Utility: Copy to clipboard
  function copyToClipboard(text, which) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    if (which === 'transcript') {
      setCopiedTranscript(true);
      setTimeout(() => setCopiedTranscript(false), 1500);
    } else if (which === 'translation') {
      setCopiedTranslation(true);
      setTimeout(() => setCopiedTranslation(false), 1500);
    }
  }

  // In speakText, always set highlight state for output block
  function speakText(text, lang, which, onend, type = 'final') {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    if (!text) return;
    // Clean and format the text
    text = formatText(text);
    console.log(`[DEBUG] [TTS] Triggered (${type}) | Text:`, text, '| TTS lang:', lang);
    const utter = new window.SpeechSynthesisUtterance(text);
    // Always use the correct language code
    const resolvedLang = resolveLanguageCode(lang, which === 'translation');
    utter.lang = resolvedLang;
    // Select the best available voice for the target language
    const voices = window.speechSynthesis.getVoices();
    let bestVoice = voices.find(v => v.lang === resolvedLang);
    if (!bestVoice) {
      // Try to match just the base language (e.g., 'hi' for 'hi-IN')
      const baseLang = resolvedLang.split('-')[0];
      bestVoice = voices.find(v => v.lang && v.lang.startsWith(baseLang));
    }
    if (bestVoice) utter.voice = bestVoice;
    utter.rate = 1;
    utter.pitch = 1;
    if (which === 'transcript') {
      setSpeakingTranscript(true);
      setSpokenTranscriptIdx(0);
    }
    if (which === 'translation') {
      setSpeakingTranslation(true);
      setSpokenTranslationIdx(0);
    }
    utter.onboundary = (event) => {
      if ((event.name === 'word' || event.charIndex !== undefined) && which === 'translation') {
        // Find the end of the current word
        let wordEnd = text.indexOf(' ', event.charIndex);
        if (wordEnd === -1) wordEnd = text.length;
        // Update the blue highlight up to the current word
        setReadUptoIdx(wordEnd);
      }
      if ((event.name === 'word' || event.charIndex !== undefined) && which === 'transcript') {
        let wordEnd = text.indexOf(' ', event.charIndex);
        if (wordEnd === -1) wordEnd = text.length;
        setSpokenTranscriptIdx(wordEnd);
      }
    };
    utter.onend = () => {
      setIsTTSPlaying(false); // TTS ended
      if (which === 'transcript') {
        setSpeakingTranscript(false);
        setSpokenTranscriptIdx(0);
      }
      if (which === 'translation') {
        setSpeakingTranslation(false);
        setSpokenTranslationIdx(0);
        setReadUptoIdx(text.length); // Ensure highlight covers all at end
      }
      if (onend) onend();
    };
    utter.onerror = () => {
      setIsTTSPlaying(false); // TTS errored
      if (which === 'transcript') {
        setSpeakingTranscript(false);
        setSpokenTranscriptIdx(0);
      }
      if (which === 'translation') {
        setSpeakingTranslation(false);
        setSpokenTranslationIdx(0);
        setReadUptoIdx(text.length);
      }
      if (onend) onend();
    };
    window.speechSynthesis.speak(utter);
  }

  // --- Auto language detection recording logic ---
  const MAX_RECORDING_MS = 20000; // 20 seconds
  let recordingTimeout = null;

  const startRecording = async () => {
    // Clear all text areas and related state
    setManualInput('');
    setAccumulatedTranslation('');
    setLiveTranslation('');
    setTranslation('');
    setReadPhrases([]);
    setCurrentReadingPhrase('');
    setInterimTranscript('');
    setTranscript('');
    setError('');
    setTtsQueue([]);
    setForceOutputClear(true);
    setLastSpokenIdx(0);
    setLastReadIdx(0);
    setReadUptoIdx(0);
    setSpokenTranscriptIdx(0);
    setSpokenTranslationIdx(0);
    setSpeakingTranscript(false);
    setSpeakingTranslation(false);
    window.speechSynthesis.cancel();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Set up Web Audio API processing chain
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioContextRef.current = audioContext;
    const source = audioContext.createMediaStreamSource(stream);

    // Bandpass filter
    const filter = audioContext.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1000;
    filter.Q.value = 1;

    // Compressor
    const compressor = audioContext.createDynamicsCompressor();
    compressor.threshold.value = -50;
    compressor.knee.value = 40;
    compressor.ratio.value = 12;
    compressor.attack.value = 0;
    compressor.release.value = 0.25;

    // Gain
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 2.0;

    // Destination node for processed audio
    const dest = audioContext.createMediaStreamDestination();

    // Connect the chain: source -> filter -> compressor -> gain -> dest
    source.connect(filter).connect(compressor).connect(gainNode).connect(dest);

    // Record from the processed stream
    const mediaRecorder = new window.MediaRecorder(dest.stream, { mimeType: 'audio/webm' });
    mediaRecorderRef.current = mediaRecorder;
    let localChunks = [];
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        localChunks.push(e.data);
        console.log('[FRONTEND] Received audio chunk of size:', e.data.size);
      }
    };
    mediaRecorder.onstop = () => {
      setIsRecording(false);
      setIsListening(false);
      // If stopped by auto-stop, trigger detection/processing
      if (localChunks.length > 0) {
        // Call the same logic as stopRecording, but only if not already called
        if (!mediaRecorder._autoStoppedHandled) {
          mediaRecorder._autoStoppedHandled = true;
          // Use a Promise to match stopRecording signature
          (async () => {
            await handleAutoStoppedRecording(localChunks);
          })();
        }
      }
    };
    mediaRecorder.start();
    setIsRecording(true);
    setIsListening(true);
    console.log('[FRONTEND] Recording started with mimeType:', mediaRecorder.mimeType);
    mediaRecorderRef.current._localChunks = localChunks;

    // Always set auto-stop timer for all input modes
    recordingTimeout = setTimeout(() => {
      if (mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        setIsRecording(false);
        setIsListening(false);
      }
    }, MAX_RECORDING_MS);
  };

  // Helper to handle auto-stopped recording (send for detection)
  async function handleAutoStoppedRecording(localChunks) {
    // This is a minimal version of stopRecording's logic
    const audioBlob = new Blob(localChunks, { type: 'audio/webm' });
    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.webm');
    setIsRecording(false);
    setIsListening(false);
    setTranslation('');
    setError('');
    try {
      const res = await fetch('http://localhost:5001/api/speech-to-text', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.error) {
        setError('Speech recognition failed. Please try again.');
        setManualInput(''); // Only clear on error
        return;
      }
      // Robustly match detected language to languageOptions (case-insensitive, base and full code)
      const detectedLang = (data.language || '').toLowerCase();
      const matchingLang = languageOptions.find(l => {
        const code = l.code.toLowerCase();
        const targetCode = l.targetCode.toLowerCase();
        return (
          code === detectedLang ||
          code.split('-')[0] === detectedLang ||
          targetCode === detectedLang ||
          targetCode.split('-')[0] === detectedLang ||
          code === detectedLang.split('-')[0] ||
          targetCode === detectedLang.split('-')[0]
        );
      });
      if (matchingLang) {
        setInputLanguage(matchingLang.code);
        setDetectedInputLangNativeName(matchingLang.nativeName);
        setSessionDetectedLang(matchingLang.code);
      } else {
        setInputLanguage('en-US');
        setDetectedInputLangNativeName('English');
        setSessionDetectedLang('en-US');
      }
      const translationSourceLang = matchingLang ? matchingLang.code.split('-')[0] : 'en';
      const translated = await translateText(data.transcript, true, translationSourceLang, targetLanguageRef.current);
      setManualInput(data.transcript);
      setShouldReadAloud(true);
      setAccumulatedTranslation(translated);
      setLiveTranslation(translated);
      setTranslation(translated);
      if (!speakingTranslation && ttsQueue.length === 0) {
        setReadPhrases([translated]);
        setCurrentReadingPhrase('');
        // Immediately trigger TTS for the translation
        speakText(translated, targetLanguageRef.current, 'translation');
      }
    } catch (err) {
      setError('Speech recognition failed. Please try again.');
      setManualInput(''); // Only clear on error
    }
  }

  const stopRecording = async () => {
    // Clear the auto-stop timer if it exists
    if (recordingTimeout) {
      clearTimeout(recordingTimeout);
      recordingTimeout = null;
    }
    setIsRecording(false);
    setIsListening(false);
    return new Promise((resolve) => {
      const mediaRecorder = mediaRecorderRef.current;
      mediaRecorder.onstop = async () => {
        setIsListening(false); // Ensure prompt disappears when stopped
        console.log('[FRONTEND] Recording stopped');
        const localChunks = mediaRecorder._localChunks || [];
        console.log('[FRONTEND] Number of audio chunks:', localChunks.length);
        const audioBlob = new Blob(localChunks, { type: 'audio/webm' });
        console.log('[FRONTEND] Final audio blob size:', audioBlob.size);
        const formData = new FormData();
        formData.append('audio', audioBlob, 'audio.webm');
        setTranslation('');
        setError('');
        try {
          const res = await fetch('http://localhost:5001/api/speech-to-text', {
            method: 'POST',
            body: formData,
          });
          const data = await res.json();
          console.log('[FRONTEND] Received from backend:', data);
          if (data.error) {
            setError('Speech recognition failed. Please try again.');
            setManualInput(''); // Only clear on error
            resolve();
            return;
          }
          // Robustly match detected language to languageOptions (case-insensitive, base and full code)
          const detectedLang = (data.language || '').toLowerCase();
          const matchingLang = languageOptions.find(l => {
            const code = l.code.toLowerCase();
            const targetCode = l.targetCode.toLowerCase();
            return (
              code === detectedLang ||
              code.split('-')[0] === detectedLang ||
              targetCode === detectedLang ||
              targetCode.split('-')[0] === detectedLang ||
              code === detectedLang.split('-')[0] ||
              targetCode === detectedLang.split('-')[0]
            );
          });
          if (matchingLang) {
            console.log('[FRONTEND] Matched detected language to:', matchingLang.code);
            setInputLanguage(matchingLang.code); // This will match the dropdown value
            setDetectedInputLangNativeName(matchingLang.nativeName);
            setSessionDetectedLang(matchingLang.code);
          } else {
            console.warn('[FRONTEND] No matching language found for:', data.language, 'defaulting to en-US');
            // Fallback: if not found, default to 'en-US'
            setInputLanguage('en-US');
            setDetectedInputLangNativeName('English');
            setSessionDetectedLang('en-US');
          }
          // Use detected language as sourceLang for translation
          const translationSourceLang = matchingLang ? matchingLang.code.split('-')[0] : 'en';
          console.log('[FRONTEND] Translating:', data.transcript, '| Source:', translationSourceLang, '| Target:', targetLanguageRef.current);
          const translated = await translateText(data.transcript, true, translationSourceLang, targetLanguageRef.current);
          console.log('[FRONTEND] Translation result:', translated);
          setManualInput(data.transcript);
          setShouldReadAloud(true);
          setAccumulatedTranslation(translated);
          setLiveTranslation(translated);
          setTranslation(translated);
          if (!speakingTranslation && ttsQueue.length === 0) {
            setReadPhrases([translated]);
            setCurrentReadingPhrase('');
            // Immediately trigger TTS for the translation
            speakText(translated, targetLanguageRef.current, 'translation');
          }
        } catch (err) {
          setError('Speech recognition failed. Please try again.');
          setManualInput(''); // Only clear on error
        }
        resolve();
      };
      setTimeout(() => {
        mediaRecorder.stop();
      }, 1200); // Wait at least 1.2 seconds before stopping
    });
  };

  // Process the ttsQueue: if not currently reading, pop the next segment and read it
  useEffect(() => {
    if (!speakingTranslation && ttsQueue.length > 0 && !currentReadingPhrase) {
      const { segment, startIdx, type = 'final' } = ttsQueue[0];
      setCurrentReadingPhrase(segment);
      setSpeakingTranslation(true);
      setSpokenTranslationIdx(0);
      speakText(segment, getTargetLanguageCode(targetLanguageRef.current), 'translation', () => {
        setLastReadIdx(startIdx + segment.length);
        setSpeakingTranslation(false);
        setSpokenTranslationIdx(0);
        setTtsQueue(queue => queue.slice(1));
        setReadUptoIdx(segment.length);
        // After TTS, move phrase to readPhrases
        setReadPhrases(prev => [...prev, segment]);
        setCurrentReadingPhrase('');
      }, type);
    }
    // eslint-disable-next-line
  }, [ttsQueue, speakingTranslation, currentReadingPhrase]);

  // On mic off, clear blue highlight
  useEffect(() => {
    if (!isListening) {
      setReadUptoIdx(0);
    }
    // eslint-disable-next-line
  }, [isListening]);

  // Save input text to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('multiling_input', manualInput);
  }, [manualInput]);

  // On mount, restore input and translate, and stop mic on unload
  useEffect(() => {
    const savedInput = localStorage.getItem('multiling_input');
    if (savedInput) {
      setManualInput(savedInput);
      triggerManualTranslation(savedInput);
    }
    window.onbeforeunload = () => {
      if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
    return () => {
      window.onbeforeunload = null;
    };
  // eslint-disable-next-line
  }, []);

  // After TTS finishes and the mic is off, ensure output matches input
  useEffect(() => {
    if (!speakingTranslation && ttsQueue.length === 0 && !isListening) {
      if (manualInput.trim()) {
        triggerManualTranslation(manualInput);
        setReadUptoIdx(0); // Reset highlight so output is plain
      }
    }
    // eslint-disable-next-line
  }, [speakingTranslation, ttsQueue, isListening]);

  // Add useEffect to always translate manual input when not using mic
  useEffect(() => {
    if (!isListening && !isRecording && manualInput.trim()) {
      if (inputLanguage === 'auto') {
        // Use auto-detect logic
        triggerManualTranslationWithDetect(manualInput);
      } else {
        triggerManualTranslation(manualInput);
      }
    } else if (!manualInput.trim()) {
      setAccumulatedTranslation('');
      setLiveTranslation('');
      setTranslation('');
    }
    // eslint-disable-next-line
  }, [manualInput, inputLanguage]);

  // Ensure output block always displays translation when mic is off and TTS is not playing
  useEffect(() => {
    if (!isListening && !isRecording && !isTTSPlaying) {
      if (manualInput.trim()) {
        if (inputLanguage === 'auto') {
          triggerManualTranslationWithDetect(manualInput);
        } else {
          triggerManualTranslation(manualInput);
        }
      } else {
        setAccumulatedTranslation('');
        setLiveTranslation('');
        setTranslation('');
      }
    }
    // eslint-disable-next-line
  }, [manualInput, inputLanguage, targetLanguage, isListening, isRecording, isTTSPlaying]);

  // Place this just before the return statement in App()
  let detectPrompt = null;
  if (isListening && inputLanguage === 'auto') {
    detectPrompt = (
      <div className="detect-prompt" style={{ color: '#ff9800', fontWeight: 600, margin: '0.5em 0', textAlign: 'center' }}>
        Please speak a full sentence for a few seconds to detect your language...
      </div>
    );
  }

  // Add debug log before the main return
  console.log('[DEBUG] Render: isListening:', isListening, '| inputLanguage:', inputLanguage);

  // Helper: Heuristic language guesser for fallback
  function guessLanguageByScript(text) {
    if (/[\u0600-\u06FF]/.test(text)) return 'ar-SA'; // Arabic
    if (/[\u0400-\u04FF]/.test(text)) return 'ru-RU'; // Cyrillic (Russian)
    if (/[\u0900-\u097F]/.test(text)) return 'hi-IN'; // Devanagari (Hindi)
    if (/[\u3040-\u30FF]/.test(text)) return 'ja-JP'; // Japanese
    if (/[\u3130-\u318F\uAC00-\uD7AF]/.test(text)) return 'ko-KR'; // Korean
    if (/[\u4E00-\u9FFF]/.test(text)) return 'zh-CN'; // Chinese
    if (/[çğıöşüİĞÖŞÜ]/i.test(text)) return 'tr-TR'; // Turkish
    if (/[àâçéèêëîïôûùüÿñæœ]/i.test(text)) return 'fr-FR'; // French
    if (/[áéíóúñü¿¡]/i.test(text)) return 'es-ES'; // Spanish
    if (/[äöüß]/i.test(text)) return 'de-DE'; // German
    return null;
  }

  // On reset/clear, clear readPhrases and currentReadingPhrase
  const handleClear = () => {
    setManualInput('');
    setTranscript('');
    setInterimTranscript('');
    setTranslation('');
    setLiveTranslation('');
    setAccumulatedTranslation('');
    setLastSpokenIdx(0);
    setLastReadIdx(0);
    setTtsQueue([]);
    setReadUptoIdx(0);
    setError('');
    setSpeakingTranscript(false);
    setSpeakingTranslation(false);
    setSpokenTranscriptIdx(0);
    setSpokenTranslationIdx(0);
    setSessionDetectedLang('auto');
    setReadPhrases([]);
    setCurrentReadingPhrase('');
    window.speechSynthesis.cancel();
    if (isListening && recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
      setIsListening(false);
      setIsPaused(false);
    }
    blockAutoRestart.current = true;
  };

  useEffect(() => {
    if (forceOutputClear) {
      setTimeout(() => setForceOutputClear(false), 0);
    }
  }, [forceOutputClear]);

  // 1. Add useEffect to auto-read aloud the full translation when shouldReadAloud is set and mic is off
  useEffect(() => {
    if (shouldReadAloud && !isListening && liveTranslation && liveTranslation.trim()) {
      speakText(liveTranslation, getTargetLanguageCode(targetLanguage), 'translation');
      setShouldReadAloud(false);
    }
    // eslint-disable-next-line
  }, [shouldReadAloud, isListening, liveTranslation, targetLanguage]);

  // Add a debounced effect for translating to English when mic is off and user types
  useEffect(() => {
    if (!isListening && !isRecording && manualInput.trim()) {
      // Debounce translation to English
      const timeout = setTimeout(() => {
        triggerManualTranslation(manualInput, 'en'); // Override target language to 'en'
      }, 400); // 400ms debounce
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line
  }, [manualInput, isListening, isRecording]);

  return (
    <div className="App">
      <div style={{
        position: 'fixed',
        top: '2.5vh',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100vw',
        textAlign: 'center',
        zIndex: 1,
        pointerEvents: 'none',
      }}>
        <div
          style={{
            fontSize: '4vw',
            fontWeight: 1000,
            letterSpacing: '0.1em',
            fontFamily: 'Playfair Display, serif',
            color: '#f8f8fa',
            WebkitTextStroke: '2px #fff',
            textShadow: `0 8px 32px #000a, 0 2px 0 #fff, 0 6px 16px #fff, 0 12px 24px #fff, 0 0 32px #fff, 0 0 48px #fff, 0 0 0 #fff, 0 0 24px #fff8, 0 0 2px #fff, 0 0 1px #fff`,
            filter: 'drop-shadow(0 0 32px #fff8)',
            lineHeight: 1,
          }}
        >
          MultiLing
        </div>
        <div style={{
          fontSize: '1.1rem',
          color: 'rgba(255,255,255,0.55)',
          fontWeight: 800,
          fontFamily: 'Playfair Display, serif',
          marginTop: '1.2vw',
          textShadow: '0 2px 16px #000, 0 1px 0 #fff',
        }}>
          Your Assistant — Making You Digitally <span className="glitter-text">Multilingual</span>...
        </div>
      </div>
      <AnimatedBackground />
      <header className="App-header">
        <RotatingQuote useWelcomeMessages />
        {error && <div className="error-message">{error}</div>}
        <div className="controls">
          <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-6 space-y-4 sm:space-y-0 w-full max-w-2xl mx-auto my-6">
            <div className="flex flex-col items-center">
              <label className="mb-2 text-center text-gray-200 font-medium">Input Language:</label>
              <select
                value={inputLanguage}
                onChange={e => {
                  handleLanguageChange(e.target.value, true);
                  if (e.target.value === 'auto') {
                    setSessionDetectedLang('auto');
                  } else {
                    setSessionDetectedLang(e.target.value);
                  }
                }}
                className="w-56 h-14 rounded-lg bg-gray-800 text-white text-lg text-center font-bold border border-gray-600 focus:outline-none"
              >
                {languageOptions.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.flag} {getDisplayLanguageName(lang.code)}</option>
                ))}
              </select>
            </div>

            <div className="swap-btn-flex">
              <button
                onClick={handleSwapLanguages}
                aria-label="Swap languages"
                className={`mx-2 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 text-white text-2xl w-12 h-12 transition-transform duration-200 swap-btn focus:outline-none${inputLanguage === 'auto' ? ' swap-btn-disabled' : ''}`}
                type="button"
                disabled={inputLanguage === 'auto'}
                style={inputLanguage === 'auto' ? { opacity: 0.45, cursor: 'not-allowed', pointerEvents: 'none' } : {}}
              >
                <span className="pointer-events-none" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', fontSize: '1.7rem', lineHeight: 1 }}>⇅</span>
              </button>
            </div>

            <div className="flex flex-col items-center">
              <label className="mb-2 text-center text-gray-200 font-medium">Target Language:</label>
              <select
                value={targetLanguage}
                onChange={e => {
                  console.log('[Dropdown] Target language selected:', e.target.value);
                  handleLanguageChange(e.target.value, false);
                }}
                className="w-56 h-14 rounded-lg bg-gray-800 text-white text-lg text-center font-bold border border-gray-600 focus:outline-none"
              >
                {languageOptions
                  .filter(lang => lang.targetCode !== 'auto')
                  .map(lang => (
                    <option key={lang.targetCode} value={lang.targetCode}>
                      {lang.flag} {lang.nativeName}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="zoozoo-row-flex">
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <div className="main-io-flex" style={{ alignItems: 'stretch', height: 'auto' }}>
                <div className="block input-block flex flex-col">
                  <div className="block-header flex-row-align">
                    <div className="block-header-left">
                      <span className="block-title">Input Text</span>
                      <span className="lang-label">
                        ({sessionDetectedLang === 'auto'
                          ? 'Detect'
                          : getDisplayLanguageName(sessionDetectedLang)})
                      </span>
                    </div>
                    <div className="block-header-right">
                      <button
                        className={`icon-btn mic-btn${isListening || isRecording ? ' mic-on' : ''}`}
                        title={isListening || isRecording ? 'Stop Recording' : 'Speak'}
                        onClick={async () => {
                          if (inputLanguage === 'auto') {
                            if (!isRecording) {
                              await startRecording();
                            } else {
                              await stopRecording();
                            }
                          } else {
                            toggleListening();
                          }
                        }}
                        type="button"
                        disabled={isTranslating}
                        style={isTranslating ? { opacity: 0.4, cursor: 'not-allowed' } : {}}
                      >
                        <MicIcon className={isListening || isRecording ? 'icon-anim listening' : 'icon-anim'} />
                        {(isListening || isRecording) && <span className="mic-waves"></span>}
                      </button>
                      <button
                        className={`icon-btn${copiedTranscript ? ' copied' : ''}`}
                        title="Copy"
                        onClick={() => copyToClipboard(manualInput, 'transcript')}
                        disabled={!manualInput}
                      >
                        {copiedTranscript ? <FaCheck /> : <FaRegCopy />}
                      </button>
                      <button
                        className={`icon-btn${speakingTranscript ? ' speaking' : ''}`}
                        title="Read Aloud"
                        onClick={() => {
                          if (speakingTranscript) {
                            window.speechSynthesis.cancel();
                            setSpeakingTranscript(false);
                            setSpokenTranscriptIdx(0);
                          } else {
                            speakText(manualInput, inputLanguage, 'transcript');
                          }
                        }}
                        disabled={!manualInput}
                      >
                        <FaVolumeUp />
                      </button>
                      <button
                        className="icon-btn"
                        title="Clear"
                        onClick={handleClear}
                        disabled={!manualInput}
                        style={!manualInput ? { opacity: 0.4, cursor: 'not-allowed' } : {}}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                  <div className="block-content flex-1 flex flex-col">
                    {inputLanguage === 'auto' && !isListening && sessionDetectedLang === 'auto' && manualInput.trim().length === 0 && (
                      <TypewriterPrompt text="Please speak or type something to detect your language..." />
                    )}
                    <textarea
                      value={manualInput + (interimTranscript ? ' ' + interimTranscript : '')}
                      onChange={(e) => handleManualInput(e.target.value)}
                      placeholder="Type or speak your text here (translated in real-time)..."
                      className="block-textarea flex-1 w-full resize-y"
                      maxLength={CHARACTER_LIMIT}
                      disabled={isListening}
                      style={{ margin: 0 }}
                    />
                  </div>
                  <div className="char-count-box">{manualInput.length} / {CHARACTER_LIMIT}</div>
                </div>
                <div className="block output-block flex flex-col">
                  <div className="block-header flex-row-align">
                    <div className="block-header-left">
                      <span className="block-title">Translation</span>
                      <span className="lang-label">({getDisplayLanguageName(targetLanguage)})</span>
                    </div>
                    <div className="block-header-right">
                      <span className="mic-spacer" style={{ display: 'inline-block', width: '2.2em', height: '1em' }}></span>
                      <button
                        className={`icon-btn${copiedTranslation ? ' copied' : ''}`}
                        title="Copy"
                        onClick={() => copyToClipboard(liveTranslation, 'translation')}
                        disabled={!liveTranslation || liveTranslation === 'undefined'}
                      >
                        {copiedTranslation ? <FaCheck /> : <FaRegCopy />}
                      </button>
                      <button
                        className={`icon-btn${speakingTranslation ? ' speaking' : ''}`}
                        title="Read Aloud"
                        onClick={() => {
                          if (speakingTranslation) {
                            window.speechSynthesis.cancel();
                            setSpeakingTranslation(false);
                            setSpokenTranslationIdx(0);
                          } else {
                            // Always read the full translation, not just the current segment
                            speakText(liveTranslation, getTargetLanguageCode(targetLanguage), 'translation');
                          }
                        }}
                        disabled={!liveTranslation || liveTranslation === 'undefined'}
                      >
                        <FaVolumeUp />
                      </button>
                    </div>
                  </div>
                  <div className="block-content flex-1 flex flex-col">
                    {(() => { console.log('[RENDER OUTPUT BLOCK]', { liveTranslation, accumulatedTranslation, manualInput }); return null; })()}
                    {forceOutputClear ? (
                      <div className="block-textarea flex-1 min-h-[400px]" style={{ margin: 0, position: 'relative', textAlign: 'left' }}></div>
                    ) : (readPhrases.length > 0 || currentReadingPhrase ? (
                      <div
                        className="block-textarea flex-1 w-full resize-y output-readaloud-highlight"
                        style={{
                          margin: 0,
                          background: 'transparent',
                          color: '#fff',
                          pointerEvents: 'none',
                          fontFamily: 'inherit',
                          fontSize: '1.1rem',
                          minHeight: '120px',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                          lineHeight: 1.6,
                          padding: '0.7em 1.2em',
                          borderRadius: '12px',
                          border: '1.5px solid #333',
                          boxSizing: 'border-box',
                        }}
                      >
                        <span style={{ color: '#2196f3', background: 'none' }}>
                          {readPhrases.join(' ')}
                        </span>
                        {currentReadingPhrase && (
                          <span style={{ color: '#2196f3', background: 'none' }}>
                            {currentReadingPhrase.slice(0, readUptoIdx)}
                          </span>
                        )}
                        {currentReadingPhrase && (
                          <span style={{ color: '#fff', background: 'none' }}>
                            {currentReadingPhrase.slice(readUptoIdx)}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="block-textarea flex-1 min-h-[400px]" style={{ margin: 0, position: 'relative', textAlign: 'left', background: 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: '1.1rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word', lineHeight: 1.6, padding: '0.7em 1.2em', borderRadius: '12px', border: '1.5px solid #333', boxSizing: 'border-box' }}>
                        {liveTranslation}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
