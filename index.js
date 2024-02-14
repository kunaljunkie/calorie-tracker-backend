const app = require('./app')

const { connectdatabase } = require('./src/db/db')
connectdatabase()
app.listen(process.env.PORT,()=>{
    console.log(`server is working on http//localhost:${process.env.PORT}`)
} )