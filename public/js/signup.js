document.addEventListener('DOMContentLoaded', () => {
    let body = document.getElementById("body")
    let err = document.getElementById("err")

    
    let height = window.innerHeight
    body.style.height = `${height}px`

    function empty(val) { return (val != "") ? 1 : 0 }

    document.getElementById('form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission
    
        // Retrieve form field values
        const nameValue = document.getElementById('name').value;
        const emailValue = document.getElementById('email').value;
        const passwordValue = document.getElementById('password').value;
        const confPasswordValue = document.getElementById('confPassword').value;

        if (empty(nameValue) && empty(emailValue) && empty(passwordValue) && empty(confPasswordValue)) {
            if (passwordValue === confPasswordValue) {
                // Create a JSON object with the form data
                const formData = {
                    name: nameValue,
                    email: emailValue,
                    password: passwordValue
                };
      
                // Send the form data to the server
                fetch('/signup', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }).then(response => response.json())
                .then(data => {
                    if(data.code) {
                        if (data.code === "P2002") {
                            err.style.display = "block"
                            err.innerHTML = "<i class='bx bxs-info-circle'></i> This email is already used"
                        }
                    }
                })
            } else {
                err.style.display = "block"
                err.innerHTML = "<i class='bx bxs-info-circle'></i> The password is invalid"
            }
        } else {
            err.style.display = "block"
            err.innerHTML = "<i class='bx bxs-info-circle'></i> All the fields should be filled"
        }
    })
})