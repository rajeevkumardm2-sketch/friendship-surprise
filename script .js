const scenes = document.querySelectorAll(".scene");
const music = document.getElementById("bgMusic");
const rainContainer = document.getElementById("kitkat-rain");

let started = false;
let rainStarted = false;

// Start Experience
function startExperience(){

    if(started) return;

    started = true;

    music.volume = 0.25;

    music.play().catch(()=>{
        console.log("Music permission required");
    });

    startKitKatRain();

    setTimeout(()=>showScene(2),5000);
    setTimeout(()=>showScene(3),10000);
    setTimeout(()=>showScene(4),18000);
    setTimeout(()=>showScene(5),28000);
    setTimeout(()=>showScene(6),38000);
    setTimeout(()=>showScene(7),48000);
    setTimeout(()=>showScene(8),95000);

}


// Scene Change
function showScene(number){

    scenes.forEach(scene=>{
        scene.classList.remove("active");
    });

    const current=document.getElementById("scene"+number);

    if(current){
        current.classList.add("active");
    }

}


// Letter
function openLetter(){

    const letter=document.getElementById("letter");

    letter.style.display="block";

    event.target.style.display="none";

}/* ===========================
   KITKAT RAIN
=========================== */

function createKitKat(){

    const kitkat = document.createElement("img");

    kitkat.src = "kitkat.png";

    kitkat.className = "kitkat";

    kitkat.style.left = Math.random() * window.innerWidth + "px";

    kitkat.style.width = (28 + Math.random() * 25) + "px";

    kitkat.style.animationDuration = (4 + Math.random() * 3) + "s";

    rainContainer.appendChild(kitkat);

    setTimeout(()=>{
        kitkat.remove();
    },7000);

}

function startKitKatRain(){

    if(rainStarted) return;

    rainStarted = true;

    setInterval(createKitKat,200); // 5 KitKat per second

}

window.addEventListener("resize",()=>{

    // Rain continues normally after resize

});/* ===========================
   OPTIONAL EFFECTS
=========================== */

// Pause rain when tab is hidden
document.addEventListener("visibilitychange",()=>{

    if(document.hidden){
        music.pause();
    }else if(started){
        music.play().catch(()=>{});
    }

});

// Prevent accidental double click
document.addEventListener("contextmenu",(e)=>{
    e.preventDefault();
});

// End
console.log("Friendship Day Experience Loaded ❤️");