// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'LANGUAGE_CHANGED') {
    console.log('Language changed to:', message.language);
  } else if (message.type === 'THEME_CHANGED') {
    console.log('Theme changed to:', message.theme);
  }
  sendResponse({ success: true });
});