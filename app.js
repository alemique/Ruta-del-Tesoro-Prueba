// --- CONFIGURACIÓN DEL BACKEND ---
// URL actualizada para incluir la función del ranking.
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbym5-onTOyzlqZn_G4O-5acxAZzReYjIOY5SF8tBh3TtT2jEFVw6IZ2MMMtkHGtRl0F/exec';

// --- DATOS REDUCIDOS DEL EVENTO PARA LA VERSIÓN DE PRUEBA ---
// Se han seleccionado 4 misiones, 1 desafío y 1 bonus específicos para la versión de prueba.
const eventData = [
    // SANTA LUCÍA - Misión 1 (Original ID 1)
    {
        id: 1, department: "Santa Lucía", location: "Parroquia Santa Lucía",
        anchor: { missionName: "Ancla: Vestigios del Sismo", enabler: "Consigna: Busquen el año del catastrófico terremoto que destruyó el 'hermoso templo colonial'.\nPista: Este evento marcó un antes y después en la arquitectura de toda la provincia.", enablerKeyword: "1944", transmission: "Guardián, detecto una cicatriz profunda en la línea de tiempo de este lugar sagrado. Debes anclar el año del evento que lo cambió todo para estabilizarla.", tutorialDescription: "El **Ancla Temporal** es la información clave que debes encontrar en el lugar. Ingrésala para avanzar en la misión." },
        trivia: { missionName: "Trivia: El Templo de 1900", challenge: { question: "¿En qué año fue inaugurado el templo de estilo ecléctico que reemplazó a la primera capilla?", options: ["1894", "1900", "1944", "1964"], correctAnswer: "1900", tutorialDescription: "En la **Trivia**, tu velocidad en responder correctamente te dará más **Fragmentos de Historia**. ¡Elige con sabiduría!" } },
        nextMissionId: 8 // Enlace a la siguiente misión de la versión de prueba
    },
    // SANTA LUCÍA - Misión 2 (Original ID 8)
    {
        id: 8, department: "Santa Lucía", location: "Plaza General San Martín",
        anchor: { missionName: "Ancla: La Renovación del Encuentro", enabler: "Consigna: Hallen el año en que la plaza fue totalmente remodelada, con motivo del 152° aniversario.\nPista: Se agregó Wi-Fi público y se descubrió una placa conmemorativa.", enablerKeyword: "2021", transmission: "Los espacios evolucionan para seguir uniendo a las personas. Ancla el año de la gran transformación de este punto de encuentro.", tutorialDescription: "Esta es la descripción del Ancla en la misión 2." },
        trivia: { missionName: "Trivia: Tradición Decembrina", challenge: { question: "¿Qué importante evento anual, que dura tres noches, se celebra en esta plaza cada diciembre?", options: ["El Festival del Sol", "El Aniversario de Santa Lucía", "La Fiesta Nacional de Santa Lucía", "La Feria de las Colectividades"], correctAnswer: "La Fiesta Nacional de Santa Lucía", tutorialDescription: "Esta es la descripción de la Trivia en la misión 2." } },
        nextMissionId: 16 // Enlace a la siguiente misión de la versión de prueba
    },
    // CAPITAL - Misión 3 (Original ID 16)
    {
        id: 16, department: "Capital", location: "Casa Natal de Sarmiento",
        anchor: { missionName: "Ancla: El Primer Monumento Nacional", enabler: "Consigna: Determinen el año en que esta casa se convirtió en el Primer Monumento Histórico Nacional del país.\nPista: Ocurrió por ley del Congreso y un año después abrió sus puertas como museo.", enablerKeyword: "1910", transmission: "Esta humilde casa fue la primera en recibir el máximo honor. Fija el año en que la Nación la declaró su primer monumento histórico.", tutorialDescription: "Esta es la descripción del Ancla en la misión 3." },
        trivia: { missionName: "Trivia: Sede de Gobierno", challenge: { question: "¿Qué función tuvo la casa durante el gobierno provincial de Sarmiento?", options: ["Escuela de primeras letras", "Biblioteca Pública", "Casa de Gobierno", "Cuartel militar"], correctAnswer: "Casa de Gobierno", tutorialDescription: "Esta es la descripción de la Trivia en la misión 3." } },
        nextMissionId: 32 // Enlace a la siguiente misión de la versión de prueba
    },
    // RIVADAVIA - Misión 4 (Original ID 32) - Esta será la última misión del demo antes del final.
    {
        id: 32, department: "Rivadavia", location: "Autódromo El Zonda",
        anchor: { missionName: "Ancla: La Categoría Reina", enabler: "Consigna: ¿Qué famosa categoría del automovilismo nacional ha tenido competencias memorables en este circuito a lo largo de su historia?\nPista: Es una de las más populares y antiguas de Argentina.", enablerKeyword: "Turismo Carretera", transmission: "Los ídolos más grandes del automovilismo argentino han derrapado en estas curvas. Ancla el nombre de la categoría más emblemática que ha corrido aquí.", tutorialDescription: "Esta es la descripción del Ancla en la misión 4." },
        trivia: { missionName: "Trivia: La Medida del Desafío", challenge: { question: "¿Qué longitud tiene el desafiante trazado de montaña de este circuito?", options: ["1.800 metros", "2.300 metros", "2.800 metros", "3.200 metros"], correctAnswer: "2.300 metros", tutorialDescription: "Esta es la descripción de la Trivia en la misión 4." } },
        nextMissionId: null // Marca como la última misión para el flujo normal
    },
];

// --- POOL DE EVENTOS DE DISTORSIÓN CON DISPARADORES ESPECÍFICOS (REDUCIDO) ---
const distortionEventsData = [
    {
        id: 'distorsion_2', // Seleccionamos solo este para la versión de prueba
        trigger: { onMissionComplete: 8 }, // Se disparará después de completar la misión con ID 8
        visual: { type: 'video', src: 'imagenes/AMENAZA.mp4' },
        challenge: {
            type: 'multiple_choice',
            title: "Estática Temporal",
            message: "No creas que un simple viaje te mantendrá a salvo. Siento tu presencia moviéndose por mis dominios. Cada paso que das... lo escucho. Pero seguro olvidaste esto:",
            question: "¿Con qué motivo se dispuso la creación del Parque de Mayo mediante la ley provincial sancionada el 17 de mayo de 1910?",
            options: [
                "Honrar al presidente Domingo F. Sarmiento",
                "Conmemorar el Centenario de la Revolución de Mayo",
                "Celebrar la fundación de la ciudad de San Juan",
                "Establecer la sede de la Feria Nacional del Vino"
            ],
            correctAnswer: "Conmemorar el Centenario de la Revolución de Mayo",
            bonusPoints: 30,
            penaltyPoints: 0,
            tutorialDescription: "Las **Distorsiones Temporales** son desafíos inesperados. Responde correctamente para ganar **Fragmentos**, o podrías perderlos."
        }
    }
];

// --- DATOS DE LAS MISIONES BONUS (REDUCIDO) ---
const bonusMissionData = { // Este es el bonus 'Portho'
    id: 'bonus_portho_1',
    triggerMissionId: 16, // Se disparará después de completar la misión con ID 16
    sponsorName: 'Portho Gelatto',
    title: 'Misión Bonus: El Sabor del Tiempo',
    logoSrc: 'imagenes/portho.jpg',
    description: 'Guardián, hemos detectado una anomalía placentera en Portho Gelatto. Tienes la oportunidad de desviarte de tu ruta para conseguir una recompensa masiva de 200 fragmentos. ¡Pero cuidado! El cronómetro principal no se detendrá. La decisión es tuya.',
    mapsLink: 'https://maps.app.goo.gl/htvnw6Dbowx1PEw46',
    challenge: {
        question: 'Portho tiene un famoso sabor que refleja un dulce muy característico de San Juan. ¿Cuál es?',
        options: ['Uva', 'Pistacho', 'Membrillo', 'Dulce de Leche'],
        correctAnswer: 'Membrillo',
        points: 200,
        tutorialDescription: "Las **Misiones Bonus** te ofrecen una gran cantidad de **Fragmentos de Historia**. ¡Decide si el desvío vale el riesgo!"
    }
};

const allBonusData = [bonusMissionData]; // Solo incluimos el bonus 'Portho' para esta versión.


// --- FUNCIONES GLOBALES DE AYUDA ---
const formatTime = (totalSeconds) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

const generarPistaDinamica = (respuesta) => {
    const respuestaSinEspacios = respuesta.replace(/ /g, '');
    const longitud = respuestaSinEspacios.length;
    let cantidadARevelar;

    if (longitud <= 4) {
        cantidadARevelar = 1;
    } else if (longitud <= 8) {
        cantidadARevelar = 2;
    } else if (longitud <= 12) {
        cantidadARevelar = 3;
    } else {
        cantidadARevelar = 4;
    }

    const indicesLetras = [];
    respuesta.split('').forEach((char, index) => {
        if (char !== ' ') {
            indicesLetras.push(index);
        }
    });

    for (let i = indicesLetras.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indicesLetras[i], indicesLetras[j]] = [indicesLetras[j], indicesLetras[i]];
    }

    const indicesARevelar = new Set(indicesLetras.slice(0, cantidadARevelar));

    const pistaGenerada = respuesta.split('').map((char, index) => {
        if (char === ' ') {
            return ' ';
        }
        if (indicesARevelar.has(index)) {
            return char;
        }
        return '_';
    }).join('');

    return pistaGenerada;
};

const triggerVibration = (duration = 100) => {
    if ('vibrate' in navigator) {
        navigator.vibrate(duration);
    }
};

const playSound = (soundPath) => {
    const audio = new Audio(soundPath);
    audio.play().catch(e => console.error("Error al reproducir sonido:", e));
};

const playCorrectSound = () => {
    playSound('imagenes/sonidos/correct.wav');
};

const playWrongSound = () => {
    playSound('imagenes/sonidos/wrong.wav');
};

const animatePoints = (points, originElementId) => {
    const destination = document.getElementById('score-display');
    const origin = document.getElementById(originElementId);

    if (!destination || !origin) {
        console.error("Elemento de destino u origen no encontrado para la animación.");
        return;
    }

    const pointsFlyer = document.createElement('div');
    pointsFlyer.textContent = `+${points}`;
    
    pointsFlyer.style.position = 'fixed';
    pointsFlyer.style.zIndex = '10000';
    pointsFlyer.style.padding = '8px 16px';
    pointsFlyer.style.backgroundColor = 'var(--color-feedback-success, #27ae60)'; // Changed to success color
    pointsFlyer.style.color = '#FFFFFF';
    pointsFlyer.style.fontWeight = 'bold';
    pointsFlyer.style.fontSize = '1.5rem';
    pointsFlyer.style.borderRadius = '20px';
    pointsFlyer.style.border = '2px solid #FFFFFF';
    pointsFlyer.style.boxShadow = '0 0 15px rgba(0,0,0,0.5)';
    pointsFlyer.style.pointerEvents = 'none';
    pointsFlyer.style.transform = 'translate(-50%, -50%)';

    document.body.appendChild(pointsFlyer);

    const destRect = destination.getBoundingClientRect();
    const originRect = origin.getBoundingClientRect();

    const startX = window.innerWidth / 2;
    const startY = originRect.top + originRect.height / 2;

    const endX = destRect.left + destRect.width / 2;
    const endY = destRect.top + destRect.height / 2;

    gsap.fromTo(pointsFlyer, 
        { 
            left: startX, 
            top: startY, 
            scale: 0,
            opacity: 0,
        }, 
        { 
            scale: 1.2,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            onComplete: () => {
                gsap.to(pointsFlyer, {
                    left: endX,
                    top: endY,
                    scale: 0.1,
                    opacity: 0,
                    duration: 1.0,
                    ease: 'power1.in',
                    delay: 0.4,
                    onComplete: () => {
                        pointsFlyer.remove();
                    }
                });
            }
        }
    );
};

async function sendResultsToBackend(data) {
    // Disabled for demo version
    console.warn("Versión de prueba: El envío de resultados al backend está deshabilitado.");
    return;
}

async function sendBonusResultToBackend(data) {
    // Disabled for demo version
    console.warn("Versión de prueba: El envío de resultados de bonus al backend está deshabilitado.");
    return;
}

// --- NEW: TUTORIAL OVERLAY COMPONENT ---
const TutorialOverlay = ({ message, targetId, onNext, onDismiss, currentStep, totalSteps, alignment = 'bottom' }) => {
    const [position, setPosition] = React.useState({ top: 0, left: 0 });
    const popupRef = React.useRef(null);
    const hasPositioned = React.useRef(false); // To prevent repositioning on every render

    React.useLayoutEffect(() => {
        const targetElement = document.getElementById(targetId);
        if (!targetElement || !popupRef.current || hasPositioned.current) return;

        const targetRect = targetElement.getBoundingClientRect();
        const popupRect = popupRef.current.getBoundingClientRect();

        let top = 0;
        let left = 0;

        // Calculate position based on alignment
        switch (alignment) {
            case 'bottom': // Default: popup below target
                top = targetRect.bottom + 20;
                left = targetRect.left + (targetRect.width / 2) - (popupRect.width / 2);
                break;
            case 'top': // popup above target
                top = targetRect.top - popupRect.height - 20;
                left = targetRect.left + (targetRect.width / 2) - (popupRect.width / 2);
                break;
            case 'left': // popup to the left of target
                top = targetRect.top + (targetRect.height / 2) - (popupRect.height / 2);
                left = targetRect.left - popupRect.width - 20;
                break;
            case 'right': // popup to the right of target
                top = targetRect.top + (targetRect.height / 2) - (popupRect.height / 2);
                left = targetRect.right + 20;
                break;
            case 'center': // popup centered on target, mainly for full screen or modals
                top = targetRect.top + (targetRect.height / 2) - (popupRect.height / 2);
                left = targetRect.left + (targetRect.width / 2) - (popupRect.width / 2);
                break;
        }

        // Adjust for viewport boundaries
        if (left < 10) left = 10;
        if (left + popupRect.width > window.innerWidth - 10) {
            left = window.innerWidth - popupRect.width - 10;
        }
        if (top < 10) top = 10;
        if (top + popupRect.height > window.innerHeight - 10) {
            top = window.innerHeight - popupRect.height - 10;
        }
        
        setPosition({ top: top + window.scrollY, left: left + window.scrollX });
        hasPositioned.current = true; // Mark as positioned
    }, [targetId, message, alignment]); // Recalculate if target or message changes

    // Scroll to target if it's off-screen
    React.useEffect(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [targetId]);

    const handleNextClick = () => {
        hasPositioned.current = false; // Allow repositioning for the next step
        onNext();
    };

    return ReactDOM.createPortal(
        <div className="tutorial-overlay">
            <div className="tutorial-backdrop" onClick={onDismiss}></div>
            <div ref={popupRef} className={`tutorial-popup tutorial-arrow-${alignment}`}>
                <div className="tutorial-message" dangerouslySetInnerHTML={{ __html: message }}></div>
                <div className="tutorial-controls">
                    {totalSteps && <span className="tutorial-step-counter">{currentStep} / {totalSteps}</span>}
                    <button className="tutorial-next-button" onClick={handleNextClick}>Siguiente</button>
                    <button className="tutorial-dismiss-button" onClick={onDismiss}>Omitir Tutorial</button>
                </div>
            </div>
        </div>,
        document.body
    );
};


// --- REACT COMPONENTS ---

const DistortionEventPage = ({ event, onComplete, tutorialActive, handleNextTutorialStep, handleDismissTutorial, tutorialStep }) => {
    const [view, setView] = React.useState('visual');
    const videoRef = React.useRef(null);
    const [videoPlaying, setVideoPlaying] = React.useState(false);
    const [autoplayBlocked, setAutoplayBlocked] = React.useState(false);

    React.useEffect(() => {
        if (view !== 'visual' || !videoRef.current) return;

        videoRef.current.play()
            .then(() => {
                setVideoPlaying(true);
                setAutoplayBlocked(false);
            })
            .catch(e => {
                console.warn("Autoplay bloqueado o error de reproducción:", e);
                setAutoplayBlocked(true);
                setVideoPlaying(false);
            });
        
        const currentVideoRef = videoRef.current;
        const handleEnded = () => {
            setView('challenge');
            if(tutorialActive && tutorialStep === 11) { // Tutorial step for video end
                 handleNextTutorialStep();
            }
        };
        currentVideoRef.addEventListener('ended', handleEnded);

        return () => {
            if (currentVideoRef) {
                currentVideoRef.removeEventListener('ended', handleEnded);
            }
        };
    }, [event, view, tutorialActive, tutorialStep, handleNextTutorialStep]);

    const handlePlayVideo = () => {
        if (videoRef.current) {
            videoRef.current.play().then(() => {
                setVideoPlaying(true);
                setAutoplayBlocked(false);
                if(tutorialActive && tutorialStep === 10) { // Tutorial step for play button
                    handleNextTutorialStep();
                }
            }).catch(e => console.error("Error al reproducir video manualmente:", e));
        }
    };

    const ChallengeRenderer = () => {
        const { challenge } = event;
        const [feedback, setFeedback] = React.useState({ message: '', type: '' });
        const [isLocked, setIsLocked] = React.useState(false);
        const [answer, setAnswer] = React.useState('');
        const [selectedOption, setSelectedOption] = React.useState('');
        const [timer, setTimer] = React.useState(challenge.timeLimit || 0);

        React.useEffect(() => {
            if (challenge.type !== 'corrupt_transmission' || isLocked) return;
            if (timer <= 0) {
                handleSubmit(true); return;
            }
            const interval = setInterval(() => setTimer(t => t > 0 ? t - 1 : 0), 1000);
            return () => clearInterval(interval);
        }, [timer, isLocked]);

        React.useEffect(() => {
            if(tutorialActive && tutorialStep === 12) { // Tutorial step for challenge question
                 handleNextTutorialStep();
            }
        }, [tutorialActive, tutorialStep, handleNextTutorialStep]);

        const handleSubmit = (isTimeout = false) => {
            if (isLocked) return;
            setIsLocked(true);
            const isCorrect = !isTimeout && answer.trim() === challenge.correctAnswer;
            const points = isCorrect ? challenge.bonusPoints : (isTimeout ? challenge.penaltyPoints : 0);
            const message = isCorrect
                ? `✔️ Señal recuperada. ¡Has ganado ${points} Fragmentos extra!`
                : (isTimeout
                    ? `❌ ¡Tiempo agotado! La Amenaza te ha costado ${Math.abs(points)} Fragmentos.`
                    : '❌ Respuesta incorrecta. La conexión se perdió.');

            setFeedback({ message, type: isCorrect ? 'success' : 'error' });

            if (isCorrect) playCorrectSound();
            else playWrongSound();

            setTimeout(() => {
                onComplete({ points });
                if(tutorialActive) handleDismissTutorial(); // End tutorial after challenge
            }, 3000);
        };
        
        const handleMultipleChoiceSubmit = () => {
            if (isLocked || !selectedOption) return;
            setIsLocked(true);
            const isCorrect = selectedOption === challenge.correctAnswer;
            const points = isCorrect ? challenge.bonusPoints : challenge.penaltyPoints;
            const message = isCorrect 
                ? `✔️ ¡Memoria intacta! Recuperas ${points} Fragmentos.` 
                : `❌ Respuesta incorrecta. No has recuperado fragmentos.`;
            
            setFeedback({ message, type: isCorrect ? 'success' : 'error' });
            
            if (isCorrect) playCorrectSound();
            else playWrongSound();

            setTimeout(() => {
                onComplete({ points });
                if(tutorialActive) handleDismissTutorial(); // End tutorial after challenge
            }, 3000);
        };

        const handleNarrativeContinue = () => {
             if (isLocked) return;
             setIsLocked(true);
             onComplete({ points: 0 });
             if(tutorialActive) handleDismissTutorial(); // End tutorial after narrative
        }

        switch (challenge.type) {
            case 'corrupt_transmission':
                return (
                    <div className="distortion-container">
                        <h3>{challenge.title}</h3>
                        <p>{challenge.message}</p>
                        <div className="distortion-timer">⏳ {timer}s</div>
                        <p id="distortion-challenge-question" className="distortion-challenge-text">{challenge.question}</p>
                        <input id="distortion-challenge-input" type="text" placeholder="Último dígito" value={answer} onChange={(e) => setAnswer(e.target.value)} disabled={isLocked} />
                        <button id="distortion-submit-button" className="primary-button" onClick={() => handleSubmit(false)} disabled={isLocked}>RESPONDER</button>
                        {feedback.message && <p className={`feedback ${feedback.type}`}>{feedback.message}</p>}
                        {tutorialActive && tutorialStep === 12 && (
                            <TutorialOverlay
                                message={event.challenge.tutorialDescription}
                                targetId="distortion-challenge-question"
                                onNext={handleNextTutorialStep}
                                onDismiss={handleDismissTutorial}
                                currentStep={tutorialStep}
                                totalSteps={13} // Assuming total steps for distortion are 3 (visual, question, button)
                                alignment="bottom"
                            />
                        )}
                        {tutorialActive && tutorialStep === 13 && (
                            <TutorialOverlay
                                message="Ingresa tu respuesta en el campo y presiona **Responder**."
                                targetId="distortion-submit-button"
                                onNext={handleNextTutorialStep} // Final step for distortion, then it dismisses.
                                onDismiss={handleDismissTutorial}
                                currentStep={tutorialStep}
                                totalSteps={13}
                                alignment="top"
                            />
                        )}
                    </div>
                );
            case 'multiple_choice':
                return (
                    <div className="distortion-container">
                        <h3>{challenge.title}</h3>
                        <p>{challenge.message}</p>
                        <p id="distortion-challenge-question" className="distortion-challenge-text">{challenge.question}</p>
                        <ul className="trivia-options">
                            {challenge.options.map((option, index) => (
                                <li 
                                    key={option} 
                                    id={`distortion-option-${index}`} 
                                    className={selectedOption === option ? 'selected' : ''} 
                                    onClick={() => !isLocked && setSelectedOption(option)}
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                        <button id="distortion-submit-button" className="primary-button" onClick={handleMultipleChoiceSubmit} disabled={isLocked || !selectedOption}>
                            VERIFICAR
                        </button>
                        {feedback.message && <p className={`feedback ${feedback.type}`}>{feedback.message}</p>}
                        {tutorialActive && tutorialStep === 12 && (
                            <TutorialOverlay
                                message={event.challenge.tutorialDescription}
                                targetId="distortion-challenge-question"
                                onNext={handleNextTutorialStep}
                                onDismiss={handleDismissTutorial}
                                currentStep={tutorialStep}
                                totalSteps={13}
                                alignment="bottom"
                            />
                        )}
                        {tutorialActive && tutorialStep === 13 && (
                            <TutorialOverlay
                                message="Selecciona la opción correcta y presiona **Verificar**."
                                targetId="distortion-submit-button"
                                onNext={handleNextTutorialStep} // Final step for distortion, then it dismisses.
                                onDismiss={handleDismissTutorial}
                                currentStep={tutorialStep}
                                totalSteps={13}
                                alignment="top"
                            />
                        )}
                    </div>
                );
            case 'narrative_echo':
                    return (
                            <div className="distortion-container">
                                    <h3>{challenge.title}</h3>
                                    <p id="distortion-narrative-text" className="distortion-narrative-text">{challenge.message}</p>
                                    <button id="distortion-narrative-button" className="primary-button" onClick={handleNarrativeContinue} disabled={isLocked}>CONTINUAR MISIÓN...</button>
                                    {tutorialActive && tutorialStep === 12 && (
                                        <TutorialOverlay
                                            message={event.challenge.tutorialDescription}
                                            targetId="distortion-narrative-text"
                                            onNext={handleNextTutorialStep}
                                            onDismiss={handleDismissTutorial}
                                            currentStep={tutorialStep}
                                            totalSteps={13}
                                            alignment="bottom"
                                        />
                                    )}
                                    {tutorialActive && tutorialStep === 13 && (
                                        <TutorialOverlay
                                            message="Presiona **Continuar Misión** para seguir adelante."
                                            targetId="distortion-narrative-button"
                                            onNext={handleNextTutorialStep} // Final step for distortion, then it dismisses.
                                            onDismiss={handleDismissTutorial}
                                            currentStep={tutorialStep}
                                            totalSteps={13}
                                            alignment="top"
                                        />
                                    )}
                            </div>
                    );
            default:
                onComplete({ points: 0 });
                return null;
        }
    };

    return (
        <div className="amenaza-modal-overlay">
            <div className="amenaza-modal-content">
                {view === 'visual' && event.visual.type === 'video' && (
                    <>
                        <video ref={videoRef} id="amenaza-visual-element" className="amenaza-visual" src={event.visual.src} autoPlay playsInline />
                        {autoplayBlocked && (
                            <button id="video-play-button" className="video-play-button" onClick={handlePlayVideo}>
                                ▶️ Activar Video / Sonido
                            </button>
                        )}
                        {!videoPlaying && !autoplayBlocked && (
                            <p className="video-loading-message">Cargando video...</p>
                        )}
                        {tutorialActive && tutorialStep === 10 && (
                            <TutorialOverlay
                                message="¡Alerta! Una **Distorsión Temporal** interrumpe tu viaje. Si el video no inicia, actívalo."
                                targetId={autoplayBlocked ? "video-play-button" : "amenaza-visual-element"}
                                onNext={handleNextTutorialStep}
                                onDismiss={handleDismissTutorial}
                                currentStep={tutorialStep}
                                totalSteps={13} // Total steps for distortion tutorial
                                alignment={autoplayBlocked ? "top" : "bottom"}
                            />
                        )}
                        {tutorialActive && tutorialStep === 11 && (
                            <TutorialOverlay
                                message="El video contiene información o una amenaza. Presta atención y espera a que termine."
                                targetId="amenaza-visual-element"
                                onNext={handleNextTutorialStep}
                                onDismiss={handleDismissTutorial}
                                currentStep={tutorialStep}
                                totalSteps={13}
                                alignment="bottom"
                            />
                        )}
                    </>
                )}
                {view === 'visual' && event.visual.type === 'image' && (
                    <>
                        <img id="amenaza-visual-element" className="amenaza-visual" src={event.visual.src} alt="Interrupción de la Amenaza" />
                        {tutorialActive && tutorialStep === 10 && (
                            <TutorialOverlay
                                message="¡Alerta! Una **Distorsión Temporal** interrumpe tu viaje. Observa la imagen para el desafío."
                                targetId="amenaza-visual-element"
                                onNext={handleNextTutorialStep}
                                onDismiss={handleDismissTutorial}
                                currentStep={tutorialStep}
                                totalSteps={13}
                                alignment="bottom"
                            />
                        )}
                        {tutorialActive && tutorialStep === 11 && (
                            <TutorialOverlay
                                message="Esta imagen es parte del desafío. Una vez que la hayas visto, espera al siguiente paso."
                                targetId="amenaza-visual-element"
                                onNext={handleNextTutorialStep}
                                onDismiss={handleDismissTutorial}
                                currentStep={tutorialStep}
                                totalSteps={13}
                                alignment="bottom"
                            />
                        )}
                    </>
                )}
                {view === 'challenge' && <ChallengeRenderer />}
            </div>
        </div>
    );
};


const Header = ({ teamName, score, timer }) => (
    <div className="header">
        <div className="header-info">
            <span className="team-name">{teamName || "Escuadrón Desconocido"}</span>
            <span className="team-title">GUARDIANES DEL TIEMPO</span>
        </div>
        <div className="header-score">
            <span id="score-display" className="score">{score} FRAGMENTOS</span>
            <span id="timer-display" className="timer">⏳ {formatTime(timer)}</span>
        </div>
    </div>
);

const LoginPage = ({ onLogin, setErrorMessage, errorMessage }) => {
    const [squadCode, setSquadCode] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const logoUrl = "imagenes/LOGO 3 (1).png";

    const handleLoginInternal = async () => {
        const enteredCode = squadCode.trim().toUpperCase();
        if (!enteredCode || isLoading) return;

        setIsLoading(true);
        setErrorMessage('');

        const isValid = true;
        const isAdmin = false;

        if (isValid) {
            onLogin(enteredCode, enteredCode, isAdmin);
        } else {
            setErrorMessage('⚠️ Código de Guardián no válido. Verifica tus credenciales.');
        }
        setIsLoading(false);
    };

    return (
        <div className="login-container">
            <img src={logoUrl} alt="Logo Guardianes del Tiempo" className="logo" onError={(e) => { e.target.onerror = null; e.target.src="https://i.imgur.com/ZKiX1mO.png"; }} />
            <h1>RUTA DEL TESORO:<br/>GUARDIANES DEL TIEMPO</h1>
            <p className="lema">"¡El legado de San Juan te necesita! ¿Aceptas la misión?"</p>
            <label htmlFor="squadCode">Código de Guardián:</label>
            <input 
                id="squadCode" 
                type="text" 
                placeholder="Ingresa tu código de Guardián" 
                value={squadCode} 
                onChange={(e) => setSquadCode(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && handleLoginInternal()} 
                disabled={isLoading}
            />
            <button 
                id="activate-button" 
                className="primary-button" 
                onClick={handleLoginInternal} 
                disabled={isLoading}
            >
                {isLoading ? 'VERIFICANDO...' : 'ACTIVAR GUÍA DEL TIEMPO'}
            </button>
            <div className="sponsors-section">
                <h2 className="sponsors-title">ASISTENTES DEL TIEMPO</h2>
                <p className="sponsors-description">Recuerda visitar nuestros Asistentes del Tiempo, tendrán sorpresas y puntos bonus para vos.</p>
                <div className="sponsors-grid">
                    <div className="sponsor-item"><img src="imagenes/muni cap.png" alt="Logo Municipalidad de la Capital" className="sponsor-logo" /></div>
                    <div className="sponsor-item"><img src="imagenes/muni riv.png" alt="Logo Municipalidad de Rivadavia" className="sponsor-logo" /></div>
                    <div className="sponsor-item"><img src="imagenes/muni santa lucia.jpg" alt="Logo Municipalidad de Santa Lucía" className="sponsor-logo" /></div>
                    <div className="sponsor-item"><img src="imagenes/portho.jpg" alt="Logo Portho Gelatto" className="sponsor-logo" /></div>
                    <div className="sponsor-item"><img src="imagenes/paseolib.png" alt="Logo Paseo Libre" className="sponsor-logo" /></div>
                    <div className="sponsor-item"><img src="imagenes/mandina.png" alt="Logo Mandina" className="sponsor-logo" /></div>
                    <div className="sponsor-item"><img src="imagenes/lavene.png" alt="Logo La Vene" className="sponsor-logo" /></div>
                    <div className="sponsor-item"><img src="imagenes/la profecia.jpg" alt="Logo La Profecía" className="sponsor-logo" /></div>
                    <div className="sponsor-item"><img src="imagenes/cocacola.png" alt="Logo Coca-Cola" className="sponsor-logo" /></div>
                </div>
            </div>
            <div className="organizers-section">
                <h2 className="organizers-title">ORGANIZADORES</h2>
                <p className="organizers-description">Estamos en cada punto de interés para acompañarte en este gran desafío.</p>
                <div className="organizer-logo-container">
                    <img src="imagenes/logoasv.jpg" alt="Logo ASV - Organizador" className="organizer-logo" />
                </div>
            </div>
            {errorMessage && <p className="feedback error" style={{ marginTop: '15px' }}>{errorMessage}</p>}
        </div>
    );
};

const WelcomePage = ({ teamName, onContinue, tutorialActive, handleNextTutorialStep, handleDismissTutorial, tutorialStep }) => {
    const [showContent, setShowContent] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    // Initial tutorial steps on welcome page
    React.useEffect(() => {
        if (showContent && tutorialActive && tutorialStep === 0) {
            handleNextTutorialStep(); // Trigger first tutorial step on welcome page
        }
    }, [showContent, tutorialActive, tutorialStep, handleNextTutorialStep]);

    return (
        <div className="welcome-container" style={{ opacity: showContent ? 1 : 0, transition: 'opacity 1s ease-in-out' }}>
            <img src="imagenes/welcome_portal.png" alt="Portal de Bienvenida" className="welcome-image"/>
            <h2>¡BIENVENIDO, GUARDIÁN <span className="team-name-welcome">{teamName}</span>!</h2>
            <p className="welcome-message">Tu Guía del Tiempo ha sido ACTIVADA. El legado de San Juan cuenta contigo para restaurar la línea temporal.</p>
            
            <p id="welcome-location-text" className="welcome-first-mission">Tu primera ancla te espera en:</p>
            <p className="welcome-location">📍 Parroquia Santa Lucía</p>
            <button id="start-mission-button" className="primary-button welcome-button" onClick={onContinue}>
                INICIAR
            </button>
            <p className="welcome-footer">Mantén tus sentidos alerta. Cada decisión cuenta.</p>

            {tutorialActive && tutorialStep === 1 && (
                <TutorialOverlay
                    message="Aquí verás los **Fragmentos de Historia** que recuperes. Son tus puntos, ¡acumula la mayor cantidad posible!"
                    targetId="score-display"
                    onNext={handleNextTutorialStep}
                    onDismiss={handleDismissTutorial}
                    currentStep={tutorialStep}
                    totalSteps={3}
                    alignment="bottom"
                />
            )}
            {tutorialActive && tutorialStep === 2 && (
                <TutorialOverlay
                    message="Este es tu **Tiempo Total** de misión. ¡Sé veloz! Cada segundo cuenta para tu ranking final."
                    targetId="timer-display"
                    onNext={handleNextTutorialStep}
                    onDismiss={handleDismissTutorial}
                    currentStep={tutorialStep}
                    totalSteps={3}
                    alignment="bottom"
                />
            )}
            {tutorialActive && tutorialStep === 3 && (
                <TutorialOverlay
                    message="Cuando estés listo para tu primera misión, presiona **Iniciar**."
                    targetId="start-mission-button"
                    onNext={handleNextTutorialStep} // This will increment step beyond total, stopping tutorial
                    onDismiss={handleDismissTutorial}
                    currentStep={tutorialStep}
                    totalSteps={3}
                    alignment="top"
                />
            )}
        </div>
    );
};


const EnRutaPage = ({ nextLocation, onArrival, department, onFinishEarly, tutorialActive, handleNextTutorialStep, handleDismissTutorial, tutorialStep }) => {
    const [isTraveling, setIsTraveling] = React.useState(true);
    React.useEffect(() => {
        const travelTimer = setTimeout(() => {
            setIsTraveling(false);
            if(tutorialActive && tutorialStep === 4) { // After travel time, show "arrival confirmed" button tutorial
                handleNextTutorialStep();
            }
        }, 10000);  
        return () => clearTimeout(travelTimer);
    }, [tutorialActive, tutorialStep, handleNextTutorialStep]);

    const getImageFileName = (locationName) => {
        return locationName.toLowerCase()
                                       .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                       .replace(/[^a-z0-9\s]/g, "")
                                       .replace(/\s+/g, "")
                                       .replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u')
                                       + '.png';
    };

    const imageSrc = `imagenes/${getImageFileName(nextLocation)}`;

    return (
        <div className="en-ruta-container">
            <img src={imageSrc} alt={`Viajando a ${nextLocation}`} className="portal-image" onError={(e) => { e.target.onerror = null; e.target.src='imagenes/VIAJANDO.png'; }} />
            <h3>VIAJANDO A TRAVÉS DEL TIEMPO...</h3>
            <p>Próxima Sincronización: <strong>{nextLocation}</strong> ({department})</p>
            <p className="progress-info">Sincronizando coordenadas temporales...</p>
            <div id="progress-bar-container" className="progress-bar-container"><div className="progress-bar-filler"></div></div>
            <p>¡Mantén el rumbo, Guardián! Evita las 'distorsiones temporales' (¡y las multas de tránsito!).</p>
            <button id="arrival-button" className="primary-button" onClick={onArrival} disabled={isTraveling}>{isTraveling ? 'SINCRONIZANDO...' : 'LLEGADA CONFIRMADA'}</button>
            <button className="finish-early-button" onClick={onFinishEarly}>Terminar Aquí</button>
            
            {tutorialActive && tutorialStep === 4 && (
                <TutorialOverlay
                    message="En esta pantalla, tu Guía del Tiempo te lleva a la siguiente ubicación. La barra indica el progreso."
                    targetId="progress-bar-container"
                    onNext={handleNextTutorialStep}
                    onDismiss={handleDismissTutorial}
                    currentStep={tutorialStep}
                    totalSteps={5}
                    alignment="bottom"
                />
            )}
            {tutorialActive && tutorialStep === 5 && (
                <TutorialOverlay
                    message="Cuando la barra de progreso esté completa, presiona **Llegada Confirmada** para iniciar el siguiente desafío."
                    targetId="arrival-button"
                    onNext={handleNextTutorialStep} // This will increment step beyond total for this page
                    onDismiss={handleDismissTutorial}
                    currentStep={tutorialStep}
                    totalSteps={5}
                    alignment="top"
                />
            )}
        </div>
    );
};

const LongTravelPage = ({ onArrival, nextDepartment, onFinishEarly, tutorialActive, handleNextTutorialStep, handleDismissTutorial, tutorialStep }) => {
    const [isTraveling, setIsTraveling] = React.useState(true);
    
    React.useEffect(() => {
        const travelTimer = setTimeout(() => {
            setIsTraveling(false);
            if(tutorialActive && tutorialStep === 4) { // After travel time, show "arrival confirmed" button tutorial
                handleNextTutorialStep();
            }
        }, 10000);

        return () => {
            clearTimeout(travelTimer);
        }
    }, [tutorialActive, tutorialStep, handleNextTutorialStep]);
    
    const imageUrl = nextDepartment === 'Capital' ? 'imagenes/VIAJANDO1.png' : nextDepartment === 'Rivadavia' ? 'imagenes/VIAJANDO2.png' : 'imagenes/VIAJANDO.png';
    return (
        <div className="en-ruta-container">
            <img src={imageUrl} alt={`Viajando a ${nextDepartment}`} className="portal-image" />
            <h3>HORA DE VIAJAR MÁS LEJOS</h3>
            <p>Rápido, debemos movernos a <strong>{nextDepartment}</strong>, han aparecido nuevos fragmentos de la historia que debemos recoger.</p>
            <p className="progress-info">Abriendo portal de largo alcance...</p>
            <div id="long-travel-progress-bar" className="progress-bar-container"><div className="progress-bar-filler"></div></div>
            <p style={{fontStyle: 'italic', fontSize: '0.9rem', opacity: 0.8}}>Es importante que respetes las señales de tránsito, hay controles secretos que pueden restarte puntos.</p>
            <button id="long-travel-arrival-button" className="primary-button" onClick={onArrival} disabled={isTraveling}>{isTraveling ? 'VIAJANDO...' : 'HEMOS LLEGADO'}</button>
            <button className="finish-early-button" onClick={onFinishEarly}>Terminar Aquí</button>

            {tutorialActive && tutorialStep === 4 && (
                <TutorialOverlay
                    message="Para viajes más largos, la barra de progreso te indicará cuánto falta para llegar a tu próximo departamento."
                    targetId="long-travel-progress-bar"
                    onNext={handleNextTutorialStep}
                    onDismiss={handleDismissTutorial}
                    currentStep={tutorialStep}
                    totalSteps={5}
                    alignment="bottom"
                />
            )}
            {tutorialActive && tutorialStep === 5 && (
                <TutorialOverlay
                    message="Cuando el viaje finalice, presiona **Hemos Llegado** para continuar con la misión."
                    targetId="long-travel-arrival-button"
                    onNext={handleNextTutorialStep}
                    onDismiss={handleDismissTutorial}
                    currentStep={tutorialStep}
                    totalSteps={5}
                    alignment="top"
                />
            )}
        </div>
    );
};

const EndGamePage = ({ score, finalTime, teamName }) => (
    <div className="end-container">
        <img src="https://cdn-icons-png.flaticon.com/512/784/784408.png" alt="Medalla o Trofeo Guardián" className="medal-image"/>
        <h3>¡MISIÓN TEMPORAL COMPLETADA, {teamName}!</h3>
        <p>Has estabilizado la línea del tiempo de San Juan. ¡La 'Amenaza del Olvido' ha sido contenida gracias a tu escuadrón!</p>
        <p id="final-fragments"><strong>Fragmentos de Historia Restaurados: {score}</strong></p>
        <p id="final-time"><strong>Tiempo Total de la Misión: {finalTime}</strong></p>
        <p>¡Has ganado tu Medalla "Guardián del Tiempo"! 🏅 Los "Custodios Mayores" y otros reconocimientos serán anunciados en el Concilio de Guardianes.</p>
        <p style={{fontSize: "0.9rem", marginTop: "20px"}}><em>No olvides compartir tu hazaña y prepararte para la celebración.</em></p>
        
        <Leaderboard />
    </div>
);

const AbortedGamePage = ({ score, finalTime, teamName }) => (
    <div className="end-container">
        <img src="https://cdn-icons-png.flaticon.com/512/784/784408.png" alt="Medalla o Trofeo Guardián" className="medal-image"/>
        <h3>MISIÓN TEMPORAL DETENIDA</h3>
        <p><strong>{teamName}</strong></p>
        <p>Has estabilizado sólo una parte del tiempo de San Juan. ¡La ´Amenaza del Olvido´ ha logrado avanzar en la línea del tiempo.</p>
        
        <p><strong>Fragmentos de Historia Restaurados: {score}</strong></p>
        <p><strong>Tiempo Total de la Misión: {finalTime}</strong></p>
        
        <p>¡Has hecho un gran esfuerzo, tu Medalla de "Guardián del Tiempo"! 🏅 Los "Custodios Mayores" y otros reconocimientos serán anunciados en el Concilio de Guardianes.</p>
        <p style={{fontSize: "0.9rem", marginTop: "20px"}}><em>No olvides compartir tu hazaña y prepararte para la celebración.</em></p>
        
        <Leaderboard />
    </div>
);

const TriviaSection = ({ stage, onComplete, tutorialActive, handleNextTutorialStep, handleDismissTutorial, tutorialStep }) => {
    const { challenge, missionName } = stage.trivia;
    const [selectedOption, setSelectedOption] = React.useState('');
    const [feedback, setFeedback] = React.useState({ message: '', type: ''});
    const [triviaTimer, setTriviaTimer] = React.useState(0);
    const [glowClass, setGlowClass] = React.useState('');

    React.useEffect(() => {
        const interval = setInterval(() => setTriviaTimer(prev => prev + 1), 1000);
        return () => clearInterval(interval);
    }, []);

    React.useEffect(() => {
        if(tutorialActive && tutorialStep === 7) { // Tutorial step for trivia options/button
            handleNextTutorialStep();
        }
    }, [tutorialActive, tutorialStep, handleNextTutorialStep]);

    const calculatePoints = (timeInSeconds) => {
        if (timeInSeconds <= 30) return 50;
        if (timeInSeconds <= 60) return 35;
        if (timeInSeconds <= 90) return 20;
        return 10;
    };

    const handleSubmit = () => {
        const finalTime = triviaTimer;
        const isCorrect = selectedOption.toUpperCase() === challenge.correctAnswer.toUpperCase();
        const pointsWon = isCorrect ? calculatePoints(finalTime) : 0;
        
        setGlowClass(isCorrect ? 'success-glow' : 'error-glow');
        setFeedback({
            message: isCorrect ? `✔️ ¡Respuesta Correcta! Has recuperado ${pointsWon} Fragmentos.` : `❌ Respuesta Incorrecta. No se han recuperado Fragmentos.`,
            type: isCorrect ? 'success' : 'error'
        });

        if (isCorrect) playCorrectSound();
        else playWrongSound();

        setTimeout(() => {
            onComplete({ points: pointsWon, time: finalTime });
            if(tutorialActive) handleDismissTutorial(); // Dismiss tutorial after submit
        }, 2500);

        if (isCorrect) {
            triggerVibration();
            animatePoints(pointsWon, 'trivia-button');
        }
    };
    return (
        <div className={`challenge-container ${glowClass}`}>
            <h3>{missionName}</h3>
            <p id="trivia-description-text"><strong>Descripción:</strong> {stage.trivia.challenge.tutorialDescription}</p>
            <div className="challenge-timer">⏱️ {triviaTimer}s</div>
            <p id="trivia-question">{challenge.question}</p>
            <ul className="trivia-options">
                {challenge.options.map((option, index) => (
                    <li key={option} 
                        id={`trivia-option-${index}`} 
                        className={selectedOption === option ? 'selected' : ''} 
                        onClick={() => !feedback.message && setSelectedOption(option)}>
                        {option}
                    </li>
                ))}
            </ul>
            <button id="trivia-button" className="primary-button" onClick={handleSubmit} disabled={!selectedOption || feedback.message}>VERIFICAR TRANSMISIÓN</button>
            {feedback.message && <p className={`feedback ${feedback.type}`}>{feedback.message}</p>}
            {tutorialActive && tutorialStep === 7 && (
                <TutorialOverlay
                    message="Aquí debes elegir la opción correcta. Tu tiempo en esta etapa influye en los puntos obtenidos."
                    targetId="trivia-question"
                    onNext={handleNextTutorialStep}
                    onDismiss={handleDismissTutorial}
                    currentStep={tutorialStep}
                    totalSteps={8}
                    alignment="bottom"
                />
            )}
            {tutorialActive && tutorialStep === 8 && (
                <TutorialOverlay
                    message="Selecciona una opción y presiona **Verificar Transmisión** para confirmar tu respuesta."
                    targetId="trivia-button"
                    onNext={handleNextTutorialStep}
                    onDismiss={handleDismissTutorial}
                    currentStep={tutorialStep}
                    totalSteps={8}
                    alignment="top"
                />
            )}
        </div>
    );
};

const AnchorSection = ({ stage, onComplete, onHintRequest, score, tutorialActive, handleNextTutorialStep, handleDismissTutorial, tutorialStep }) => {
    const { anchor } = stage;
    const [keyword, setKeyword] = React.useState('');
    const [error, setError] = React.useState('');
    const [anchorTimer, setAnchorTimer] = React.useState(0);
    const [isLocked, setIsLocked] = React.useState(false);
    const [feedback, setFeedback] = React.useState({ message: '', type: '' });
    const [glowClass, setGlowClass] = React.useState('');
    const [pistaGenerada, setPistaGenerada] = React.useState(null);
    const [incorrectAttempts, setIncorrectAttempts] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (!isLocked) setAnchorTimer(prev => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [isLocked]);
    
    React.useEffect(() => {
        if(tutorialActive && tutorialStep === 6) { // Tutorial step for anchor input/button
            handleNextTutorialStep();
        }
    }, [tutorialActive, tutorialStep, handleNextTutorialStep]);

    const handleHintRequest = () => {
        if (score >= 25 && !pistaGenerada) {
            onHintRequest();
            const pista = generarPistaDinamica(anchor.enablerKeyword);
            setPistaGenerada(pista);
            if(tutorialActive && tutorialStep === 9) { // Tutorial step for hint generation
                handleNextTutorialStep();
            }
        }
    };

    const calculateAnchorPoints = (timeInSeconds) => {
        if (timeInSeconds <= 60) return 100;
        if (timeInSeconds <= 120) return 80;
        if (timeInSeconds <= 180) return 60;
        if (timeInSeconds <= 240) return 40;
        if (timeInSeconds <= 300) return 20;
        return 0;
    };

    const handleUnlockInternal = () => {
        if (isLocked) return;

        if (keyword.toUpperCase().trim() === anchor.enablerKeyword.toUpperCase().trim()) {
            const points = calculateAnchorPoints(anchorTimer);
            
            setIsLocked(true);
            setError('');
            setGlowClass('success-glow');
            setFeedback({ message: `✔️ ¡Ancla estabilizada! Has recuperado ${points} Fragmentos.`, type: 'success' });
            
            playCorrectSound();

            setTimeout(() => {
                onComplete({ points: points, time: anchorTimer });
                if(tutorialActive) handleDismissTutorial(); // Dismiss tutorial after submit
            }, 2500);

            triggerVibration();
            animatePoints(points, 'anchor-button');

        } else {
            const newAttemptCount = incorrectAttempts + 1;
            setIncorrectAttempts(newAttemptCount);
            setGlowClass('error-glow');
            setTimeout(() => setGlowClass(''), 1500);

            playWrongSound();

            if (newAttemptCount >= 3) {
                setError('');
                setIsLocked(true);
                setFeedback({ message: `❌ ¡Se agotaron los intentos! La distorsión se consolida. Avanzando...`, type: 'error' });
                setTimeout(() => {
                    onComplete({ points: 0, time: anchorTimer });
                    if(tutorialActive) handleDismissTutorial(); // Dismiss tutorial after submit
                }, 2500);
            } else {
                const attemptsLeft = 3 - newAttemptCount;
                setError(`🚫 Ancla Temporal incorrecta. Quedan ${attemptsLeft} ${attemptsLeft === 1 ? 'intento' : 'intentos'}.`);
            }
        }
    };

    const handleSkip = () => {
        if (isLocked) return;
        setIsLocked(true);
        setError('');
        setGlowClass('error-glow');
        setFeedback({ message: `Misión de anclaje omitida. No se han recuperado Fragmentos.`, type: 'error' });
        playWrongSound();
        setTimeout(() => {
            onComplete({ points: 0, time: anchorTimer });
            if(tutorialActive) handleDismissTutorial(); // Dismiss tutorial after skip
        }, 2500);
    };

    const handleInputChange = (e) => {
        if (error) setError('');
        if (glowClass) setGlowClass('');
        setKeyword(e.target.value);
    };

    return (
        <div className={`stage-container ${glowClass}`}>
            <h3>{anchor.missionName}</h3>
            <p id="anchor-description-text"><strong>Descripción:</strong> {stage.anchor.tutorialDescription}</p>
            <div className="challenge-timer">⏱️ {anchorTimer}s</div>
            <p><strong>Departamento:</strong> {stage.department}</p>
            {anchor.transmission && <div className="transmission-box"><p><strong>📡 Transmisión Interceptada:</strong> {anchor.transmission}</p></div>}
            <p id="anchor-enabler-text"><strong>Objetivo de la Coordenada:</strong> {anchor.enabler}</p>

            {error && <p className="feedback error">{error}</p>}
            
            {!pistaGenerada && (
                <div className="hint-request-container">
                    <button
                        id="hint-button"
                        className="primary-button"
                        onClick={handleHintRequest}
                        disabled={score < 25 || isLocked}>
                        SOLICITAR PISTA (-25 Fragmentos)
                    </button>
                    {tutorialActive && tutorialStep === 9 && (
                        <TutorialOverlay
                            message="Si te quedas atascado y tienes suficientes **Fragmentos**, puedes pedir una **Pista**. ¡Te restará puntos, así que úsala con sabiduría!"
                            targetId="hint-button"
                            onNext={handleNextTutorialStep}
                            onDismiss={handleDismissTutorial}
                            currentStep={tutorialStep}
                            totalSteps={11} // Total steps for anchor tutorial
                            alignment="bottom"
                        />
                    )}
                </div>
            )}
            
            {pistaGenerada && (
                <div className="hint-box hint-dynamic">
                    <p id="hint-display"><strong>💡 Pista Recuperada:</strong> {pistaGenerada}</p>
                    {tutorialActive && tutorialStep === 10 && (
                        <TutorialOverlay
                            message="¡Aquí verás la pista! Te ayudará a resolver el Ancla."
                            targetId="hint-display"
                            onNext={handleNextTutorialStep}
                            onDismiss={handleDismissTutorial}
                            currentStep={tutorialStep}
                            totalSteps={11}
                            alignment="bottom"
                        />
                    )}
                </div>
            )}

            <input id="anchor-input" type="text" placeholder="Ingresa el 'Ancla Temporal'" value={keyword} onChange={handleInputChange} onKeyPress={(e) => e.key === 'Enter' && handleUnlockInternal()} disabled={isLocked} />
            {tutorialActive && tutorialStep === 6 && (
                <TutorialOverlay
                    message="Ingresa la **Ancla Temporal** que encuentres en el lugar. ¡Es clave para estabilizar la línea de tiempo!"
                    targetId="anchor-input"
                    onNext={handleNextTutorialStep}
                    onDismiss={handleDismissTutorial}
                    currentStep={tutorialStep}
                    totalSteps={11}
                    alignment="bottom"
                />
            )}
            
            <div className="button-group-vertical">    
                <button id="anchor-button" className="primary-button" onClick={handleUnlockInternal} disabled={isLocked}>🗝️ ANCLAR RECUERDO</button>
                {tutorialActive && tutorialStep === 11 && (
                    <TutorialOverlay
                        message="Cuando estés seguro de tu respuesta, presiona **Anclar Recuerdo** para validarla."
                        targetId="anchor-button"
                        onNext={handleNextTutorialStep}
                        onDismiss={handleDismissTutorial}
                        currentStep={tutorialStep}
                        totalSteps={11}
                        alignment="top"
                    />
                )}
                
                <button id="skip-button" className="skip-button" onClick={handleSkip} disabled={isLocked}>No sé</button>
            </div>
            
            {feedback.message && <p className={`feedback ${feedback.type}`}>{feedback.message}</p>}
        </div>
    );
};


const FinalSection = ({stage, onComplete}) => {
    const [keyword, setKeyword] = React.useState('');
    const [error, setError] = React.useState('');
    const [glowClass, setGlowClass] = React.useState('');
    
    const handleUnlockInternal = () => {
        if (keyword.toUpperCase().trim() === stage.enablerKeyword.toUpperCase().trim()) {
            setGlowClass('success-glow');
            onComplete(200);
            playCorrectSound();
        } else {
            setError('🚫 Código final incorrecto.');
            setGlowClass('error-glow');
            playWrongSound();
            setTimeout(() => setGlowClass(''), 1500);
        }
    };

    const handleInputChange = (e) => {
        if (error) setError('');
        if (glowClass) setGlowClass('');
        setKeyword(e.target.value);
    };
    
    return (
        <div className={`stage-container ${glowClass}`}>
            <h3>{stage.missionName}</h3>
            {stage.transmission && <div className="transmission-box"><p><strong>📡 Transmisión Prioritaria:</strong> {stage.transmission}</p></div>}
            <p><strong>Misión de Sellado:</strong> {stage.enabler}</p>
            <input type="text" placeholder="Ingresa el Ancla Temporal Final" value={keyword} onChange={handleInputChange} onKeyPress={(e) => e.key === 'Enter' && handleUnlockInternal()}/>
            <div className="button-group">
                <button className="primary-button" onClick={handleUnlockInternal}>✨ SELLAR BRECHA TEMPORAL ✨</button>
            </div>
            {error && <p className={`feedback ${error ? 'error' : ''}`}>{error}</p>}
        </div>
    );
};

const Leaderboard = () => {
   const LEADERBOARD_URL = 'https://script.google.com/macros/s/AKfycbym5-onTOyzlqZn_G4O-5acxAZzReYjIOY5SF8tBh3TtT2jEFVw6IZ2MMMtkHGtRl0F/exec'; 

   const [ranking, setRanking] = React.useState([]);
   const [isLoading, setIsLoading] = React.useState(true);
   const [error, setError] = React.useState(null);

   React.useEffect(() => {
    const fetchRanking = async () => {
      console.warn("Versión de prueba: El ranking está deshabilitado.");
      setIsLoading(false);
      setError("Ranking no disponible en la versión de prueba.");
      return;
    };

    fetchRanking();
   }, []);

   if (isLoading) {
    return <p className="feedback">Cargando el Ranking de Guardianes...</p>;
   }

   if (error) {
    return <p className="feedback error">{error}</p>;
   }

   return (
    <div className="leaderboard-container">
      <h3 id="leaderboard-title">CONCILIO DE GUARDIANES</h3>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Guardián</th>
            <th>Fragmentos</th>
            <th>Tiempo</th>
          </tr>
        </thead>
        <tbody>
          {ranking.slice(0, 10).map((team, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{team.teamName}</td>
              <td>{team.score}</td>
              <td>{team.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   );
};

const BonusMissionModal = ({ bonusData, onComplete, tutorialActive, handleNextTutorialStep, handleDismissTutorial, tutorialStep }) => {
    const [view, setView] = React.useState('offer');
    const [feedback, setFeedback] = React.useState({ message: '', type: '' });
    const [glowClass, setGlowClass] = React.useState('');
    const [selectedOption, setSelectedOption] = React.useState('');

    React.useEffect(() => {
        if (view === 'offer' && tutorialActive && tutorialStep === 14) { // When bonus is offered
            handleNextTutorialStep(); // Move to next tutorial step (offer explanation)
        } else if (view === 'challenge' && tutorialActive && tutorialStep === 16) { // When challenge starts
            handleNextTutorialStep(); // Move to next tutorial step (challenge explanation)
        }
    }, [view, tutorialActive, tutorialStep, handleNextTutorialStep]);


    const handleAccept = () => {
        setView('challenge');
        if(tutorialActive && tutorialStep === 15) { // Tutorial step after accepting
            handleNextTutorialStep();
        }
    };

    const handleDecline = () => {
        onComplete({ points: 0, participated: false });
        if(tutorialActive) handleDismissTutorial(); // Dismiss tutorial if bonus declined
    };

    const handleSubmitChallenge = () => {
        if (feedback.message) return;

        const isCorrect = selectedOption.toUpperCase() === bonusData.challenge.correctAnswer.toUpperCase();
        const pointsWon = isCorrect ? bonusData.challenge.points : 0;
        setGlowClass(isCorrect ? 'success-glow' : 'error-glow');
        setFeedback({
            message: isCorrect 
                ? `✔️ ¡Correcto! ¡Has ganado ${pointsWon} Fragmentos!` 
                : `❌ Respuesta Incorrecta. No has recuperado fragmentos.`,
            type: isCorrect ? 'success' : 'error'
        });

        if (isCorrect) playCorrectSound();
        else playWrongSound();

        setTimeout(() => {
            onComplete({ points: pointsWon, participated: true });
            if(tutorialActive) handleDismissTutorial(); // Dismiss tutorial after submit
        }, 3000);
    };

    return (
        <div className="amenaza-modal-overlay">
            <div className={`amenaza-modal-content ${glowClass}`}>
                {view === 'offer' && (
                    <div className="stage-container">
                        <img src={bonusData.logoSrc} alt={`Logo ${bonusData.sponsorName}`} className="portal-image" style={{ width: '150px', borderRadius: '50%' }}/>
                        <h3>{bonusData.title}</h3>
                        <div className="transmission-box">
                            <p><strong>ALERTA DE OPORTUNIDAD TEMPORAL</strong></p>
                        </div>
                        <p id="bonus-offer-description">{bonusData.description}</p>
                        {tutorialActive && tutorialStep === 14 && (
                            <TutorialOverlay
                                message={bonusData.tutorialDescription}
                                targetId="bonus-offer-description"
                                onNext={handleNextTutorialStep}
                                onDismiss={handleDismissTutorial}
                                currentStep={tutorialStep}
                                totalSteps={17} // Total steps for bonus tutorial
                                alignment="bottom"
                            />
                        )}
                        <a id="bonus-maps-link" href={bonusData.mapsLink} target="_blank" rel="noopener noreferrer" className="primary-button" style={{display: 'block', textDecoration: 'none', marginBottom: '10px'}}>
                            📍 ABRIR EN GOOGLE MAPS
                        </a>
                        {tutorialActive && tutorialStep === 15 && (
                            <TutorialOverlay
                                message="Haz clic en **Abrir en Google Maps** para ver la ubicación del Bonus, luego decide si aceptas o no."
                                targetId="bonus-maps-link"
                                onNext={handleNextTutorialStep}
                                onDismiss={handleDismissTutorial}
                                currentStep={tutorialStep}
                                totalSteps={17}
                                alignment="top"
                            />
                        )}
                        <div className="button-group">
                            <button id="bonus-decline-button" className="secondary-button" onClick={handleDecline}>Rechazar Desvío</button>
                            <button id="bonus-accept-button" className="primary-button" onClick={handleAccept}>¡ACEPTO EL DESAFÍO!</button>
                            {tutorialActive && tutorialStep === 16 && (
                                <TutorialOverlay
                                    message="Si decides aceptar, presiona **¡Acepto el Desafío!**, de lo contrario, **Rechazar Desvío**."
                                    targetId="bonus-accept-button"
                                    onNext={handleNextTutorialStep}
                                    onDismiss={handleDismissTutorial}
                                    currentStep={tutorialStep}
                                    totalSteps={17}
                                    alignment="top"
                                />
                            )}
                        </div>
                    </div>
                )}
                {view === 'challenge' && (
                    <div className="challenge-container">
                        <h3>{bonusData.sponsorName} - Desafío</h3>
                        <p id="bonus-challenge-question">{bonusData.challenge.question}</p>
                        <ul className="trivia-options">
                            {bonusData.challenge.options.map((option, index) => (
                                <li key={option} 
                                    id={`bonus-option-${index}`} 
                                    className={selectedOption === option ? 'selected' : ''} 
                                    onClick={() => !feedback.message && setSelectedOption(option)}>
                                    {option}
                                </li>
                            ))}
                        </ul>
                        <button id="bonus-submit-button" className="primary-button" onClick={handleSubmitChallenge} disabled={!selectedOption || feedback.message}>
                            CONFIRMAR RESPUESTA
                        </button>
                        {feedback.message && <p className={`feedback ${feedback.type}`}>{feedback.message}</p>}
                        {tutorialActive && tutorialStep === 17 && (
                            <TutorialOverlay
                                message="Selecciona la respuesta correcta al desafío del Bonus y presiona **Confirmar Respuesta**."
                                targetId="bonus-submit-button"
                                onNext={handleNextTutorialStep}
                                onDismiss={handleDismissTutorial}
                                currentStep={tutorialStep}
                                totalSteps={17}
                                alignment="top"
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};


// --- BLOQUE PRINCIPAL DE LA APP ---
const getInitialState = () => ({ 
    status: 'login', // Puede ser 'login', 'welcome', 'in_game', 'on_the_road', 'long_travel', 'distortion_event', 'finished', 'aborted'
    squadCode: null, 
    teamName: '', 
    currentMissionId: eventData.length > 0 ? eventData[0].id : 1, 
    subStage: 'anchor', 
    score: 0, 
    mainTimer: 0, 
    finalTimeDisplay: '', 
    errorMessage: '', 
    missionResults: [], 
    pendingAnchorResult: null,
    activeDistortionEventId: null,
    postDistortionStatus: null,
    activeBonusMissionId: null,
    isAdmin: false,
    tutorialActive: true, // NEW: Start tutorial active
    tutorialStep: 0,     // NEW: Initial tutorial step
});

const App = () => {
    const [appState, setAppState] = React.useState(() => {
        const savedDataJSON = localStorage.getItem('guardianesAppState');
        
        if (!savedDataJSON) {
            return getInitialState();
        }

        try {
            const savedData = JSON.parse(savedDataJSON);
            if (savedData && savedData.state && savedData.timestamp) {
                const now = Date.now();
                const lastSavedTime = savedData.timestamp;
                const hours24inMs = 24 * 60 * 60 * 1000;

                if ((now - lastSavedTime) < hours24inMs) {
                    console.log("Restaurando sesión. Menos de 24hs transcurridas.");
                    // Ensure tutorial is active if the session is being restored
                    // But also ensure it starts from where it left off, or dismiss if already completed
                    const restoredState = savedData.state;
                    if (restoredState.tutorialActive && restoredState.tutorialStep > 0 && restoredState.status !== 'finished' && restoredState.status !== 'aborted') {
                        // Restore tutorial state if active and not finished
                        return restoredState;
                    } else {
                        // If tutorial was inactive or finished, or if game was finished/aborted,
                        // treat it as a fresh start for tutorial purposes (but keep game state)
                        return { ...restoredState, tutorialActive: true, tutorialStep: 0 };
                    }
                } else {
                    console.log("Sesión expirada. Han pasado más de 24hs. Reiniciando.");
                    localStorage.removeItem('guardianesAppState');
                }
            }
        } catch (e) {
            console.error("Error al procesar datos guardados. Reiniciando.", e);
            localStorage.removeItem('guardianesAppState');
        }

        return getInitialState();
    });

    
    React.useEffect(() => {
        if (appState.status !== 'login') {
            const dataToSave = {
                state: appState,
                timestamp: Date.now()
            };
            localStorage.setItem('guardianesAppState', JSON.stringify(dataToSave));
        }
    }, [appState]);

    React.useEffect(() => {
        let interval;
        if (appState.status !== 'login' && appState.status !== 'welcome' && appState.status !== 'finished' && appState.status !== 'aborted' && !appState.activeDistortionEventId && !appState.activeBonusMissionId && appState.tutorialActive === false) { // Only run timer if tutorial is not active
            interval = setInterval(() => {
                setAppState(prev => ({ ...prev, mainTimer: prev.mainTimer + 1 }));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [appState.status, appState.activeDistortionEventId, appState.activeBonusMissionId, appState.tutorialActive]);

    const currentStageData = eventData.find(m => m.id === appState.currentMissionId);
    const activeDistortionEvent = distortionEventsData.find(e => e.id === appState.activeDistortionEventId);
    const activeBonusData = appState.activeBonusMissionId ? allBonusData.find(b => b.id === appState.activeBonusMissionId) : null;


    const handleLogin = (code, name, isAdmin = false) => {
        const initialState = getInitialState();
        const fullState = { ...initialState, status: 'welcome', squadCode: code, teamName: name, isAdmin: isAdmin, tutorialActive: true, tutorialStep: 0 }; // Start tutorial at step 0
        setAppState(fullState);
        sendResultsToBackend(fullState);
    };
    
    const handleStartFirstMission = () => {
        setAppState(prev => ({
            ...prev,
            status: 'in_game',
            subStage: 'anchor',
            tutorialStep: 6, // Start anchor tutorial step 6
        }));
    };
    
    const handleAnchorComplete = (anchorResult) => {
        if (!currentStageData) return;
        const newScore = appState.score + anchorResult.points;
        setAppState(prev => ({ ...prev, score: newScore, subStage: 'trivia', pendingAnchorResult: anchorResult, tutorialStep: 7 })); // Go to trivia tutorial step 7
    };
    
    const handleRequestHint = () => {
        setAppState(prev => ({
            ...prev,
            score: Math.max(0, prev.score - 25),
            tutorialStep: 10, // Go to hint generation tutorial step 10
        }));
    };
    
    const handleTriviaComplete = (triviaResult) => {
        if (!currentStageData || !appState.pendingAnchorResult) return;

        const newScore = appState.score + triviaResult.points;
        const completeMissionRecord = {
            missionId: currentStageData.id,
            missionName: currentStageData.anchor.missionName.replace("Ancla: ", ""),
            anchorTime: appState.pendingAnchorResult.time,
            anchorPoints: appState.pendingAnchorResult.points,
            triviaTime: triviaResult.time,
            triviaPoints: triviaResult.points
        };
        const updatedResults = [...appState.missionResults, completeMissionRecord];

        let baseStateForNextStep = {
            ...appState,
            score: newScore,
            missionResults: updatedResults,
            pendingAnchorResult: null,
        };

        sendResultsToBackend(baseStateForNextStep);

        let triggeredEvent = null;
        let triggeredBonus = null;

        if (currentStageData.id === 8) {
            triggeredEvent = distortionEventsData.find(e => e.trigger?.onMissionComplete === 8);
        } else if (currentStageData.id === 16) {
            triggeredBonus = allBonusData.find(b => b.triggerMissionId === 16);
        }

        if (triggeredBonus) {
            setAppState({
                ...baseStateForNextStep,
                status: 'in_game',
                activeBonusMissionId: triggeredBonus.id,
                tutorialStep: 14, // Start bonus tutorial step 14
            });
            return;
        }

        const nextMission = eventData.find(m => m.id === currentStageData.nextMissionId);
        
        if (triggeredEvent && nextMission) {
            setAppState({
                ...baseStateForNextStep,
                status: 'distortion_event',
                activeDistortionEventId: triggeredEvent.id,
                postDistortionStatus: nextMission.department !== currentStageData.department ? 'long_travel' : 'on_the_road',
                tutorialStep: 10, // Start distortion visual tutorial step 10 (adjust for distortion steps)
            });
        } else {
            if (!nextMission) {
                handleFinalComplete(0);
                return;
            }
            setAppState({  
                ...baseStateForNextStep,  
                status: nextMission.department !== currentStageData.department ? 'long_travel' : 'on_the_road',
                tutorialStep: 4, // Start travel tutorial step 4
            });
        }
    };
    
    const handleDistortionComplete = (result) => {
        const newScore = Math.max(0, appState.score + (result?.points || 0));
        const newState = {
            ...appState,
            score: newScore,
            activeDistortionEventId: null,  
            status: appState.postDistortionStatus,  
            postDistortionStatus: null,
            tutorialActive: false, // End distortion tutorial, proceed normally
            tutorialStep: 0,
        }
        setAppState(newState);
        sendResultsToBackend(newState);
    };

    const handleFinalComplete = (bonusPoints) => {
        const totalSeconds = appState.mainTimer;
        const finalTime = formatTime(totalSeconds);
        const finalScore = (appState.score || 0) + (bonusPoints || 0);
        
        const finalState = { ...appState, score: finalScore, status: 'finished', finalTimeDisplay: finalTime, tutorialActive: true, tutorialStep: 18 }; // Start final screen tutorial
        
        setAppState(finalState);
        sendResultsToBackend(finalState);
    };

    const handleArrival = () => {
        if (!currentStageData || typeof currentStageData.nextMissionId !== 'number') {
            handleFinalComplete(0); 
            return; 
        }
        const nextMission = eventData.find(m => m.id === currentStageData.nextMissionId);
        if (nextMission) {
            setAppState(prev => ({ ...prev, currentMissionId: nextMission.id, status: 'in_game', subStage: 'anchor', tutorialStep: 6 })); // Go to anchor tutorial step 6
        } else {
            handleFinalComplete(0);
        }
    };
    
    const handleResetDevelopment = () => {
        if (window.confirm("¿Seguro que quieres reiniciar toda la misión y borrar los datos guardados? (Solo para desarrollo)")) {
            localStorage.removeItem('guardianesAppState');
            setAppState(getInitialState());
        }
    };

    const handleFinishEarly = () => {
        if (window.confirm('¿Estas seguro? Esto finalizará tu partida')) {
            const totalSeconds = appState.mainTimer;
            const finalTime = formatTime(totalSeconds);
            const finalScore = appState.score || 0;
            
            const finalState = {  
                ...appState,  
                score: finalScore,  
                status: 'aborted',
                finalTimeDisplay: finalTime,
                tutorialActive: true, // Enable tutorial on aborted screen
                tutorialStep: 18, // Start final screen tutorial
            };
            
            setAppState(finalState);
            sendResultsToBackend(finalState);
        }
    };

    const handleBonusModalClose = (result) => {
        const pointsWon = result?.points || 0;
        const participated = result?.participated || false;

        if (participated) {
            sendBonusResultToBackend({
                teamName: appState.teamName,
                bonusId: appState.activeBonusMissionId,
                points: pointsWon
            });
        }

        const newScore = appState.score + pointsWon;
        const baseStateAfterBonus = {
            ...appState,
            score: newScore,
            activeBonusMissionId: null
        };

        const missionThatTriggeredBonus = eventData.find(m => m.id === currentStageData.id);
        const nextMission = eventData.find(m => m.id === missionThatTriggeredBonus.nextMissionId);

        if (!nextMission) {
            handleFinalComplete(0);
            return;
        }

        const nextStatus = nextMission.department !== missionThatTriggeredBonus.department
            ? 'long_travel'
            : 'on_the_road';

        const triggeredEvent = distortionEventsData.find(e => e.trigger?.onMissionComplete === currentStageData.id);

        let finalState;
        if (triggeredEvent) {
            finalState = {
                ...baseStateAfterBonus,
                status: 'distortion_event',
                activeDistortionEventId: triggeredEvent.id,
                postDistortionStatus: nextStatus,
                tutorialStep: 10, // Start distortion visual tutorial step 10
            };
        } else {
            finalState = {
                ...baseStateAfterBonus,
                status: nextStatus,
                tutorialStep: 4, // Start travel tutorial step 4
            };
        }

        setAppState(finalState);
        sendResultsToBackend(finalState);
    };
    
    // Tutorial Navigation
    const handleNextTutorialStep = () => {
        setAppState(prev => ({ ...prev, tutorialStep: prev.tutorialStep + 1 }));
    };

    const handleDismissTutorial = () => {
        setAppState(prev => ({ ...prev, tutorialActive: false, tutorialStep: 0 }));
    };

    const renderContent = () => {
        if (appState.status === 'in_game' && !currentStageData) {
            return <p style={{padding: "20px"}}>Detectando anomalía temporal...</p>;
        }

        switch (appState.status) {
            case 'login':
                return <LoginPage 
                            onLogin={handleLogin} 
                            setErrorMessage={(msg) => setAppState(prev => ({ ...prev, errorMessage: msg }))} 
                            errorMessage={appState.errorMessage} 
                        />;
            
            case 'welcome':
                return <WelcomePage 
                            teamName={appState.teamName} 
                            onContinue={handleStartFirstMission} 
                            tutorialActive={appState.tutorialActive}
                            handleNextTutorialStep={handleNextTutorialStep}
                            handleDismissTutorial={handleDismissTutorial}
                            tutorialStep={appState.tutorialStep}
                        />;

            case 'long_travel': {
                if (!currentStageData || typeof currentStageData.nextMissionId !== 'number') {
                    handleFinalComplete(0); 
                    return null; 
                }
                const nextMission = eventData.find(m => m.id === currentStageData.nextMissionId);
                if (!nextMission) { handleFinalComplete(0); return null; }
                const toDept = nextMission.department;

                return <LongTravelPage 
                                nextDepartment={toDept} 
                                onArrival={handleArrival} 
                                onFinishEarly={handleFinishEarly}
                                tutorialActive={appState.tutorialActive}
                                handleNextTutorialStep={handleNextTutorialStep}
                                handleDismissTutorial={handleDismissTutorial}
                                tutorialStep={appState.tutorialStep}
                            />;
            }
            
            case 'on_the_road': {
                const nextMission = eventData.find(m => m.id === currentStageData.nextMissionId);
                if (!nextMission) {
                    return <EndGamePage score={appState.score} finalTime={appState.finalTimeDisplay} teamName={appState.teamName} />;
                }
                return <EnRutaPage 
                                nextLocation={nextMission.location} 
                                department={nextMission.department} 
                                onArrival={handleArrival}
                                onFinishEarly={handleFinishEarly}
                                tutorialActive={appState.tutorialActive}
                                handleNextTutorialStep={handleNextTutorialStep}
                                handleDismissTutorial={handleDismissTutorial}
                                tutorialStep={appState.tutorialStep}
                            />;
            }

            case 'in_game': {
                if (appState.subStage === 'anchor') return <AnchorSection 
                                                                stage={currentStageData} 
                                                                onComplete={handleAnchorComplete} 
                                                                onHintRequest={handleRequestHint} 
                                                                score={appState.score} 
                                                                tutorialActive={appState.tutorialActive}
                                                                handleNextTutorialStep={handleNextTutorialStep}
                                                                handleDismissTutorial={handleDismissTutorial}
                                                                tutorialStep={appState.tutorialStep}
                                                            />;
                
                if (appState.subStage === 'trivia') return <TriviaSection 
                                                                stage={currentStageData} 
                                                                onComplete={handleTriviaComplete} 
                                                                tutorialActive={appState.tutorialActive}
                                                                handleNextTutorialStep={handleNextTutorialStep}
                                                                handleDismissTutorial={handleDismissTutorial}
                                                                tutorialStep={appState.tutorialStep}
                                                            />;
                break;
            }

            case 'finished':
                return <EndGamePage score={appState.score} finalTime={appState.finalTimeDisplay} teamName={appState.teamName} />;
            
            case 'aborted':
                return <AbortedGamePage score={appState.score} finalTime={appState.finalTimeDisplay} teamName={appState.teamName} />;
            
            default:
                return <p>Error: Estado desconocido.</p>;
        }
    };

    return (
        <div className="app-container">
            {appState.status !== 'login' && <Header teamName={appState.teamName} score={appState.score} timer={appState.mainTimer} />}
            
            <div className="dashboard-content">
                {renderContent()}
            </div>
            
            {activeDistortionEvent && <DistortionEventPage 
                                            event={activeDistortionEvent} 
                                            onComplete={handleDistortionComplete} 
                                            tutorialActive={appState.tutorialActive}
                                            handleNextTutorialStep={handleNextTutorialStep}
                                            handleDismissTutorial={handleDismissTutorial}
                                            tutorialStep={appState.tutorialStep}
                                        />}
            {activeBonusData && <BonusMissionModal 
                                    bonusData={{...activeBonusData, teamName: appState.teamName}} 
                                    onComplete={handleBonusModalClose} 
                                    tutorialActive={appState.tutorialActive}
                                    handleNextTutorialStep={handleNextTutorialStep}
                                    handleDismissTutorial={handleDismissTutorial}
                                    tutorialStep={appState.tutorialStep}
                                />}
            
            {/* Tutorial for the final screen */}
            {(appState.status === 'finished' || appState.status === 'aborted') && appState.tutorialActive && appState.tutorialStep === 18 && (
                <TutorialOverlay
                    message="¡Misión completa! Aquí puedes ver tus **Fragmentos de Historia Restaurados**."
                    targetId="final-fragments"
                    onNext={handleNextTutorialStep}
                    onDismiss={handleDismissTutorial}
                    currentStep={appState.tutorialStep}
                    totalSteps={20} // Assuming 3 steps for final screen tutorial
                    alignment="bottom"
                />
            )}
            {(appState.status === 'finished' || appState.status === 'aborted') && appState.tutorialActive && appState.tutorialStep === 19 && (
                <TutorialOverlay
                    message="Este es tu **Tiempo Total de la Misión**. Recuerda que la velocidad también es importante."
                    targetId="final-time"
                    onNext={handleNextTutorialStep}
                    onDismiss={handleDismissTutorial}
                    currentStep={appState.tutorialStep}
                    totalSteps={20}
                    alignment="bottom"
                />
            )}
            {(appState.status === 'finished' || appState.status === 'aborted') && appState.tutorialActive && appState.tutorialStep === 20 && (
                <TutorialOverlay
                    message="Finalmente, aquí se muestra el **Concilio de Guardianes**, el ranking de todos los equipos."
                    targetId="leaderboard-title"
                    onNext={handleNextTutorialStep} // This will dismiss the tutorial
                    onDismiss={handleDismissTutorial}
                    currentStep={appState.tutorialStep}
                    totalSteps={20}
                    alignment="top"
                />
            )}


            {(appState.isAdmin || appState.status !== 'login') && (
                <div className="dev-controls-container">
                    {appState.isAdmin && (
                        <>
                            <button className="dev-reset-button dev-bonus" onClick={() => handleAdminJumpToBonus('bonus_portho_1')}>
                                Jump Portho
                            </button>
                            <button className="dev-reset-button dev-distortion" onClick={() => handleAdminJumpToDistortion('distorsion_2')}>
                                Jump Dist. 2
                            </button>
                        </>
                    )}
                    {appState.status !== 'login' && (
                        <button className="dev-reset-button dev-reset" onClick={handleResetDevelopment}>
                            RESET (DEV)
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);