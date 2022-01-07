'use strict'

/* Массив для хранения значений подсчета нажатий. */
var clicksCounterArray = []

/* Функция подсчета нажатий */
function clicksCounter(word){

    clicksCounterArray.push(word)

    let _tempArray = {}

    for (let key in clicksCounterArray){
        if(_tempArray[clicksCounterArray[key]]){
            _tempArray[clicksCounterArray[key]] += 1
        }else{
            _tempArray[clicksCounterArray[key]] = 1
        }
    }

    let messageBlock = document.getElementById('messageBlock')
    messageBlock.innerHTML = `Вы нажали:<br />`

    for (let key in _tempArray){
        messageBlock.innerHTML += `элемент ${key} ${_tempArray[key]} раз;<br />`
    }
}

/* Функция размещает элементы на верхней панели и подсчитывает нажатия. */
function placeWordsOnTopBlock(id, word){
    document.getElementById('topBlock').innerHTML += ` ${word}`
    clicksCounter(`${id} ${word}`)
}

/* Функция размещает разобранные элементы на боковой панели. */
function placeWordsOnLeftBlock(dict){

    const leftBlock = document.getElementById('leftBlock')

    for (let id in dict){
        let btnSubmit = document.createElement('button')
        btnSubmit.setAttribute('class', 'submit-left-menu')
        btnSubmit.innerHTML = `${id} ${dict[id]}`

        btnSubmit.addEventListener('click', function(){
            placeWordsOnTopBlock(id, dict[id])
        })
        
        leftBlock.appendChild(btnSubmit)
        
    }
}

/* Функция очищает блоки. */
function cleanBlocks(block){
    while (block.lastChild){
        block.removeChild(block.lastChild)
    }
}

/* Функция для очистки всех элементов перед новым разбором. */
function clenAll(){
    document.getElementById('wordsForm').value = ''    
    clicksCounterArray = []
    cleanBlocks(document.getElementById('messageBlock'))
    cleanBlocks(document.getElementById('leftBlock'))
    cleanBlocks(document.getElementById('topBlock'))
}

/* Функция разбирает строку используя как разделитель знак тире (-). */
function parseString(){
    let wordsForm = document.getElementById('wordsForm').value

    // Переменные для хранения id элементов.
    let a = 0
    let n = 0
    // Временные массивы для сортировки элементов.
    let _words = []
    let _numbers = []
    // Результирующий массив.
    let resultArrey = {}

    // Разбор строки
    wordsForm.split('-').forEach(element => {
        if (Number(element)){
            _numbers.push(element)

        }else if (element.match(/[\w+А-Яа-я]/g)){
            _words.push(element)
        }
    })

    // Сортировка слов.
    for (let key in _words.sort()){
        a = ++a
        resultArrey['a'+a] = _words[key] 
    }

    // Сортировка чисел.
    for (let key in _numbers.sort(function(a, b){return a - b})){
        n = ++n
        resultArrey['n'+n] = _numbers[key]
    }

    clenAll()
    placeWordsOnLeftBlock(resultArrey)
}

/* Назначение действия по нажатию кнопки. */
const submitBtn = document.getElementById('submit')
submitBtn.onclick = parseString 