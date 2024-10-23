(() => {
  const sendStorageData = () => {
    chrome.runtime.sendMessage({
      type: "storageData",
      localStorage: { ...localStorage },
      sessionStorage: { ...sessionStorage }
    });
  };

  window.addEventListener('load', sendStorageData);

  const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
  HTMLCanvasElement.prototype.toDataURL = function () {
    chrome.runtime.sendMessage({ type: "canvasFingerprintingDetected" });
    return originalToDataURL.apply(this, arguments);
  };
})();
