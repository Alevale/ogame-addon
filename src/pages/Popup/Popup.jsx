import React, { useState } from 'react';
import './Popup.css';

const Popup = ({options, asteroids = {}}) => {
  const [enabledOptions, setEnabledOptions] = useState(options)
  const [countDownMinutes, setCountDownMinutes] = useState(0)
  const [countDownSeconds, setCountDownSeconds] = useState(0)

  const updateExtensionStorage = (enabledOptionName) => {
    const newVal = !enabledOptions[enabledOptionName]
    const newEnabledOptions = {
      ...enabledOptions,
      [enabledOptionName]: newVal
    }

    chrome.storage.local.set({
      enabledOptions: newEnabledOptions,
    }, () => {

      chrome.tabs.query({}, (tabs) => {
        const myTab = tabs.find(t => t.url?.includes('ogamex'));
        chrome.tabs.sendMessage(myTab.id, 'enabledOptions-updated', (response) => {
          setEnabledOptions(newEnabledOptions);
        });
      });
    });
  }

  const cleanUp = () => {
    chrome.storage.local.set({ asteroids: {} }, () => {
    });
  }

  const openLink = (position) => {
    window.open(`/fleet?x=3&y=${position}&z=17&mission=12`)
  }

  return (
    <div className="App">
      <header className="App-header">

        { Object.keys(asteroids).map((position) => {
          return <div onClick={ () => openLink(position) }>{position} expires in {asteroids[position]}</div>
        }) }

        <button onClick={ cleanUp }>
          Cleanup asteroids
        </button>

        { Object.keys(enabledOptions).map((enabledOptionName) => {
          return <button onClick={ () => updateExtensionStorage(enabledOptionName) } key={enabledOptionName}>
            {enabledOptionName} is { enabledOptions[enabledOptionName] ? 'on' : 'off' }
          </button>
        }) }

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
