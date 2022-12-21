const input = document.querySelector("input")
const enviar = document.querySelector("button")
const error = document.querySelector("h2")
const loader = document.getElementById("loader")
const container = document.querySelector(".container")
const spanCiudad = document.getElementById("ciudad")
const spanDay = document.getElementById("day")
const spanTemp = document.getElementById("temperatura")
const spanTempMin = document.getElementById("temperaturaMin")
const imagen = document.getElementById("wicon")
const desc = document.getElementById("descripcion")
let DateTime = luxon.DateTime;

let lat = 0
let lng = 0

enviar.addEventListener("click", function(){
  init(input.value)
})

input.addEventListener("keydown", function(e){
  if (e.code == "Enter") {
    init(input.value)
  }
})

function init(city) {
  if (city === "") {
    input.classList.toggle("formerror");
    enviar.style.backgroundColor = "rgb(214, 67, 67)"
    setTimeout(() => {
      input.classList.toggle("formerror");
      enviar.style.backgroundColor = ""
    }, 500);
  } else {
    loader.style.display = 'flex';
    pronostico(city)
  }
}

async function pronostico(ciudad) {
  error.hidden = true
  container.hidden = true
  const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + ciudad +"&appid=fdd533266e28101881f610f2b8f1ebe1&units=metric&lang=es");
  var data = await response.json();
  if (response) {
    if (!response.ok) {
      loader.style.display = 'none';
      error.hidden = false
      setTimeout(() => {
        error.hidden = true
      }, 2000);
    } else {
      spanCiudad.textContent = `${data.name}, ${data.sys.country}`
      spanTemp.innerHTML = Math.round(data.main.temp * 10) / 10 + "<span class='chico'>c</span>"
      imagen.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      desc.textContent = data.weather[0].description
      let dt = DateTime.now()
      spanDay.textContent = dt.toLocaleString(DateTime.DATE_MED) + ", " + dt.toLocaleString(DateTime.TIME_SIMPLE)
      loader.style.display = 'none';
      container.hidden = false
    }
  }
  input.value = ""
}