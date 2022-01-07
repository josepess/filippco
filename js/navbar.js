document.querySelector('.footer').innerHTML = `<p>2021. (с) Филипп Кабальеро</p>`

const links = [
    {'index.html':'Главная'},
    {'task-1.html':'Задание DOM'},
    {'task-2.html':'Задание Меню'},
    {'task-3.html':'Flexbox'},
    {'task-4.html':'Рисунок CSS'},
]

const ul = document.querySelector('.navbar')


for (let i = 0; i < links.length; i++) {
    for (let link in links[i]){
        let li = document.createElement('li')
        let a = document.createElement('a')
        a.href = link
        a.innerHTML = `${links[i][link]}`
        li.appendChild(a)
		ul.appendChild(li)
    }
}

