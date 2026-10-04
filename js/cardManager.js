/**
 * Card interaction module - eliminates duplicate animation/interaction logic
 * Handles card animations and event management
 */
export const CardManager = (() => {
    const PULSE_ANIMATION_CLASS = 'animate-pulse';
    const ANIMATION_DURATION = 500;
    
    /**
     * Add pulse animation to a card
     */
    function pulseCard(card) {
        card.style.animation = `${PULSE_ANIMATION_CLASS} 0.5s ease`;
        
        setTimeout(() => {
            card.style.animation = '';
        }, ANIMATION_DURATION);
    }
    
    /**
     * Initialize card interactions on a selector
     */
    function initCards(selector) {
        const cards = document.querySelectorAll(selector);
        cards.forEach(card => {
            card.addEventListener('click', () => pulseCard(card));
        });
    }
    
    return { initCards, pulseCard };
})();
