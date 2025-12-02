const API_URL = "http://194.60.87.77:3000";

document.getElementById("login_submit").onclick = async () => {
    // Licence iš FiveM NUI arba localStorage fallback
    const license = window.fivem_license || localStorage.getItem("license");

    if (!license) {
        alert("Nėra licence. Atidaryk UI per žaidimą.");
        return;
    }

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ license })
        });

        const out = await res.json();
        if (out.token) {
            localStorage.setItem("token", out.token);
            localStorage.setItem("license", license);
            window.location.href = "home.html";
        } else {
            alert(out.error || "Nepavyko prisijungti");
        }
    } catch (err) {
        console.error(err);
        alert("Serverio klaida");
    }
};
