(() => {
  const originalLocalStorageSetItem = localStorage.setItem;
  const originalSessionStorageSetItem = sessionStorage.setItem;

  localStorage.setItem = function (key, value) {
    originalLocalStorageSetItem.apply(this, arguments);
    chrome.runtime.sendMessage({
      type: "localStorageChange",
      key: key,
      value: value
    });
  };

  sessionStorage.setItem = function (key, value) {
    originalSessionStorageSetItem.apply(this, arguments);
    chrome.runtime.sendMessage({
      type: "sessionStorageChange",
      key: key,
      value: value
    });
  };

  const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
  HTMLCanvasElement.prototype.toDataURL = function () {
    chrome.runtime.sendMessage({ type: "canvasFingerprinting" });
    return originalToDataURL.apply(this, arguments);
  };

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeName === "SCRIPT") {
            chrome.runtime.sendMessage({
              type: "hijackingDetection",
              details: `Script Injection detected: ${node.outerHTML}`
            });
          }
        });
      }
    });
  });
  observer.observe(document, { childList: true, subtree: true });

  const originalAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (type, listener, options) {
    chrome.runtime.sendMessage({
      type: "eventHooking",
      details: `Event ${type} hooked on element ${this.tagName}`
    });
    return originalAddEventListener.apply(this, arguments);
  };
})();
