document.addEventListener("DOMContentLoaded", function() {
  function fetchBurgers() {
    fetch("http://localhost:3000/burgers")
    .then(function(response) {
      return response.json();
    })
    .then(results => { 
      results.forEach(burger => renderBurgers(burger));
    })
  }

  fetchBurgers()

  let burgerMenu = document.getElementById("burger-menu")

  function renderBurgers(burger) {
    let burgerDiv = document.createElement('div')
        burgerDiv.className += "burger"
    let burgerName = document.createElement('h3')
        burgerName.className += "burger_title"
    let burgerImage = document.createElement('img')
    let burgerDescription = document.createElement('p')
        burgerDescription.className += "burger_description"
    let burgerButton = document.createElement('button')
        burgerButton.className += "button"
        burgerButton.dataset.name = burger.name

    burgerName.innerText = `${burger.name}`
    burgerImage.src = `${burger.image}` 
    burgerDescription.innerText = `${burger.description}`
    burgerButton.innerText = `Add to Order`

    burgerDiv.appendChild(burgerName)
    burgerDiv.appendChild(burgerImage)
    burgerDiv.appendChild(burgerDescription)
    burgerDiv.appendChild(burgerButton)

    burgerMenu.appendChild(burgerDiv)
  }

  burgerMenu.addEventListener("click", function(e) {

    if (e.target.className === 'button' ) {
      let ul = document.getElementById("order-list")
      let li = document.createElement('li')
      li.innerText = e.target.dataset.name
      ul.appendChild(li)
    }    
  })
  
  customBurgerForm = document.getElementById("custom-burger")

  customBurgerForm.addEventListener("submit", function(e) {
    e.preventDefault()

    let name = e.target.name.value
    let description = e.target.description.value
    let image = e.target.url.value

    let newBurger = {name: name, description: description, image: image}

    fetch('http://localhost:3000/burgers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Accept": "application/json"
        },
        body: JSON.stringify(newBurger),
        })
        .then((response) => response.json())
        .then((burger) => {
          renderBurgers(burger);
        })
        let ul = document.getElementById('order-list')
        let li = document.createElement('li')
        li.innerText = name
        ul.appendChild(li)

        e.target.reset()

  })
  

})
