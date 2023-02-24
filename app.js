const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
WIcon = document.querySelector("img"),
arrowBack =wrapper.querySelector("header i");

let api;


inputField.addEventListener("keyup", e =>{
  if(e.key == "Enter" && inputField.value  != ""){
    requestApi(inputField.value);
  }
});

//butao get device location
locationBtn.addEventListener("click" , () =>{
  if(navigator.geolocation){//if browser support geolocation api
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }else{
    alert("Your browser doesn't support geolocation api ");
  }
});

function onSuccess(position){
  const {latitude, longitude} = position.coords;//getting lat and lon of the user device from coords obj
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${"24bfe7893dde52763d424f2e246e8082"}`;
  fetchData();
}
function onError(error){
  infoTxt.innerText =error.message;
  infoTxt.classList.add("error");
}

function requestApi(city){
  api= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${"24bfe7893dde52763d424f2e246e8082"}`;
  fetchData();
}

function fetchData(){
  infoTxt.innerText ="Getting weather details...";
  infoTxt.classList.add("pending");
  //getting api resposne and returning it with parsing into js object and in another
  //then function calling weatherDetails function with passing api result as an argyment
  fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info){
  infoTxt.classList.replace("pending" , "error");
  if(info.cod == "404"){
    infoTxt.innerText =`${inputField.value} isn't a valid city name`;
  }else{
    //lets get required properties value from the info object
   const city = info.name;
   const country = info.name;
   const {description, id}  = info.weather[0];
   const {feelslike, humidity ,temp}  = info.main;

//using custom icon according to the id the api return to us..we can see the id on the console
if(id == 800 ){
  WIcon.src = "Weather Icons/clear.svg";
}else if (id >= 200 && id <=232){
  WIcon.src = "Weather Icons/strom.svg";
}else if (id >= 600 && id <=622){
  WIcon.src = "Weather Icons/snow.svg";
}else if (id >= 701 && id <=781){
  WIcon.src = "Weather Icons/haze.svg";
}else if (id >= 801 && id <=804){
  WIcon.src = "Weather Icons/cloud.svg";
}else if ((id >= 300 && id <=321) || (id >= 500 <= 531)){
  WIcon.src = "Weather Icons/rain.svg";
}
  //lets pass these values to a particular html element
  wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
  wrapper.querySelector(".weather").innerText = description;
  wrapper.querySelector(".location span").innerText = ` ${city},${country}`;
  wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feelslike);
  wrapper.querySelector(".humidity span").innerText = `${humidity}%`;


    infoTxt.classList.remove("pending","error");
    wrapper.classList.add("active");
    console.log(info);
  }
}

arrowBack.addEventListener("click", ()=>{
  wrapper.classList.remove("active");
});
























/*const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".input-part"),
infoTxt = document.querySelector(".info-txt"),
inputField = document.querySelector("input");

inputField.addEventListener("keyup" , e =>{
  if(e.key == "Enter" && inputField.value != ""){
      console.log("aNDREA")
  }
})*/















