const products = [
    {
        id: 1,
        name: "ساعة ذكية فائقة الأداء (Ultra Watch)",
        price: 299,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80"
    },
    {
        id: 2,
        name: "سماعات لاسلكية برو (Pods Pro)",
        price: 220,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80"
    },
    {
        id: 3,
        name: "حذاء رياضي عصري خفيف",
        price: 350,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80"
    },
    {
        id: 4,
        name: "حقيبة ظهر ذكية مقاومة للماء",
        price: 260,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80"
    },
    {
        id: 5,
        name: "نظارات شمسية بريميوم ديزاين",
        price: 180,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80"
    },
    {
        id: 6,
        name: "عطر فاخر إصدار خاص",
        price: 450,
        image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80"
    }
];

let cart = [];

function displayProducts(items) {
    const container = document.getElementById("products-list");
    container.innerHTML = "";
    items.forEach(product => {
        container.innerHTML += `
            <div class="product-card">
                <div class="product-img-wrapper">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-price">${product.price} درهم</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">أضف إلى السلة 🛒</button>
                </div>
            </div>
        `;
    });
}

function searchProducts() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    displayProducts(filtered);
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
    toggleCart(); // Y-hell l-drawer otomatis bach y-ban l-client l-produit li zad
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    document.getElementById("cart-count").innerText = cart.length;
    const cartItemsContainer = document.getElementById("cartItems");
    let total = 0;

    cartItemsContainer.innerHTML = "";
    cart.forEach((item, index) => {
        total += item.price;
        cartItemsContainer.innerHTML += `
            <div class="cart-item-row">
                <div>
                    <h4 style="font-size:14px; margin-bottom:4px;">${item.name}</h4>
                    <span style="color:var(--accent); font-size:13px;">${item.price} درهم</span>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">حذف</button>
            </div>
        `;
    });

    document.getElementById("cartTotal").innerText = total;
}

function toggleCart() {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");
    drawer.classList.toggle("active");
    overlay.style.display = drawer.classList.contains("active") ? "block" : "none";
}

function submitOrder(event) {
    event.preventDefault();
    if (cart.length === 0) {
        alert("السلة فارغة!");
        return;
    }

    const name = document.getElementById("clientName").value;
    const phone = document.getElementById("clientPhone").value;
    const city = document.getElementById("clientCity").value;

    let itemsList = cart.map(i => `- ${i.name} (${i.price} DH)`).join("%0A");
    let total = document.getElementById("cartTotal").innerText;

    // Bdel had nemra b nemrtk dial WhatsApp (Mtal: 212600000000)
    const whatsAppNumber = "212600000000";

    const msg = `🛒 *طلب جديد من المتجر العصري*%0A%0A👤 *الاسم:* ${name}%0A📱 *الهاتف:* ${phone}%0A📍 *المدينة:* ${city}%0A%0A📦 *المنتجات المطلوبة:*%0A${itemsList}%0A%0A💰 *المجموع:* ${total} درهم%0A✨ _الدفع عند الاستلام_`;

    window.open(`https://wa.me/${whatsAppNumber}?text=${msg}`, "_blank");

    cart = [];
    updateCart();
    toggleCart();
    document.getElementById("checkoutForm").reset();
}

displayProducts(products);
