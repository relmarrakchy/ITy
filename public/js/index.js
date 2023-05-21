document.addEventListener('DOMContentLoaded', () => {
    let body = document.getElementById("body")
    let CmntDiv = document.querySelectorAll(".reactCardCmnt")
    let typeDiv = document.querySelectorAll(".display")
    let cmntTextareas = document.querySelectorAll(".cmntTextarea")
    let subBtns = document.querySelectorAll(".submit")
    let articles = document.querySelectorAll(".post")
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

    let bar = document.getElementById("searchBar")

    bar.addEventListener("keyup", () => {
        let word = bar.value

        if (word) {
            const formData = {
                category: word,
            };
            //Send the form data to the server
            fetch('/search', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            }).then(response => response.json())
            .then(data => {
                console.log(data)
                document.getElementById("searchRes").innerHTML = ``

                let i = 0
                data.data.forEach(art => {
                    let timeData = data.timing[i]
                    let time = "now"
                    if (timeData.days != 0) {
                        time = `${timeData.days} days`
                    } else if (timeData.hours != 0) {
                        time = `${timeData.hours} hours`
                    } else if (timeData.mins != 0) {
                        time = `${timeData.mins} mins`
                    } else if (timeData.secs != 0) {
                        time = `${timeData.secs} seconds`
                    }

                    let cat = ""

                    for (let j = 0; j < data.categories.length; j++) {
                        for (let k = 0; k < art.categories.length; k++) {
                            if (art.categories[k].categorieID == data.categories[j].id) {
                                cat = data.categories[j].nom
                            }
                        }
                    }

                    let sumCmnts = art.commentaires.length

                    let post = `
                    <div class="post">
                        <div class="avatarDiv">
                            <a href="/profile/${art.author.id}">
                                <div class="avatar">
                                    <img src="/imgs/profile.png" alt="">
                                </div>
                            </a>
                        </div>
        
                        <div class="contentPost">
                            <div class="postInfo">
                                <div class="postClick" value="${art.id}">
                                    <p class="username"> ${art.author.nom}
                                        <span>
                                            - ${time}
                                        </span>
                                    </p>
        
                                    <div class="categoriesList">
                                        <div class="category"> ${cat} </div>
                                    </div>
                
                                    <p class="postDescription">
                                        <h5> ${art.titre} </h5>
                                        ${art.contenu}
                                    </p>

                                    ${art.image != "" ? `<div class="postPic"><img src="${art.image}" alt=""></div>` : ''}
                                </div>
        
                                    <div class="display">
                                        <div class="cmntTypeDiv">
                                            <div class="profil">
                                                <div class="profileAvatar">
                                                    <img src="/imgs/profile.png" alt="">
                                                </div>
                                            </div>
                                            <div class="typeCmnt">
                                                <form class="formComment" action="">
                                                    <textarea class="cmntTextarea contents" id="contentComment" name="" placeholder="Laissez un commentaire ..."></textarea>
                                                    <input type="hidden" class="keys" id="key" value="${art.id}"> <br>
                                                    <input type="submit" class="submit" value="reply" disabled>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                            </div>
        
                                <div class="reactPost" >
                                    <div class="prince">
                                        <div class="reactCardCmnt">
                                            <div class="cmntDiv reactIcon">
                                                <a style="color: black; text-decoration: none; font-weight: 800"><i id="cmntIcon" class='bx bx-message-rounded'></i></a>
                                            </div>
                                            <div class="desc">
                                                ${sumCmnts}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    `
                    document.getElementById("searchRes").innerHTML += post
                    i++
                })
            })
        }
    })

    if (document.getElementById("logout")) {
        document.getElementById("logout").addEventListener("click", () => {
            window.location.pathname = "/logout"
        })
    }

    if (document.getElementById("sign")) {
        document.getElementById("sign").addEventListener('click', () => {
            window.location.pathname = "/signup"
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

    if (fakebtn) {
        fakebtn.addEventListener("click", () => {
            console.log(1)
            realbtn.click()
        })
    }

    for (let i = 0; i < delBtnFake.length; i++) {
        delBtnFake[i].addEventListener('click', () => {
            delBtnReal[i].click()
        })
    }

    if (realbtn) {
        realbtn.addEventListener("submit", () => {
            console.log("Sub")
        })
    }

    if (backArrow) {
        backArrow.addEventListener('click', () => {
            history.back();
        })
    }

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

    if (textarea) {
        textarea.addEventListener("input", () => {
            textarea.style.height = 'auto'; // Reset the height to auto to recalculate the height
      
            // Set the new height based on the scroll height of the content
            textarea.style.height = textarea.scrollHeight + 'px';
        })
    }

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