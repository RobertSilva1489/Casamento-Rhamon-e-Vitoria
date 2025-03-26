
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
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

const database = getDatabase();
const confirmadosRef = ref(database, 'confirmados');

onValue(confirmadosRef, (snapshot) => {
    let totalAdultos = 0;
    let totalCriancas = 0;

    if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
            const dados = childSnapshot.val();
            totalAdultos += dados.adultos || 0;
            totalCriancas += dados.criancas || 0;
        });
    }

    document.getElementById('total-adultos').innerText = `Total de adultos: ${totalAdultos}`;
    document.getElementById('total-criancas').innerText = `Total de crianças: ${totalCriancas}`;
});



