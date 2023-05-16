document.addEventListener('DOMContentLoaded', () => {
    let body = document.getElementById("body")
    let CmntDiv = document.querySelectorAll(".reactCardCmnt")
    let typeDiv = document.querySelectorAll(".display")
    let cmntTextareas = document.querySelectorAll(".cmntTextarea")
    let subBtns = document.querySelectorAll(".submit")
    let posts = document.querySelectorAll(".post")
    let backArrow = document.getElementById("backArrow")
    const textarea = document.getElementById('content')
    let fakebtn = document.getElementById("fake")
    let realbtn = document.getElementById("real")

    fakebtn.addEventListener("click", () => {
        console.log(1)
        realbtn.click()
    })

    function notempty(val) { return (val != "") ? 1 : 0 }

    realbtn.addEventListener("submit", () => {
        console.log("Sub")
    })

    backArrow.addEventListener('click', () => {
        history.back();
    })

    textarea.addEventListener("input", () => {
        textarea.style.height = 'auto'; // Reset the height to auto to recalculate the height
  
        // Set the new height based on the scroll height of the content
        textarea.style.height = textarea.scrollHeight + 'px';
    })

    let height = window.innerHeight
    body.style.height = `${height}px`

    CmntDiv.forEach(div => {
        div.addEventListener('mouseover', () => {
            div.childNodes[1].style.background = "rgb(17, 105, 142)"
            div.childNodes[1].childNodes[1].style.color = "white"
            div.childNodes[3].style.color = "rgb(17, 105, 142)"
        })
    
        div.addEventListener('mouseleave', () => {
            div.childNodes[1].style.background = ""
            div.childNodes[1].childNodes[1].style.color = "black"
            div.childNodes[3].style.color = ""
        })
    })

    let count = 0
    typeDiv.forEach(sec => {
        CmntDiv[count].addEventListener('click', () => {
            typeDiv.forEach(sec => {
                if (sec.style.display == "block") sec.style.display = "none"
            })

            if (sec.style.display === "block") {
                sec.style.display = "none"
            } else {
                sec.style.display = "block"
            }
        })
        count++
    })

    CmntDiv.forEach(div => {
        div.addEventListener("dblclick", () => {
            typeDiv.forEach(sec => {
                if (sec.style.display == "block") sec.style.display = "none"
            })
        })
    })

    for (let i = 0; i < subBtns.length; i++) {
        cmntTextareas[i].addEventListener('keyup', () => {
            if (cmntTextareas[i].value) {
                subBtns[i].removeAttribute("disabled")
            } else {
                subBtns[i].setAttribute("disabled", "")
            }
        })
    }

    document.getElementById('form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission
    
        // Retrieve form field values
        const publishedValue = document.getElementById('published').value;
        const categoryValue = document.getElementById('category').value;
        const titleValue = document.getElementById('title').value;
        const contentValue = document.getElementById('content').value;

        if (notempty(categoryValue) && notempty(titleValue) && notempty(contentValue)) {
            const formData = {
                published: publishedValue,
                category: categoryValue,
                title: titleValue,
                content: contentValue
            };
  
            // Send the form data to the server
            fetch('/article', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            }).then(response => response.json())
            .then(data => {
                if(data.code) {
                    if (data.code === "000") {
                        err.style.display = "block"
                        err.innerHTML = "<i class='bx bxs-info-circle'></i> Email is not correct !"
                    } else if (data.code === "222") {
                        err.style.display = "block"
                        err.innerHTML = "<i class='bx bxs-info-circle'></i> The password is not correct !"
                    }
                }
            }).catch(err =>{ console.log(err) })
        } else {
            err.style.display = "block"
            err.innerHTML = "<i class='bx bxs-info-circle'></i> All the fields should be filled"
        }
    })
})