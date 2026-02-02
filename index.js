import express from "express"
import pg from "pg"
const app = express()
const port = 8000
app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
let result;
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "world",
    port: "5432",
    password: "mastermind01"
})
db.connect()
let currentid = 1;

app.get("/", async (req, res) => {

    try {
        result = await db.query("SELECT * FROM country WHERE user_id=$1", [currentid])
        result = result.rows.map(results => results.country_code)
        let users = await db.query("SELECT first_name,id FROM users")
        res.render("index", {
            visitedcountry: result,
            users: users.rows
        })


    }
    catch (err) {
        console.error(err.stack)
    }

})
app.post("/newuser", async (req, res) => {
    const response = await db.query("INSERT INTO users(first_name) VALUES($1) RETURNING *", [req.body.new_username])
    currentid = response.rows[0].id;
    res.redirect("/")

})
app.post("/users", (req, res) => {

    if (req.body.add == "news") {
        res.render("new")

    }

    else {
        currentid = req.body.userid
        res.redirect("/")
    }

})
app.post("/submit", async (req, res) => {
    try {
        const countryname = req.body.countryname.trim()
        const result = await db.query("SELECT country_code FROM codes WHERE LOWER(country) =LOWER($1)", [countryname])
        if (result.rows.length === 0) throw new Error("you have not entered a valid country");
        const country_code = result.rows[0].country_code;
        const check = await db.query("SELECT * FROM country WHERE user_id=$1 AND country_code=$2", [currentid, country_code]);
        if (check.rows.length > 0) throw new Error("you have entered the same country again,enter a different country please");
        const response = await db.query("INSERT INTO country (country_code,user_id) VALUES($1,$2)", [country_code, currentid])
        return res.redirect("/")
    }
    catch (err) {
        res.send(err.message)
    }
})



app.listen(port, () => {

    console.log("the server is up and running at port number: " + port)
})