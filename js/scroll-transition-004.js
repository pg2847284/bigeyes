const getCSSStringValue = (str) => {
	return Number.parseFloat(str.replace(/px/, ""))
}

let style = getComputedStyle(document.body)
let minTop = getCSSStringValue(style.getPropertyValue("--frame-image-top"))
let maxTop = window.innerHeight - 100

const scrollLinks = Array.from(document.querySelectorAll(".sections__menu-link"))

const isWidthMobile = () => window.innerWidth < 768

document.addEventListener("DOMContentLoaded", () => {
	const map = Array.from(document.querySelectorAll(".section__item")).map((node) => {
		return {
			content: node.querySelector(".section__item-content"),
			background: node.querySelector(".section__background-image"),
			root: node
		}
	})
	const footer = document.querySelector("footer")

	const getVisibilityRatio = (element) => {
		if (!element) return;
		let visibilityRatio = 0

		let rect = element.getBoundingClientRect()
		visibilityRatio = 1 - Math.max(
			(rect.top - minTop) / (maxTop - minTop)
		)
		if ((rect.top - minTop) <= 0) visibilityRatio = 1;
		if (rect.top >= maxTop) visibilityRatio = 0;

		return visibilityRatio;
	}

	const getFooterVisibilityRatio = (element, min = minTop, max = maxTop) => {
		let visibilityRatio = 0

		let rect = element.getBoundingClientRect()
		visibilityRatio = Math.max(
			(max - (rect.bottom - window.innerHeight) - min) / (max - min)
		)

		if (visibilityRatio < 0) visibilityRatio = 0;
		if (visibilityRatio > 1) visibilityRatio = 1;

		return visibilityRatio;
		
	}

	const callback = () => {
		if (isWidthMobile()) return;
		let highestColor = ""
		let selectedIndex = 0;
		map.forEach((mapItem, i) => {
			let contentVisibilityRatio = getVisibilityRatio(mapItem.content)
			let backgroundVisibilityRatio = getVisibilityRatio(mapItem.background)

			if (!mapItem.background) return;
			mapItem.background.style.setProperty("--opacity", contentVisibilityRatio)

			if (!highestColor || backgroundVisibilityRatio > 0.4) {
				highestColor = mapItem.root.getAttribute("data-bg-col")
				selectedIndex = i;
			}
		})
		scrollLinks.forEach((link) => link.classList.remove("active"))
		document.querySelector(`.menu__link-${selectedIndex}`).classList.add("active")
		document.body.style.setProperty("--body-color", highestColor)
	}

	callback()
	document.addEventListener("scroll", callback)

	const fixedItems = [
		document.querySelector(".frame-container"),
		document.querySelector(".scroll__button.scroll-left"),
		document.querySelector("header")
	]

	const callback2 = () => {
		if (isWidthMobile()) return;
		const footerHeight = footer.getBoundingClientRect().height
		const offset = 0
		let visibilityRatio = getFooterVisibilityRatio(footer, 0, footerHeight)

			// document.body.classList.add("footer-visible")
			fixedItems.forEach((item) => {
				if (visibilityRatio > 0) {
					item.classList.add("footer-visible")
				} else {
					item.classList.remove("footer-visible")
				}
			})
	}

	let startedAt = null
	const doForTime = (func, time) => {
		if (startedAt) return;
		startedAt = Date.now();

		let updateFunc = () => {
			if (Date.now() - startedAt >= time) {
				startedAt = null;
				return;
			}
			func()
			requestAnimationFrame(updateFunc)
		}
		updateFunc()
	}

	callback2()
	document.addEventListener("scroll", callback2)
})