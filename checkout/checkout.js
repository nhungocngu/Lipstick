cart = [
  {
    id: "1",
    name: "camellia",
    price: 10,
    quantity: 1,
    img: "sp/dong 3/son3.2.jpg",
  },
  {
    id: "2",
    name: "Lotus",
    price: 19.9,
    quantity: 1,
    img: "sp/dong 3/son3.4.jpg",
  }
]

renderOrder()

function billExport(){
  let totalBill = 0
  let bill = ""
  cart.forEach((cartItem) => {
    totalBill += cartItem.price * cartItem.quantity
  })
  bill += `
    <p class="tong-gia">
				<h5><strong>${totalBill}$</strong></h5>
		</p>
  `
  document.querySelector('.gia').innerHTML = bill
}

function changeQuantity(productId){
  const quantityInput = document.querySelector(`.js-quantity-input-${productId}`)
  let newValue = Number(quantityInput.value)

  if(newValue < 1){
    alert('Số lượng phải lớn hơn 0')
    return
  }else{
    cart.forEach((cartItem) => {
      if(cartItem.id == productId){
        cartItem.quantity = newValue
      }
    })
  }
}

function removeFromCart(productId){
  newCart = []
  cart.forEach((cartItem) => {
    if(cartItem.id != productId){
      newCart.push(cartItem)
    }
  })
  cart = newCart
}

function renderOrder(){
  let numberOfProduct = 0
  let product = ""
  let title = ""
  let summary = ""
  
  cart.forEach((cartItem) => { 
    product += `
      <div class="cart-item product-id-${cartItem.id}">
                <img style="width:200px; border-radius: 10px; text-align: end;" src="${cartItem.img}" alt="Camellia">
        <div class="bentrai">
          <h4 style="padding: 20px 0px 200px 0px;"><strong>${cartItem.name} - $${cartItem.price}</strong></h4>
          <div class="soluong">  
          Quantity <input type="number" class="js-quantity-input-${cartItem.id}" style="width: 50px;" value="1" min="1"> 
          </div>
        </div>
        <div class="save" style="padding:260px 20px 0px 0px">
          <button class="js-save-link" data-product-id="${cartItem.id}" style="text-align: end; color: black; text-decoration: none; border: none; background: none;">Save</button>
        </div>
        <div class="remove" style="padding:260px 20px 0px 0px">
          <button class="js-delete-link" data-product-id="${cartItem.id}" style="text-align: end; color: black; text-decoration: none; border: none; background: none;">Remove</button>
        </div>
      </div>  
    `
    numberOfProduct += cartItem.quantity
  })
  title += `
    <div class="cart"><h4 style="padding-bottom: 20px;"><strong>cart</strong> &nbsp;  ${numberOfProduct} items</h4></div>
  `
  summary += title 
  summary += product

  document.querySelector('.cart-items').innerHTML = summary

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId
      removeFromCart(productId)
      document.querySelector(`.product-id-${productId}`).remove()
      console.log(productId)
      billExport()
	  renderOrder() 
    })
  })

  document.querySelectorAll('.js-save-link').forEach((link) => {
    const productId = link.dataset.productId
    link.addEventListener('click', () => {
      changeQuantity(productId)
      billExport()
      renderOrder()
    })
    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`)
    quantityInput.addEventListener('keydown', (event) => {
      if(event.key === 'Enter'){
        changeQuantity(productId)
        billExport()
        renderOrder()
      }
    })
  })

  billExport()
  
}