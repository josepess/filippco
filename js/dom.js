'use strict'
/* Массив с латинскими высказываниями. */
let latUtterancesArray = {
    1:'Consuetudo est altera natura',
    2:'Nota bene',
    3:'Nulla calamitas sola',
    4:'Per aspera ad astra',
}

/* Массив с русским переводом. */
let rusUtterancesArray = {
    1:'Привычка - вторая натура',
    2:'Заметьте хорошо!',
    3:'Беда не приходит одна',
    4:'Через тернии к звёздам',
}

/* Массивы для временного хранения высказываний. */
let _latUtterancesArray = {}
let _rusUtterancesArray = {}
let counter = 0

/* Функция добавляет параграф. */
function appendP(id, lat, rus){
    let tbody = document.getElementById('rand')
    if (counter% 2 !== 0){
    tbody.insertAdjacentHTML('afterbegin', `<p class = 'class1' id=${id}> <u> n = ${id} </u> &nbsp&nbsp&nbsp&nbsp <i> "${lat}"</i>  &nbsp&nbsp&nbsp&nbsp "${rus}"</p>`) 
    }
    else{
        tbody.insertAdjacentHTML('afterbegin', `<p class = 'class2' id=${id}> <u> n = ${id} </u> &nbsp&nbsp&nbsp&nbsp <i> "${lat}"</i>  &nbsp&nbsp&nbsp&nbsp "${rus}"</p>`) 
    } 
    counter = counter + 1
}

/* Функция выбирает произвольный id и добавляет элементы с этим id в таблицу. */
function getAndSetRandomFromArrays(){
    let arrayKeys = Object.keys(latUtterancesArray)
    let id = arrayKeys[Math.floor(Math.random() * arrayKeys.length)]

    /* Переносим элементы во временные массивы. */
    if (latUtterancesArray[id]){
        _latUtterancesArray[id] = latUtterancesArray[id]
        delete latUtterancesArray[id]

        _rusUtterancesArray[id] = rusUtterancesArray[id]
        delete rusUtterancesArray[id]
    }else{
        alert('Фразы закончились!')
        return
    }

    appendP(id, _latUtterancesArray[id], _rusUtterancesArray[id])
}

/* Функция меняет стиль текста четных строк таблицы. */
function repaintEvenesRows(){
   
    let par = document.getElementsByTagName('div')[2].getElementsByTagName('p')
    for (var i = 0; i<par.length; i++) {
        if (i % 2 !== 0){
           par[i].innerHTML = `<strong>${par[i].innerHTML}</strong>`
        }
    }
}
/* Создание и добавление кнопок. */
let btnCreat = document.createElement('button')
btnCreat.innerHTML = 'Создать'

let btnRepaint = document.createElement('button')
btnRepaint.className = 'btn-apat'
btnRepaint.innerHTML = 'Перекрасить'

let wrapperButtons = document.getElementById('wrapperButtons')
wrapperButtons.appendChild(btnCreat)
wrapperButtons.appendChild(btnRepaint)
/* Назначение действий по нажатию кнопки. */
btnCreat.onclick = getAndSetRandomFromArrays
btnRepaint.onclick = repaintEvenesRows