import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import productsRouter from './routs/products.router.js'
import cartsRouter from './routs/carts.router.js' 
import viewsRouter from './routs/views.router.js'

const app = express()
const httpServer = app.listen(8080, () => { console.log('Server Up')})
const io = new Server(httpServer)

/* app.use(express.json()) */
app.use(express.static('./src/public'))
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

app.get('/', (req, res) => res.render('index'))
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('products', viewsRouter)


io.on('connection', socket => {
    console.log('new client connected')
    socket.on('productlist', data => {
        io.emit('updateProducts', data)
    })
}) 
