
let isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
	},
	any: function () {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};

window.onload = function () {
	document.addEventListener('click', documentActions)

	//acticons
	function documentActions(e) {
		const targetElement = e.target

		if (window.innerWidth > 768 && isMobile.any()) {
			if (targetElement.classList.contains('menu__arrow')) {
				targetElement.closest('.menu__item').classList.toggle('_hover')
			}
			if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
				_removeClassses(document.querySelectorAll('.menu__item._hover'), '_hover')
			}

		}
		if (targetElement.classList.contains('products__more')) {
			e.preventDefault()
			getProducts(targetElement)

		}
	}

	function _removeClassses(item, deleteitem) {
		item.forEach(element => {
			element.classList.remove(deleteitem)
		});
	}
}
async function getProducts(button) {
	if (!button.classList.contains('_hold')) {
		button.classList.add('_hold')
		const file = 'assets/json/products.json'
		let response = await fetch(file, {
			method: 'GET'

		})
		if (response.ok) {

			let result = await response.json()
			loadProducts(result)
			button.classList.remove('_hold')
			button.remove()
		} else {
			alert('err')
		}

	}
}
function loadProducts(data) {
	const productsItem = document.querySelector('.products__items')
	data.products.forEach(item => {
		const productId = item.id
		const productUrl = item.url
		const productImage = item.image
		const productTitle = item.title
		const productText = item.text
		const productPrice = item.price
		const productShareUrl = item.shareUrl
		const productLikeUrl = item.likeUrl
		const productLabels = item.labels

		let template = `
		<article data-pid='${productId}' class="products__item item-product">
				<div class="item-product__labels">
					<div class="item-product__label item-product__label_sale">-30%</div>
				</div>
				<a href="${productUrl}" class="item-product__image _ibg">
					<img src="./assets/images/products/${productImage}" alt="${productTitle}">
				</a>
				<div class="item-product_body">
					<div class="item-product__content">
						<h5 class="item-product__title" Syltherine>${productTitle}</h5>
						<div class="item-product__text">${productText}</div>
					</div>
					<div class="item-product__prices">
						<div class="item-product__price">${productPrice}</div>
						<div class="item-product__price-old"></div>
					</div>
					<div class="item-product__actions actions-product">
						<div class="actions-product__body">
							<a href="" class="actions-product__button btn btn_white">add to cart</a>
							<a href="${productShareUrl}" class="actions__product__link _icon-share">share</a>
							<a href="${productLikeUrl}" class="actions-product__link _icon-favorite">like</a>
						</div>
					</div>

				</div>
			</article>
		`
		productsItem.insertAdjacentHTML('beforeend', template)
	})
}