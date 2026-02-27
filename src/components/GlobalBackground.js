import React, { useEffect, useRef } from 'react';
import './GlobalBackground.css';

/**
 * GlobalBackground component handles persistent background effects:
 * 1. Global mouse-following glow circle.
 * 2. Floating decorative orbs.
 * 3. Animated background particles (dots).
 */
const GlobalBackground = () => {
    const glowRef = useRef(null);

    useEffect(() => {
        let rafId = null;
        let delayedX = 0;
        let delayedY = 0;
        let currentX = 0;
        let currentY = 0;

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            // Center the glow on the mouse (radius is 125px)
            currentX = clientX - 125;
            currentY = clientY - 125;
        };

        const animateGlow = () => {
            if (glowRef.current) {
                // Smooth interpolation with lag
                delayedX += (currentX - delayedX) * 0.05;
                delayedY += (currentY - delayedY) * 0.05;
                glowRef.current.style.transform = `translate3d(${delayedX}px, ${delayedY}px, 0)`;
            }
            rafId = requestAnimationFrame(animateGlow);
        };

        window.addEventListener('mousemove', handleMouseMove);
        rafId = requestAnimationFrame(animateGlow);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div className="global-background-system" aria-hidden="true">
            {/* Mouse follow glow */}
            <div className="global-cursor-glow" ref={glowRef}></div>

            {/* Background Texture/Dots Overlay */}
            <div className="global-dots-overlay"></div>
        </div>
    );
};

export default GlobalBackground;
