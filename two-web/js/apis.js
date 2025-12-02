const API_URL = "http://194.60.87.77:3000"; // tavo API IP ir port

export async function apiGet(path) {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}${path}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    return await res.json();
}

export async function apiPost(path, data) {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}${path}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return await res.json();
}
