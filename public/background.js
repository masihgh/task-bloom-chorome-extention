// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'LANGUAGE_CHANGED') {
    console.log('Language changed to:', message.language);
    // You can perform additional actions here, such as updating the UI or storage
    sendResponse({ success: true });
  }
});