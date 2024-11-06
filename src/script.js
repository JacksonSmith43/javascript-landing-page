const usersTable = [
  // Note: This is a fake table for educational purposes. Never store user credentials in plain text.
  { username: "hello@world.com" },
  { username: "test@user.com" },
  { username: "email@domain.com" },
];
let renderSuccess = () => {
  document.getElementById("success-message").hidden = false;
};

let renderEmailTakenError = () => {
  document.getElementById("taken-error-message").hidden = false;
};

let renderEmailEmptyError = () => {
  document.getElementById("empty-error-message").hidden = false;
};

let resetMessage = () => {
  document.getElementById("success-message").hidden = true;
  document.getElementById("taken-error-message").hidden = true;
  document.getElementById("empty-error-message").hidden = true;
};

let invalidEmailAddress = () => {
  document.getElementById("invalid-error-message").hidden = false;
};

let savesUsernames = [];


addEventListener("submit", (event) => {
  event.preventDefault();
  resetMessage();

  let email = document.getElementById("email").value;
  const checksDatabaseUsernameWithUserInput = usersTable.some(user => user.username === email);
  const checksInputedEmailWithExistingOnes = savesUsernames.includes(email);


  console.log("username: ", email);

  if (email !== "") {

    if (checksEmailValidity(email)) {
      console.log("Valid email address.");
      console.log("checksEmailValidity: ", checksEmailValidity(email));
      console.log("checksDatabaseUsernameWithUserInput:", checksDatabaseUsernameWithUserInput);
      console.log("checksInputedEmailWithExistingOnes:", checksInputedEmailWithExistingOnes);

      if (!checksDatabaseUsernameWithUserInput && !checksInputedEmailWithExistingOnes) {
        console.log("Email has been added.");
        savesUsernames.push(email);
        console.log("savesUsernames: ", savesUsernames);
        return renderSuccess();

      } else {
        console.log("Has already been taken.");
        return renderEmailTakenError();
      }

    } else {
      invalidEmailAddress();
      console.log("Invalid email address.");
    }

  } else {
    console.log("Empty.");
    return renderEmailEmptyError();
  }

});

let toggleNav = () => {
  var nav = document.getElementById("mobile-nav");

  if (nav.className.indexOf("show") == -1) {
    nav.className += " show";

  } else {
    nav.className = nav.className.replace(" show", "");
  }
};


function checksEmailValidity(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

