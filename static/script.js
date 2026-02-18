const slider = document.getElementById("daysSlider");
const daysValue = document.getElementById("daysValue");
const form = document.getElementById("travelForm");
const themeToggle = document.getElementById("themeToggle");

// ---- slider ----
slider.oninput = () => {
    daysValue.textContent = slider.value;
};

// ---- submit form ----
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const response = await fetch("/submit", {
        method: "POST",
        body: formData
    });

    const result = await response.json();
    document.getElementById("responseMsg").textContent = result.message;

    form.reset();
    daysValue.textContent = 2;
});

// ---- theme toggle ----
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "🌙 Dark Mode";
} else {
    themeToggle.textContent = "☀️ Light Mode";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙 Dark Mode";
    } else {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️ Light Mode";
    }
});
