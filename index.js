import { menuArray } from "./data.js"

const mainContainerEl = document.querySelector(".mainContainer")
const mealSectionEl = document.getElementById("mealSection")
const addBtnEl = document.getElementById("addBtn")
const orderSummaryEl = document.querySelector(".orderSummary")
const addedOrdersEl = document.querySelector(".addedOrder")
const totalPriceEl = document.querySelector("#totalPrice")
const completeOrderBtn = document.querySelector("#completeBtn")
const cardModal = document.querySelector(".cardContainer")
const customerInfoEl =  document.querySelector("#customerCredentialsForm")
const orderSuccessEl = document.querySelector("#success")
const payBtnEl = document.querySelector("#pay")
let total = 0


function findMeal(name){
    return menuArray.find(menu => menu.name === name)
}

function renderMenu(menu) {
    let menuHtml =``
     menu.forEach(meal => {
        menuHtml += `
                     <div class="container">
                     <div class="menu">
                       <p class="meal-picture">${meal.emoji}</p>
                       <div class="mealDescr">
                         <h2 class="${meal.name}">${meal.name}</h2>
                         <p class="ingredients ${meal.name}">${meal.ingredients}</p>
                         <h3 class="${meal.name}">$${meal.price}</p>
                       </div>
                       </div>
                         <button class="${meal.name}" id="addBtn" data-test="disable">+</button>
                     </div>
                     `
    });
    mealSectionEl.innerHTML = menuHtml
  
}

renderMenu(menuArray)

document.addEventListener("click", (e)=>{
    if(e.target.id === "addBtn"){
        const meal = findMeal(e.target.className)
        total += meal.price
        addedOrdersEl.innerHTML += 
        `<div class="mealSummary" id="${meal.name}">
            <div class="meal">
                <h2>${meal.name}</h2>
                <button id="remove" class="${meal.name}" data-test="disable">remove</button>
            </div>
            <p id="price">$${meal.price}</p>
        </div>`

        totalPriceEl.textContent = `$${total}`
        orderSummaryEl.classList.remove("hidden")
        
    }

    if(e.target.id === "remove"){
        const mealToBeRemoved = document.getElementById(e.target.className)
        const meal = findMeal(e.target.className)
       total -= meal.price
       totalPriceEl.textContent = `$${total}`
        addedOrdersEl.removeChild(mealToBeRemoved)
        if(total === 0){
            orderSummaryEl.classList.add("hidden")
        }
    }
})


completeOrderBtn.addEventListener("click", () =>{
    cardModal.style.display = "flex"
    mainContainerEl.style.background = "linear-gradient(lightgray, white)"
    for(let btn of document.querySelectorAll('[data-test]')){
        btn.style.pointerEvents = "none"
    }
    // console.log(document.querySelectorAll('[data-test]')[0])
    // document.querySelectorAll('[data-test]').style.pointerEvents = "none"
   
})

customerInfoEl.addEventListener('submit', (e) =>{
    e.preventDefault()
    console.log(e.target[0].value)
    cardModal.style.display = "none"
    document.querySelector("#customer").textContent = e.target[0].value
    orderSuccessEl.classList.remove("hidden")
    orderSummaryEl.classList.add("hidden")
    mainContainerEl.style.background = "white"
})








