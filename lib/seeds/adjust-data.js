const fs = require("fs")
const products = require("../seeds/products")

function createHandle(title) {
  return title.toLowerCase().trim().replace(/\s+/g, "-")
}

const updatedProducts = products.map((product) => ({
  ...product,
  handle: createHandle(product.title),
}))

console.log(process.cwd())

fs.writeFileSync("products3.json", JSON.stringify(updatedProducts, null, 2))
