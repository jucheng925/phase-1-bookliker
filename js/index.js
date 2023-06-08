document.addEventListener("DOMContentLoaded", function(){
    fetch("http://localhost:3000/books")
    .then(resp => resp.json())
    .then(obj => obj.forEach(book => renderTitle(book)))
});

function renderTitle(book) {
    const li = document.createElement("li")
    li.textContent = `${book.title}`
    li.addEventListener("click", () => renderDetails(book))
    document.querySelector("#list").append(li)
}

function renderDetails(book) {
    document.querySelector("#show-panel").innerHTML = `<img src = "${book.img_url}">
    <h3>${book.title}</h3>
    <h3>${book.subtitle}</h3>
    <h5>${book.author}</h5>
    <p>${book.description}</p>`
    renderUsers(book)
    const button = document.createElement("button")
    button.textContent = "Like"
    button.addEventListener("click", ()=> handleLike(book))
    document.querySelector("#show-panel").append(button)
}

function renderUsers(book) {
    book.users.forEach(user => {
        const li = document.createElement("li")
       li.textContent = user.username
        document.querySelector("#show-panel").append(li)
    })
}
const myUser = {
    "id": 1,
    "username": "pouros"
  }


function handleLike(book) {
    
    if (book.users.find(name => name.username === myUser.username) === null) {
    book.users.push(myUser)
    console.log(book.users)
    fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book)
    })
    .then (resp => resp.json())
    .then (data => {
        document.querySelector("#show-panel").textContent =""
        renderDetails(data)
    })}
    else console.log("I liked it already")
}
