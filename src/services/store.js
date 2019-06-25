function setItem(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
}

function getItem(key) {
    return JSON.parse(window.localStorage.getItem(key)) || [];
}

export {
    setItem,
    getItem
}