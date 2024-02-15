chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript({
      code: 'document.dispatchEvent(new Event("focus"));'
    });
  });
  