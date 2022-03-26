console.log("Client side js file is loaded");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

const getWeather = (location) => {
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        return;
      }
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
    });
  });
};

messageOne.textContent = "";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
  getWeather(location);
});
