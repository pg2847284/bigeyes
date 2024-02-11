var selects=document.getElementsByClassName("select-container");Array.from(selects).forEach((selectContainer)=>{let select=selectContainer.getElementsByTagName("select")[0]
let container=document.createElement("div")
container.setAttribute("class","select-selected")
container.innerHTML=select.options[select.selectedIndex].innerHTML
selectContainer.appendChild(container)
let itemsContainer;const setupSelect=()=>{if(itemsContainer)selectContainer.removeChild(itemsContainer)
itemsContainer=document.createElement("div")
itemsContainer.setAttribute("class","select-items select-hide")
selectContainer.appendChild(itemsContainer)
let open=false;const showContainer=()=>{open=true
itemsContainer.classList.remove("select-hide")
container.classList.add("select-arrow-active")}
const hideContainer=()=>{open=false
itemsContainer.classList.add("select-hide")
container.classList.remove("select-arrow-active")}
new Array(select.options.length).fill(0).forEach((_,i)=>{const item=document.createElement("div")
item.innerHTML=select.options[i].innerHTML;item.addEventListener("click",(e)=>{hideContainer()
select.value=select.options[i].value
select.dispatchEvent(new Event("change",e))})
itemsContainer.appendChild(item)})
select.addEventListener("change",(e)=>{container.innerHTML=select.options[select.selectedIndex].innerHTML})
container.addEventListener("click",()=>{if(open)hideContainer()
else showContainer()})}
setupSelect()
select.addEventListener("DOMNodeInserted",(e)=>{setupSelect()})})