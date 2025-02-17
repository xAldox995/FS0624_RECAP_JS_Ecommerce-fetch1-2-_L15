fetch("https://striveschool-api.herokuapp.com/api/product/", {
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
    .then((products) => {
        console.log(products)
        const productsContainer = document.getElementById("productsContainer")
        products.forEach((product) => {
            productsContainer.innerHTML += `
            <div class="col">
                <div class="card h-100">
                    <img src="${product.imageUrl}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <a href="./details.html?id=${product._id}" class="btn btn-primary">Dettagli</a>
                    </div>
                </div>
            </div>
            `
        })
    })
    .catch((error) => {
        console.log(error)
    })