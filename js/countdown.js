const endDate = new Date("2023-02-21").getTime()

const zeroPad = (num, zeros) => {
	let numStr = num.toString()
	for (let i = 0; i < zeros - numStr.length; i++) {
		numStr = `0${numStr}`
	}
	return numStr
}

const callback = () => {
	const countdownContainers = document.querySelectorAll(".countdown-text")
	countdownContainers.forEach((countdownContainer) => {
		countdownContainer.classList.remove("loading")
		const hours = countdownContainer.querySelector(".hours")
		const minutes = countdownContainer.querySelector(".minutes")
		const seconds = countdownContainer.querySelector(".seconds")

		const diff = Math.max(endDate - Date.now(), 0)
		const hoursNum = Math.floor(diff / (1000 * 60 * 60))
		const minsNum = Math.floor((diff - hoursNum * (1000 * 60 * 60)) / (1000 * 60))
		const secsNum = Math.floor((diff - hoursNum * (1000 * 60 * 60) - minsNum * (1000 * 60)) / (1000))

		hours.innerText = zeroPad(hoursNum, 2)
		minutes.innerText = zeroPad(minsNum, 2)
		seconds.innerText = zeroPad(secsNum, 2)
	})
}

callback()
document.addEventListener("DOMContentLoaded", callback)
document.addEventListener("load", callback)
const loadInterval = setInterval(() => {
	const countdownContainers = document.querySelectorAll(".countdown-text")
	if (countdownContainers.length === 0) return;
	callback()
	clearInterval(loadInterval)
}, 10)
setInterval(callback, 500)