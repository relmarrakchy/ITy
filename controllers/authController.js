let login_get = (req, res) => { res.render("login", {title: "Login"}) }

let signup_get = (req, res) => { res.render("signup", {title: "Sign up"}) }

module.exports = {
    login_get, signup_get
}