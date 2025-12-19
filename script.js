// 1. Seeded Random Function (Ensures the same name always gets the same random message)
function mulberry32(a) {
    return function() {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

// 2. Helper to turn the Name into a Number (Seed)
function getSeed(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0; 
    }
    return Math.abs(hash);
}

function getRating(input) {
    const seed = getSeed(input.trim().toLowerCase());
    const rand = mulberry32(seed); // Initialize the random generator with the seed
    
    // Generate the score (0-1000) using the seeded random
    const score = Math.floor(rand() * 1001);

    // 3. The Dictionary of Varied Responses
    const categories = [
        { 
            min: 900, 
            color: "#FFD700", 
            messages: [
                "Infinite Aura. Basically the Main Character. 👑",
                "Bro is so Sigma he doesn't use doors, he walks through walls. 🗿",
                "Final Boss energy detected. 100% completionist.",
                "The CEO of Rizz. Everyone else is just an intern."
            ]
        },
        { 
            min: 700, 
            color: "#00FFCC", 
            messages: [
                "Certified Sigma. Energy is off the charts. 🗿",
                "W Profile. Respect levels are peaking.",
                "Massive Aura boost. You're cooking with fire.",
                "Solid vibes. You'd survive a horror movie."
            ]
        },
        { 
            min: 400, 
            color: "#BBBBBB", 
            messages: [
                "NPC Energy. You're a background character in GTA. 😐",
                "Average Vibe. You definitely like plain oatmeal.",
                "Default skin detected. Try adding some flavor.",
                "You're the person who claps when the plane lands."
            ]
        },
        { 
            min: 0,   
            color: "#FF4444", 
            messages: [
                "Negative Aura. Don't ever cook again. 💀",
                "Straight to the Ohio dungeons. 0/100.",
                "Cooked. Absolute zero rizz detected.",
                "Your vibe is a damp sock. Tragic."
            ]
        }
    ];

    // Find the right category based on the score
    const category = categories.find(m => score >= m.min);
    
    // Pick a message from that category's list using the seeded random
    const messageIndex = Math.floor(rand() * category.messages.length);
    const text = category.messages[messageIndex];

    return { score, text, color: category.color };
}

// The rest of your functions (startAnalysis, displayResult, reset) stay the same!
function startAnalysis() {
    const name = document.getElementById('username').value;
    if (!name) return;

    document.getElementById('input-screen').classList.add('hidden');
    document.getElementById('loading-screen').classList.remove('hidden');

    setTimeout(() => {
        const result = getRating(name);
        displayResult(name, result);
    }, 2000);
}

function displayResult(name, result) {
    document.getElementById('loading-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    
    document.getElementById('display-name').innerText = name.toUpperCase();
    document.getElementById('score-display').innerText = result.score;
    document.getElementById('score-display').style.color = result.color;
    document.getElementById('verdict-text').innerText = result.text;
}

function reset() {
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('input-screen').classList.remove('hidden');
    document.getElementById('username').value = '';
}