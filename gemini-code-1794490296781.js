// 1. Liste dial les produits (T9der t-beddelhom w tzid li bghiti)
const products = [
    {
        id: 1,
        name: "ساعة ذكية رياضية (Smart Watch)",
        price: 250,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80"
    },
    {
        id: 2,
        name: "سماعات بلوتوث لاسلكية (AirPods)",
        price: 180,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
    },
    {
        id: 3,
        name: "حذاء رياضي مريح",
        price: 320,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80"
    },
    {
        id: 4,
        name: "حقيبة ظهر عصرية",
        price: 200,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80"
    },
    {
        id: 5,
        name: "نظارات شمسية كلاسيكية",
        price: 150,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80"
    },
    {
        id: 6,
        name: "عطر رجالي فاخر",
        price: 400,
        image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&q=80"
    }
];

let cart = [];

// 2. Afficher les produits f la page
function displayProducts(items) {
    const container = document.getElementById("products-list");
    container.innerHTML = "";
    items.forEach(product => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${product.price} درهم</p>
                <button class="add-btn" onclick="addToCart(${product.id})">أضف إلى السلة 🛒</button>
            </div>
        `;
    });
}

// 3. Recherche
function searchProducts() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    displayProducts(filtered);
}

// 4. Zid produit l-panier
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
}

// 5. Mseh produit mn l-panier
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// 6. Mise à jour dial l-panier
function updateCart() {
    document.getElementById("cart-count").innerText = cart.length;
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <small>${item.price} درهم</small>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">حذف</button>
            </div>
        `;
    });

    cartTotal.innerText = total;
}

// 7. Hell w sed l-panier
function toggleCart() {
    document.getElementById("cart-sidebar").classList.toggle("active");
}

// 8. Envoyer la commande (WhatsApp integration)
function submitOrder(event) {
    event.preventDefault();
    if (cart.length === 0) {
        alert("السلة فارغة! اختار شي منتوج بعدا.");
        return;
    }

    const name = document.getElementById("client-name").value;
    const phone = document.getElementById("client-phone").value;
    const city = document.getElementById("client-city").value;
    
    let orderDetails = cart.map(item => `- ${item.name} (${item.price} DH)`).join("%0A");
    let total = document.getElementById("cart-total").innerText;

    // Bdel had nemra b nemrtk dial WhatsApp (bla 0 f lwel, dir 212)
    const yourWhatsAppNumber = "212600000000"; 
    
    const message = `طلب جديد من المتجر:%0A%0A*الاسم:* ${name}%0A*الهاتف:* ${phone}%0A*المدينة:* ${city}%0A%0A*المنتجات:*%0A${orderDetails}%0A%0A*المجموع:* ${total} درهم`;

    // Y-sift l-client directement l-WhatsApp dialk bach y-confirmer
    window.open(`https://wa.me/${yourWhatsAppNumber}?text=${message}`, "_blank");

    // Khwi l-panier mora la commande
    cart = [];
    updateCart();
    toggleCart();
    document.getElementById("checkout-form").reset();
}

// Démarrer
displayProducts(products);