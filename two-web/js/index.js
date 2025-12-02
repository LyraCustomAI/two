const API_URL = "http://194.60.87.77:3000";

// === 1) Gauti user info (kairė mini anketa)
async function loadUser() {
    const token = localStorage.getItem("token");
    if (!token) return; // jei anon - rodo DEMO layout

    const res = await fetch(`${API_URL}/auth/me`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    const u = await res.json();

    // 1:1 tavo HTML elementai
    document.querySelector(".profile_mini_name").innerText = u.display_name;
    document.querySelector(".profile_mini_info").innerText = `${u.age} m., ${u.city}`;
    if (u.avatar) document.querySelector(".profile_mini_photo").src = u.avatar;
}

// === 2) Statistika (tavo kairė/vidurys)
async function loadStats() {
    const res = await fetch(`${API_URL}/stats`);
    const s = await res.json();

    document.querySelectorAll(".stat_item .stat_value")[0].innerText = s.users;
    document.querySelectorAll(".stat_item .stat_value")[1].innerText = s.photos;
    document.querySelectorAll(".stat_item .stat_value")[2].innerText = s.messages;
    document.querySelectorAll(".stat_item .stat_value")[3].innerText = s.online; // jei darysi
}

// === 3) Naujausi nariai (pagrindinis blokas)
async function loadNewUsers() {
    const res = await fetch(`${API_URL}/users/latest?limit=12`);
    const list = await res.json();

    const box = document.getElementById("new_users");
    box.innerHTML = "";

    list.forEach(u => {
        const el = document.createElement("a");
        el.href = `profile.html?id=${u.id}`;
        el.className = "avatar";

        el.innerHTML = `
            <img src="${u.avatar || "img/avatars/default.png"}">
            <span>${u.display_name}</span>
        `;
        box.appendChild(el);
    });
}

loadUser();
loadStats();
loadNewUsers();
