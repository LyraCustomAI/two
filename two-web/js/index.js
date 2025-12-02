async function loadStats() {
    try {
        const res = await fetch("https://api.two.lt/stats");
        const data = await res.json();

        document.getElementById("stats_users").innerText = data.users;
        document.getElementById("stats_messages").innerText = data.messages;
        document.getElementById("stats_photos").innerText = data.photos;
        document.getElementById("stats_friends").innerText = data.friends;
    } catch (err) {
        console.error("Nepavyko gauti statistikos:", err);
    }
}

loadStats();
