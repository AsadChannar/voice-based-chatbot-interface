import React, { useState, useRef } from 'react';
import { ReactMic } from 'react-mic';
import { Button } from 'react-bootstrap';
import './ChatApp.css'


const ChatApp = () => {
  const [voiceMessages, setVoiceMessages] = useState([]);
  const [record, setRecord] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [micVisible, setMicVisible] = useState(false);
  const micRef = useRef(null);

  const handleToggleRecording = () => {
    if (!record) {
      setMicVisible(true);
    }
    setRecord((prevRecord) => !prevRecord);
  };

  const onData = (recordedData) => {
    console.log('Recording onData', recordedData);
  };

  const onStop = (recordedBlob) => {
    console.log('Recording onStop', recordedBlob);
    setAudioBlob(recordedBlob.blob);
    setMicVisible(false);
  };

  const handleSendVoice = () => {
    if (record) {
      setRecord(false);
    }

    if (audioBlob) {
      const currentTime = new Date().toLocaleTimeString();
      const sentVoiceMessage = { audioBlob, time: currentTime, sent: true };
      const receivedVoiceMessage = { audioBlob, time: currentTime, sent: false };

      setVoiceMessages((prevMessages) => [...prevMessages, sentVoiceMessage, receivedVoiceMessage]);
      setAudioBlob(null);
    }
  };



  return (
    <div className='position-relative'>
      <div className=''>
        <div>
          <ul className='list-unstyled mt-3 overflow-y-auto px-3' style={{ height: '500px' }}>
            {voiceMessages.map((message, index) => (
              <li key={index} className={`bg-color pt-3 px-3 rounded ${message.sent ? 'text-end' : 'text-start'}`}>
                <audio controls>
                  <source src={URL.createObjectURL(message.audioBlob)} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
                <p className='mb-2'><span>{message.time}</span></p>
              </li>
            ))}
          </ul>
        </div>
        <div className='d-flex gap-3 fixed-bottom float-end p-2 rounded shadow-lg mb-3 mx-5'>
          <ReactMic
            record={record}
            className={`sound-wave ${micVisible ? '' : 'd-none'}`}
            onStop={onStop}
            onData={onData}
            strokeColor="#000000"
            backgroundColor="transparent"
            ref={micRef}
          />
          <Button
            variant="outline-success"
            id="button-addon2"
            onClick={() => {
              handleToggleRecording();
            }}>
            {/* Display mic icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-mic" viewBox="0 0 16 16">
              <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
              <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3" />
            </svg>
          </Button>

          <Button
            variant="outline-success" onClick={() => {
              // onStop();
              handleSendVoice();
            }} >
            {/* Display send icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;