document.addEventListener('DOMContentLoaded', function() {
    fetch('https://unstoppalezzz.github.io/data/shop.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(products => {
            console.log('Products:', products);  // Add this line to verify products are being loaded
            const shopContainer = document.getElementById('shop-container');
            
            products.forEach(product => {
                const productBox = document.createElement('div');
                productBox.className = 'product-box';
                
                productBox.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>Price: $${product.price}</p>
                    <button data-id="${product.id}" data-price="${product.price}">Buy Now</button>
                `;
                
                shopContainer.appendChild(productBox);
            });

            document.querySelectorAll('.product-box button').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    const productPrice = this.getAttribute('data-price');
                    
                    paypal.Buttons({
                        createOrder: function(data, actions) {
                            return actions.order.create({
                                purchase_units: [{
                                    amount: {
                                        value: productPrice
                                    }
                                }]
                            });
                        },
                        onApprove: function(data, actions) {
                            return actions.order.capture().then(function(details) {
                                alert('Transaction completed by ' + details.payer.name.given_name);
                                // Handle address collection or order processing here
                            });
                        }
                    }).render('body');
                });
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});
