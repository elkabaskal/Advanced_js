class Hamburger {
    constructor(container = '.menu') {
        this.container = container;
        this.goods = [
            { id: 1, title: 'big', type: 'burger', price: 100, calories: 40 },
            { id: 2, title: 'small', type: 'burger', price: 50, calories: 20 },
            { id: 3, title: 'cheese', type: 'stuffing', price: 10, calories: 20 },
            { id: 5, title: 'salat', type: 'stuffing', price: 20, calories: 5 },
            { id: 6, title: 'potato', type: 'stuffing', price: 15, calories: 10 },
            { id: 7, title: 'spice', type: 'souce', price: 15, calories: 0 },
            { id: 8, title: 'mayo', type: 'souce', price: 20, calories: 5 },
        ];
        this.totalPrice = 0;
        this.caloriesSum = 0;
        this.order = [];
        this.getSize();
        this.clear();
        this.getHTMLString();
    }

    checkRadio(name) { //проверка выбранных элементов
        let rad = document.getElementsByName(name);
        for (let i = 0; i < rad.length; i++) {
            if (rad[i].checked) {
                let elem = rad[i].id;
                this.addCart(elem);
            }
        }
    }

    addCart(elem) { //Добавляем наюор в массив
        for (let i = 0; i < this.goods.length; i++) {
            if (elem == this.goods[i].title) {
                this.order.push(this.goods[i]);
            }
        }
    }

    calculatePrice() { // Узнать цену и калории

        for (const i in this.order) {
            this.totalPrice = this.totalPrice + this.order[i].price;
        }

        for (const i in this.order) {
            this.caloriesSum = this.caloriesSum + this.order[i].calories;
        }

        this.getHTMLString()
    }

    getHTMLString() { //строка для сумм
        let calc = document.querySelector('#total');
        calc.textContent = 'Стоимомть заказа: ' + this.totalPrice + ' руб.';
        let calories = document.querySelector('#calories');
        calories.textContent = 'Количество калорий: ' + this.caloriesSum + ' кал.';
    }


    getSize() { // Узнать размер гамбургера
        let block = document.querySelector(this.container);
        block.insertAdjacentHTML('beforeend', `<div id = "wrap"><h3 class="sum">Выберете ${this.goods[0].type}</h3>
        <input type="radio" id="big" name="burger"><label for="big">${this.goods[0].title}</label>
        <input type="radio" id="small" name="burger"><label for="small">${this.goods[1].title}</label>
        <button id="btn">Добавить</button></div>`);
        document.querySelector('#btn').addEventListener('click', (Event) => {
            if (Event.target.tagName !== 'BUTTON') return;
            this.checkRadio('burger');
            let delBtn = document.querySelector('#btn');
            delBtn.remove();
        });
        this.getStuffing();
    }

    getStuffing() { // Узнать начинку гамбургера
        let filling = document.querySelector('#wrap');
        filling.insertAdjacentHTML('beforeend', `<h3 class="sum">Выберете ${this.goods[2].type}</h3>
        <input type="radio" id="cheese" name="stuffing"><label for="cheese">${this.goods[2].title}</label>
        <input type="radio" id="salat" name="stuffing"><label for="small">${this.goods[3].title}</label>
        <input type="radio" id="potato" name="stuffing"><label for="small">${this.goods[4].title}</label>
        <button id="btn2">Добавить</button>`);
        document.querySelector('#btn2').addEventListener('click', (Event) => {
            if (Event.target.tagName !== 'BUTTON') return;
            this.checkRadio('stuffing');
            let delBtn = document.querySelector('#btn2');
            delBtn.remove();
        });

        this.addTopping();
    }

    addTopping() { // Добавка
        let additive = document.querySelector('#wrap');
        additive.insertAdjacentHTML('beforeend', `<h3 class="sum">Выберете ${this.goods[5].type}</h3>
        <input type="radio" id="spice" name="souce"><label for="spice">${this.goods[5].title}</label>
        <input type="radio" id="mayo" name="souce"><label for="mayo">${this.goods[6].title}</label>
        <button id="btn3">Добавить и посчитать</button>`);
        document.querySelector('#btn3').addEventListener('click', (Event) => {
            if (Event.target.tagName !== 'BUTTON') return;
            this.checkRadio('souce');
            let delBtn = document.querySelector('#btn3');
            delBtn.remove();
            this.calculatePrice();
        });
    }

    clear() { //Очистить поле
        document.querySelector('#clear').addEventListener('click', (Event) => {
            if (Event.target.tagName !== 'BUTTON') return;
            let del = document.querySelector('#wrap');
            del.remove();
            this.order = [];
            this.getSize();
            this.totalPrice = 0;
            this.caloriesSum = 0;
            this.getHTMLString()
        });

    }

}

const catalog = new Hamburger();