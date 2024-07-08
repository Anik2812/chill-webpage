document.addEventListener('DOMContentLoaded', () => {
    // Three.js background
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('background').appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
    
        // Audio
        const rainSound = new Audio('./rain-sound.mp3');
        const forestSound = new Audio('./forest-sound.mp3');
        const wavesSound = new Audio('./waves-sound.mp3');
    
        const sounds = [rainSound, forestSound, wavesSound];
        let currentSound = null;
    
        function stopAllSounds() {
            sounds.forEach(sound => {
                sound.pause();
                sound.currentTime = 0;
            });
            currentSound = null;
            document.getElementById('muteButton').style.display = 'none';
        }
    
        document.querySelectorAll('.sound-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                stopAllSounds();
                const sound = sounds[Array.from(e.target.parentNode.children).indexOf(e.target)];
                sound.loop = true;
                sound.play();
                currentSound = sound;
                document.getElementById('muteButton').style.display = 'inline-block';
            });
        });
    
        // Mute button
        const muteButton = document.createElement('button');
        muteButton.id = 'muteButton';
        muteButton.textContent = 'Mute';
        muteButton.style.display = 'none';
        muteButton.addEventListener('click', stopAllSounds);
        document.querySelector('.sound-buttons').appendChild(muteButton);
    
        // Quotes
        const quotes = {
            general: [
                "Breathe deeply, and let go of your worries.",
                "In the midst of movement and chaos, keep stillness inside of you.",
                "The present moment is filled with joy and happiness. If you are attentive, you will see it.",
                "Peace comes from within. Do not seek it without.",
                "Silence is a source of great strength."
            ],
            calm: [
                "Serenity is not freedom from the storm, but peace amid the storm.",
                "The calm mind is the ultimate weapon against your challenges.",
                "Within you, there is a stillness and a sanctuary to which you can retreat at any time.",
                "Calmness is the cradle of power.",
                "The nearer a man comes to a calm mind, the closer he is to strength."
            ],
            stressed: [
                "This too shall pass.",
                "You are stronger than you think.",
                "Take life day by day and be grateful for the little things.",
                "Stress is caused by being 'here' but wanting to be 'there'.",
                "The greatest weapon against stress is our ability to choose one thought over another."
            ],
            tired: [
                "Your body is telling you it needs a break. Listen to it.",
                "Rest is not idleness, and to lie sometimes on the grass under trees on a summer's day, listening to the murmur of the water, or watching the clouds float across the sky, is by no means a waste of time.",
                "Sometimes the most productive thing you can do is relax.",
                "There is virtue in work and there is virtue in rest. Use both and overlook neither.",
                "Rest when you're weary. Refresh and renew yourself, your body, your mind, your spirit. Then get back to work."
            ]
        };
    
        function setQuoteForMood(mood) {
            const quoteElement = document.getElementById('quote');
            const moodQuotes = quotes[mood] || quotes.general;
            const randomQuote = moodQuotes[Math.floor(Math.random() * moodQuotes.length)];
            quoteElement.style.opacity = 0;
            setTimeout(() => {
                quoteElement.textContent = randomQuote;
                quoteElement.style.transition = 'opacity 1s ease-in-out';
                quoteElement.style.opacity = 1;
            }, 500);
        }
    
        document.getElementById('newQuote').addEventListener('click', () => setQuoteForMood('general'));
        setQuoteForMood('general'); // Initial quote
    
        // Mood selector
        const moodButtons = document.querySelectorAll('.mood');
        moodButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mood = e.target.getAttribute('data-mood');
                document.body.className = mood;
                
                // Update active button
                moodButtons.forEach(button => button.classList.remove('active'));
                e.target.classList.add('active');
                
                // Adjust background color of the content
                const content = document.querySelector('.content');
                switch(mood) {
                    case 'calm':
                        content.style.backgroundColor = 'rgba(26, 74, 110, 0.8)';
                        break;
                    case 'stressed':
                        content.style.backgroundColor = 'rgba(110, 26, 26, 0.8)';
                        break;
                    case 'tired':
                        content.style.backgroundColor = 'rgba(61, 26, 110, 0.8)';
                        break;
                    default:
                        content.style.backgroundColor = 'rgba(22, 33, 62, 0.8)';
                }
    
                // Set a new quote based on the mood
                setQuoteForMood(mood);
            });
        });
    
        // Breathing instructions
        const breatheCircle = document.querySelector('.breathe-circle');
        const breatheText = document.querySelector('.breathe-text');
    
        function updateBreathingInstructions() {
            const scale = window.getComputedStyle(breatheCircle).getPropertyValue('transform');
            const matrix = new DOMMatrix(scale);
            const scaleFactor = matrix.a;
    
            if (scaleFactor > 1) {
                breatheText.textContent = "Breathe in...";
            } else {
                breatheText.textContent = "Breathe out...";
            }
        }
    
        // Update breathing instructions every 100ms
        setInterval(updateBreathingInstructions, 100);
    });

     // Initial quote