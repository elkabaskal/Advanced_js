/* const products = [
    { id: 1, title: 'Notebook', price: 1000 },
    { id: 2, title: 'Mouse', price: 100 },
    { id: 3, title: 'Keyboard', price: 250 },
    { id: 4, title: 'Gamepad', price: 150 },
];

const renderProduct = (title, price) => {
    return `<div class="product-item">
            <h3>${title}</h3>
            <p>${price}</p>
            <button class="by-btn">Добавить</button>
          </div>`;
};

const renderProducts = (list) => {
    const productList = list.map((item) => renderProduct(item.title, item.price)); //не много сократил запись
    //console.log(productList);
    document.querySelector('.products').innerHTML = productList.join(''); //убрал запятые
};

renderProducts(products); */

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this._goods = [];
        this._goodsObjects = [];
        this.sum = null;

        this._fetchGoods();
        this._render();
        this._summation();
    }

    _fetchGoods() {
        this._goods = [
            { id: 1, title: 'Notebook', price: 20000 },
            { id: 2, title: 'Mouse', price: 1500 },
            { id: 3, title: 'Keyboard', price: 5000 },
            { id: 4, title: 'Gamepad', price: 4500 },
        ];
    }

    _render() {
        const block = document.querySelector(this.container);

        for (const product of this._goods) {
            const productObject = new ProductItem(product);
            this._goodsObjects.push(productObject);

            block.insertAdjacentHTML('beforeend', productObject.getHTMLString())
        }
    }

    _summation() { /*Подсчет суммы товаров в каталоге*/

        for (const i in this._goodsObjects) {
            this.sum = this.sum + this._goodsObjects[i].price;
        }
        const result = document.querySelector(this.container);
        result.insertAdjacentHTML('afterend', `<h3 class="sum">Стоимость всех товаров каталога: ${this.sum} \u20bd</h3>`);
    }
}

class ProductItem {
    constructor(item, img = 'https://via.placeholder.com/200x150') {
        this.id = item.id;
        this.title = item.title;
        this.price = item.price;
        this.img = img;
    }

    getHTMLString() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
    }
}

const catalog = new ProductsList();