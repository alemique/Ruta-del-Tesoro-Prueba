// --- CONFIGURACIÓN DEL BACKEND ---
// URL actualizada para incluir la función del ranking.
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbym5-onTOyzlqZn_G4O-5acxAZzReYjIOY5SF8tBh3TtT2jEFVw6IZ2MMMtkHGtRl0F/exec';

// --- DATOS REDUCIDOS DEL EVENTO PARA LA VERSIÓN DE PRUEBA ---
// Se han seleccionado 4 misiones, 1 desafío y 1 bonus específicos para la versión de prueba.
const eventData = [
    // SANTA LUCÍA - Misión 1 (Original ID 1)
    {
        id: 1, department: "Santa Lucía", location: "Parroquia Santa Lucía",
        anchor: { missionName: "Ancla: Vestigios del Sismo", enabler: "Consigna: Busquen el año del catastrófico terremoto que destruyó el 'hermoso templo colonial'.\nPista: Este evento marcó un antes y después en la arquitectura de toda la provincia.", enablerKeyword: "1944", transmission: "Guardián, detecto una cicatriz profunda en la línea de tiempo de este lugar sagrado. Debes anclar el año del evento que lo cambió todo para estabilizarla." },
        trivia: { missionName: "Trivia: El Templo de 1900", challenge: { question: "¿En qué año fue inaugurado el templo de estilo ecléctico que reemplazó a la primera capilla?", options: ["1894", "1900", "1944", "1964"], correctAnswer: "1900" } },
        nextMissionId: 8 // Enlace a la siguiente misión de la versión de prueba
    },
    // SANTA LUCÍA - Misión 2 (Original ID 8)
    {
        id: 8, department: "Santa Lucía", location: "Plaza General San Martín",
        anchor: { missionName: "Ancla: La Renovación del Encuentro", enabler: "Consigna: Hallen el año en que la plaza fue totalmente remodelada, con motivo del 152° aniversario.\nPista: Se agregó Wi-Fi público y se descubrió una placa conmemorativa.", enablerKeyword: "2021", transmission: "Los espacios evolucionan para seguir uniendo a las personas. Ancla el año de la gran transformación de este punto de encuentro." },
        trivia: { missionName: "Trivia: Tradición Decembrina", challenge: { question: "¿Qué importante evento anual, que dura tres noches, se celebra en esta plaza cada diciembre?", options: ["El Festival del Sol", "El Aniversario de Santa Lucía", "La Fiesta Nacional de Santa Lucía", "La Feria de las Colectividades"], correctAnswer: "La Fiesta Nacional de Santa Lucía" } },
        nextMissionId: 16 // Enlace a la siguiente misión de la versión de prueba
    },
    // CAPITAL - Misión 3 (Original ID 16)
    {
        id: 16, department: "Capital", location: "Casa Natal de Sarmiento",
        anchor: { missionName: "Ancla: El Primer Monumento Nacional", enabler: "Consigna: Determinen el año en que esta casa se convirtió en el Primer Monumento Histórico Nacional del país.\nPista: Ocurrió por ley del Congreso y un año después abrió sus puertas como museo.", enablerKeyword: "1910", transmission: "Esta humilde casa fue la primera en recibir el máximo honor. Fija el año en que la Nación la declaró su primer monumento histórico." },
        trivia: { missionName: "Trivia: Sede de Gobierno", challenge: { question: "¿Qué función tuvo la casa durante el gobierno provincial de Sarmiento?", options: ["Escuela de primeras letras", "Biblioteca Pública", "Casa de Gobierno", "Cuartel militar"], correctAnswer: "Casa de Gobierno" } },
        nextMissionId: 32 // Enlace a la siguiente misión de la versión de prueba
    },
    // RIVADAVIA - Misión 4 (Original ID 32) - Esta será la última misión del demo antes del final.
    {
        id: 32, department: "Rivadavia", location: "Autódromo El Zonda",
        anchor: { missionName: "Ancla: La Categoría Reina", enabler: "Consigna: ¿Qué famosa categoría del automovilismo nacional ha tenido competencias memorables en este circuito a lo largo de su historia?\nPista: Es una de las más populares y antiguas de Argentina.", enablerKeyword: "Turismo Carretera", transmission: "Los ídolos más grandes del automovilismo argentino han derrapado en estas curvas. Ancla el nombre de la categoría más emblemática que ha corrido aquí." },
        trivia: { missionName: "Trivia: La Medida del Desafío", challenge: { question: "¿Qué longitud tiene el desafiante trazado de montaña de este circuito?", options: ["1.800 metros", "2.300 metros", "2.800 metros", "3.200 metros"], correctAnswer: "2.300 metros" } },
        nextMissionId: null // Marca como la última misión para el flujo normal
    },
    // NOTA: La misión con ID 39 (Rivadavia Ancestral - Parque de Rivadavia) fue eliminada
    // ya que el flujo de esta versión de prueba finalizará después de la misión 32.
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
            penaltyPoints: 0
        }
    }
    // Las demás distorsiones (id: 'distorsion_1', 'distorsion_3') han sido eliminadas para esta versión.
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
        points: 200
    }
};

const allBonusData = [bonusMissionData]; // Solo incluimos el bonus 'Portho' para esta versión.


// --- FUNCIONES GLOBALES DE AYUDA (SIN CAMBIOS) ---
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

// --- INICIO: FUNCIONES DE FEEDBACK SENSORIAL (VIBRACIÓN Y ANIMACIÓN) ---
const triggerVibration = (duration = 100) => {
    // Esta función depende de la configuración del navegador y del dispositivo del usuario.
    if ('vibrate' in navigator) {
        navigator.vibrate(duration);
    }
};

// --- NUEVAS FUNCIONES PARA SONIDO ---
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

// <<< INICIO: MODIFICACIÓN DE ANIMACIÓN DE PUNTOS >>>
const animatePoints = (points, originElementId) => {
    const destination = document.getElementById('score-display');
    const origin = document.getElementById(originElementId);

    // Se verifica que ambos elementos existan para evitar errores.
    if (!destination || !origin) {
        console.error("Elemento de destino u origen no encontrado para la animación.");
        return;
    }

    const pointsFlyer = document.createElement('div');
    pointsFlyer.textContent = `+${points}`;
    
    // Estilos para que la animación sea prominente y visible.
    pointsFlyer.style.position = 'fixed'; // Clave: Posición relativa a la ventana del navegador.
    pointsFlyer.style.zIndex = '10000';
    pointsFlyer.style.padding = '8px 16px';
    pointsFlyer.style.backgroundColor = 'var(--color-feedback-success-dark, #2a9d8f)';
    pointsFlyer.style.color = '#FFFFFF';
    pointsFlyer.style.fontWeight = 'bold';
    pointsFlyer.style.fontSize = '1.5rem';
    pointsFlyer.style.borderRadius = '20px';
    pointsFlyer.style.border = '2px solid #FFFFFF';
    pointsFlyer.style.boxShadow = '0 0 15px rgba(0,0,0,0.5)';
    pointsFlyer.style.pointerEvents = 'none';
    pointsFlyer.style.transform = 'translate(-50%, -50%)'; // Ayuda a centrar el elemento en sus coordenadas.

    document.body.appendChild(pointsFlyer);

    const destRect = destination.getBoundingClientRect();
    const originRect = origin.getBoundingClientRect();

    // Punto de partida: Centro horizontal de la pantalla, a la altura del botón presionado.
    const startX = window.innerWidth / 2;
    const startY = originRect.top + originRect.height / 2;

    // Punto final: El centro del marcador de puntaje en el encabezado.
    const endX = destRect.left + destRect.width / 2;
    const endY = destRect.top + destRect.height / 2;

    // Secuencia de animación con GSAP para un efecto más dinámico.
    gsap.fromTo(pointsFlyer, 
        { 
            left: startX, 
            top: startY, 
            scale: 0,
            opacity: 0,
        }, 
        { 
            scale: 1.2, // Crece hasta ser grande para llamar la atención.
            opacity: 1,
            duration: 0.6, // Duración corta para un efecto de "pop".
            ease: 'power3.out',
            onComplete: () => {
                // Después de aparecer, espera un momento y luego viaja hacia el marcador.
                gsap.to(pointsFlyer, {
                    left: endX,
                    top: endY,
                    scale: 0.1, // Se encoge al llegar al destino.
                    opacity: 0,
                    duration: 1.0, // Un viaje más lento para que sea fácil de seguir.
                    ease: 'power1.in',
                    delay: 0.4, // Pausa en el centro antes de viajar.
                    onComplete: () => {
                        pointsFlyer.remove(); // Limpieza del DOM para no dejar elementos basura.
                    }
                });
            }
        }
    );
};
// <<< FIN: MODIFICACIÓN DE ANIMACIÓN DE PUNTOS >>>


async function sendResultsToBackend(data) {
    const timeToSend = data.finalTimeDisplay || formatTime(data.mainTimer);

    // Desactivar el envío a backend para la versión de prueba
    console.warn("Versión de prueba: El envío de resultados al backend está deshabilitado.");
    return;

    /*
    // Código original (comentado para deshabilitar en demo)
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('URL_QUE_COPIASTE')) {
        console.warn("URL del script no configurada. No se enviarán los datos.");
        return;
    }
    const payload = {
        teamName: data.teamName,
        totalTime: timeToSend,
        totalScore: data.score,
        missionResults: data.missionResults
    };
    try {
        const formData = new FormData();
        formData.append('payload', JSON.stringify(payload));
        
        await fetch(`${GOOGLE_SCRIPT_URL}?action=saveResults`, {
            method: 'POST',
            body: formData,
        });
    } catch (error) {
        console.error("Error al enviar la actualización al backend:", error);
    }
    */
}


async function sendBonusResultToBackend(data) {
    console.log('%c[ETAPA 3] Intentando enviar datos del bonus al backend.', 'color: #22CC22; font-size: 14px; font-weight: bold;');
    console.log('Datos que se enviarán:', data);

    // Desactivar el envío de bonus a backend para la versión de prueba
    console.warn("Versión de prueba: El envío de resultados de bonus al backend está deshabilitado.");
    return;

    /*
    // Código original (comentado para deshabilitar en demo)
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('URL_QUE_COPIASTE')) {
        console.warn("URL del script no configurada. No se enviarán los datos del bonus.");
        return;
    }

    const params = new URLSearchParams({
        action: 'saveBonusResult',
        teamName: data.teamName,
        bonusId: data.bonusId,
        points: data.points
    });

    try {
        await fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`, {
            method: 'POST'
        });
        console.log(`%cResultado del bonus ${data.bonusId} enviado (supuestamente) con éxito.`, 'color: #22CC22;');
    } catch (error) {
        console.error("Error CRÍTICO al enviar el resultado del bonus al backend:", error);
    }
    */
}


// --- NUEVO COMPONENTE: PopUpTutorial ---
const PopUpTutorial = ({ step, onClose }) => {
    const tutorialContent = {
        1: {
            title: "Paso 1: Fragmentos de Historia",
            description: "Los **Fragmentos** son tu puntaje en la misión. ¡Recoge tantos como puedas! A medida que resuelvas desafíos, tu contador de fragmentos aumentará.",
            targetElementId: "score-display" // El ID del elemento al que apunta (opcional)
        },
        2: {
            title: "Paso 2: El Tiempo General",
            description: "Este es el **tiempo total** que llevas en la misión. ¡Corre rápido, Guardián! Cada segundo cuenta para tu clasificación final.",
            targetElementId: "main-timer-display" // Necesitamos agregar un ID al timer en el Header
        },
        3: {
            title: "Paso 3: Tiempos Parciales",
            description: "Cada desafío tiene su propio **cronómetro**. Si respondes rápido, ganarás más Fragmentos. ¡La velocidad es clave para maximizar tu puntuación!",
            targetElementId: "challenge-timer"
        },
        4: {
            title: "Paso 4: ¡Inicia tu Aventura!",
            description: "Estás listo para comenzar tu primera misión. Presiona **'INICIAR'** para activar tu Guía del Tiempo y adentrarte en el legado de San Juan.",
            targetElementId: "welcome-start-button" // ID del botón de iniciar
        },
        5: {
            title: "Paso 5: Anclando Recuerdos (Misión Ancla)",
            description: "Aquí debes encontrar la **'Ancla Temporal'**. Lee la consigna y la pista para descubrir la palabra o el año exacto que debes ingresar en el campo de texto. ¡Cada respuesta correcta estabiliza la línea temporal!",
            targetElementId: "anchor-button"
        },
        6: {
            title: "Paso 6: Desafío de Trivia",
            description: "¡Es hora de la **trivia**! Elige la opción correcta de la lista. Selecciona una y luego presiona **'VERIFICAR TRANSMISIÓN'**. ¡Tu conocimiento te dará más Fragmentos!",
            targetElementId: "trivia-button"
        },
        7: {
            title: "Paso 7: Viajando en el Tiempo",
            description: "Tu Guía del Tiempo te llevará a la siguiente ubicación. Espera a que la **barra de progreso** se complete y el botón **'LLEGADA CONFIRMADA'** aparezca. ¡Haz clic para continuar tu viaje!",
            targetElementId: "en-ruta-arrival-button"
        },
        8: {
            title: "Paso 8: Distorsiones Temporales",
            description: "¡Cuidado! Las **distorsiones** son desafíos especiales. Presta atención al mensaje y responde al enigma para evitar perder Fragmentos. Si el video lo requiere, dale click al botón para activarlo. ¡Actúa rápido!",
            targetElementId: null // No hay un elemento específico, es una pantalla completa
        },
        9: {
            title: "Paso 9: Misión Completada",
            description: "¡Felicidades! Has restaurado la línea del tiempo. Aquí verás tu **total de Fragmentos**, el **Tiempo Total** de la misión y el **Concilio de Guardianes** con las mejores puntuaciones. ¡Has dejado tu marca en la historia!",
            targetElementId: "leaderboard-container"
        },
        10: {
            title: "Paso 10: Bonus de Patrocinadores",
            description: "A veces, encontrarás **misiones bonus** de nuestros patrocinadores. Estas son opcionales y te darán la oportunidad de ganar más fragmentos, ¡pero el tiempo general no se detiene! Puedes aceptar el desafío o rechazarlo.",
            targetElementId: "bonus-mission-modal-accept" // O el botón de aceptar
        }
    };

    const currentTutorial = tutorialContent[step];

    if (!currentTutorial) {
        return null;
    }

    return (
        <div className="amenaza-modal-overlay"> {/* Reutilizamos los estilos del modal de amenaza */}
            <div className="amenaza-modal-content" style={{maxWidth: '400px'}}>
                <div className="stage-container" style={{borderColor: 'var(--color-feedback-success)'}}> {/* Ajustamos el color del borde */}
                    <h3>{currentTutorial.title}</h3>
                    <p dangerouslySetInnerHTML={{ __html: currentTutorial.description }}></p>
                    <button className="primary-button" onClick={onClose}>ENTENDIDO</button>
                </div>
            </div>
        </div>
    );
};


const DistortionEventPage = ({ event, onComplete }) => {
    const [view, setView] = React.useState('visual');
    const videoRef = React.useRef(null);
    const [videoPlaying, setVideoPlaying] = React.useState(false);
    const [autoplayBlocked, setAutoplayBlocked] = React.useState(false);

    React.useEffect(() => {
        if (view !== 'visual' || !videoRef.current) return;

        // Intentar reproducir el video
        videoRef.current.play()
            .then(() => {
                setVideoPlaying(true);
                setAutoplayBlocked(false); // Autoplay succeeded
            })
            .catch(e => {
                console.warn("Autoplay bloqueado o error de reproducción:", e);
                setAutoplayBlocked(true); // Autoplay failed, show controls
                setVideoPlaying(false);
            });
        
        // Si el video termina, pasar al desafío
        const currentVideoRef = videoRef.current;
        const handleEnded = () => setView('challenge');
        currentVideoRef.addEventListener('ended', handleEnded);

        // Limpiar el event listener al desmontar o antes de un nuevo render
        return () => {
            if (currentVideoRef) {
                currentVideoRef.removeEventListener('ended', handleEnded);
            }
        };
    }, [event, view]); // Dependencias: event data and current view

    const handlePlayVideo = () => {
        if (videoRef.current) {
            videoRef.current.play().then(() => {
                setVideoPlaying(true);
                setAutoplayBlocked(false);
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

            if (isCorrect) { // Play sound for correct answer in distortion challenge
                playCorrectSound();
            } else { // Play sound for incorrect answer in distortion challenge
                playWrongSound();
            }

            setTimeout(() => onComplete({ points }), 3000);
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
            
            if (isCorrect) { // Play sound for correct answer in distortion challenge
                playCorrectSound();
            } else { // Play sound for incorrect answer in distortion challenge
                playWrongSound();
            }

            setTimeout(() => onComplete({ points }), 3000);
        };

        const handleNarrativeContinue = () => {
             if (isLocked) return;
             setIsLocked(true);
             onComplete({ points: 0 });
        }

        switch (challenge.type) {
            case 'corrupt_transmission':
                return (
                    <div className="distortion-container">
                        <h3>{challenge.title}</h3>
                        <p>{challenge.message}</p>
                        <div className="challenge-timer" id="challenge-timer">⏳ {timer}s</div>
                        <p className="distortion-challenge-text">{challenge.question}</p>
                        <input type="text" placeholder="Último dígito" value={answer} onChange={(e) => setAnswer(e.target.value)} disabled={isLocked} />
                        <button className="primary-button" onClick={() => handleSubmit(false)} disabled={isLocked}>RESPONDER</button>
                        {feedback.message && <p className={`feedback ${feedback.type}`}>{feedback.message}</p>}
                    </div>
                );
            case 'multiple_choice':
                return (
                    <div className="distortion-container">
                        <h3>{challenge.title}</h3>
                        <p>{challenge.message}</p>
                        <p className="distortion-challenge-text">{challenge.question}</p>
                        <ul className="trivia-options">
                            {challenge.options.map(option => (
                                <li 
                                    key={option} 
                                    className={selectedOption === option ? 'selected' : ''} 
                                    onClick={() => !isLocked && setSelectedOption(option)}
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                        <button className="primary-button" onClick={handleMultipleChoiceSubmit} disabled={isLocked || !selectedOption}>
                            VERIFICAR
                        </button>
                        {feedback.message && <p className={`feedback ${feedback.type}`}>{feedback.message}</p>}
                    </div>
                );
            case 'narrative_echo':
                    return (
                            <div className="distortion-container">
                                   <h3>{challenge.title}</h3>
                                   <p className="distortion-narrative-text">{challenge.message}</p>
                                   <button className="primary-button" onClick={handleNarrativeContinue} disabled={isLocked}>CONTINUAR MISIÓN...</button>
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
                        <video ref={videoRef} className="amenaza-visual" src={event.visual.src} autoPlay playsInline />
                        {autoplayBlocked && ( // Mostrar botón si autoplay es bloqueado
                            <button className="video-play-button" onClick={handlePlayVideo}>
                                ▶️ Activar Video / Sonido
                            </button>
                        )}
                        {!videoPlaying && !autoplayBlocked && ( // Mostrar mensaje de carga si no se reproduce aún y no está bloqueado
                            <p className="video-loading-message">Cargando video...</p>
                        )}
                    </>
                )}
                {view === 'visual' && event.visual.type === 'image' && (
                    <img className="amenaza-visual" src={event.visual.src} alt="Interrupción de la Amenaza" />
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
            <span id="main-timer-display" className="timer">⏳ {formatTime(timer)}</span> {/* Agregado ID para tutorial */}
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

        // Simular validación del backend para la versión de prueba
        // Para la versión de prueba, cualquier código es 'válido' y no se considera admin.
        const isValid = true; 
        const isAdmin = false; 

        if (isValid) {
            onLogin(enteredCode, enteredCode, isAdmin); // Pasar el isAdmin simulado
        } else {
            // Esto nunca debería ocurrir en la versión de prueba con la lógica actual.
            setErrorMessage('⚠️ Código de Guardián no válido. Verifica tus credenciales.');
        }
        setIsLoading(false);

        /*
        // Lógica de backend original (comentada para deshabilitar en demo)
        try {
            const validationUrl = `${GOOGLE_SCRIPT_URL}?action=validateUser&squadCode=${enteredCode}`;
            
            const response = await fetch(validationUrl, { method: 'POST' });
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor.');
            }
            const data = await response.json();

            if (data.valid) {
                onLogin(enteredCode, enteredCode, data.isAdmin);
            } else {
                setErrorMessage('⚠️ Código de Guardián no válido. Verifica tus credenciales.');
            }
        } catch (error) {
            console.error("Error de conexión al validar:", error);
            setErrorMessage('❌ Error de conexión. No se pudo verificar el código.');
        } finally {
            setIsLoading(false);
        }
        */
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

// --- NUEVO COMPONENTE DE BIENVENIDA ---
const WelcomePage = ({ teamName, onContinue, onTutorialStepComplete }) => {
    const [showContent, setShowContent] = React.useState(false);

    React.useEffect(() => {
        // Pequeño retardo para la animación de entrada
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 500); // Aparece 0.5 segundos después de cargar la página
        onTutorialStepComplete(1); // Muestra Paso 1: Explicar Fragmentos
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="welcome-container" style={{ opacity: showContent ? 1 : 0, transition: 'opacity 1s ease-in-out' }}>
            <img src="imagenes/welcome_portal.png" alt="Portal de Bienvenida" className="welcome-image"/>
            <h2>¡BIENVENIDO, GUARDIÁN <span className="team-name-welcome">{teamName}</span>!</h2>
            <p className="welcome-message">Tu Guía del Tiempo ha sido ACTIVADA. El legado de San Juan cuenta contigo para restaurar la línea temporal.</p>
            <p className="welcome-first-mission">Tu primera ancla te espera en:</p>
            <p className="welcome-location">📍 Parroquia Santa Lucía</p>
            <button id="welcome-start-button" className="primary-button welcome-button" onClick={onContinue}> {/* Agregado ID para tutorial */}
                INICIAR
            </button>
            <p className="welcome-footer">Mantén tus sentidos alerta. Cada decisión cuenta.</p>
        </div>
    );
};


const EnRutaPage = ({ nextLocation, onArrival, department, onFinishEarly, onTutorialStepComplete }) => {
    const [isTraveling, setIsTraveling] = React.useState(true);
    React.useEffect(() => {
        const travelTimer = setTimeout(() => {
            setIsTraveling(false);
            onTutorialStepComplete(7); // Muestra Paso 7 cuando el botón de llegada está activo
        }, 5000); // Reducido el tiempo de viaje para el tutorial
        return () => clearTimeout(travelTimer);
    }, []);

    // Función para limpiar el nombre de la ubicación y generar el nombre del archivo de imagen
    const getImageFileName = (locationName) => {
        // Convierte a minúsculas, elimina caracteres especiales y reemplaza espacios con guiones bajos
        return locationName.toLowerCase()
                               .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Elimina acentos
                               .replace(/[^a-z0-9\s]/g, "") // Elimina caracteres no alfanuméricos (excepto espacios)
                               .replace(/\s+/g, "") // Elimina espacios
                               .replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u') // Asegura que las tildes se manejen
                               + '.png';
    };

    const imageSrc = `imagenes/${getImageFileName(nextLocation)}`;

    return (
        <div className="en-ruta-container">
            <img src={imageSrc} alt={`Viajando a ${nextLocation}`} className="portal-image" onError={(e) => { e.target.onerror = null; e.target.src='imagenes/VIAJANDO.png'; }} />
            <h3>VIAJANDO A TRAVÉS DEL TIEMPO...</h3>
            <p>Próxima Sincronización: <strong>{nextLocation}</strong> ({department})</p>
            <p className="progress-info">Sincronizando coordenadas temporales...</p>
            <div className="progress-bar-container"><div className="progress-bar-filler"></div></div>
            <p>¡Mantén el rumbo, Guardián! Evita las 'distorsiones temporales' (¡y las multas de tránsito!).</p>
            <button id="en-ruta-arrival-button" className="primary-button" onClick={onArrival} disabled={isTraveling}>{isTraveling ? 'SINCRONIZANDO...' : 'LLEGADA CONFIRMADA'}</button> {/* Agregado ID para tutorial */}
            <button className="finish-early-button" onClick={onFinishEarly}>Terminar Aquí</button>
        </div>
    );
};

const LongTravelPage = ({ onArrival, nextDepartment, onFinishEarly }) => {
    const [isTraveling, setIsTraveling] = React.useState(true);
    
    React.useEffect(() => {
        const travelTimer = setTimeout(() => {
            setIsTraveling(false);
        }, 10000);

        return () => {
            clearTimeout(travelTimer);
        }
    }, []);
    
    const imageUrl = nextDepartment === 'Capital' ? 'imagenes/VIAJANDO1.png' : nextDepartment === 'Rivadavia' ? 'imagenes/VIAJANDO2.png' : 'imagenes/VIAJANDO.png';
    return (
        <div className="en-ruta-container">
            <img src={imageUrl} alt={`Viajando a ${nextDepartment}`} className="portal-image" />
            <h3>HORA DE VIAJAR MÁS LEJOS</h3>
            <p>Rápido, debemos movernos a <strong>{nextDepartment}</strong>, han aparecido nuevos fragmentos de la historia que debemos recoger.</p>
            <p className="progress-info">Abriendo portal de largo alcance...</p>
            <div className="progress-bar-container"><div className="progress-bar-filler"></div></div>
            <p style={{fontStyle: 'italic', fontSize: '0.9rem', opacity: 0.8}}>Es importante que respetes las señales de tránsito, hay controles secretos que pueden restarte puntos.</p>
            <button className="primary-button" onClick={onArrival} disabled={isTraveling}>{isTraveling ? 'VIAJANDO...' : 'HEMOS LLEGADO'}</button>
            <button className="finish-early-button" onClick={onFinishEarly}>Terminar Aquí</button>
        </div>
    );
};

const EndGamePage = ({ score, finalTime, teamName, onTutorialStepComplete }) => {
    React.useEffect(() => {
        onTutorialStepComplete(9); // Muestra Paso 9 al final del juego
    }, []);
    return (
        <div className="end-container">
            <img src="https://cdn-icons-png.flaticon.com/512/784/784408.png" alt="Medalla o Trofeo Guardián" className="medal-image"/>
            <h3>¡MISIÓN TEMPORAL COMPLETADA, {teamName}!</h3>
            <p>Has estabilizado la línea del tiempo de San Juan. ¡La 'Amenaza del Olvido' ha sido contenida gracias a tu escuadrón!</p>
            <p><strong>Fragmentos de Historia Restaurados: {score}</strong></p>
            <p><strong>Tiempo Total de la Misión: {finalTime}</strong></p>
            <p>¡Has ganado tu Medalla "Guardián del Tiempo"! 🏅 Los "Custodios Mayores" y otros reconocimientos serán anunciados en el Concilio de Guardianes.</p>
            <p style={{fontSize: "0.9rem", marginTop: "20px"}}><em>No olvides compartir tu hazaña y prepararte para la celebración.</em></p>
            
            <Leaderboard />
        </div>
    );
};

const AbortedGamePage = ({ score, finalTime, teamName, onTutorialStepComplete }) => {
    React.useEffect(() => {
        onTutorialStepComplete(9); // Muestra Paso 9 al final del juego (aunque sea abortado)
    }, []);
    return (
        <div className="end-container">
            <img src="https://cdn-icons-png.flaticon.com/512/784/784408.png" alt="Medalla o Trofeo Guardián" className="medal-image"/>
            <h3>MISION TEMPORAL DETENIDA</h3>
            <p><strong>{teamName}</strong></p>
            <p>Has estabilizado sólo una parte del tiempo de San Juan. ¡La ´Amenaza del Olvido´ ha logrado avanzar en la línea del tiempo.</p>
            
            <p><strong>Fragmentos de Historia Restaurados: {score}</strong></p>
            <p><strong>Tiempo Total de la Misión: {finalTime}</strong></p>
            
            <p>¡Has hecho un gran esfuerzo, tu Medalla de "Guardián del Tiempo"! 🏅 Los "Custodios Mayores" y otros reconocimientos serán anunciados en el Concilio de Guardianes.</p>
            <p style={{fontSize: "0.9rem", marginTop: "20px"}}><em>No olvides compartir tu hazaña y prepararte para la celebración.</em></p>
            
            <Leaderboard />
        </div>
    );
};

const TriviaSection = ({ stage, onComplete, onTutorialStepComplete }) => {
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
        if (stage.id === 1) { // Si es la primera trivia
            onTutorialStepComplete(6); // Muestra Paso 6
        }
    }, [stage.id]);

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

        if (isCorrect) { // Play sound for correct answer
            playCorrectSound();
        } else { // Play sound for incorrect answer
            playWrongSound();
        }

        setTimeout(() => {
            onComplete({ points: pointsWon, time: finalTime });
        }, 2500);

        if (isCorrect) {
            triggerVibration();
            animatePoints(pointsWon, 'trivia-button');
        }
    };
    return (
        <div className={`challenge-container ${glowClass}`}>
            <h3>{missionName}</h3>
            <div className="challenge-timer" id="challenge-timer">⏱️ {triviaTimer}s</div> {/* Agregado ID para tutorial */}
            <p>{challenge.question}</p>
            <ul className="trivia-options">
                {challenge.options.map(option => (
                    <li key={option} className={selectedOption === option ? 'selected' : ''} onClick={() => !feedback.message && setSelectedOption(option)}>
                        {option}
                    </li>
                ))}
            </ul>
            <button id="trivia-button" className="primary-button" onClick={handleSubmit} disabled={!selectedOption || feedback.message}>VERIFICAR TRANSMISIÓN</button>
            {feedback.message && <p className={`feedback ${feedback.type}`}>{feedback.message}</p>}
        </div>
    );
};

const AnchorSection = ({ stage, onComplete, onHintRequest, score, onTutorialStepComplete }) => {
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
        if (stage.id === 1) { // Si es la primera ancla
            onTutorialStepComplete(5); // Muestra Paso 5
        }
    }, [stage.id]);

    const handleHintRequest = () => {
        if (score >= 25 && !pistaGenerada) {
            onHintRequest();
            const pista = generarPistaDinamica(anchor.enablerKeyword);
            setPistaGenerada(pista);
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
            
            playCorrectSound(); // Play sound for correct answer

            setTimeout(() => onComplete({ points: points, time: anchorTimer }), 2500);

            triggerVibration();
            animatePoints(points, 'anchor-button');

        } else {
            const newAttemptCount = incorrectAttempts + 1;
            setIncorrectAttempts(newAttemptCount);
            setGlowClass('error-glow');
            setTimeout(() => setGlowClass(''), 1500);

            playWrongSound(); // Play sound for incorrect answer

            if (newAttemptCount >= 3) {
                setError('');
                setIsLocked(true);
                setFeedback({ message: `❌ ¡Se agotaron los intentos! La distorsión se consolida. Avanzando...`, type: 'error' });
                setTimeout(() => onComplete({ points: 0, time: anchorTimer }), 2500);
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
        playWrongSound(); // Play wrong sound on skip
        setTimeout(() => onComplete({ points: 0, time: anchorTimer }), 2500);
    };

    const handleInputChange = (e) => {
        if (error) setError('');
        if (glowClass) setGlowClass('');
        setKeyword(e.target.value);
    };

    return (
    <div className={`stage-container ${glowClass}`}>
        <h3>{anchor.missionName}</h3>
        <div className="challenge-timer" id="challenge-timer">⏱️ {anchorTimer}s</div> {/* Agregado ID para tutorial */}
        <p><strong>Departamento:</strong> {stage.department}</p>
        {anchor.transmission && <div className="transmission-box"><p><strong>📡 Transmisión Interceptada:</strong> {anchor.transmission}</p></div>}
        <p><strong>Objetivo de la Coordenada:</strong> {anchor.enabler}</p>

        {error && <p className="feedback error">{error}</p>}
        
        {!pistaGenerada && (
            <div className="hint-request-container">
                <button
                    className="primary-button"
                    onClick={handleHintRequest}
                    disabled={score < 25 || isLocked}>
                    SOLICITAR PISTA (-25 Fragmentos)
                </button>
            </div>
        )}
        
        {pistaGenerada && (
            <div className="hint-box hint-dynamic">
                <p><strong>💡 Pista Recuperada:</strong> {pistaGenerada}</p>
            </div>
        )}

        <input type="text" placeholder="Ingresa el 'Ancla Temporal'" value={keyword} onChange={handleInputChange} onKeyPress={(e) => e.key === 'Enter' && handleUnlockInternal()} disabled={isLocked} />
        
        <div className="button-group-vertical">    
            <button id="anchor-button" className="primary-button" onClick={handleUnlockInternal} disabled={isLocked}>🗝️ ANCLAR RECUERDO</button> {/* Agregado ID para tutorial */}
            
            <button className="skip-button" onClick={handleSkip} disabled={isLocked}>No sé</button>
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
            playCorrectSound(); // Play sound for correct final answer
        } else {
            setError('🚫 Código final incorrecto.');
            setGlowClass('error-glow');
            playWrongSound(); // Play sound for incorrect final answer
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
      // Desactivar la carga del ranking para la versión de prueba
      console.warn("Versión de prueba: El ranking está deshabilitado.");
      setIsLoading(false);
      setError("Ranking no disponible en la versión de prueba.");
      return;

      /*
      // Código original (comentado para deshabilitar en demo)
      if (!LEADERBOARD_URL || LEADERBOARD_URL.includes('URL_QUE_COPIASTE')) {
        setError('URL del ranking no configurada.');
        setIsLoading(false);
        return;
      }
      
      try {
        const response = await fetch(LEADERBOARD_URL);
        if (!response.ok) {
          throw new Error('La respuesta del servidor no fue correcta.');
        }
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        setRanking(data);
      } catch (err) {
        setError('No se pudo cargar el ranking. Intenta más tarde.');
        console.error("Error al obtener el ranking:", err);
      } finally {
        setIsLoading(false);
      }
      */
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
    <div id="leaderboard-container" className="leaderboard-container"> {/* Agregado ID para tutorial */}
      <h3>CONCILIO DE GUARDIANES</h3>
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

const BonusMissionModal = ({ bonusData, onComplete, onTutorialStepComplete }) => {
    const [view, setView] = React.useState('offer');
    const [feedback, setFeedback] = React.useState({ message: '', type: '' });
    const [glowClass, setGlowClass] = React.useState('');
    const [selectedOption, setSelectedOption] = React.useState('');

    React.useEffect(() => {
        onTutorialStepComplete(10); // Muestra Paso 10
    }, []);

    const handleAccept = () => {
        setView('challenge');
    };

    const handleDecline = () => {
        onComplete({ points: 0, participated: false });
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

        if (isCorrect) { // Play sound for correct answer
            playCorrectSound();
        } else { // Play sound for incorrect answer
            playWrongSound();
        }

        setTimeout(() => {
            onComplete({ points: pointsWon, participated: true });
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
                        <p>{bonusData.description}</p>
                        <a href={bonusData.mapsLink} target="_blank" rel="noopener noreferrer" className="primary-button" style={{display: 'block', textDecoration: 'none', marginBottom: '10px'}}>
                            📍 ABRIR EN GOOGLE MAPS
                        </a>
                        <div className="button-group">
                            <button className="secondary-button" onClick={handleDecline}>Rechazar Desvío</button>
                            <button id="bonus-mission-modal-accept" className="primary-button" onClick={handleAccept}>¡ACEPTO EL DESAFÍO!</button> {/* Agregado ID para tutorial */}
                        </div>
                    </div>
                )}
                {view === 'challenge' && (
                    <div className="challenge-container">
                        <h3>{bonusData.sponsorName} - Desafío</h3>
                        <p>{bonusData.challenge.question}</p>
                        <ul className="trivia-options">
                            {bonusData.challenge.options.map(option => (
                                <li key={option} className={selectedOption === option ? 'selected' : ''} onClick={() => !feedback.message && setSelectedOption(option)}>
                                    {option}
                                </li>
                            ))}
                        </ul>
                        <button className="primary-button" onClick={handleSubmitChallenge} disabled={!selectedOption || feedback.message}>
                            CONFIRMAR RESPUESTA
                        </button>
                        {feedback.message && <p className={`feedback ${feedback.type}`}>{feedback.message}</p>}
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
    // MODIFICADO: Empezar con la primera misión de nuestra lista reducida
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
    tutorialStep: null, // NUEVO ESTADO para el tutorial
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
                    return savedData.state;  
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
        if (appState.status !== 'login' && appState.status !== 'welcome' && appState.status !== 'finished' && appState.status !== 'aborted' && !appState.activeDistortionEventId && !appState.activeBonusMissionId) {
            interval = setInterval(() => {
                setAppState(prev => ({ ...prev, mainTimer: prev.mainTimer + 1 }));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [appState.status, appState.activeDistortionEventId, appState.activeBonusMissionId]);

    const currentStageData = eventData.find(m => m.id === appState.currentMissionId);
    const activeDistortionEvent = distortionEventsData.find(e => e.id === appState.activeDistortionEventId);
    const activeBonusData = appState.activeBonusMissionId ? allBonusData.find(b => b.id === appState.activeBonusMissionId) : null;

    // --- NUEVA FUNCIÓN: Manejador de tutoriales ---
    const handleTutorialStepComplete = (stepNumber) => {
        setAppState(prev => ({ ...prev, tutorialStep: stepNumber }));
    };

    const handleCloseTutorial = () => {
        // Lógica para avanzar al siguiente paso del tutorial
        let nextStep = appState.tutorialStep + 1;
        // Si el paso actual es 1, el siguiente es 2. Si es 2, el siguiente es 3, etc.
        // Si es el paso 4, ya no hay más tutoriales hasta la próxima pantalla clave.
        if (appState.tutorialStep === 1) { // Después de explicar Fragmentos
            handleTutorialStepComplete(2); // Explicar Tiempo General
        } else if (appState.tutorialStep === 2) { // Después de explicar Tiempo General
            handleTutorialStepComplete(3); // Explicar Tiempos Parciales
        } else if (appState.tutorialStep === 3) { // Después de explicar Tiempos Parciales
            handleTutorialStepComplete(4); // Explicar Botón Iniciar
        } else if (appState.tutorialStep === 4) { // Después de explicar Botón Iniciar
            setAppState(prev => ({ ...prev, tutorialStep: null })); // Cierra el tutorial, el usuario debe interactuar con el botón
        } else if (appState.tutorialStep === 5) { // Después de Ancla
            setAppState(prev => ({ ...prev, tutorialStep: null })); // Cierra el tutorial para que el usuario responda
        } else if (appState.tutorialStep === 6) { // Después de Trivia
            setAppState(prev => ({ ...prev, tutorialStep: null })); // Cierra el tutorial para que el usuario responda
        } else if (appState.tutorialStep === 7) { // Después de Viaje
            setAppState(prev => ({ ...prev, tutorialStep: null })); // Cierra el tutorial para que el usuario cliquee
        } else if (appState.tutorialStep === 8) { // Después de Distorsión
            setAppState(prev => ({ ...prev, tutorialStep: null })); // Cierra el tutorial para que el usuario responda
        } else if (appState.tutorialStep === 9) { // Después de la pantalla final
            setAppState(prev => ({ ...prev, tutorialStep: null })); // Cierra el tutorial
        } else if (appState.tutorialStep === 10) { // Después del bonus
            setAppState(prev => ({ ...prev, tutorialStep: null })); // Cierra el tutorial
        } else {
            setAppState(prev => ({ ...prev, tutorialStep: null })); // Por defecto, cierra el tutorial
        }
    };


    const handleLogin = (code, name, isAdmin = false) => {
        const initialState = getInitialState();
        const fullState = { ...initialState, status: 'welcome', squadCode: code, teamName: name, isAdmin: isAdmin }; // Almacenar isAdmin
        setAppState(fullState);
        sendResultsToBackend(fullState); // Aunque deshabilitado, la llamada está aquí.
    };
    
    // NUEVA FUNCIÓN: Para pasar de la pantalla de bienvenida a la primera misión
    const handleStartFirstMission = () => {
        setAppState(prev => ({
            ...prev,
            status: 'in_game', // Pasa al estado de juego
            subStage: 'anchor', // Y directamente a la primera ancla
            tutorialStep: null, // Asegurarse de que el tutorial se cierre si no se ha cerrado manualmente.
        }));
    };
    
    const handleAnchorComplete = (anchorResult) => {
        if (!currentStageData) return;
        const newScore = appState.score + anchorResult.points;
        setAppState(prev => ({ ...prev, score: newScore, subStage: 'trivia', pendingAnchorResult: anchorResult, tutorialStep: null })); // Cierra tutorial de ancla
    };
    
    const handleRequestHint = () => {
        setAppState(prev => ({
            ...prev,
            score: Math.max(0, prev.score - 25)
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
        tutorialStep: null // Cierra tutorial de trivia
    };

    sendResultsToBackend(baseStateForNextStep); // Aunque deshabilitado, la llamada está aquí.

    // MODIFICADO: Lógica de disparador para la versión de prueba
    // La distorsión se dispara después de la misión 8.
    // El bonus se dispara después de la misión 16.
    let triggeredEvent = null;
    let triggeredBonus = null;

    if (currentStageData.id === 8) { // Misión 8 de la lista reducida (original ID 8)
        triggeredEvent = distortionEventsData.find(e => e.trigger?.onMissionComplete === 8);
    } else if (currentStageData.id === 16) { // Misión 16 de la lista reducida (original ID 16)
        triggeredBonus = allBonusData.find(b => b.triggerMissionId === 16);
    }


    if (triggeredBonus) {
        console.log(`%c[ETAPA 1] Disparando Bonus: ${triggeredBonus.id}`, 'color: #00AACC; font-size: 14px; font-weight: bold;');
        setAppState({
            ...baseStateForNextStep,
            status: 'in_game', 
            activeBonusMissionId: triggeredBonus.id,
            tutorialStep: null, // Cierra el tutorial de la trivia, el bonus abre su propio tutorial
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
            tutorialStep: 8, // Muestra Paso 8 para la distorsión
        });
    } else {
        if (!nextMission) {
            // Si no hay siguiente misión en el eventData reducido, es el final del demo
            handleFinalComplete(0);
            return;
        }
        setAppState({ 
            ...baseStateForNextStep, 
            status: nextMission.department !== currentStageData.department ? 'long_travel' : 'on_the_road' 
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
            tutorialStep: null, // Cierra tutorial de distorsión
        }
        setAppState(newState);
        sendResultsToBackend(newState); // Aunque deshabilitado, la llamada está aquí.
    };

    const handleFinalComplete = (bonusPoints) => {
        const totalSeconds = appState.mainTimer;
        const finalTime = formatTime(totalSeconds);
        const finalScore = (appState.score || 0) + (bonusPoints || 0);
        
        const finalState = { ...appState, score: finalScore, status: 'finished', finalTimeDisplay: finalTime };
        
        setAppState(finalState);
        sendResultsToBackend(finalState); // Aunque deshabilitado, la llamada está aquí.
    };

    const handleArrival = () => {
        if (!currentStageData || typeof currentStageData.nextMissionId !== 'number') {
            // Si no hay currentStageData o nextMissionId no es un número, forzar el final.
            handleFinalComplete(0); 
            return; 
        }
        const nextMission = eventData.find(m => m.id === currentStageData.nextMissionId);
        if (nextMission) {
            setAppState(prev => ({ ...prev, currentMissionId: nextMission.id, status: 'in_game', subStage: 'anchor', tutorialStep: null })); // Cierra tutorial de viaje
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
                finalTimeDisplay: finalTime  
            };
            
            setAppState(finalState);
            sendResultsToBackend(finalState); // Aunque deshabilitado, la llamada está aquí.
        }
    };

const handleBonusModalClose = (result) => {
    console.log('%c[ETAPA 2] Se cierra el modal del bonus.', 'color: #FF6600; font-size: 14px; font-weight: bold;');
    console.log('Datos recibidos del modal:', result);

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
        activeBonusMissionId: null,
        tutorialStep: null, // Cierra el tutorial de bonus
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

    // No debería haber distorsiones después del bonus en este flujo simplificado
    // Pero mantenemos la estructura general del original por seguridad.
    const triggeredEvent = distortionEventsData.find(e => e.trigger?.onMissionComplete === currentStageData.id);

    let finalState;
    if (triggeredEvent) {
        finalState = {
            ...baseStateAfterBonus,
            status: 'distortion_event',
            activeDistortionEventId: triggeredEvent.id,
            postDistortionStatus: nextStatus,
        };
    } else {
        finalState = {
            ...baseStateAfterBonus,
            status: nextStatus
        };
    }

    setAppState(finalState);
    sendResultsToBackend(finalState); // Aunque deshabilitado, la llamada está aquí.
};
    
    // NUEVAS FUNCIONES PARA SALTO DIRECTO DE ADMIN (Mantenidas para flexibilidad de desarrollo)
    const handleAdminJumpToDistortion = (distortionId) => {
        const triggeredEvent = distortionEventsData.find(e => e.id === distortionId);
        if (triggeredEvent) {
            setAppState(prev => ({
                ...prev,
                status: 'distortion_event',
                activeDistortionEventId: triggeredEvent.id,
                postDistortionStatus: 'in_game', // Para simplicidad, volvemos al estado 'in_game' después de la distorsión del admin
                tutorialStep: 8, // Muestra Paso 8 para la distorsión
            }));
        }
    };

    const handleAdminJumpToBonus = (bonusId) => {
        const bonus = allBonusData.find(b => b.id === bonusId);
        if (bonus) {
            setAppState(prev => ({
                ...prev,
                status: 'in_game', // Mostrar el modal del bonus directamente en el estado de juego
                activeBonusMissionId: bonus.id,
                tutorialStep: 10, // Muestra Paso 10 para el bonus
            }));
        }
    };


    const renderContent = () => {
        if (appState.status === 'in_game' && !currentStageData) {
            return <p style={{padding: "20px"}}>Detectando anomalía temporal...</p>;
        }

        switch (appState.status) {
            case 'login':
                return <LoginPage onLogin={handleLogin} setErrorMessage={(msg) => setAppState(prev => ({ ...prev, errorMessage: msg }))} errorMessage={appState.errorMessage} />;
            
            case 'welcome': // NUEVO CASO para la pantalla de bienvenida
                return <WelcomePage teamName={appState.teamName} onContinue={handleStartFirstMission} onTutorialStepComplete={handleTutorialStepComplete} />;

            case 'long_travel': {
                if (!currentStageData || typeof currentStageData.nextMissionId !== 'number') {
                    // Si no hay currentStageData o nextMissionId no es un número, forzar el final.
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
                            />;
            }
            
            case 'on_the_road': {
                const nextMission = eventData.find(m => m.id === currentStageData.nextMissionId);
                if (!nextMission) {
                    return <EndGamePage score={appState.score} finalTime={appState.finalTimeDisplay} teamName={appState.teamName} onTutorialStepComplete={handleTutorialStepComplete} />;
                }
                return <EnRutaPage 
                                nextLocation={nextMission.location} 
                                department={nextMission.department} 
                                onArrival={handleArrival}
                                onFinishEarly={handleFinishEarly}
                                onTutorialStepComplete={handleTutorialStepComplete} // Pasa el handler de tutorial
                            />;
            }

            case 'in_game': {
                // En la versión de prueba, la misión 32 es la última, por lo que no tenemos 'final' type.
                // if(currentStageData.type === 'final') return <FinalSection stage={currentStageData} onComplete={handleFinalComplete} />;
                
                if (appState.subStage === 'anchor') return <AnchorSection stage={currentStageData} onComplete={handleAnchorComplete} onHintRequest={handleRequestHint} score={appState.score} onTutorialStepComplete={handleTutorialStepComplete} />;
                
                if (appState.subStage === 'trivia') return <TriviaSection stage={currentStageData} onComplete={handleTriviaComplete} onTutorialStepComplete={handleTutorialStepComplete} />;
                break;
            }

            case 'finished':
                return <EndGamePage score={appState.score} finalTime={appState.finalTimeDisplay} teamName={appState.teamName} onTutorialStepComplete={handleTutorialStepComplete} />;
            
            case 'aborted':
                return <AbortedGamePage score={appState.score} finalTime={appState.finalTimeDisplay} teamName={appState.teamName} onTutorialStepComplete={handleTutorialStepComplete} />;
            
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
            
            {activeDistortionEvent && <DistortionEventPage event={activeDistortionEvent} onComplete={handleDistortionComplete} />}
            {activeBonusData && <BonusMissionModal bonusData={{...activeBonusData, teamName: appState.teamName}} onComplete={handleBonusModalClose} onTutorialStepComplete={handleTutorialStepComplete} />}

            {/* Renderizar PopUpTutorial si appState.tutorialStep tiene un valor */}
            {appState.tutorialStep && (
                <PopUpTutorial step={appState.tutorialStep} onClose={handleCloseTutorial} />
            )}

            {/* MODIFICADO: Controles de desarrollo ahora se muestran si isAdmin es true O si el status no es 'login' para el RESET */}
            {(appState.isAdmin || appState.status !== 'login') && ( // Si es admin O no está en login (para mostrar RESET)
                <div className="dev-controls-container">
                    {appState.isAdmin && ( // Estos botones SÓLO aparecen para el admin
                        <>
                            {/* CORREGIDO: Botones de bonus de admin - ahora explícitamente listados */}
                            <button className="dev-reset-button dev-bonus" onClick={() => handleAdminJumpToBonus('bonus_portho_1')}>
                                Jump Portho
                            </button>
                            {/* Eliminados los botones para los otros bonus que ya no están en allBonusData */}
                            {/* Eliminados los botones para las distorsiones que no están en distortionEventsData */}
                            <button className="dev-reset-button dev-distortion" onClick={() => handleAdminJumpToDistortion('distorsion_2')}>
                                Jump Dist. 2
                            </button>
                        </>
                    )}
                    {/* El botón RESET (DEV) siempre visible si no está en la pantalla de login */}
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