document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idProduct = urlParams.get("id");

    const nameInput = document.getElementById("productName");
    const descriptionInput = document.getElementById("productDescription");
    const brandInput = document.getElementById("productBrand");
    const imageUrlInput = document.getElementById("productImageUrl");
    const priceInput = document.getElementById("productPrice");

    const apiBaseUrl = "https://striveschool-api.herokuapp.com/api/product/";
    const authHeader = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNWYzNWYyNjBjYzAwMTVjYzBkZTciLCJpYXQiOjE3Mzk4MDMwMTEsImV4cCI6MTc0MTAxMjYxMX0.jlYOAgfP3Dt1jKABJmHyEecCatFpI-jBQS1hONcsal8",
        "Content-Type": "application/json"
    };

    const submitBtn = document.createElement("button");
    submitBtn.className = "btn btn-success";
    submitBtn.innerText = idProduct ? "Modifica Prodotto" : "Crea Prodotto";
    submitBtn.addEventListener("click", handleSubmit);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger ms-2";
    deleteBtn.innerText = "Elimina Prodotto";
    deleteBtn.style.display = idProduct ? "inline-block" : "none";
    deleteBtn.addEventListener("click", handleDelete);

    document.querySelector(".container").appendChild(submitBtn);
    document.querySelector(".container").appendChild(deleteBtn);

    if (idProduct) {
        fetch(apiBaseUrl + idProduct, { headers: authHeader })
            .then(response => {
                if (!response.ok) throw new Error("Errore nel recupero del prodotto");
                return response.json();
            })
            .then(product => {
                nameInput.value = product.name;
                descriptionInput.value = product.description;
                brandInput.value = product.brand;
                imageUrlInput.value = product.imageUrl;
                priceInput.value = product.price;
            })
            .catch(error => console.error("Errore:", error));
    }

    function handleSubmit() {
        const productData = {
            name: nameInput.value,
            description: descriptionInput.value,
            brand: brandInput.value,
            imageUrl: imageUrlInput.value,
            price: parseFloat(priceInput.value)
        };

        if (idProduct) {
            fetch(apiBaseUrl + idProduct, {
                method: "PUT",
                headers: authHeader,
                body: JSON.stringify(productData)
            })
            .then(response => {
                if (!response.ok) throw new Error("Errore nella modifica del prodotto");
                return response.json();
            })
            .then(() => {
                alert("Prodotto modificato con successo!");
                window.location.href = "homePage.html";
            })
            .catch(error => console.error("Errore:", error));
        } else {
            fetch(apiBaseUrl, {
                method: "POST",
                headers: authHeader,
                body: JSON.stringify(productData)
            })
            .then(response => {
                if (!response.ok) throw new Error("Errore nella creazione del prodotto");
                return response.json();
            })
            .then(() => {
                alert("Prodotto creato con successo!");
                window.location.href = "homePage.html";
            })
            .catch(error => console.error("Errore:", error));
        }
    }

    function handleDelete() {
        if (confirm("Sei sicuro di voler eliminare questo prodotto?")) {
            fetch(apiBaseUrl + idProduct, {
                method: "DELETE",
                headers: authHeader
            })
            .then(response => {
                if (!response.ok) throw new Error("Errore nell'eliminazione del prodotto");
                alert("Prodotto eliminato con successo!");
                window.location.href = "homePage.html";
            })
            .catch(error => console.error("Errore:", error));
        }
    }
});
