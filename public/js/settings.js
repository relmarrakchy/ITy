document.addEventListener('DOMContentLoaded', () => {
    let body = document.getElementById("body")
    let backArrow = document.getElementById("backArrow")
    const textarea = document.getElementById('content')
    let fakebtn = document.getElementById("fake")
    let realbtn = document.getElementById("real")

    if (document.getElementById("logout")) {
        document.getElementById("logout").addEventListener("click", () => {
            window.location.pathname = "/logout"
        })
    }

    backArrow.addEventListener('click', () => {
        history.back();
    })

    fakebtn.addEventListener("click", () => {
        realbtn.click()
    })

    document.getElementById("supFake").addEventListener("click", () => {
        document.getElementById("supReal").click()
    })

    textarea.addEventListener("input", () => {
        textarea.style.height = 'auto'; // Reset the height to auto to recalculate the height
  
        // Set the new height based on the scroll height of the content
        textarea.style.height = textarea.scrollHeight + 'px';
    })

    let height = window.innerHeight
    body.style.height = `${height}px`

    document.getElementById("deleteForm").addEventListener("submit", (e) => {
        e.preventDefault()
        let userID = document.getElementById("userID").value

        fetch(`/settings/${userID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(data => {
            if (data.sucess) location.assign(`/`)
        })
    })

    document.getElementById("modifyForm").addEventListener("submit", (e) => {
        e.preventDefault()
        let nom = document.getElementById("nom").value
        let email = document.getElementById("email").value
        let password = document.getElementById("password").value
        let val = document.getElementById("validatepassowrd").value

        if (nom && email && password && val) {
            if (password === val) {
                let data = {
                    nom: nom,
                    email: email,
                    password: password
                }

                fetch('/settings', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                }).then(response => response.json())
                .then(data => {
                    if (data.succes) location.assign(`/`)
                    if(data.errEmail) {
                        document.getElementById("modifErr").style.display = "block"
                        document.getElementById("errContent").innerHTML = `<i class='bx bx-info-circle'></i> ${data.errEmail}`
                    }
                })
            }
        } else {
            document.getElementById("modifErr").style.display = "block"
            document.getElementById("errContent").innerHTML = `<i class='bx bx-info-circle'></i> All the fields should be filled!`
        }
    })
})