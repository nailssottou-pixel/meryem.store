/**
 * Theme management module - eliminates duplicate theme toggle logic
 * Handles localStorage, system preferences, and DOM updates
 */
export const ThemeManager = (() => {
    const STORAGE_KEY = 'theme';
    const DARK_SCHEME = 'dark';
    const LIGHT_SCHEME = 'light';
    
    /**
     * Get initial theme preference from localStorage or system
     */
    function getInitialTheme() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return saved === DARK_SCHEME ? DARK_SCHEME : LIGHT_SCHEME;
        
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? DARK_SCHEME : LIGHT_SCHEME;
    }
    
    /**
     * Apply theme to the document
     */
    function applyTheme(theme) {
        document.documentElement.style.colorScheme = theme;
        localStorage.setItem(STORAGE_KEY, theme);
    }
    
    /**
     * Get icon for current theme
     */
    function getThemeIcon(theme) {
        return theme === DARK_SCHEME ? '☀️' : '🌙';
    }
    
    /**
     * Initialize theme on page load
     */
    function init(toggleElementId) {
        const theme = getInitialTheme();
        applyTheme(theme);
        
        const toggle = document.getElementById(toggleElementId);
        if (toggle) {
            toggle.textContent = getThemeIcon(theme);
            toggle.addEventListener('click', () => handleToggle(toggle));
        }
    }
    
    /**
     * Handle theme toggle click
     */
    function handleToggle(toggleElement) {
        const isDark = document.documentElement.style.colorScheme === DARK_SCHEME;
        const newTheme = isDark ? LIGHT_SCHEME : DARK_SCHEME;
        
        applyTheme(newTheme);
        toggleElement.textContent = getThemeIcon(newTheme);
    }
    
    return { init };
})();
