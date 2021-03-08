
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
var teste = document.querySelector('.8jcaYf67i8T9MBFukhWO')
// console.log(teste)


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
    liElement.className = id + ' bg-gray-50 border px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6'
    ulElement.appendChild(liElement)
    var botao = document.createElement('button')
    botao.innerHTML = '<i class="fa fa-trash"></i>'
    botao.className = 'ml-4 px-2 py-2 items-center border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-red-600 hover:bg-red-700'

    console.log("teste")
    botao.setAttribute('onclick', `deleteTodo(${id})`)
    liElement.appendChild(botao)

}

function deleteTodo(pos) {

    let liEle = document.querySelector(`.${pos}`)
    console.log(liEle)
    db.collection("tarefas").doc(`${pos}`).delete().then(() => {
        console.log("Document successfully deleted!");
        ulElement.removeChild(liEle)
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });

}