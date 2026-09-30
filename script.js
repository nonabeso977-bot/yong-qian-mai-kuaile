const groupDrawingButton = document.getElementById("groupDrawingButton");
const soloDrawingButton = document.getElementById("soloDrawingButton");
const guessButton = document.getElementById("guessButton");

const profileButton = document.getElementById("profileButton");
const settingsButton = document.getElementById("settingsButton");


groupDrawingButton.addEventListener("click", () => {
    alert("🎨 قروب رسم");
});


soloDrawingButton.addEventListener("click", () => {
    alert("🖌️ رسم فردي");
});


guessButton.addEventListener("click", () => {
    alert("🔮 احزر");
});


profileButton.addEventListener("click", () => {
    alert("👤 الحساب");
});


settingsButton.addEventListener("click", () => {
    window.location.href = "settings.html";
});