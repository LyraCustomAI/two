const license = window.fivem_license || localStorage.getItem("license");

document.querySelector("#login_submit").onclick = async () => {

    const res = await fetch("http://194.60.87.77:3000/api/auth/login", {
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
