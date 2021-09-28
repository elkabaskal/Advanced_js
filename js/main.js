const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        basketUrl: '/getBasket.json',
        products: [],
        goods: [
            /*  проверял будет ли работать вывод пустой корзины
         {
             countGoods: 0,
         }, */
        ],

        imgCatalog: 'https://via.placeholder.com/200x150',
        imgCart: 'https://via.placeholder.com/50x100',
        show: false,
        text: '',
        emptyCart: false,
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(good) {
            console.dir(good);
        },
        filterGoods(text) {
            console.log(text); //показывает текст из формы (проверял передачу данных от формы)
        },
        removeProduct(amount) { //показывает количество товара в корзине (проверял передачу от клика)
            console.log(amount);
        },
        showEmptyCart() {
            if (this.goods.countGoods === 0) { //проверка количества товара в корзине для отображения надписи "Пустая корзина"
                this.emptyCart = true;
            }
            return;
        },

    },
    beforeCreate() {

    },
    created() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                this.products = data;

            });
        this.getJson(`${API + this.basketUrl}`) //получение первоначальных данных для корзины
            .then(data => {
                this.goods = data;
                console.dir(data);
            });
    },
    beforeMount() {
        this.showEmptyCart(); //вызов функции проверки пустой корзины

    },
    mounted() {

    },
    beforeUpdate() {

    },
    updated() {

    },
    beforeDestroy() {

    },
    destroyed() {

    },
});