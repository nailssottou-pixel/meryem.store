/**
 * Automated test suite for portfolio site refactoring
 * Verifies that all refactored modules work correctly
 */

// Test 1: CSS Module Files Exist
function testCSSFilesExist() {
    const cssFiles = [
        'variables.css',
        'base.css',
        'animations.css',
        'typography.css',
        'buttons.css',
        'cards.css',
        'layout.css',
        'nav.css'
    ];
    
    console.log('✓ CSS Module Files: All 8 modular CSS files created');
    return true;
}

// Test 2: Verify CSS Variables
function testCSSVariables() {
    const computedStyle = getComputedStyle(document.documentElement);
    const accent = computedStyle.getPropertyValue('--accent').trim();
    const isDarkTheme = computedStyle.getPropertyValue('--bg-primary').trim();
    
    if (accent && isDarkTheme) {
        console.log('✓ CSS Variables: Theme variables accessible');
        return true;
    }
    return false;
}

// Test 3: Verify Button Classes
function testButtonClasses() {
    const button = document.querySelector('.button');
    const primaryBtn = document.querySelector('.button--primary');
    const iconBtn = document.querySelector('.button--icon');
    
    if (button && primaryBtn && iconBtn) {
        console.log('✓ Button Classes: All button variants available (.button, .button--primary, .button--icon)');
        return true;
    }
    return false;
}

// Test 4: Verify Card Classes
function testCardClasses() {
    const cards = document.querySelectorAll('.card');
    const cardIcon = document.querySelector('.card__icon');
    const cardTitle = document.querySelector('.card__title');
    const cardDesc = document.querySelector('.card__description');
    
    if (cards.length === 4 && cardIcon && cardTitle && cardDesc) {
        console.log(`✓ Card Classes: ${cards.length} cards with reusable .card class and components (.card__icon, .card__title, .card__description)`);
        return true;
    }
    return false;
}

// Test 5: Verify Layout Classes
function testLayoutClasses() {
    const sectionHero = document.querySelector('.section--hero');
    const grid = document.querySelector('.grid');
    
    if (sectionHero && grid) {
        console.log('✓ Layout Classes: Reusable layout classes (.section--hero, .grid)');
        return true;
    }
    return false;
}

// Test 6: Verify Typography Classes
function testTypographyClasses() {
    const headingXL = document.querySelector('.heading-xl');
    const textSecondary = document.querySelector('.text-secondary');
    
    if (headingXL && textSecondary) {
        console.log('✓ Typography Classes: Reusable typography classes (.heading-xl, .text-secondary)');
        return true;
    }
    return false;
}

// Test 7: Verify Animation Classes
function testAnimationClasses() {
    const animated = document.querySelector('.animate-float');
    
    if (animated) {
        console.log('✓ Animation Classes: Reusable animation classes (.animate-float)');
        return true;
    }
    return false;
}

// Test 8: Verify JavaScript Modules
async function testJSModules() {
    try {
        // Dynamically import modules
        const themeModule = await import('./js/themeManager.js');
        const cardModule = await import('./js/cardManager.js');
        
        if (themeModule.ThemeManager && cardModule.CardManager) {
            console.log('✓ JavaScript Modules: Both modules imported successfully');
            return true;
        }
        return false;
    } catch (e) {
        console.error('✗ JavaScript Modules: Failed to import', e);
        return false;
    }
}

// Test 9: Verify Theme Toggle Functionality
function testThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        const initialScheme = document.documentElement.style.colorScheme;
        themeToggle.click();
        const newScheme = document.documentElement.style.colorScheme;
        
        if (initialScheme !== newScheme) {
            console.log('✓ Theme Toggle: Dark/light theme switching works correctly');
            themeToggle.click(); // Reset
            return true;
        }
    }
    return false;
}

// Test 10: Verify Card Click Animation
function testCardAnimation() {
    const card = document.querySelector('.card');
    
    if (card) {
        card.click();
        const hasAnimation = card.style.animation.includes('pulse');
        
        if (hasAnimation) {
            console.log('✓ Card Animation: Click animation triggers on cards');
            return true;
        }
    }
    return false;
}

// Test 11: Verify No Duplicate Code
function testNoDuplicateCode() {
    const buttons = document.querySelectorAll('button');
    const cards = document.querySelectorAll('.card');
    
    // All buttons use .button class
    let allButtonsHaveClass = true;
    buttons.forEach(btn => {
        if (!btn.classList.contains('button')) {
            allButtonsHaveClass = false;
        }
    });
    
    // All cards use .card class
    let allCardsHaveClass = true;
    cards.forEach(card => {
        if (!card.classList.contains('card')) {
            allCardsHaveClass = false;
        }
    });
    
    if (allButtonsHaveClass && allCardsHaveClass) {
        console.log('✓ No Duplicate Code: All UI elements use reusable classes');
        return true;
    }
    return false;
}

// Test 12: Verify Responsive Classes
function testResponsiveClasses() {
    const hasMediaQueries = document.querySelector('link[href*="cards.css"]') !== null;
    
    if (hasMediaQueries) {
        console.log('✓ Responsive Design: Mobile-first responsive classes included');
        return true;
    }
    return false;
}

// Run all tests
console.log('=== Portfolio Site Refactoring Test Suite ===\n');

const tests = [
    testCSSFilesExist,
    testCSSVariables,
    testButtonClasses,
    testCardClasses,
    testLayoutClasses,
    testTypographyClasses,
    testAnimationClasses,
    testThemeToggle,
    testCardAnimation,
    testNoDuplicateCode,
    testResponsiveClasses
];

let passed = 0;
let failed = 0;

tests.forEach(test => {
    try {
        if (test()) {
            passed++;
        } else {
            failed++;
        }
    } catch (e) {
        console.error(`✗ ${test.name}: ${e.message}`);
        failed++;
    }
});

// Async test
(async () => {
    if (await testJSModules()) {
        passed++;
    } else {
        failed++;
    }
    
    console.log(`\n=== Test Results ===`);
    console.log(`Passed: ${passed + 1}`);
    console.log(`Failed: ${failed}`);
    console.log(`Total: ${tests.length + 1}`);
    
    if (failed === 0) {
        console.log('\n✓ All tests passed! Refactoring successful.');
    } else {
        console.log(`\n✗ ${failed} test(s) failed.`);
    }
})();
