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

// Função de login
function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Login bem-sucedido
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('admin-content').style.display = 'block';
            carregarConfirmacoes();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Erro no login: ${errorMessage}`);
        });
}

// Função de logout
function logout() {
    signOut(auth).then(() => {
        // Logout bem-sucedido
        document.getElementById('login-section').style.display = 'block';
        document.getElementById('admin-content').style.display = 'none';
    }).catch((error) => {
        alert(`Erro no logout: ${error.message}`);
    });
}

// Monitorar o estado de autenticação do usuário
auth.onAuthStateChanged((user) => {
    if (user) {
        // Usuário está logado
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('admin-content').style.display = 'block';
        carregarConfirmacoes();
        carregarPresentes();
    } else {
        // Usuário não está logado
        document.getElementById('login-section').style.display = 'block';
        document.getElementById('admin-content').style.display = 'none';
    }
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

// Função para cadastrar um novo usuário (não precisa estar no código final do site)
function register() {
    const email = "rhamonsouza2249@gmail.com";
    const password = "1234";

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Usuário cadastrado:', userCredential.user);
        })
        .catch((error) => {
            console.error('Erro ao cadastrar usuário:', error.message);
        });
}




