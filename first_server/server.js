//import standard path library
const path = require("path")
//import EJS
const EJS = require("koa-ejs")
//import KOA Library
const koa = require("koa")
//import KOA router
const Router = require("koa-router")
//set the port = this undefined port or 4000
const PORT = process.env.PORT || 4000

//create KOA application
const app = new koa()
//create a new Router
const router = new Router()

//configure EJS
EJS(app, {
    root: path.join(__dirname, "views"),
    layout: "layout",
    viewExt: "ejs",
    cache: false,
    debug: true
})

//our root route, pass in name of file and any data we want to pass in
router.get("/", async (ctx, next) => {
    await ctx.render("index", {
        trees: "green"
    })
})

//another route
router.get("/other", async (ctx, next) => {
    ctx.body = {
        data: "flowers",
        more: 20,
        blue: true
    }
})

//anything else route
router.get("/:anything", async (ctx, next) => {
    ctx.body = {
        params: ctx.params,
        query: ctx.query
    }
})

//register the router with our app
app.use(router.routes())


//create listener
app.listen(PORT, ()=> {
    console.log(`listening on port ${PORT}`)
})