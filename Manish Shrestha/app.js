const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");
const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".sliderPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");
const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

const products = [
    {
        id: 1,
        title: "Air Force",
        price: 119,
        colors: [
            { code: "black", img: "./img/air.png" },
            { code: "darkblue", img: "./img/air2.png" }
        ]
    },
    {
        id: 2,
        title: "Air Jordan",
        price: 149,
        colors: [
            { code: "lightgray", img: "./img/jordan.png" },
            { code: "green", img: "./img/jordan2.png" }
        ]
    },
    {
        id: 3,
        title: "Blazer",
        price: 109,
        colors: [
            { code: "lightgray", img: "./img/blazer.png" },
            { code: "green", img: "./img/blazer2.png" }
        ]
    },
    {
        id: 4,
        title: "Crater",
        price: 129,
        colors: [
            { code: "black", img: "./img/crater.png" }
        ]
    },
    {
        id: 5,
        title: "Hippie",
        price: 99,
        colors: [
            { code: "gray", img: "./img/hippie.png" },
            { code: "black", img: "./img/hippie2.png" }
        ]
    }
];

let choosenProduct = products[0];

menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        wrapper.style.transform = `translateX(${-100 * index}vw)`;
        choosenProduct = products[index];
        currentProductTitle.textContent = choosenProduct.title;
        currentProductPrice.textContent = "$" + choosenProduct.price;
        currentProductImg.src = choosenProduct.colors[0].img;
        currentProductColors.forEach((color, colorIndex) => {
            color.style.backgroundColor = choosenProduct.colors[colorIndex]?.code || "white";
        });
    });
});

currentProductColors.forEach((color, index) => {
    color.addEventListener("click", () => {
        currentProductImg.src = choosenProduct.colors[index]?.img || "./img/default.png";
    });
});

currentProductSizes.forEach((size) => {
    size.addEventListener("click", () => {
        currentProductSizes.forEach((s) => {
            s.style.backgroundColor = "white";
            s.style.color = "black";
        });
        size.style.backgroundColor = "black";
        size.style.color = "white";
    });
});

productButton.addEventListener("click", () => {
    payment.style.display = "flex";
});

close.addEventListener("click", () => {
    payment.style.display = "none";
});

document.getElementById("paymentForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    formData.append('productId', choosenProduct.id);
    formData.append('productTitle', choosenProduct.title);
    formData.append('productPrice', choosenProduct.price);

    fetch("payment.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'Payment Successful!') {
            alert("Payment Successful!");
            payment.style.display = "none";
        } else {
            alert("Payment Failed: " + data);
        }
    })
    .catch(error => {
        alert("An error occurred: " + error.message);
    });
});
document.getElementById("paymentForm").addEventListener("submit", function(e) {
    e.preventDefault();

    // Disable the submit button to prevent multiple submissions
    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    // Set hidden fields with product information
    document.getElementById('productId').value = choosenProduct.id;
    document.getElementById('productTitle').value = choosenProduct.title;
    document.getElementById('productPrice').value = choosenProduct.price;

    // Create a FormData object from the form
    const formData = new FormData(this);

    // Send the form data to the server
    fetch("payment.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Debugging line to check server response
        if (data.trim() === 'Payment Successful!') {
            alert("Payment Successful!");
            payment.style.display = "none";
        } else {
            alert("Payment Failed: " + data);
        }
        // Re-enable the submit button after processing
        submitButton.disabled = false;
    })
    .catch(error => {
        alert("An error occurred: " + error.message);
        // Re-enable the submit button in case of an error
        submitButton.disabled = false;
    });
});
// Use this code to ensure that event listeners are added only once
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("paymentForm").addEventListener("submit", function(e) {
        // Form submission code here
    });
});
document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    fetch("register.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        const messageElement = document.getElementById("registerMessage");
        if (data.success) {
            messageElement.textContent = "Registration successful!";
        } else {
            messageElement.textContent = "Error: " + data.message;
        }
    })
    .catch(error => {
        document.getElementById("registerMessage").textContent = "An error occurred: " + error.message;
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Handle Login Form
    document.getElementById('loginForm')?.addEventListener('submit', (event) => {
        event.preventDefault();
        // Perform form validation here if needed
        document.getElementById('loginForm').submit();
    });

    // Handle Register Form
    document.getElementById('registerForm')?.addEventListener('submit', (event) => {
        event.preventDefault();
        // Perform form validation here if needed
        document.getElementById('registerForm').submit();
    });

    // Handle Logout
    document.getElementById('logout')?.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = 'logout.php';
    });

    // Close modal functionality
    document.querySelectorAll('.closeModal').forEach(element => {
        element.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });
});
