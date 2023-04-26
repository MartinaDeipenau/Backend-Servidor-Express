import { promises as fs } from 'fs'

export class ProductManager {
    constructor(path) {
        this.products = []
        this.path = path
    }

    async addProduct(product) {
        const productTXT = await fs.readFile(this.path, 'utf-8')

        this.products = JSON.parse(productTXT)


        if (
            !product.title ||
            !product.description ||
            !product.price ||
            !product.thumbnail ||
            !product.code ||
            !product.stock
        ) {
            return console.log('You must provide all required properties')
        }


        const validCode = this.products.find((ele) => ele.code === product.code)

        if (validCode) {
            return console.log('The Product already exists')
        }


        this.products.push(product)

        await fs.writeFile(this.path, JSON.stringify(this.products))
    }

    async getProducts() {
        const productTXT = await fs.readFile(this.path, 'utf-8')

        this.products = JSON.parse(productTXT)

        return this.products
    }

    async getProductById(id) {
        const productTXT = await fs.readFile(this.path, 'utf-8')

        this.products = JSON.parse(productTXT)

        const productByid = this.products.find((prod) => prod.id === parseInt(id))

        const result = productByid !== undefined ? productByid : 'Product not found'

        return result
    }

    async updateProduct(id) {
        const productTXT = await fs.readFile(this.path, 'utf-8')

        this.products = JSON.parse(productTXT)

        const productByid = this.products.find((ele) => ele.id === id)

        productByid !== undefined
            ? productByid.stock--
            : console.log('Product not found')

        await fs.writeFile(this.path, JSON.stringify(this.products))
    }

    async deleteProduct(id) {
        const productTXT = await fs.readFile(this.path, 'utf-8')

        this.products = JSON.parse(productTXT)

        const filteredProducts = this.products.filter((ele) => ele.id !== id)

        this.products = filteredProducts

        await fs.writeFile(this.path, JSON.stringify(this.products))
    }
}

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = Product.increment()
    }
  
    static increment() {
        if (this.idIncrement) {  // Si existe esta propiedad 
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
  
        return this.idIncrement
    }
}

// Productos

const product1 = new Product(
    'Lemon Pie',
    'Lemon Pie',
    1500,
    'lemonpie.jpg',
    'L12',
    11
)
const product2 = new Product(
    'Cheesecake',
    'Cheesecake',
    1800,
    'cheesecake.jpg',
    'C12',
    32
)

const product3 = new Product(
    'Oreo Cake',
    'Oreo Cake',
    1350,
    'oreocake.jpg',
    'O120',
    29
)
const product4 = new Product(
    'Alfajor',
    'Alfajor',
    520,
    'alfajor.jpg',
    'A12',
    6
)
const product5 = new Product(
    'Tarta de frutilla',
    'Tarta de frutilla',
    1200,
    'tartadefrutilla.jpg',
    'T231',
    5
)
const product6 = new Product(
    'Crumble de manzana',
    'Crumble de manzana',
    1650,
    'crumbledemanzana.jpg',
    'C564',
    29
)
const product7 = new Product(
    'Box dulce',
    'Box dulce',
    2170,
    'boxdulce.jpg',
    'B897',
    4
)
const product8 = new Product(
    'Alfajor de almendras',
    'Alfajor de almendras',
    400,
    'alfajordealmendras.jpg',
    'A36',
    7
)
const product9 = new Product(
    'Torta Chococafe',
    'Torta Chococafe',
    2010,
    'tortachococafe.jpg',
    'T45',
    10
)
const product10 = new Product(
    'Macarons',
    'Description of Macarons',
    300,
    'macarons.jpg',
    'M56',
    14
)
