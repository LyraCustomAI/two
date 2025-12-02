export function clean(text) {
    if (!text) return "";
    return text
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .trim();
}
