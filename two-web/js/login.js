const API_URL = "http://194.60.87.77:3000";

const license = window.fivem_license || localStorage.getItem("license");

document.getElementById("login_submit").onclick = async () => {
    if (!license) {
        alert("Nėra licence. Atidaryk UI per žaidimą.");
        return;
    }

    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ license })
    });

    const out = await res.json();

    if (out.token) {
        localStorage.setItem("token", out.token);
        window.location.href = "home.html";
    } else {
        alert(out.error || "Nepavyko prisijungti");
    }
};
