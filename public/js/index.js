document.addEventListener('DOMContentLoaded', () => {
    let body = document.getElementById("body")
    let CmntDiv = document.querySelectorAll(".reactCardCmnt")
    let typeDiv = document.querySelectorAll(".display")
    let cmntTextareas = document.querySelectorAll(".cmntTextarea")
    let subBtns = document.querySelectorAll(".submit")

    
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

    for (let i = 0; i < subBtns.length; i++) {
        cmntTextareas[i].addEventListener('keyup', () => {
            if (cmntTextareas[i].value) {
                subBtns[i].removeAttribute("disabled")
            } else {
                subBtns[i].setAttribute("disabled", "")
            }
        })
    }
})