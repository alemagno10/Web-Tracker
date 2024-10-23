document.addEventListener('DOMContentLoaded', () => {
  const connectionList = document.getElementById('connectionList');
  const cookieInfo = document.getElementById('cookieInfo');
  const localStorageInfo = document.getElementById('localStorageInfo');
  const sessionStorageInfo = document.getElementById('sessionStorageInfo');
  const canvasFingerprintingInfo = document.getElementById('canvasFingerprintingInfo');
  const privacyScoreElement = document.getElementById('privacyScore');
  const analyzeButton = document.getElementById('analyzeButton');
  const resultsSection = document.getElementById('results');

  analyzeButton.addEventListener('click', () => {
    resultsSection.classList.add('visible');
    privacyScoreElement.textContent = '';
    canvasFingerprintingInfo.textContent = '';

    connectionList.innerHTML = '';
    cookieInfo.textContent = 'Analyzing cookies...';
    localStorageInfo.textContent = 'Analyzing localStorage...';
    sessionStorageInfo.textContent = 'Analyzing sessionStorage...';

    let privacyScore = 0;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const activeTab = tabs[0];
        const activeTabId = activeTab.id;

        chrome.runtime.sendMessage({ type: "clearTabData" });

        chrome.storage.local.get('tabConnections', (result) => {
          const tabConnections = result.tabConnections || {};
          const connections = tabConnections[activeTabId]?.connections || [];

          if (connections.length > 0) {
            connections.forEach((connection) => {
              const li = document.createElement('li');
              li.textContent = connection;
              connectionList.appendChild(li);
            });

            if (connections.length === 0) {
              privacyScore += 4;
            } else if (connections.length <= 5) {
              privacyScore += 2;
            }
          } else {
            const li = document.createElement('li');
            li.textContent = 'No third-party connections detected.';
            connectionList.appendChild(li);
            privacyScore += 4;
          }
        });

        chrome.storage.local.get(['firstPartyCookiesCount', 'thirdPartyCookiesCount'], (result) => {
          const hasFirstPartyCookies = result.firstPartyCookiesCount > 0;
          const hasThirdPartyCookies = result.thirdPartyCookiesCount > 0;

          cookieInfo.textContent = hasFirstPartyCookies || hasThirdPartyCookies
            ? 'Cookies detected.'
            : 'No cookies detected.';

          if (!hasThirdPartyCookies) {
            privacyScore += 3;
          }
        });

        chrome.storage.local.get('storageData', (result) => {
          const storageData = result.storageData || {};
          const tabStorage = storageData[activeTabId] || { localStorage: {}, sessionStorage: {} };

          if (Object.keys(tabStorage.localStorage).length > 0) {
            localStorageInfo.textContent = 'Local Storage detected.';
          } else {
            localStorageInfo.textContent = 'No Local Storage detected.';
            privacyScore += 1;
          }

          if (Object.keys(tabStorage.sessionStorage).length > 0) {
            sessionStorageInfo.textContent = 'Session Storage detected.';
          } else {
            sessionStorageInfo.textContent = 'No Session Storage detected.';
            privacyScore += 1;
          }
        });

        chrome.storage.local.get('canvasFingerprinting', (result) => {
          const canvasFingerprintingDetected = result.canvasFingerprinting?.[activeTabId] || false;

          if (!canvasFingerprintingDetected) {
            canvasFingerprintingInfo.textContent = 'Canvas Fingerprinting not detected.';
            privacyScore += 1;
          } else {
            canvasFingerprintingInfo.textContent = 'Canvas Fingerprinting detected.';
          }

          setTimeout(() => {
            privacyScoreElement.textContent = `Privacy Score: ${privacyScore} (max 10)`;
          }, 1000);
        });
      }
    });
  });
});
