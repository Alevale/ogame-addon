import React, { useState } from 'react';
import './Popup.css';

const Popup = () => {
  const [countDownMinutes, setCountDownMinutes] = useState(0)
  const [countDownSeconds, setCountDownSeconds] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        
        Min: <input type='number' value={ countDownMinutes} onChange={ v => setCountDownMinutes(v.target.value) } />
        Sec: <input type='number' value={ countDownSeconds} onChange={ v => setCountDownSeconds(v.target.value) } />
        <button onClick={() => {
          chrome.alarms.create('testAlarm', {
            when: Date.now() + (Number(countDownSeconds) * 1000) + (Number(countDownMinutes) * 60 * 1000)
          });
          setCountDownSeconds(0)
          setCountDownMinutes(0)
        }}>Click me!</button>

      </header>
    </div>
  );
};

export default Popup;
