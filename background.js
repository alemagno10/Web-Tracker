chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    let requestUrl = new URL(details.url);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        let activeTab = tabs[0];
        let activeTabUrl = new URL(activeTab.url);

        if (requestUrl.hostname !== activeTabUrl.hostname) {
          chrome.storage.local.get({ tabConnections: {} }, (result) => {
            let tabConnections = result.tabConnections || {};

            if (!tabConnections[activeTab.id]) {
              tabConnections[activeTab.id] = { url: activeTab.url, connections: [] };
            }

            if (!tabConnections[activeTab.id].connections.includes(requestUrl.hostname)) {
              tabConnections[activeTab.id].connections.push(requestUrl.hostname);
            }

            chrome.storage.local.set({ tabConnections: tabConnections });
          });
        }
      }
    });
  },
  { urls: ["<all_urls>"] }
);

chrome.webRequest.onCompleted.addListener((details) => {
  chrome.cookies.getAll({ url: details.url }, (cookies) => {
    const firstPartyCookies = cookies.filter(cookie => cookie.domain.includes(details.initiator));
    const thirdPartyCookies = cookies.filter(cookie => !cookie.domain.includes(details.initiator));

    chrome.storage.local.set({
      firstPartyCookiesCount: firstPartyCookies.length,
      thirdPartyCookiesCount: thirdPartyCookies.length,
    });
  });
}, { urls: ["<all_urls>"] });

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  chrome.storage.local.get('tabConnections', (result) => {
    let tabConnections = result.tabConnections || {};
    if (tabConnections[tabId]) {
      delete tabConnections[tabId];
      chrome.storage.local.set({ tabConnections: tabConnections });
    }
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "storageData") {
    const tabId = sender.tab.id;

    chrome.storage.local.get({ storageData: {} }, (result) => {
      let storageData = result.storageData || {};
      storageData[tabId] = {
        localStorage: message.localStorage,
        sessionStorage: message.sessionStorage
      };

      chrome.storage.local.set({ storageData: storageData });
    });
  } else if (message.type === "canvasFingerprinting") {
    chrome.storage.local.set({ canvasFingerprintingDetected: true });
  }
});


