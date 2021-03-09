
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCUHIhnSN7vvTvNnsk5q4O-41rksBlK8n8",
    authDomain: "lista-tarefas-2b0bf.firebaseapp.com",
    projectId: "lista-tarefas-2b0bf",
    storageBucket: "lista-tarefas-2b0bf.appspot.com",
    messagingSenderId: "203531906476",
    appId: "1:203531906476:web:22ac9f6593f8801a101e09"
};
// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
var db = firebase.firestore(app)
// var database = firebase.database();


const tarefa = document.querySelector('#tarefa')
var liElement;
var ulElement = document.querySelector('.lista')


function render() {

    db.collection("tarefas").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let dados = doc.data();
            // console.log(doc.id)
            criarElemento(dados.task, doc.id);
        });
    });

}
render()


document.addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        cad();
    }
})

function cad() {

    if (tarefa.value == '') {
        alert('voce tem que escrever')
        return
    }
    // [START add_ada_lovelace]
    let id;
    db.collection("tarefas").add({
        task: tarefa.value,
        concluida: false,


    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            id = docRef.id;
            criarElemento(tarefa.value, id);
            tarefa.value = ''
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    // [END add_ada_lovelace]

}

function criarElemento(value, id) {

    liElement = document.createElement('li')
    liElement.innerHTML = value;
    liElement.setAttribute('data-js', `${id}`)
    liElement.className = 'd-flex list-group-item justify-content-between'
    ulElement.appendChild(liElement)
    var botao = document.createElement('button')
    botao.innerHTML = '<i class="bi bi-trash"></i>'
    botao.className = 'd-flex btn btn-danger'
    botao.addEventListener('click', function () {
        deleteTodo(id)
    })
    liElement.appendChild(botao)

}

function deleteTodo(pos) {

    let liEle = document.querySelector(`[data-js="${pos}"]`)
    db.collection("tarefas").doc(`${pos}`).delete().then(() => {
        console.log("Document successfully deleted!");
        ulElement.removeChild(liEle)
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });

}