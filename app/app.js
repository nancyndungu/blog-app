const bodyParser = require("body-parser")
const express = require("express")
const Routes = require("./routes.js")
const methodOverride = require("method-override")
const app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.use("/", Routes)

app.listen(3000,()=>{
    console.log ('server started')
})