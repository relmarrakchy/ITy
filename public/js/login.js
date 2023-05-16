document.addEventListener('DOMContentLoaded', () => {
    let body = document.getElementById("body")
    let err = document.getElementById("err")

    
    let height = window.innerHeight
    body.style.height = `${height}px`

    function notempty(val) { return (val != "") ? 1 : 0 }

    document.getElementById('form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission
    
        // Retrieve form field values
        const emailValue = document.getElementById('email').value;
        const passwordValue = document.getElementById('password').value;

        if (notempty(emailValue) && notempty(passwordValue)) {
            const formData = {
                email: emailValue,
                password: passwordValue
            };

            console.log(formData)
  
            // Send the form data to the server
            fetch('/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            }).then(response => response.json())
            .then(data => {
                console.log(data)
                if(data.code) {
                    if (data.code === "000") {
                        err.style.display = "block"
                        err.innerHTML = "<i class='bx bxs-info-circle'></i> Email is not correct !"
                    } else if (data.code === "222") {
                        err.style.display = "block"
                        err.innerHTML = "<i class='bx bxs-info-circle'></i> The password is not correct !"
                    }
                }

                if (data.user) {
                    location.assign(`/`)
                }
            })
        } else {
            err.style.display = "block"
            err.innerHTML = "<i class='bx bxs-info-circle'></i> All the fields should be filled"
        }
    })
})