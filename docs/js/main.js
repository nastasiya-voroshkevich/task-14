let form = document.forms.myForm;
let firstDate = form.elements.firstDate;
let secondDate = form.elements.secondDate;
let error1 = document.getElementById("error1");

let today = new Date().toISOString().split("T")[0];
let text =document.getElementById('text');
let result = document.getElementById('result');
const currents = [];
console.log(currents);
const obj ={};
console.log(today);
if( JSON.parse(localStorage.getItem('arr') !== null) ){
arrayUsd = JSON.parse(localStorage.getItem('arr'));
console.log(arrayUsd);
for(let i=0; i<arrayUsd.length; i++) {
  arrayUsd[i] = JSON.parse(arrayUsd[i]);
  
}
console.log(arrayUsd);

arrayUsd.sort(function(obj1, obj2) {
  // Сортировка по убыванию
  return obj2.usd-obj1.usd;
});
console.log(arrayUsd[0]);
for (let key in arrayUsd[0]) {

  result.innerHTML  +=  key +':    '+ arrayUsd[0][key] +'<br> <br>' ;
}
for (let key in arrayUsd[arrayUsd.length-1]) {

  text.innerHTML  +=  key +':    '+ arrayUsd[arrayUsd.length-1][key] +'<br> <br>' ;
}
localStorage.removeItem('arr');

}
myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (firstDate.value < secondDate.value === false) {
    error1.innerHTML =
      "Пожалуйста, введите корректную дату. Левая дата должна быть меньше правой.";
  } else if (firstDate.value < secondDate.value === true) {
    error1.innerHTML = "";
  }

  if (firstDate.value < secondDate.value === false) {
      error1.innerHTML =
      "Пожалуйста, введите корректную дату. Левая дата должна быть меньше правой.";
  } else if (firstDate.value < secondDate.value === true) {
    // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
    error1.innerHTML = "";
  }

  if (
    firstDate.value &&
    secondDate.value &&
    firstDate.value < secondDate.value === true
  ) {
    console.log(firstDate.value);
    console.log(secondDate.value);
    let date =[];
    start = Date.parse(firstDate.value);
    end = Date.parse(secondDate.value);
    console.log(start);
    console.log(end);
    for(let i= start; i <= end;i = i + 24 * 60 * 60 * 1000) {
     date.push( new Date(i).toISOString().substr(0,10));
    }
    //date.push(firstDate.value);
    //date.push(secondDate.value);
    console.log(date);
   

    for (let i=0; i< date.length; i++) {
    fetch(
      `https://www.nbrb.by/api/exrates/rates/usd?periodicity=0&parammode=2&ondate=${date[i]}`
    )
      .then((response) => response.json())
      .then((usd) => {
        //obj.date = firstDate.value
        obj.date = date[i];
        obj.usd = usd.Cur_OfficialRate;
        console.log(usd.Cur_OfficialRate);
        currents.push(JSON.stringify(obj));
        console.log(currents);
       localStorage.setItem('arr', JSON.stringify(currents));  
       location.reload();
      });}
     
  } else { console.log('error');}
});
secondDate.oninput = function () {
  if (firstDate.value < secondDate.value === false) {
    document.getElementById("error1").innerHTML =
      "Пожалуйста, введите корректную дату. Левая дата должна быть меньше правой.";
  } else {
    document.getElementById("error1").innerHTML = "";
  }
};
firstDate.oninput = function () {
  if (firstDate.value < secondDate.value === false) {
    document.getElementById("error1").innerHTML =
      "Пожалуйста, введите корректную дату. Левая дата должна быть меньше правой.";
  } else {
    document.getElementById("error1").innerHTML = "";
  }
};  
