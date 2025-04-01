export function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function getInitials(name) {
    if (!name) return "";

    const nameParts = name.split(" ");

    const initials = nameParts
        .map((part) => part.charAt(0).toUpperCase())
        .join("");

    return initials;
}