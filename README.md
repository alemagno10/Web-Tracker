# Web-Tracker

WebTracKer é uma extensão de navegador que rastreia conexões de terceiros em websites, detecta possíveis ameaças de sequestro de navegador (hijacking), monitora o armazenamento local (localStorage e sessionStorage) e fornece informações sobre cookies e técnicas de fingerprinting como o uso de Canvas.

## Funcionalidades
- Monitoramento de Conexões de Terceiros: Detecta e lista todas as conexões feitas para domínios de terceiros enquanto você navega.
- Detecção de Sequestro de Navegador (Hijacking): Detecta injeções de scripts e hooks de eventos potencialmente maliciosos no DOM.
- Armazenamento Local e Sessão: Monitora e exibe mudanças no localStorage e sessionStorage em tempo real.
- Monitoramento de Cookies: Diferencia e contabiliza cookies de primeira e de terceira parte.
- Detecção de Canvas Fingerprinting: Identifica tentativas de usar fingerprinting com elementos Canvas.

## Tecnologias Utilizadas
- HTML5 - Estrutura do popup.
- CSS3 - Estilização moderna e responsiva.
- JavaScript - Funcionalidade da extensão.
- Chrome WebExtensions API - APIs de webRequest, cookies, storage, entre outros.
