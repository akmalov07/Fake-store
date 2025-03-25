const API = `https://fakestoreapi.com/products?limit=10`;
const cardList = document.querySelector('.card_list');
const totalPriceElement = document.getElementById('total_price');
const purchasedList = document.querySelector('.purchased_list');

let total = 0;

fetch(API)
    .then(response => response.json())
    .then(data => {
        const itemsHTML = data.map(item => `
            <li class="card_item">
                <img src="${item.image}" alt="${item.title}" class="card_img">
                <h3 class="name">${item.title}</h3>
                <p class="info">${item.description.slice(0, 60)}...</p>
                <div class="wrapper">
                    <span>$${item.price.toFixed(2)}</span>
                    <button class="yashil" data-price="${item.price}" data-name="${item.title}">Sotib Olish</button>
                </div>
            </li>
        `).join('');

        cardList.innerHTML = itemsHTML;

        const buttons = document.querySelectorAll('.yashil');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const price = parseFloat(e.target.getAttribute('data-price'));
                const name = e.target.getAttribute('data-name');

                total += price;
                totalPriceElement.textContent = total.toFixed(2);

                const listItem = document.createElement('li');
                listItem.textContent = `${name} - $${price.toFixed(2)}`;
                purchasedList.appendChild(listItem);

                alert("Mahsulot sotib olindi!");
            });
        });
    })
    .catch(error => console.error("Xatolik yuz berdi:", error));