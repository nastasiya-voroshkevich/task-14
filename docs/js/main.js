let form = document.forms.myForm;
let firstDate = form.elements.firstDate;
let secondDate = form.elements.secondDate;
let error1 = document.getElementById("error1");
let dateMin = document.getElementById("dateMin");
let dateMax = document.getElementById("dateMax");
let text = document.getElementById("text");
let result = document.getElementById("result");
let arr = [];
var myString = "Привет, мир. Как дела?";
var splits = myString.split(" ", 3);

console.log(splits);
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
    fetch(
      `https://www.nbrb.by/api/exrates/rates/dynamics/145?&startDate=${firstDate.value}&endDate=${secondDate.value}`
    )
      .then((results) => results.json())
      .then((Date) => {
        arr = Date;
        for (let i = 0; i < arr.length; i++) {
          arr[i].usd = arr[i].Cur_OfficialRate;
          delete arr[i].Cur_ID;
          delete arr[i].Cur_OfficialRate;
        }
        console.log(arr);

        let moneyUSD = [];
        for (let i = 0; i < arr.length; i++) {
          moneyUSD.push(arr[i].usd);
        }
        moneyUSD.sort(function (a, b) {
          return b - a;
        });
        let max = [];
        for (let i = 0; i < arr.length; i++) {
          max = arr.filter(function (elem) {
            return elem.usd === moneyUSD[0];
          });
        }
        console.log(max[0].Date);
        let dateMax1 = max[0].Date.split("T00:00:00");

        let min = [];
        for (let i = 0; i < arr.length; i++) {
          min = arr.filter(function (elem) {
            return elem.usd === moneyUSD[moneyUSD.length - 1];
          });
        }
        let dateMin1 = min[0].Date.split("T00:00:00");
        dateMax.innerHTML = `${dateMax1[0]}`;
        dateMin.innerHTML = `${dateMin1[0]}`;
        result.innerHTML = `${moneyUSD[0]}`;
        text.innerHTML = `${moneyUSD[moneyUSD.length - 1]}`;
        console.log(moneyUSD);
      });
  }
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
