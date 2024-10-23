document.addEventListener('DOMContentLoaded', () => {
  const connectionList = document.getElementById('connectionList');
  const cookieInfo = document.getElementById('cookieInfo');
  const localStorageInfo = document.getElementById('localStorageInfo');
  const sessionStorageInfo = document.getElementById('sessionStorageInfo');
  const analyzeButton = document.getElementById('analyzeButton');
  const resultsSection = document.getElementById('results');

  analyzeButton.addEventListener('click', () => {
    // Exibe a seção de resultados ao clicar no botão
    resultsSection.classList.remove('hidden');

    // Limpa os resultados anteriores
    connectionList.innerHTML = '';
    cookieInfo.textContent = 'Analisando cookies...';
    localStorageInfo.textContent = 'Analisando localStorage...';
    sessionStorageInfo.textContent = 'Analisando sessionStorage...';

    // Analisar Conexões de Terceiros
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const activeTab = tabs[0];

        chrome.storage.local.get('tabConnections', (result) => {
          const tabConnections = result.tabConnections || {};
          const connections = tabConnections[activeTab.id]?.connections || [];

          if (connections.length > 0) {
            connections.forEach((connection) => {
              const li = document.createElement('li');
              li.textContent = connection;
              connectionList.appendChild(li);
            });
          } else {
            const li = document.createElement('li');
            li.textContent = 'Nenhuma conexão de terceiros detectada.';
            connectionList.appendChild(li);
          }
        });
      }
    });

    // Analisar Cookies
    chrome.storage.local.get(['firstPartyCookiesCount', 'thirdPartyCookiesCount'], (result) => {
      const hasFirstPartyCookies = result.firstPartyCookiesCount > 0;
      const hasThirdPartyCookies = result.thirdPartyCookiesCount > 0;

      cookieInfo.textContent = hasFirstPartyCookies || hasThirdPartyCookies
        ? 'Cookies detectados.'
        : 'Nenhum cookie detectado.';
    });

    // Analisar localStorage
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const activeTabId = tabs[0].id;

        chrome.storage.local.get('storageData', (result) => {
          const storageData = result.storageData || {};
          const tabStorage = storageData[activeTabId];

          if (tabStorage && Object.keys(tabStorage.localStorage).length > 0) {
            localStorageInfo.textContent = 'Local Storage presente.';
          } else {
            localStorageInfo.textContent = 'Nenhum Local Storage detectado.';
          }

          if (tabStorage && Object.keys(tabStorage.sessionStorage).length > 0) {
            sessionStorageInfo.textContent = 'Session Storage presente.';
          } else {
            sessionStorageInfo.textContent = 'Nenhum Session Storage detectado.';
          }
        });
      }
    });
  });
});

