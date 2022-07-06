const products = [
    { productName: "shampoo", productPrice: 20, prdouctCode: 1001, productImage: "shampoo.jpg" },
    { productName: "toothpaste", productPrice: 15, prdouctCode: 1002, productImage: "toothpaste.jpg" },
    { productName: "soap", productPrice: 5, prdouctCode: 1003, productImage: "soap.jpg" },
    { productName: "detergent", productPrice: 40, prdouctCode: 1004, productImage: "detergent.jpg" },
    { productName: "floss", productPrice: 10, prdouctCode: 1005, productImage: "floss.jpg" },
    { productName: "washing powder", productPrice: 30, prdouctCode: 1006, productImage: "washingPowder.jpg" },
    { productName: "shaving foam", productPrice: 35, prdouctCode: 1007, productImage: "shavingFoam.jpg" },
    { productName: "toilet paper", productPrice: 45, prdouctCode: 1008, productImage: "toiletPaper.jpg" }
];
// The function used to create the products grid:
function createProductsGrid() {
    let cards = products.map(function (product, index) {

        return `<div class="col">
        <div class="card border-secondary">
            <img src="./images/${product.productImage}" class="card-img-top" alt="...">
            <div class="card-body text-secondary">
                <h5 class="card-title">${product.productName}</h5>
                <p class="card-text">$${product.productPrice}</p>
                <button type="button" class="btn btn-secondary" onclick="addToCart(${index})">Add to cart</button>
            </div>
        </div>
    </div>`;
    });
    document.getElementById("productsGrid").innerHTML = cards.join(" ");

}
// Creating the shopping cart:
let shoppingCart = [];
function addToCart(value) {
    let productIndex = shoppingCart.findIndex(function (productObject) {
        return productObject.prdouctCode === products[value].prdouctCode
    });
    if (productIndex === -1) {
        shoppingCart.push(products[value]);
        shoppingCart[shoppingCart.length - 1].productQuantity = 1;
    } else {
        shoppingCart[productIndex].productQuantity++;
    }
    document.getElementById("cartQuantity").innerHTML = shoppingCart.length;
    createCartTable();
}
// The function used to create the table:
function createCartTable() {

    let rows = shoppingCart.map(function (product, index) {
        let total = product.productPrice * product.productQuantity;
        return `<tr>
                    <th scope="row">${index + 1}</th>
                    <td>${product.productName}</td>
                    <td class="text-center">$${product.productPrice}</td>
                    <td class="text-center">
                        <i class="bi bi-file-minus-fill fs-5" onclick="reduceQuantity(${index})"></i>
                        ${product.productQuantity}
                        <i class="bi bi-file-plus-fill fs-5" onclick="addQuantity(${index})"></i>
                        </td>
                        <td>$${total}</td>
                    <td class="text-center"><i class="bi bi-trash text-danger" onclick="removeProduct(${index})"></i></td>
                </tr>`;
    });
    document.getElementsByTagName("tbody")[0].innerHTML = rows.join(" ");
    // Calculating the total money that the user should pay:
    let totalSum = 0;
    for (let i = 0; i < shoppingCart.length; i++) {
        totalSum += shoppingCart[i].productPrice * shoppingCart[i].productQuantity;
    }
    document.getElementById('total').innerHTML = "$" + totalSum;
    // Using reduce() method to calculate the sum of prices per one item:
    let priceSum = shoppingCart.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.productPrice;
    }, 0);
    document.getElementById("price").innerHTML = "$" + priceSum;
    // Using reduce() method to calculate the sum of quantities:
    let quantitySum = shoppingCart.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.productQuantity;
    }, 0);
    document.getElementById("quantity").innerHTML = quantitySum;
}
// Event listener for sorting the products A to Z:
document.getElementsByClassName("bi bi-sort-alpha-down ps-3")[0].addEventListener("click", function () {
    sortShoppingCart(true)
});
// Event listener for sorting the products Z to A:
document.getElementsByClassName("bi bi-sort-alpha-up ps-2")[0].addEventListener("click", function () {
    sortShoppingCart(false)
});
// The function used to sort an array (shoppingCart) of objects based on a string property in the objects:
function sortShoppingCart(direction) {
    if (direction) {
        shoppingCart.sort((a, b) => {
            let fa = a.productName,
                fb = b.productName;

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        })
        createCartTable();
    } else {
        shoppingCart.sort((a, b) => {
            let fa = a.productName,
                fb = b.productName;
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        })
        shoppingCart.reverse();
        createCartTable();
    }
}
// The function used to remove a product:
function removeProduct(productIndex) {
    shoppingCart.splice(productIndex, 1);
    createCartTable();
}
// The function used to increase the quantity of products:
function addQuantity(productIndex) {
    shoppingCart[productIndex].productQuantity++;
    createCartTable();
}
// The function used to reduce the quantity of products:
function reduceQuantity(productIndex) {
    if (shoppingCart[productIndex].productQuantity > 1) {
        shoppingCart[productIndex].productQuantity--;
        createCartTable();
    }
}
// search field:
document.getElementById("searchBtn").addEventListener("click", doSearch);
document.getElementById("kw").addEventListener("keyup", doSearch);
function doSearch() {
    let keyword = document.getElementById("kw").value;
    const searchResults = shoppingCart.filter(function (item) {
        return item.productName.includes(keyword);
    });
    function createCartTable() {
        let rows = searchResults.map(function (product, index) {
            let total = product.productPrice * product.productQuantity;

            return `<tr>
                    <th scope="row">${index + 1}</th>
                    <td>${product.productName}</td>
                    <td class="text-center">$${product.productPrice}</td>
                    <td class="text-center">
                        <i class="bi bi-file-minus-fill fs-5" onclick="reduceQuantity(${index})"></i>
                        ${product.productQuantity}
                        <i class="bi bi-file-plus-fill fs-5" onclick="addQuantity(${index})"></i>
                        </td>
                        <td>$${total}</td>
                    <td class="text-center"><i class="bi bi-trash text-danger" onclick="removeProduct(${index})"></i></td>
                </tr>`;

        });

        let totalSum = 0;
        for (let i = 0; i < searchResults.length; i++) {
            totalSum += searchResults[i].productPrice * searchResults[i].productQuantity;


        }


        document.getElementById('total').innerHTML = "$" + totalSum;


        document.getElementsByTagName("tbody")[0].innerHTML = rows.join(" ");
        let priceSum = searchResults.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue.productPrice;
        }, 0);
        document.getElementById("price").innerHTML = "$" + priceSum;
        let quantitySum = searchResults.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue.productQuantity;
        }, 0);
        document.getElementById("quantity").innerHTML = quantitySum;
    }
    createCartTable();
}