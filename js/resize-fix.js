let radius = 1.5;

const resize = () => {
	Array.from(document.querySelectorAll(".preserve-aspect")).forEach((svgFrame) => {
		let rect = svgFrame.getBoundingClientRect()
		let aspectW = rect.width / rect.height
		Array.from(svgFrame.querySelectorAll("rect")).forEach((svg) => {
			let newRadius = radius / aspectW
			if (!newRadius) return;
			if (svg.getAttribute("rx")) {
				svg.setAttribute("rx", newRadius)
			}
			if (svg.getAttribute("ry")) {
				svg.setAttribute("ry", radius)
			}
		})
	})
}

resize()

document.addEventListener("load", resize)
document.addEventListener("DOMContentLoaded", resize)

window.addEventListener("resize", resize)