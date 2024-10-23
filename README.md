# Web-Tracker

WebTracKer é uma extensão para Google Chrome que rastreia conexões de terceiros em websites, detecta possíveis ameaças de sequestro de navegador (hijacking), monitora o armazenamento local (localStorage e sessionStorage) e fornece informações sobre cookies e técnicas de fingerprinting como o uso de Canvas.

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

## Explicação da Pontuação de Privacidade
A pontuação de privacidade foi implementada para avaliar se uma página respeita ou não a privacidade do usuário. A pontuação vai de 0 a 10, sendo que 10 significa que a página tem um comportamento excelente em relação à privacidade, e 0 indica que a página representa um risco significativo para o usuário. A pontuação é baseada em três critérios principais:

### Conexões de terceiros:

0 conexões de terceiros: A página recebe +4 pontos. Isso indica que a página está protegendo a privacidade do usuário ao não compartilhar informações com serviços externos.
1 a 5 conexões de terceiros: A página recebe +2 pontos. Um pequeno número de conexões de terceiros ainda é aceitável, mas pode levantar preocupações de privacidade.
Mais de 5 conexões de terceiros: A página não recebe pontos nesse critério, pois muitas conexões externas podem indicar a presença de rastreamento.
Cookies de terceiros:

Nenhum cookie de terceiros: A página recebe +3 pontos. Isso indica que a página está minimizando o uso de cookies externos, o que é positivo para a privacidade.
Cookies de terceiros detectados: A página não recebe pontos nesse critério, já que a presença de cookies de terceiros pode ser usada para rastreamento.
Local Storage e Session Storage:

Nenhum Local Storage ou Session Storage: A página recebe +2 pontos (1 ponto para cada). A ausência de dados armazenados sugere que a página está usando menos rastreamento.
Apenas um deles presente: A página recebe +1 ponto. Isso indica que a página utiliza algum armazenamento, mas em um nível relativamente aceitável.
Ambos presentes: A página não recebe pontos neste critério, já que o uso de Local Storage e Session Storage pode indicar que informações do usuário estão sendo retidas.
Pontuação Máxima
A pontuação máxima de 10 só é atingida se:

- Não houver nenhuma conexão de terceiros.
- Não houver cookies de terceiros.
- Não houver dados armazenados no Local Storage e no Session Storage.
 ### Exemplo de Pontuação
Se uma página tem 3 conexões de terceiros, utiliza cookies de terceiros e usa tanto o Local Storage quanto o Session Storage, sua pontuação seria:

- +2 pontos pelas 3 conexões de terceiros.
- 0 pontos pelos cookies de terceiros.
- 0 pontos pelo uso de Local Storage e Session Storage.
- Pontuação final: 2/10

Essa metodologia permite uma avaliação clara e compreensível sobre como as páginas tratam a privacidade do usuário.
