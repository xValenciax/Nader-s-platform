// Needed Variables Start
const stud_id = document.querySelector("#stud_id");
const pass = document.querySelector("#pass");
const loginForm = document.querySelector("#login");
const card = document.querySelector("#card");
const lock = document.querySelector("#lock");
const idPlaceholder = document.querySelector("#id_placeholder");
const passPlaceholder = document.querySelector("#pass_placeholder");
const popup_message = document.querySelector(".popup");
const popup_btn = document.querySelector("#go_home");
const id_regex = new RegExp(stud_id.pattern);
const pass_regex = new RegExp(pass.pattern);
let passesValidation = false;
// Needed Variables End

// event listeners Start
const validateInput = (event) => {
  if (
    id_regex.test(event.target.value) ||
    pass_regex.test(event.target.value)
  ) {
    if (event.target.getAttribute("type") === "password") {
      if (lock.classList.contains("fa-unlock-keyhole"))
        lock.classList.remove("fa-unlock-keyhole");
      lock.classList.add("fa-lock");
    }
    if (event.target.classList.contains("invalid")) {
      event.target.classList.remove("invalid");
    }
    event.target.classList.add("valid");
    stud_id.style.setProperty("text-align", "right");
    event.target.setCustomValidity("");
    passesValidation = true;
  } else if (
    id_regex.test(event.target.value) === false ||
    pass_regex.test(event.target.value) === false
  ) {
    if (event.target.getAttribute("type") === "password") {
      if (lock.classList.contains("fa-lock")) lock.classList.remove("fa-lock");
      lock.classList.add("fa-unlock-keyhole");
    }
    if (event.target.classList.contains("valid")) {
      event.target.classList.remove("valid");
    }
    event.target.classList.add("invalid");
    stud_id.style.setProperty("text-align", "center");
    event.target.setCustomValidity(
      "Please, Make sure to provide the correct credentials "
    );
    passesValidation = false;
  }
};

const Placeholder = (event) => {
  if (
    event.target.getAttribute("type") === "text" ||
    event.target.classList.contains("id_placeholder")
  )
    idPlaceholder.classList.add("id_placeholder_focus");
  else passPlaceholder.classList.add("pass_placeholder_focus");
};

const hidePlaceholder = (event) => {
  if (event.target.getAttribute("type") === "text") {
    if (event.target.value === "")
      idPlaceholder.classList.remove("id_placeholder_focus");
  } else {
    if (event.target.value === "")
      passPlaceholder.classList.remove("pass_placeholder_focus");
  }
};

const goToHomePage = (event) => {
  if (passesValidation) {
    window.location.href = "/public/index.html";
  }
};

document.addEventListener("DOMContentLoaded", (event) => {
  document.querySelector("#sbmt_btn").addEventListener("submit", (e) => {
    e.preventDefault();
    return false;
  });

  document.querySelector("#sbmt_btn").addEventListener("click", (e) => {
    if (passesValidation) {
      popup_message.classList.add("popup_show");
    }
  });

  popup_btn.addEventListener("click", goToHomePage);
});

idPlaceholder.addEventListener("click", Placeholder);
passPlaceholder.addEventListener("click", Placeholder);

// event listeners End

// function calls
stud_id.addEventListener("focus", Placeholder);
stud_id.addEventListener("input", validateInput);
stud_id.addEventListener("blur", hidePlaceholder);
pass.addEventListener("focus", Placeholder);
pass.addEventListener("input", validateInput);
pass.addEventListener("blur", hidePlaceholder);
