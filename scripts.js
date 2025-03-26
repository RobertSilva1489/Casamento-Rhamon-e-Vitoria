
// Função para abrir as abas
function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    
    // Esconde todas as abas
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    
    // Remove a classe 'active' de todos os botões
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    
    // Mostra a aba atual e adiciona a classe 'active' ao botão clicado
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Abre a aba "Home" por padrão quando a página carrega
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementsByClassName('tablinks')[0].click();
});
// Importa as funções necessárias do Firebase
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// Inicializa o Firebase Database
const database = getDatabase();

// Função para gerar um PIN de 6 dígitos
function gerarPin() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Garante 6 dígitos
}

// Gerar 50 PINs únicos
const totalPins = 50;
const pinsSet = new Set();

while (pinsSet.size < totalPins) {
    pinsSet.add(gerarPin());
}

// Referência no banco de dados
const pinsRef = ref(database, "pinsConfirmacao");

// Salvar os PINs no banco de dados
pinsSet.forEach(pin => {
    push(pinsRef, { pin: pin });
});

