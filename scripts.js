// Contagem regressiva até a data do casamento
const casamentoData = new Date("2025-04-19T00:00:00").getTime();

const countdown = setInterval(() => {
    const agora = new Date().getTime();
    const distancia = casamentoData - agora;

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    
    document.getElementById('countdown').innerText = `${dias} dias restantes`;

    if (distancia < 0) {
        clearInterval(countdown);
        document.getElementById('countdown').innerText = "O grande dia chegou!";
    }
}, 1000);



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


// Função para carregar confirmações do banco de dados e exibir na aba de admin
function carregarConfirmacoes() {
    const confirmacaoRef = ref(database, 'confirmacoes');
    onValue(confirmacaoRef, (snapshot) => {
        const listaConfirmacoesDiv = document.getElementById('lista-confirmacoes');
        listaConfirmacoesDiv.innerHTML = ''; // Limpa a lista antes de carregar os dados

        snapshot.forEach((childSnapshot) => {
            const confirmacao = childSnapshot.val();
            const confirmacaoElement = document.createElement('p');
            confirmacaoElement.innerHTML = `<strong>${confirmacao.nome}</strong>: ${confirmacao.adultos} adultos, ${confirmacao.criancas} crianças`;
            listaConfirmacoesDiv.appendChild(confirmacaoElement);
        });
    });
}
// Função para carregar a lista de presentes do banco de dados
function carregarPresentes() {
    const presentesRef = ref(db, 'presentes');
    onValue(presentesRef, (snapshot) => {
        const presenteSelect = document.getElementById('presente-lista');
        presenteSelect.innerHTML = ''; // Limpar lista
        snapshot.forEach((childSnapshot) => {
            const presente = childSnapshot.val();
            if (!presente.escolhidoPor) {  // Se não foi escolhido ainda
                const option = document.createElement('option');
                option.value = childSnapshot.key;
                option.text = presente.nome;
                presenteSelect.appendChild(option);
            }
        });
    });
}


function mostrarAbaAdmin() {
    document.getElementById('admin-tab').style.display = 'block';
    openTab(null, 'admin');
    carregarPresentesAdmin();
    carregarPresencasAdmin();
}




