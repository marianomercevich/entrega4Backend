const socket= io()
const table = document.getElementById('realProductTable')
document.getElementById('createBtn').addEventListener('click',()=> {
    const body ={
       title: document.getElementById('title').value,
       description: document.getElementById('description').value,
       price: document.getElementById('price').value,
       code: document.getElementById('code').value,
       stock: document.getElementById('stock').value,
       category: document.getElementById('category').value,
    }
    fetch('/api/products',{
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            'content-type':'application/json'
        },
    })
    .then (result => result.json())
    .then (result => {
        if (result.status === 'error') throw new Error (result.error)
    })
    .then(() => fetch('/api/products'))
    .then (result => result.json())
    .then (result =>{
        if (result.status === 'error') throw new Error (result.error)
        else socket.emit('productList',result.payload)
        alert('el producto a sido agregado')
        document.getElementById('title').value =''
        document.getElementById('description').value =''
        document.getElementById('price').value =''
        document.getElementById('code').value =''
        document.getElementById('stock').value =''
        document.getElementById('category').value =''
    })
    .catch(err => alert(`Ocurrio un error :(/n${err}`))
})
deleteProduct =()


socket.on

