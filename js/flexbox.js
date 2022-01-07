'use strict'

const box = document.querySelector('.box')
const prince = document.querySelector('.prince')
const princess = document.querySelector('.princess')
const frog = document.querySelector('.frog')
const textWhoAreYou = document.getElementById('text-who-are-you')
const textPrincess = document.getElementById('text-princess')
let frogOpacity = 0
let animationOrder = 0

/* Показать или спрятать лягушку. */
function showFrog(hide){
    let start = Date.now(); // запомнить время начала
    let left = 40

    let timer = setInterval(function() {
        // сколько времени прошло с начала анимации?
        let timePassed = Date.now() - start;
        
        if (hide){

            if (frogOpacity <= 0) {
                clearInterval(timer); // закончить анимацию через
                return;
            }

            // отрисовать анимацию на момент timePassed, прошедший с начала анимации
            frogOpacity = frogOpacity - (timePassed / 1500)
        }else{

            if (frogOpacity >= 1) {
                clearInterval(timer);
                animationOrder = 1
                return;
            }
            frogOpacity = timePassed / 1500
            left = left - 0.1
            frog.style.left = `${left}%`
        }

        frog.style.opacity = frogOpacity
        textWhoAreYou.style.opacity = frogOpacity
    
    }, 20)
}

/* Показать прицессу. */
function showPrincess(){
    let start = Date.now();
    let size = 50;
    let top = 72;
    let left = 35;
    let opacity = 0;

    let timer = setInterval(function() {
        let timePassed = Date.now() - start;
        
        if (opacity >= 1) {
            clearInterval(timer);
            // Поворот всего изображения.
            box.classList.add('rotate')
            animationOrder = 2
            return;
        }

        opacity = timePassed / 1500
        princess.style.opacity = opacity
        textPrincess.style.opacity = opacity
        // Увеличение размера прицессы.
        size = size + 2.5
        princess.style.width = `${size}px`
        princess.style.height = `${size}px`
        // Подстройка координат
        top = top - 0.55 
        princess.style.top = `${top}%`
        left = left - 0.3
        princess.style.left = `${left}%`
    
    }, 20)
}

/* Показать лягушку. */
prince.addEventListener('mouseover', () => {
    if (animationOrder === 0){
        showFrog(false)
    }
})

/* Убрать лягушку, покахать принцессу. */
prince.addEventListener('click', () => {
    if (animationOrder === 1){
        showFrog(true)
        showPrincess()
    }
})

