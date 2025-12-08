'use strict'

const logNavButton = document.getElementById("nav-button-log");
const viagemNavButton = document.getElementById('nav-button-viagem');
const estatisticaNavButton = document.getElementById('nav-button-estatistica');

const containerDeLogs = document.getElementById('container-de-logs');
const containerDeViagens = document.getElementById('container-de-logs');
const carrosselDeConteudo = document.getElementById('carrossel-de-conteudo');

logNavButton.addEventListener('click', () => {
    carrosselDeConteudo.classList.add('carrossel-page_1');
    carrosselDeConteudo.classList.remove('carrossel-page_2');
    carrosselDeConteudo.classList.remove('carrossel-page_3');
    
    logNavButton.classList.add('selected');
    viagemNavButton.classList.remove('selected');
    estatisticaNavButton.classList.remove('selected');
});

viagemNavButton.addEventListener('click', () => {
    carrosselDeConteudo.classList.remove('carrossel-page_1');
    carrosselDeConteudo.classList.add('carrossel-page_2');
    carrosselDeConteudo.classList.remove('carrossel-page_3');
    
    logNavButton.classList.remove('selected');
    viagemNavButton.classList.add('selected');
    estatisticaNavButton.classList.remove('selected');
});

estatisticaNavButton.addEventListener('click', () => {
    carrosselDeConteudo.classList.remove('carrossel-page_1');
    carrosselDeConteudo.classList.remove('carrossel-page_2');
    carrosselDeConteudo.classList.add('carrossel-page_3');
    
    logNavButton.classList.remove('selected');
    viagemNavButton.classList.remove('selected');
    estatisticaNavButton.classList.add('selected');
});
