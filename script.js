const messages = [
    "Они видят тебя...",
    "Не оборачивайся...",
    "Кто-то рядом...",
    "Сигнал нестабилен...",
    "Ты следующий...",
    "Охота началась...",
    "Беги..."
];

let i = 0;
setInterval(() => {
    document.getElementById("status").innerText =
        messages[Math.floor(Math.random() * messages.length)];
}, 2000);
