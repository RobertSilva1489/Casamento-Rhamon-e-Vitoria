
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

import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";
import { getDatabase, ref as databaseRef, push } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

const storage = getStorage();
const db = getDatabase();

document.getElementById('upload-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const fileInput = document.getElementById('photo-input');
    const files = fileInput.files;

    if (files.length === 0) {
        alert('Por favor, selecione pelo menos uma imagem.');
        return;
    }

    for (const file of files) {
        const storageReference = storageRef(storage, 'galeria/' + file.name);

        uploadBytes(storageReference, file).then((snapshot) => {
            return getDownloadURL(snapshot.ref);
        }).then((downloadURL) => {
            // Salvar a URL da imagem no banco de dados
            const galeriaRef = databaseRef(db, 'galeria');
            push(galeriaRef, { imageUrl: downloadURL });

            document.getElementById('upload-status').innerText = "Upload concluído com sucesso!";
        }).catch((error) => {
            console.error('Erro ao fazer upload:', error);
        });
    }

    // Limpar o formulário após o upload
    document.getElementById('upload-form').reset();
});

