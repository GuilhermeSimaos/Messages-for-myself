// const { default: axios } = require("axios");

const SERVER_URL = "https://messages-for-myself-backend.vercel.app";

const message = document.getElementById("message");
const messageForm = document.getElementById("messageForm");
messageForm.addEventListener("input", () => {
  message.innerText = messageForm.value;
});

const result = document.getElementById("status");
const postMessage = document.getElementById("post");
postMessage.addEventListener("click", () => {
  if (messageForm.value) {
    messageForm.classList.remove("is-invalid");
    var json = {
      message: messageForm.value,
    };

    axios
      .post(SERVER_URL + "/post/message", json)
      .then((response) => {
        console.log(response.data);
        if (response.status == 200) {
          result.classList.add("text-success");
          result.classList.remove("text-danger");
        } else {
          result.classList.add("text-danger");
          result.classList.remove("text-success");
        }
        result.innerText = response.statusText;
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(() => {
      result.innerText = "";
    }, 5000);
  } else {
    messageForm.classList.add("is-invalid");
  }
});

const tableMessage = document.getElementById("tableMessage");
const random = document.getElementById("getRandom");
random.addEventListener("click", () => {
  axios
    .get(SERVER_URL + "/get/random-message", {
      headers: {
        "Access-Control-Allow-Origin": "https://messages-for-myself.vercel.app",
      },
    })
    .then((response) => {
      // console.log(response.data);
      const span = document.createElement("span");
      span.innerText = response.data;
      tableMessage.replaceChildren(span);
    })
    .catch((error) => {
      console.log(error);
    });
});

const all = document.getElementById("getAll");
all.addEventListener("click", () => {
  axios
    .get(SERVER_URL + "/get/all-messages", {
      headers: {
        "Access-Control-Allow-Origin": "https://messages-for-myself.vercel.app",
      },
    })
    .then((response) => {
      // console.log(response.data);
      const span = document.createElement("span");
      span.innerText = response.data;
      tableMessage.replaceChildren(span);
    })
    .catch((error) => {
      console.log(error);
    });
});

const clear = document.getElementById("clearRandom");
clear.addEventListener("click", () => {
  tableMessage.innerHTML = "";
});
