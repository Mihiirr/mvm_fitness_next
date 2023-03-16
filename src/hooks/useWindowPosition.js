import { useState } from 'react';
import { useIsomorphicEffect } from './useIsomorficEffect';

export default function useWindowPosition(id) {
    const [animation, setAnimation] = useState(false);
    const isomorphicEffect = useIsomorphicEffect();

    isomorphicEffect(() => {
        function updatePosition() {
            const offetSetHeight = window.document.getElementById(id).offsetHeight;
            if (window.pageYOffset > offetSetHeight * 0.7) {
                setAnimation(true);
            }
        }
        window.addEventListener('scroll', updatePosition);
        updatePosition();
        return () => window.removeEventListener('scroll', updatePosition);
    }, [id]);
    return animation;
}