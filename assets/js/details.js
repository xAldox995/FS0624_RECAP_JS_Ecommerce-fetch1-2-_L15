const idProduct = new URLSearchParams(window.location.search).get("id")

fetch("https://striveschool-api.herokuapp.com/api/product/"+ idProduct, {
    headers: {
        "Authorization":
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNWYzNWYyNjBjYzAwMTVjYzBkZTciLCJpYXQiOjE3Mzk4MDMwMTEsImV4cCI6MTc0MTAxMjYxMX0.jlYOAgfP3Dt1jKABJmHyEecCatFpI-jBQS1hONcsal8"
    }
})
    .then((response) => {
        console.log(response)
        if (response.ok) {
            return response.json()
        }
        throw new Error("Qualcosa è andato storto nel recupero dei dati")
    })
    .then((product) => {
        console.log(product)
        const productContainer = document.getElementById("product")
        productContainer.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${product.imageUrl}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text"> € ${product.price}</p>
                <a href="./backOffice.html?id=${product._id}" class="btn btn-primary">Modifica</a>
            </div>
        </div>
        `
    })
    .catch((error) => {
        console.log(error)
    })