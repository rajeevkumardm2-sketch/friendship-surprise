const scenes = document.querySelectorAll(".scene");
const music = document.getElementById("bgMusic");

let started = false;


// Start Experience
function startExperience(){

    if(started) return;

    started = true;

    // Music start
    music.volume = 0.25;

    music.play().catch(()=>{
        console.log("Music waiting for permission");
    });


    // Scene timings (1:48 music ke hisaab se)

    setTimeout(()=>{
        showScene(2);
    },5000);


    setTimeout(()=>{
        showScene(3);
    },10000);


    setTimeout(()=>{
        showScene(4);
    },18000);


    setTimeout(()=>{
        showScene(5);
    },28000);


    setTimeout(()=>{
        showScene(6);
    },38000);


    setTimeout(()=>{
        showScene(7);
    },48000);

}



// Change Scene

function showScene(number){

    scenes.forEach(scene=>{
        scene.classList.remove("active");
    });


    const current =
    document.getElementById("scene"+number);


    if(current){
        current.classList.add("active");
    }

}



// Open Letter

function openLetter(){

    const letter =
    document.getElementById("letter");


    letter.style.display="block";


    // Button hide after opening

    event.target.style.display="none";

}



// Final scene after letter reading time

setTimeout(()=>{

    if(started){

        showScene(8);

    }

},95000);