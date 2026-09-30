const THEMES = {
    sky: {
        name: "Sky 🩵",
        bg: "#eaf7ff",
        card: "#ffffff",
        text: "#30445a",
        muted: "#7890a5",
        primary: "#78c8ee",
        secondary: "#f5b9d0",
        border: "#d5eaf5",
        nav: "#ffffff"
    },

    deepBlue: {
        name: "Deep Blue 💙",
        bg: "#101c35",
        card: "#182846",
        text: "#e9f2ff",
        muted: "#9db1cf",
        primary: "#4d8dff",
        secondary: "#7b6cff",
        border: "#2b4066",
        nav: "#14233f"
    },

    black: {
        name: "Black 🖤",
        bg: "#0d0d0f",
        card: "#18181b",
        text: "#f3f3f3",
        muted: "#a1a1aa",
        primary: "#ffffff",
        secondary: "#52525b",
        border: "#29292e",
        nav: "#111113"
    },

    redBlack: {
        name: "Red & Black ❤️🖤",
        bg: "#100b0d",
        card: "#1b1114",
        text: "#f8eeee",
        muted: "#b89ca2",
        primary: "#e5485d",
        secondary: "#8f2638",
        border: "#3a1d25",
        nav: "#140d10"
    },

    lavenderNight: {
        name: "Lavender Night 💜",
        bg: "#171329",
        card: "#241d3b",
        text: "#f2edff",
        muted: "#b5a9d0",
        primary: "#a78bfa",
        secondary: "#d09cff",
        border: "#3a3057",
        nav: "#1d1732"
    },

    mint: {
        name: "Mint 🍃",
        bg: "#eafaf5",
        card: "#ffffff",
        text: "#29483f",
        muted: "#78978e",
        primary: "#69c9a7",
        secondary: "#a9e5d0",
        border: "#d0eee3",
        nav: "#ffffff"
    },

    peach: {
        name: "Peach 🍑",
        bg: "#fff3ed",
        card: "#ffffff",
        text: "#59423b",
        muted: "#a58b80",
        primary: "#f3a27d",
        secondary: "#f4bfd0",
        border: "#f4ddd2",
        nav: "#ffffff"
    },

    ocean: {
        name: "Ocean 🌊",
        bg: "#e7f8fb",
        card: "#ffffff",
        text: "#214451",
        muted: "#6e929d",
        primary: "#35b7c8",
        secondary: "#67aee8",
        border: "#ccebef",
        nav: "#ffffff"
    },

    cherry: {
        name: "Cherry 🍒",
        bg: "#fff0f3",
        card: "#ffffff",
        text: "#542b35",
        muted: "#9d707b",
        primary: "#c93655",
        secondary: "#ee9caf",
        border: "#f1d1d9",
        nav: "#ffffff"
    },

    coffee: {
        name: "Coffee ☕",
        bg: "#f4eee7",
        card: "#fffaf4",
        text: "#4c382c",
        muted: "#927c6d",
        primary: "#9b6b49",
        secondary: "#d2aa88",
        border: "#e5d6c8",
        nav: "#fffaf4"
    },

    cyber: {
        name: "Cyber 💠",
        bg: "#090d16",
        card: "#111827",
        text: "#e8f7ff",
        muted: "#8da4b8",
        primary: "#22d3ee",
        secondary: "#a855f7",
        border: "#243247",
        nav: "#0c1220"
    },

    midnightPurple: {
        name: "Midnight Purple 🌌",
        bg: "#0c0b18",
        card: "#17152b",
        text: "#eeeaff",
        muted: "#9e98b8",
        primary: "#8b7cff",
        secondary: "#c084fc",
        border: "#2c2747",
        nav: "#111022"
    },

    blackWhite: {
        name: "Black & White ⚪",
        bg: "#eeeeee",
        card: "#ffffff",
        text: "#171717",
        muted: "#737373",
        primary: "#171717",
        secondary: "#737373",
        border: "#d4d4d4",
        nav: "#ffffff"
    },

    sunset: {
        name: "Sunset 🌅",
        bg: "#fff0e8",
        card: "#fffaf7",
        text: "#4f3442",
        muted: "#987582",
        primary: "#ed8061",
        secondary: "#b978c9",
        border: "#f0d5d0",
        nav: "#fffaf7"
    }
};

const THEME_STORAGE_KEY = "yongqian_selected_theme";

function applyTheme(themeId) {
    const theme = THEMES[themeId];

    if (!theme) {
        applyTheme("sky");
        return;
    }

    const root = document.documentElement;

    root.style.setProperty("--bg", theme.bg);
    root.style.setProperty("--card", theme.card);
    root.style.setProperty("--text", theme.text);
    root.style.setProperty("--muted", theme.muted);
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--secondary", theme.secondary);
    root.style.setProperty("--border", theme.border);
    root.style.setProperty("--nav", theme.nav);

    localStorage.setItem(THEME_STORAGE_KEY, themeId);
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme && THEMES[savedTheme]) {
        applyTheme(savedTheme);
    } else {
        applyTheme("sky");
    }
}

loadSavedTheme();
