let car = {
    color : "red",
    brand : "Audi",
    id : 9527,
    price : "99999NTW",
    owner : ""
}

function getBrand() {
    return car.brand
}

function getColor() {
    return car.color
}

function getPrice() {
    return car.price
}

function getID() {
    return car.id
}

function getOwner() {
    return car.owner
}

function setOwner(newOwner) {
    car.owner = newOwner
}

module.exports = {
    getBrand,
    getColor,
    getPrice,
    getID,
    getOwner,
    setOwner
}