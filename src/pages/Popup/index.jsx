import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './index.css';

const presetEnabledOptions = {
};

chrome.storage.local.get(null, ({ enabledOptions, asteroids = {} }) => {
  if (typeof enabledOptions === 'undefined' || Object.keys(enabledOptions).length !== Object.keys(presetEnabledOptions).length) {
    chrome.storage.local.set({ enabledOptions: presetEnabledOptions }, () => {
      render(<Popup options={ enabledOptions } asteroids={asteroids} />, window.document.querySelector('#app-container'));
    });
    return;
  }

  render(<Popup options={ enabledOptions } asteroids={asteroids} />, window.document.querySelector('#app-container'));
});


if (module.hot) module.hot.accept();
