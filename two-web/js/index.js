const API_URL = "http://194.60.87.77:3000";

async function loadStats() {
    try {
        const res = await fetch(`${API_URL}/stats`);
        const data = await res.json();

        document.getElementById("stats_users").innerText = data.users;
        document.getElementById("stats_messages").innerText = data.messages;
        document.getElementById("stats_photos").innerText = data.photos;
        document.getElementById("stats_friends").innerText = data.friends;
    } catch (err) {
        console.warn("Statistikos negauta:", err);
    }
}

loadStats();
