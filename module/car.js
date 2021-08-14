let car = {
    color: "red",
    brand: "Audi",
    id: 9527,
    price: "99999NTW"
}

function showBrand() {
    return car.brand
}

function showColor() {
    return car.color
}

function showPrice() {
    return car.price
}

function showID() {
    return car.id
}

module.exports = {
    showBrand,
    showColor,
    showPrice,
    showID
}