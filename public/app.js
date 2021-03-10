
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
            // console.log(dados.concluida)
            criarElemento(dados.task, doc.id, dados.concluida);
        });
        verificaTask()
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
            console.log("Document written with ID: ", docRef.id, false);
            id = docRef.id;
            criarElemento(tarefa.value, id, false);
            tarefa.value = ''
            verificaTask()
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

}

function criarElemento(value, id, check) {

    liElement = document.createElement('li')
    checkElement = document.createElement('input')
    checkElement.setAttribute('type', 'checkbox')
    checkElement.setAttribute('id', `${id}`)

    liElement.innerHTML = value;
    liElement.setAttribute('data-js', `${id}`)
    liElement.className = 'd-flex list-group-item justify-content-between'
    checkElement.className = 'd-flex'
    ulElement.appendChild(liElement)
    var botao = document.createElement('button')
    botao.innerHTML = '<i class="bi bi-trash"></i>'
    botao.className = 'd-flex btn btn-danger'
    botao.addEventListener('click', function () {
        deleteTodo(id)
    })

    liElement.appendChild(checkElement)
    if (check) {
        checkElement.checked = true

    }
    liElement.appendChild(botao)

}

function verificaTask() {


    let xeqEle = document.querySelectorAll(`li input`)
    xeqEle.forEach(item => {
        let text = item.parentNode
        riscaTexto(item, text)

        item.addEventListener('click', function (e) {

            db.collection("tarefas").doc(`${item.id}`).update({
                concluida: item.checked
            }).then(() => {
                riscaTexto(item, text)
                console.log("Document successfully update!", item.checked);
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        })
    })

}

function riscaTexto(item, texto) {
    if (item.checked === true) {
        texto.classList.add('text-decoration-line-through')
        console.log('o resultado true', item.checked)
    } else {
        texto.classList.remove('text-decoration-line-through')
        console.log('o resultado falso', item.checked)

    }
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