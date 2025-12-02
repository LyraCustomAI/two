const API = "http://194.60.87.77:3000";

document.getElementById("reg_submit").onclick = async (e) => {
    e.preventDefault();

    const license = window.fivem_license || localStorage.getItem("license");
    if (!license) {
        alert("UI turi būti paleistas per žaidimą. Nėra licence.");
        return;
    }

    const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            license,
            display_name: document.getElementById("nick").value,
            password: document.getElementById("login_pass").value,
            age: Number(document.getElementById("age").value),
            city: document.getElementById("city").value,
            gender: document.getElementById("gender").value
        })
    });

    const out = await res.json();

    if (out.ok) {
        alert("Profilis sukurtas! Eik prisijungti.");
        window.location.href = "login.html";
    } else {
        alert(out.error || "Klaida registruojant.");
    }
};
