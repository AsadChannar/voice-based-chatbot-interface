// SpeechToText.js
import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (isListening) {
      SpeechRecognition.startListening();
    }
    return () => {
      SpeechRecognition.stopListening();
    };
  }, [isListening]);

  const handleStart = () => {
    setIsListening(true);
    resetTranscript(); // Optional: Clear previous transcripts when starting
  };

  return (
    <div>
      <h1>Speech to Text</h1>
      <p>{transcript}</p>
      <button onClick={handleStart} disabled={isListening}>
        Start Listening
      </button>
    </div>
  );
};

export default SpeechToText;
