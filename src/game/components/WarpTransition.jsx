import { motion, AnimatePresence } from 'framer-motion';

/**
 * WarpTransition Component
 * Full-screen hyperspace jump effect between levels.
 */
export default function WarpTransition({ isActive, onComplete }) {
    return (
        <AnimatePresence onExitComplete={onComplete}>
            {isActive && (
                <motion.div
                    className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Radial streaks */}
                    <div className="absolute inset-0 warp-tunnel" />

                    {/* Whiteout flash */}
                    <motion.div
                        className="absolute inset-0 bg-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 1.5, times: [0, 0.4, 0.6, 1] }}
                    />

                    {/* CSS for warp streaks */}
                    <style jsx="true">{`
                        .warp-tunnel {
                            background: repeating-conic-gradient(
                                from 0deg,
                                transparent 0deg 10deg,
                                rgba(34, 211, 238, 0.8) 10deg 12deg,
                                transparent 12deg 20deg
                            );
                            animation: spin-warp 2s linear infinite;
                            transform: scale(2);
                            opacity: 0.5;
                            mix-blend-mode: screen;
                        }
                        
                        @keyframes spin-warp {
                            0% { transform: scale(1) rotate(0deg); opacity: 0; }
                            50% { opacity: 1; }
                            100% { transform: scale(4) rotate(180deg); opacity: 0; }
                        }
                    `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
