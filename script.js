const BASE_URL="https://v6.exchangerate-api.com/v6/11896cba8e3057b726966e3d";

const dropdown= document.querySelectorAll(".select-container select");
const btn= document.querySelector("button");
const msg= document.querySelector(".msg");
const fromCurr= document.querySelector("#from");
const toCurr= document.querySelector("#to");
for(let select of dropdown){
    for(let ccode in countryList){
        let newOption = document.createElement("option");
        newOption.value = ccode;
        newOption.innerText =ccode;
        if(select.id === "from" && ccode === "USD"){
            newOption.selected = true;
        }
        if(select.id === "to" && ccode === "INR"){
            newOption.selected = true;
        }
        select.append(newOption);
    }
    select.addEventListener("change",(e)=>{
        updateFlag(e.target);
    });
}
const updateFlag=(element)=>{
    let ccode = element.value;
    let countrycode = countryList[ccode];
    let fflag= `https://flagsapi.com/${countrycode}/shiny/64.png`;
    element.parentElement.querySelector("img").src = fflag;
};
const updateexrate=async ()=>{
    let amount = document.querySelector("#amount");
    let amountVal=amount.value;
    console.log(amount);
    if(amountVal==="" || amountVal==null){
        amount.value="1";
        amountVal=1;
    }
    if(amountVal<=0){
        alert("Enter a positive value");
        amount.value="1";
        amountVal=1;
        return;
    }
    const URL= `${BASE_URL}/pair/${fromCurr.value}/${toCurr.value}`;
    let response=await fetch(URL);
    console.log(response);
    let data= await response.json();
    console.log(data.conversion_rate);
    let rate=data.conversion_rate;
    msg.innerText=`${amountVal} ${fromCurr.value} = ${amountVal*rate} ${toCurr.value}`;
}
btn.addEventListener("click",async (e)=>{
    e.preventDefault();
    updateexrate();
});
window.addEventListener("load",()=>{
    updateexrate();
});