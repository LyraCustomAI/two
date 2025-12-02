const API = "http://194.60.87.77:3000";

async function loadStats() {
    const r = await fetch(`${API}/stats`);
    const d = await r.json();

    document.getElementById("s_users").innerText = d.users;
    document.getElementById("s_photos").innerText = d.photos;
    document.getElementById("s_msg").innerText = d.messages;
}
loadStats();
