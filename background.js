chrome.contentSettings.microphone.set({
    primaryPattern: '*://'+chrome.runtime.id+'/*',
    setting: 'allow'
}, function (audioSuccess) {
  chrome.contentSettings.camera.set({
      primaryPattern: '*://'+chrome.runtime.id+'/*',
      setting: 'allow'
  }, function (videoSuccess) {
    console.log('Permision Granted');

    // Start stream when the extension loads

    navigator.webkitGetUserMedia({
      video: true,
      audio: true
    }, function (localMediaStream) {
      console.log('Granted camera and microphone access');
      var blobUrl = window.URL.createObjectURL(localMediaStream);
      // Add blobUrl to localStorage
      localStorage.setItem('videoSrc', blobUrl);
      console.log(blobUrl);
    }, function(e) {
      console.log(e);
    })
  });
});

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({'url': chrome.extension.getURL('popup.html')}, function(tab) {
    // Tab opened.
  });
});
