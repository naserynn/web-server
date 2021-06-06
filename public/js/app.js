const weatherForm = document.querySelector("form");
const search = document.getElementById("address");
const result = document.querySelector(".result");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = search.value;
  result.innerHTML = "Loading...";

  fetch(`/weather?address=${location}`)
    .then((response) =>
      response.json().then((data) => {
        if (data?.error) {
          result.innerHTML = data.error;
        } else {
          const { location, temperature, feelslike } = data;
          result.innerHTML = `The current temperature in ${location} is ${temperature} degrees. It feels like ${feelslike} degrees.`;
        }
      })
    )
    .catch((error) => {
      result.innerHTML = error;
    });
});
