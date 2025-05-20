document.querySelector(".toggle-password").addEventListener("click", () => {
  const passwordInput = document.getElementById("password");
  const toggleBtn = document.querySelector(".toggle-password");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleBtn.textContent = "Hide";
  } else {
    passwordInput.type = "password";
    toggleBtn.textContent = "Show";
  }
});

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email && password) {
    localStorage.setItem("user", JSON.stringify({ email, password }));
    alert("Login successful!");
    window.location.href = "index.html"; // redirect to homepage or dashboard
  } else {
    alert("Please fill in all fields.");
  }
});
