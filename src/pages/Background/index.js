console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'testAlarm') {
    //our alarm is running, send notification
    chrome.notifications.create('alarm!!', {
      type: 'basic',
      iconUrl: 'https://png.pngtree.com/element_our/20190528/ourlarge/pngtree-small-url-icon-opened-on-the-computer-image_1132275.jpg',
      title: 'Ogamex',
      message: 'Time expired',
      priority: 2,
      requireInteraction: true
    })
    var audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audio.play();
  }
});