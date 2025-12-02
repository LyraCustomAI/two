const API_URL = "http://194.60.87.77:3000";

const license = window.fivem_license || localStorage.getItem("license");

document.getElementById("reg_submit").onclick = async () => {

    if (!license) {
        alert("Nėra licence. Atidaryk UI per žaidimą.");
        return;
    }

    const body = {
        license,
        login_name: document.getElementById("reg_login").value,
        password: document.getElementById("reg_pass").value,
        real_name: document.getElementById("reg_realname").value,
        nickname: document.getElementById("reg_nick").value,
        age: document.getElementById("reg_age").value,
        gender: document.getElementById("reg_gender").value,
        city: document.getElementById("reg_city").value
    };

    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    const out = await res.json();

    if (out.token) {
        localStorage.setItem("token", out.token);
        window.location.href = "home.html";
    } else {
        alert(out.error || "Registracija nepavyko");
    }
};
