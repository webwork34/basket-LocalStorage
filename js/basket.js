let basket    = document.querySelector('.total_basket span'),
    sum       = document.querySelector('.total_price span'),
    box       = document.querySelector('.box');

let product_added;  
let i = 0;

function makeOrder(){
    if(localStorage.getItem('amount_in_LS')) basket.textContent = localStorage.getItem('amount_in_LS');
    else basket.textContent = 0;

    if(localStorage.getItem('sum_LS')) sum.textContent = localStorage.getItem('sum_LS');
    else sum.textContent = 0;

    if(localStorage.getItem('product_LS')){
        product_added = JSON.parse(localStorage.getItem('product_LS')); 

        for (; i < product_added.length; i++) {

            let item = document.createElement('div');
            box.appendChild(item).classList.add('item_box');
            let item_box  = document.querySelectorAll('.item_box');
                
            let h3 = document.createElement('h3');
            item_box[i].appendChild(h3);
            let item_name = document.querySelectorAll('h3');
            item_name[i].textContent = product_added[i].name; 

            let p = document.createElement('p'); 
            item_box[i].appendChild(p).classList.add('price');  
            let item_price = document.querySelectorAll('.price');
            item_price[i].textContent = product_added[i].price; 

            let btns = document.createElement('button');
            item_box[i].appendChild(btns);
            btns.textContent = 'Удалить из корзины';

            let btns_new = document.querySelectorAll('button');
                btns_new[i].addEventListener('click', function(){
                    let item_box = this.parentElement;  
                    let index_new = +this.nextElementSibling.innerHTML;
                    let sum_digit = +sum.innerHTML;

                    product_added.splice(index_new, 1);

                    let item_box_new  = document.querySelectorAll('.item_box');

                    box.removeChild(item_box_new[index_new]);

                    localStorage.setItem('product_LS', JSON.stringify(product_added));
                    localStorage.setItem('amount_in_LS', product_added.length);
                    basket.textContent = localStorage.getItem('amount_in_LS');

                    let price_item_str = this.previousElementSibling.innerHTML;
                    let price_item_digit = +price_item_str.match(/\d+/)[0];

                    sum_digit -= price_item_digit;

                    localStorage.setItem('sum_LS', sum_digit);
                    sum.textContent = localStorage.getItem('sum_LS');

                    let index_new_after = document.querySelectorAll('.index');
                    for (let k = index_new; k < index_new_after.length; k++) {
                        index_new_after[k].innerHTML -= 1;
                    }
                    i--;
                
                });

            let span = document.createElement('span'); 
            item_box[i].appendChild(span).classList.add('index');  
            let index = document.querySelectorAll('.index');
            index[i].innerHTML = i; 
            index[i].style.display = 'none';

        }
        
    }else{
        product_added = [];
        let item = document.querySelectorAll('.item_box');
        for (let i = 0; i < item.length; i++){
            box.removeChild(item[i]);
        }
    }
};

makeOrder();

window.addEventListener('storage', function(){
    makeOrder();
});