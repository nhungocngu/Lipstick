// JavaScript Document
// 1. Hàm tính tổng chi phí khi đã thực hiện xong order 
function paymentSummary(){
  let productPriceCents = 0
  let shippingCents = 0
  let totalProduct = 0

  // Dòng này là loop qua các item trong giỏ hàng để tính tiền hàng và tiền ship
  cart.forEach((cartItem) => {
    totalProduct += cartItem.quantity
    const product = getProductId(cartItem.productId)
    productPriceCents += product.priceCents * cartItem.quantity

    const deliveryOption = getDeliveryOptionId(cartItem)
    shippingCents += deliveryOption.priceCents
  })

  // Phần này là tính tiền thuế
  const beforeTax = productPriceCents + shippingCents
  const tax = beforeTax * 0.1
  const total = beforeTax + tax 
  let paymentSummaryhtml = ``

  // Thay thế code html bên dưới bằng code html của phần div tính tiền
  paymentSummaryhtml += 
  `
    <div class="cart-container">
    <div class="cart-items">
				<div class="cart"><h4 style="padding-bottom: 20px;"><strong>cart</strong> &nbsp;  2 items</h4></div>

         <div class="cart-item">
                <img style="width:200px; border-radius: 10px; text-align: end;" src="sp/dong 3/son3.2.jpg" alt="Camellia">
			 <div class="bentrai">
				<h4 style="padding: 20px 0px 200px 0px;"><strong>Camellia - $20</strong></h4>
				<div class="soluong">  
					Số lượng <input type="number" value="1" min="1" style="width: 50px;">
				</div>
			 </div>
			<div class="remove" style="padding:260px 20px 0px 0px">
					<a href="CARTPAGE.html" style="text-align: end; color: black; text-decoration: none; ">Remove</a>
			</div>
		 </div>
			
		<div class="cart-item">
                <img style="width:200px; border-radius: 10px; text-align: end;" src="sp/dong 3/son3.4.jpg" alt="Camellia">
			 <div class="bentrai">
				<h4 style="padding: 20px 0px 200px 0px;"><strong>Lotus - $19.9</strong></h4>
				<div class="soluong">  
					Số lượng <input type="number" value="1" min="1" style="width: 50px;">
				</div>
			 </div>
			<div class="remove" style="padding:260px 20px 0px 0px">
					<a href="CARTPAGE.html" style="text-align: end; color: black; text-decoration: none; ">Remove</a>
			</div>
		 </div>
	 
			
		  <div class="free-samples">
            <h5><strong>2 free samples with your order</strong></h5>
			<p>choose free samples (2 remaining)</p>
		  </div>
		<div class="free-gift1">
               <div class="samples-list1" style="cursor: pointer;">
           			<a href="#"><img src="sp/dong 2/son2.1.jpg" alt="Koko K Matte Liquid Lipstick Sample"></a>
			   </div>
				&nbsp;
               <div class="samples-list2" style="cursor: pointer;">
                    <a href="#"><img src="anhmau4.webp" alt="Face Moisturizer Sample"></a>
               </div>
				&nbsp;
               <div class="samples-list3" style="cursor: pointer;">
                   <a href="#"> <img src="sp/dong 1/son1.2.jpg" alt="Mary Jo K Matte Liquid Lipstick Sample"></a>
               </div>
        </div>
	</div>
            <div class="cart-items2">       
			<div class="free-shipping"><p>You are $20 away from free shipping!</p></div>
                
				<div class="free-gift">
					<div class="free-mini">
					<div class="roller">
					  <h6>free mini matte lip kit or rose quartz roller!🌸</h6>
                    </div>
						<div class="online-exclusive">
					  <h6>online exclusive and limited-time offer.</h6>
                    </div>
					<div class="mini-matte">
					<img src="mini-lips.png" alt="mini matte lip kit">
						<div>mini matte lip kit</div>				
					</div>
						<div class="spend">
							<h6>Spend another $30 and select 1 free gift(s)</h6></div>
							 
					
					</div>
                     
                </div>
				
                <div class="free-gift2">
				  <h6><strong>before you go...</strong></h6>
                </div>
            <div class="upsell">
				<div class="kylash">
               <img src="sp/dong 2/son2.1.jpg" alt="Rose Quartz Roller">
                     </div>
				<div>rose quartz roller</div>
				<div class="add-975"><br> <button style="width: 125px;" class="btn nutadd" type="submit">add - $9.75</button>
                <br><br></div>
            </div>
			  <div class="giatong">
				<div class="estimated">
				  <h4><strong>Estimated total:</strong></h4>
				</div>
				  <div class="gia">
				    <h5><strong>20$</strong></h5>
				  </div>
				  </div>
				<h9>Shipping and discounts calculated at checkout</h9>
				<button style="width: 380px; margin-top: 10px" class="btn nutcheckout" type="submit">Checkout</button>
			</div>
</div>
  `
  // Dòng này chỉ cần thay thể phần .payment-summary bằng class của div tính tiền 
  document.querySelector('.giatong').innerHTML = paymentSummaryhtml
}


// 2. Hàm thêm bớt sản phẩm và chọn các option shipping
function renderOrder(){
  // Tương tự như phần tổng bil phần thêm nút thêm bớt xóa cho từng sản phẩm cũng cần dùng JS để render lại phần html khi chỉnh sửa số lượng
  let cartSummaryHTML = ''

  // Phần này là loop qua các items trong cart để render ra html
  cart.forEach((cartItem) => {
    let matchingProduct = getProductId(cartItem.productId);
    let deliveryOption = getDeliveryOptionId(cartItem);

    const today = dayjs()
    const deliveryDate = today.add( 
      deliveryOption.deliveryDay, 'days'
    )

    const dayFormat = deliveryDate.format('dddd, MM DD')


    cartSummaryHTML += `
      <div class="cart-item-container
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dayFormat}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                Update 
              </span>
              <input class="quantity-input js-quantity-input-${matchingProduct.id}"> 
              <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">
                Save
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${displayDate(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  function displayDate(matchingProduct, cartItem) {
    let dateHTML = ''
    deliveryOptions.forEach((deliveryOption) => {
      // Hàm này để lấy ngày hôm nay trên máy tính xong render trên html
      const today = dayjs()
      const deliveryDate = today.add( 
        deliveryOption.deliveryDay, 'days'
      )

      const cost = deliveryOption.priceCents
      const shippingFee = cost ? formatCurrency(cost) : 'Free'
      let isChecked = deliveryOption.id === cartItem.deliveryOptionId

      dateHTML += 
      `  
        <div class="delivery-option js-delivery-option" 
          data-product-id = "${matchingProduct.id}"
          data-delivery-option-id = "${deliveryOption.id}"
        >
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${deliveryDate.format('dddd, MM DD')}
            </div>
            <div class="delivery-option-price">
              $${shippingFee} - Shipping
            </div>
          </div>
        </div>
      `
    })

    return dateHTML
  }
  
  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

  // Hàm xóa sản phẩm khỏi giỏ hàng
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
	  
      const productId = link.dataset.productId
      removeFromCart(productId)
      document.querySelector(.js-cart-item-container-${productId}).remove()
      console.log(productId)
      updateCartQuantity()
    })
  })

  // Nút update để chỉnh sửa số lượng sản phẩm
  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId
      const container = document.querySelector(.js-cart-item-container-${productId})
      // class này cho bên dưới á
      container.classList.add('is-editing-quantity')
    })
  })

  // Nút save để lưu số lượng sản phẩm
  document.querySelectorAll('.js-save-link').forEach((link) => {
    const productId = link.dataset.productId
    link.addEventListener('click', () => {
      changeQuantity(productId)
    })
    const quantityInput = document.querySelector(.js-quantity-input-${productId})
    quantityInput.addEventListener('keydown', (event) => {
      if(event.key === 'Enter'){
        changeQuantity(productId)
        paymentSummary()
      }
    })
  })

  // Hàm này để cập nhật lại toàn bộ giỏ hàng sau khi chỉnh sửa số lượng
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset
      updateDeliveryOption(productId, deliveryOptionId)
      renderOrder()
      paymentSummary()
    })
  })
}

// 3. Một số hàm cần thiết 
function getProductId(productId){
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

    return matchingProduct
}

function getDeliveryOptionId(cartItem){
  let deliveryOption = ''

  deliveryOptions.forEach((option) => {
    if(option.id === cartItem.deliveryOptionId){
      deliveryOption = option
    }
  })

  return deliveryOption
}

// Format tiền tệ 2 chữ số sau dấu phẩy
function formatCurrency(priceCents){
  return (Math.round(priceCents) / 100).toFixed(2)
}

// Hàm bỏ sản phẩm ra ngoài giỏ hàng
function removeFromCart(productId){
  const newCart = []
  cart.forEach((cartItem) => {
    if(cartItem.productId != productId){
      newCart.push(cartItem)
    }
  })

  cart = newCart
  saveToLocalStorage()
}

// Một mẫu của delivery option
const deliveryOptions = [{
  id: '1',
  deliveryDay: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDay: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDay: 1,
  priceCents: 799
}]

// Một mẫu của cart items
cart = [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
  deliveryOptionId: '1'
},{
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1,
  deliveryOptionId: '2'
}]

// Hàm này để thay đổi số lượng sản phẩm trong giỏ hàng
function changeQuantity(productId){
  const quantityInput = document.querySelector(.js-quantity-input-${productId})
  let newValue = Number(quantityInput.value)
  
  if(newValue < 0 || newValue >= 1000){
    alert('Quantity must be at least 0 and less than 1000')
    return
  }

  updateQuantity(productId, newValue) 

  const container = document.querySelector(.js-cart-item-container-${productId})
  container.classList.remove('is-editing-quantity')

  const quantityLabel = document.querySelector(
    .js-quantity-label-${productId}
  );

  quantityLabel.innerHTML = newValue;
  updateCartQuantity()
}

// Class của css để chỉnh sửa số lượng sản phẩm
// .is-editing-quantity .quantity-input {
//   display: initial;
// }

// .is-editing-quantity .save-quantity-link {
//   display: initial;
// }

// .is-editing-quantity .quantity-label {
//   display: none;
// }

// .is-editing-quantity .update-quantity-link {
//   display: none;
// }