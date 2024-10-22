document.addEventListener('DOMContentLoaded', () => {
  let connectionList = document.getElementById('connectionList');
  let clearButton = document.getElementById('clearButton');

  // Get the currently active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      let activeTab = tabs[0];

      // Load third-party connections for this tab
      chrome.storage.local.get('tabConnections', (result) => {
        let tabConnections = result.tabConnections || {};
        let connections = tabConnections[activeTab.id]?.connections || [];

        // Display the third-party connections for the current tab
        connections.forEach((connection) => {
          let li = document.createElement('li');
          li.textContent = connection;
          connectionList.appendChild(li);
        });
      });
    }
  });

  // Clear the stored connections for the active tab
  clearButton.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        let activeTab = tabs[0];

        // Clear the connections for the current tab
        chrome.storage.local.get('tabConnections', (result) => {
          let tabConnections = result.tabConnections || {};
          if (tabConnections[activeTab.id]) {
            tabConnections[activeTab.id].connections = [];
            chrome.storage.local.set({ tabConnections: tabConnections }, () => {
              connectionList.innerHTML = ''; // Clear the UI
            });
          }
        });
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const localStorageList = document.getElementById('localStorageList');
  const sessionStorageList = document.getElementById('sessionStorageList');

  // Get the current active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const activeTabId = tabs[0].id;

      // Load the storage data for the active tab
      chrome.storage.local.get('storageData', (result) => {
        const storageData = result.storageData || {};
        const tabStorage = storageData[activeTabId];

        if (tabStorage) {
          const { localStorage, sessionStorage } = tabStorage;

          // Display localStorage data
          for (const [key, value] of Object.entries(localStorage)) {
            const li = document.createElement('li');
            li.textContent = `${key}: ${value}`;
            localStorageList.appendChild(li);
          }

          // Display sessionStorage data
          for (const [key, value] of Object.entries(sessionStorage)) {
            const li = document.createElement('li');
            li.textContent = `${key}: ${value}`;
            sessionStorageList.appendChild(li);
          }
        }
      });
    }
  });
});

