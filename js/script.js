function Product(_name, _price){
    this.name = _name;
    this.price = _price;
}

let spoon = new Product('Ложки',   'Цена: 10 грн'),
    fork  = new Product('Вилки',   'Цена: 12 грн'),
    knife = new Product('Ножи',    'Цена: 14 грн'), 
    cup   = new Product('Чашки',   'Цена: 16 грн'),
    plate = new Product('Тарелки', 'Цена: 18 грн');

let all_products = [spoon, fork, knife, cup, plate];

let product_name  = document.querySelectorAll('h3'),
    product_price = document.querySelectorAll('.price'), 
    index         = document.querySelectorAll('.index'),
    basket        = document.querySelector('.basket span');

let btns = document.querySelectorAll('button'); 

for(i = 0; i < all_products.length; i++){
    product_name[i].textContent = all_products[i].name;
    product_price[i].textContent = all_products[i].price;
    index[i].textContent = i;
    index[i].style.display = 'none';
}

let sum;
let product_added = [];


function checkLS(){
    if(localStorage.getItem('amount_in_LS')) basket.textContent = localStorage.getItem('amount_in_LS');
    else basket.textContent = 0;

    if(localStorage.getItem('product_LS')) product_added = JSON.parse(localStorage.getItem('product_LS'));
    else product_added = [];
};

checkLS();

window.addEventListener('storage', function(){
    checkLS();
});

btns.forEach(btn => {
    btn.addEventListener('click', function(){
        let price_str = this.previousElementSibling.innerText;
        let name_str  = this.previousElementSibling.previousElementSibling.innerText;
        let price_digit = +price_str.match(/\d+/)[0];
        let j = +this.nextElementSibling.textContent;

        if (!localStorage.getItem('sum_LS')) sum = 0;
        else sum = +localStorage.getItem('sum_LS');
        
        sum += price_digit;
        localStorage.setItem('sum_LS', sum);
        product_added.push(all_products[j]);
        localStorage.setItem('product_LS', JSON.stringify(product_added));
        localStorage.setItem('amount_in_LS', product_added.length);
        basket.textContent = localStorage.getItem('amount_in_LS');

    });
});