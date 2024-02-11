const minDecimalPlaces = 0;
const maxDecimalPrecision = 5;

const letterMap = {
  K: 1_000,
  M: 1_000_000,
  B: 1_000_000_000,
  T: 1_000_000_000_000,
};

const roundToDP = (num, decimalPlaces) => {
  return (
    Math.floor(num * 10 ** decimalPlaces) /
    10 ** decimalPlaces
  ).toString();
};
const numberWithCommas = (x) => {
  let parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

const formatNumber = (num, minDP, maxDP) => {
  return numberWithCommas(formatPrecision(num, minDP, maxDP));
};

const removeTrailingZeros = (numStr, minDecimals = minDecimalPlaces) => {
	numStr = numStr.toString()
	const numSplit = numStr.split(".")
	if (numSplit.length < 2) return numStr
	const integerStr = numSplit[0]
	const decimalStr = numSplit[1]
	if (decimalStr.length <= minDecimals) return ""
	const trailingZerosMatch = decimalStr.match(/0*$/)
	if (!trailingZerosMatch) return "";
	let trailingZerosStr = trailingZerosMatch[0]
	const precisionDecimalStr = decimalStr.substring(0, trailingZerosMatch.index)
	trailingZerosStr = trailingZerosStr.substring(0, minDecimals - (decimalStr.length - trailingZerosStr.length))
	return `${integerStr}.${precisionDecimalStr}${trailingZerosStr}`
}

const formatPrecision = (
  num,
  minDecimals = minDecimalPlaces,
  maxPrecision = maxDecimalPrecision
) => {
  num =
    Math.floor(num * Math.pow(10, maxDecimalPrecision) + 0.5) /
    Math.pow(10, maxDecimalPrecision);
  let numStr = num.toString();
  let decimals = 0;
  if (numStr.includes(".")) {
    decimals = numStr.split(".")[1].length;
  }
  if (decimals < minDecimals) {
    if (decimals === 0) numStr = numStr + ".";
    for (var i = decimals; i < minDecimals; i++) {
      numStr = numStr + "0";
    }
  }
  if (decimals > 0) {
    const numSplit = numStr.split(".");
    const integerStr = numSplit[0];
    const decimalStr = numSplit[1];
    let nonZeroDecimals = (decimalStr.match(/[1-9][0-9]*/) || [""])[0];
    const nonZeroDecimalCount = nonZeroDecimals.length;
    let zeroDecimals = (decimalStr.match(/0*/) || [""])[0];
    let decimals = zeroDecimals + nonZeroDecimals;
    if (integerStr !== "0" && decimals.length > maxPrecision) {
      decimals = decimals.substring(0, maxPrecision);
      numStr = `${integerStr}.${removeTrailingZeros(decimals, minDecimals)}`;
    } else if (nonZeroDecimalCount > maxPrecision) {
      nonZeroDecimals = nonZeroDecimals.substring(0, maxPrecision);
      numStr = `${integerStr}.${zeroDecimals}${removeTrailingZeros(
        nonZeroDecimals,
        minDecimals
      )}`;
    }
  }

  return numStr;
};

const formatLargeNumber = (num, precisionCutoff = 1000, minDP, maxDP) => {
  if (num < precisionCutoff) return formatNumber(num, minDP, maxDP);
  num = Math.floor(num);
  let newNum = num;
  let suffix = "";
  Object.entries(letterMap).forEach(([letter, divisor]) => {
    if (num / divisor < 1000 && num / divisor >= 1) {
      suffix = letter;
      newNum = num / divisor;
    }
  });
  return `${roundToDP(newNum, 2)}${suffix.toLowerCase()}`;
};

const numberWordMap = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
];

const priceLabels = Array.from(document.querySelectorAll(".price-label"));
const stageLabels = Array.from(document.querySelectorAll(".stage-label"));
const prevStageLabels = Array.from(
  document.querySelectorAll(".prev-stage-label")
);

const defaultStage = 2;

fetch("https://presaleapiv2.bigeyes.space/", {
  headers: {
    project: "https://bigeyes.space/",
    accept: "application/json, text/plain, *",
  },
})
  .then((res) => res.json())
  .then((json) => {
    const price = json.totalSoldTokensValueUsd + 27310000;
    priceLabels.forEach((el) => {
      el.innerText = formatLargeNumber(price, 1000, 0, 1);
    });
    /*
	stageLabels.forEach((el) => {
		//el.innerText = numberWordMap[(Number.parseInt(json.stage) - 1) || defaultStage].toLowerCase()
		el.innerText = json.stage - 1
	})
	prevStageLabels.forEach((el) => {
		//el.innerText = numberWordMap[(Number.parseInt(json.stage) - 2) || defaultStage].toLowerCase()
	})	*/
  });
