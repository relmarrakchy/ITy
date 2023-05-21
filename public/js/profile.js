document.addEventListener('DOMContentLoaded', () => {
    let body = document.getElementById("body")
    let CmntDiv = document.querySelectorAll(".reactCardCmnt")
    let typeDiv = document.querySelectorAll(".display")
    let cmntTextareas = document.querySelectorAll(".cmntTextarea")
    let subBtns = document.querySelectorAll(".submit")
    let posts = document.querySelectorAll(".postClick")
    let backArrow = document.getElementById("backArrow")
    const textarea = document.getElementById('content')
    let fakebtn = document.getElementById("fake")
    let realbtn = document.getElementById("real")

    let delBtnFake = document.querySelectorAll(".delBtnFake")
    let delBtnReal = document.querySelectorAll(".delBtnReal")
    let modBtnFake = document.querySelectorAll(".modFakeBtn")
    let modBtnReal = document.querySelectorAll(".modRealBtn")

    let formsComment = document.querySelectorAll(".formComment")
    let formsDel = document.querySelectorAll(".formDelete")
    let formsMod = document.querySelectorAll(".modForm")

    let contents = document.querySelectorAll(".contents")

    let keys = document.querySelectorAll(".keys")
    let keysDel = document.querySelectorAll(".delKeys")

    if (document.getElementById("logout")) {
        document.getElementById("logout").addEventListener("click", () => {
            window.location.pathname = "/logout"
        })
    }

    for (let i = 0; i < posts.length; i++) {
        posts[i].addEventListener("click", () => {
            window.location.pathname = `/article/${posts[i].attributes[1].value}`
        })
    }

    for (let i = 0; i < modBtnFake.length; i++) {
        modBtnFake[i].addEventListener("click", () => {
            modBtnReal[i].click()
        })
    }

    fakebtn.addEventListener("click", () => {
        console.log(1)
        realbtn.click()
    })

    for (let i = 0; i < delBtnFake.length; i++) {
        delBtnFake[i].addEventListener('click', () => {
            delBtnReal[i].click()
        })
    }

    realbtn.addEventListener("submit", () => {
        console.log("Sub")
    })

    backArrow.addEventListener('click', () => {
        history.back();
    })

    for (let i = 0; i < formsMod.length; i++) {
        const textareaMod = document.getElementById(`contentMod${i}`)
        if (textareaMod) {
            textareaMod.addEventListener("input", () => {
                textareaMod.style.height = 'auto'; // Reset the height to auto to recalculate the height
        
                // Set the new height based on the scroll height of the content
                textareaMod.style.height = textareaMod.scrollHeight + 'px';
            })
        }
    }

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

    for (let i = 0; i < formsMod.length; i++) {
        formsMod[i].addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent form submission
            // Retrieve form field values
            const published = document.getElementById(`published${i}`).value
            const title = document.getElementById(`title${i}`).value
            const contentMod = document.getElementById(`contentMod${i}`).value
            const categoryBoxes = document.getElementsByName(`category${i}`)
            const allow = document.getElementById(`allow${i}`)
            let imgURL = ""
            if (allow) {
                imgURL = (allow.checked) ?  "" : allow.value
            }

            const categories = []

            categoryBoxes.forEach(box => {
                if (box.checked) categories.push(box.value)
            })

            console.log(published)

            const formData = {
                published: published,
                title: title,
                content: contentMod,
                categories: categories,
                img: imgURL
            };

            fetch(`/article/${keysDel[i].value}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }).then(response => response.json())
            .then(data => {
                if (data.success) location.assign(`/profile`)
            })
        })
    }

    for (let i = 0; i < formsDel.length; i++) {
        formsDel[i].addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent form submission
            // Retrieve form field values
        
            //Send the form data to the server
            fetch(`/article/${keysDel[i].value}`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json'
                }
            }).then(response => response.json())
            .then(data => {
                if (data.success) location.assign(`/profile`)
            })
        })
    }

    for (let i = 0; i < formsComment.length; i++) {
        formsComment[i].addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent form submission
            // Retrieve form field values
            const contentValue = contents[i].value;
            const keyValue = keys[i].value;
        
            const formData = {
                content: contentValue,
                idArticle: keyValue
            };
        
            console.log(formData)
        
            //Send the form data to the server
            fetch('/comment', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            }).then(response => response.json())
            .then(data => {
                if (data.succes) location.assign(`/article/${keyValue}`)
            })
        })
    }
})