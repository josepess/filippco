'use strict'

/* Массив с заголовками таблицы. */
const utterancesTableHeadLabels = {
    1: 'Id',
    2:'Латинский язык',
    3:'Русский язык',
}

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

/* Флаг изменения стиля по нажатию кнопки 'Перекрасить'. */
let styleInvert = false

/* Фенукция создающая пустую таблицу с заголовком. */
function createTable(data){ 
    let utterancesTable = document.createElement('table')
    let utterancesTableHead = utterancesTable.createTHead()
    let utterancesTableHeadRow = utterancesTableHead.insertRow()

    /* Обход массива, добавление заголовков таблици. */
    for (let key in data){
        let th = document.createElement('th');
        let text = document.createTextNode(data[key]);
        th.appendChild(text);
        utterancesTableHeadRow.appendChild(th);
    }
   
    utterancesTable.appendChild(document.createElement('tbody'))
    return utterancesTable
}

let utterancesTable = createTable(utterancesTableHeadLabels)

/* Фкнкция добавляет строку в таблицу. */
function appendTableRow(id, lat, rus){
    let tbody = utterancesTable.getElementsByTagName('tbody')[0]
    let row = tbody.insertRow(tbody.getElementsByTagName('tr').length)
    let cell1 = row.insertCell(0)
    let cell2 = row.insertCell(1)
    let cell3 = row.insertCell(2)
    cell1.innerHTML = `<div id='id'>n=${id}</div>`
    cell2.innerHTML = `<div id='lat'>"${lat}"</div>`
    cell3.innerHTML = `<div id='rus'>"${rus}"</div>`
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

    appendTableRow(id, _latUtterancesArray[id], _rusUtterancesArray[id])
}

/* Функция очистки таблицы. */
function cleanTable(){
    let tbody = utterancesTable.getElementsByTagName('tbody')[0]

    while (tbody.lastChild) {
        tbody.removeChild(tbody.lastChild)
    }

    /* Возвращаем элементы обратно в основной массив. */
    for (let id in _latUtterancesArray){
        latUtterancesArray[id] = _latUtterancesArray[id]
        delete _latUtterancesArray[id]

        rusUtterancesArray[id] = _rusUtterancesArray[id]
        delete _rusUtterancesArray[id]
    }    
}

/* Функция меняет стиль текста четных строк таблицы. */
function repaintEvenesRows(){
   
    let tbody = utterancesTable.getElementsByTagName('tbody')[0]
    
    let fontWeight = ''
    if(!styleInvert){
        styleInvert = true
        fontWeight = 'bold'
    }else{
        styleInvert = false
        fontWeight = 'normal'
    }

    for (var i = 0, row; row = tbody.rows[i]; i++) {
        if (i % 2 !== 0){
            for (var j = 0, col; col = row.cells[j]; j++) {
                col.style.fontWeight =  fontWeight
            }
        }
    }

    /* Более удобный метод, но не во всех браузерах работает! */
    // const sheet = new CSSStyleSheet()
    // if(!styleInvert){
    //     styleInvert = true
    //     sheet.replaceSync('#wrapperUtterancesTable tr:nth-child(2n) td{font-weight: bold;}')
    // }else{
    //     styleInvert = false
    //     sheet.replaceSync('#wrapperUtterancesTable tr:nth-child(2n) td{font-weight: normal;}')
    // }
    // document.adoptedStyleSheets = [sheet]
}

/* Добавление таблицы на страницу. */
const wrapperUtterancesTable = document.getElementById('wrapperUtterancesTable')
wrapperUtterancesTable.appendChild(utterancesTable)

/* Создание и добавление кнопок. */
let btnCreat = document.createElement('button')
btnCreat.innerHTML = 'Создать'

let btnClean = document.createElement('button')
btnClean.innerHTML = 'Очистить'

let btnRepaint = document.createElement('button')
btnRepaint.className = 'btn-apat'
btnRepaint.innerHTML = 'Перекрасить'

let wrapperButtons = document.getElementById('wrapperButtons')
wrapperButtons.appendChild(btnCreat)
wrapperButtons.appendChild(btnClean)
wrapperButtons.appendChild(btnRepaint)


/* Назначение действий по нажатию кнопки. */
btnCreat.onclick = getAndSetRandomFromArrays
btnClean.onclick = cleanTable
btnRepaint.onclick = repaintEvenesRows