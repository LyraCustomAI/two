const license = window.fivem_license || localStorage.getItem("license");

document.querySelector("#reg_submit").onclick = async () => {

    const payload = {
        license,
        login_name: document.querySelector("#reg_login").value,
        password: document.querySelector("#reg_pass").value,
        real_name: document.querySelector("#reg_realname").value,
        nickname: document.querySelector("#reg_nick").value,
        age: document.querySelector("#reg_age").value,
        gender: document.querySelector("#reg_gender").value,
        city: document.querySelector("#reg_city").value,
    };

    const res = await fetch("https://two.lt/api/auth/register", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(payload),
    });

    const out = await res.json();
    if (out.token) {
        localStorage.setItem("token", out.token);
        window.location.href = "home.html";
    } else {
        alert(out.error || "Nepavyko sukurti ankstos");
    }
};
