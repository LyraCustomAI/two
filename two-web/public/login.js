const license = window.fivem_license || localStorage.getItem("license");

document.querySelector("#login_submit").onclick = async () => {

    const res = await fetch("https://two.lt/api/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
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
