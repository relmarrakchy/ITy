document.addEventListener('DOMContentLoaded', () => { 
    let body = document.getElementById("body")

    let formMod = document.querySelectorAll(".catMod")
    let catModR = document.querySelectorAll(".catModR")
    let catModF = document.querySelectorAll(".catModF")

    let formDel = document.querySelectorAll(".catDel")
    let catDelR = document.querySelectorAll(".catDelR")
    let catDelF = document.querySelectorAll(".catDelF")

    let height = window.innerHeight

    body.style.height = `${height}px`

    for (let i = 0; i < catModF.length; i++) {
        catModF[i].addEventListener("click", () => {
            catModR[i].click()
        })
    }

    for (let i = 0; i < catDelF.length; i++) {
        catDelF[i].addEventListener("click", () => {
            catDelR[i].click()
        })
    }

    document.getElementById("modAdminF").addEventListener("click", () => {
        document.getElementById("modAdminR").click()
    })

    for (let i = 0; i < formMod.length; i++) {
        formMod[i].addEventListener("submit", (e) => {
            e.preventDefault()
            let id = document.querySelectorAll(".catModID")[i].value
            let newValue = document.querySelectorAll(".newValue")[i].value

            if (newValue) {
                let formData = {
                    newValue: newValue
                }

                fetch(`/category/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData),
                }).then(response => response.json())
                .then(data => {
                    if (data.success) location.assign("/admin")
                })
            }
        })
    }

    for (let i = 0; i < formDel.length; i++) {
        formDel[i].addEventListener("submit", (e) => {
            e.preventDefault()
            let id = document.querySelectorAll(".catDelID")[i].value

            fetch(`/category/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
            .then(data => {
                if (data.success) location.assign("/admin")
            })
        })
    }

    document.getElementById("addCategory").addEventListener("submit", (e) => {
        e.preventDefault()

        let category = document.getElementById("catAddName").value

        if (category) {
            let formData = {
                category: category
            }

            fetch('/category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            }).then(response => response.json())
            .then(data => {
                if (data.success) location.assign("/admin")
            })
        } else {
            document.getElementById("errCat").innerHTML = "<i class='bx bx-info-circle'></i> You must enter a name!"
            document.getElementById("errCat").style.display = "block"
        }
    })

    document.getElementById("addAdmin").addEventListener("submit", (e) => {
        e.preventDefault()

        let nom = document.getElementById("adminName").value
        let email = document.getElementById("adminEmail").value
        let password = document.getElementById("adminPassword").value

        if (nom && email && password) {
            let formData = {
                nom: nom,
                email: email,
                password: password
            }

            fetch('/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            }).then(response => response.json())
            .then(data => {
                if (data.success) location.assign("/admin")
                if (data.errEmail) {
                    document.getElementById("errAdd").innerHTML = `<i class='bx bx-info-circle'></i> ${data.errEmail}`
                    document.getElementById("errAdd").style.display = "block"
                }
            })
        } else {
            document.getElementById("errAdd").innerHTML = "<i class='bx bx-info-circle'></i> All the fields should be filled !"
            document.getElementById("errAdd").style.display = "block"
        }
    })

    document.getElementById("modAdmin").addEventListener("submit", (e) => {
        e.preventDefault()
        let id = document.getElementById("modAdminR").value
        let name = document.getElementById("nomAdmin").value
        let email = document.getElementById("emailAdmin").value
        let password = document.getElementById("passwordAdmin").value
        let conf = document.getElementById("confirmAdmin").value

        if (name && email && password && conf) {
            if (password === conf) {
                let formData = {
                    name: name,
                    email: email,
                    password: password
                }

                fetch(`/admin/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData),
                }).then(response => response.json())
                .then(data => {
                    if (data.success) location.assign("/admin")
                    if (data.errEmail) {
                        document.getElementById("errAdd").innerHTML = `<i class='bx bx-info-circle'></i> ${data.errEmail}`
                        document.getElementById("errAdd").style.display = "block"
                    }
                })
            } else {
                document.getElementById("errMod").innerHTML = "<i class='bx bx-info-circle'></i> Check again your password !"
                document.getElementById("errMod").style.display = "block"
            }
        } else {
            document.getElementById("errMod").innerHTML = "<i class='bx bx-info-circle'></i> All the fields should be filled !"
            document.getElementById("errMod").style.display = "block"
        }s
    })

    document.getElementById("logout").addEventListener("click", () => {
        window.location.pathname = "/logout"
    })
})