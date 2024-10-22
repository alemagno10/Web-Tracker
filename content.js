(() => {
  // Save original methods to call later
  const originalLocalStorageSetItem = localStorage.setItem;
  const originalSessionStorageSetItem = sessionStorage.setItem;

  // Override localStorage.setItem
  localStorage.setItem = function (key, value) {
    originalLocalStorageSetItem.apply(this, arguments); // Call original method
    console.log(`localStorage: Key "${key}" added with value "${value}"`);
    
    // Send a message to the background script about the storage change
    chrome.runtime.sendMessage({
      type: "localStorageChange",
      key: key,
      value: value
    });
  };

  // Override sessionStorage.setItem
  sessionStorage.setItem = function (key, value) {
    originalSessionStorageSetItem.apply(this, arguments); // Call original method
    console.log(`sessionStorage: Key "${key}" added with value "${value}"`);
    
    // Send a message to the background script about the storage change
    chrome.runtime.sendMessage({
      type: "sessionStorageChange",
      key: key,
      value: value
    });
  };
})();
