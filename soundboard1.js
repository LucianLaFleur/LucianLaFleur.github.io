
// img spinner animation
const spinImage = document.getElementById('target-for-spin');
let isSpinning = false;
spinImage.addEventListener('click', () => {
    if (isSpinning) {
        spinImage.classList.remove('spin-animation');
        isSpinning = false;
    } else {
        spinImage.classList.add('spin-animation');
        isSpinning = true;
    }
});

let isAudioPlaying = false;
function startAnimation() {
    spinImage.classList.add('spin-animation');
    isSpinning = true;
}
function stopAnimation() {
    spinImage.classList.remove('spin-animation');
    isSpinning = false;
}
function updateAnimation() {
    if (isAudioPlaying && !isSpinning) {
        startAnimation();
    } else if (!isAudioPlaying && isSpinning) {
        stopAnimation();
    }
}
const audioElements = document.querySelectorAll('audio');
audioElements.forEach((audio) => {
    audio.addEventListener('play', () => {
        isAudioPlaying = true;
        updateAnimation();
    });
    audio.addEventListener('pause', () => {
        isAudioPlaying = false;
        updateAnimation();
    });
});

let currentSound
function playSound(soundFile) {
    const sound = new Audio(soundFile);
    if (sound === currentSound) {
        if (sound.paused) {
            sound.play();
            spinImage.classList.add("spin-animation");
            isSpinning = true
            audio.addEventListener("ended", function() {
                spinImage.classList.remove("spin-animation");
                isSpinning = false;
            })
        } else {
            sound.pause();
            spinImage.classList.remove("spin-animation");
            isSpinning = false;
            sound.currentTime = 0;
        }
    } else {
        // . If it's a different sound, it pauses the currentSound,
        // sets its currentTime to 0, and then starts playing the new sound.
      if (currentSound) {
            currentSound.pause();
            currentSound.currentTime = 0;
      }
        sound.play();
          // assign the currentSound to the one that's playing
        currentSound = sound;
    }
  }

// set audio source, triggering button, inner text for stop and start, and flag for prior audio to finish set to true
// so it won't interfere by default
function handleAudioPause(audio, toggleBtn, stopText, startText, finishFlag=true) {
    if (audio.paused) {
        audio.play();
        toggleBtn.innerHTML = stopText;
    } else {
        audio.pause();
        toggleBtn.innerHTML = startText;
    }
}

// Play one sound then a second one on loop
function trigger1Loop2(audioSrc1, audioSrc2, btnId) {
    var audio1 = new Audio(audioSrc1);
    var audio2 = new Audio(audioSrc2);
    audio2.loop = true;
    var audio1Finished = false;
    var audio2Playing = false;
    
    var triggerBtn = document.getElementById(btnId);

    triggerBtn.addEventListener("click", function() {
        if (!audio1Finished) {
            handleAudioPause(audio1, triggerBtn, "stop intro", "start intro", audio1Finished);
            audio1.addEventListener("ended", function() {
                audio1Finished = true;
                handleAudioPause(audio2, triggerBtn, "stop refrain", "start refrain");
            });
        } else {
            if (audio2Playing && audio1Finished) {
                handleAudioPause(audio2, triggerBtn, "stop refrain", "start refrain");
            } else if (audio1Finished) {
                audio2.play();
                audio2Playing = true;
                triggerBtn.innerHTML = "stop refrain";
            }
        }
    });
}

// Loop a single audio sound
function loopSound(audSource, buttonId, startText, stopText) {
    var audio = new Audio(audSource);
    audio.loop = true;
    
    var toggleBtn = document.getElementById(buttonId);
    
    toggleBtn.addEventListener("click", function() {
        if (audio.paused) {
            audio.play();
            toggleBtn.innerHTML = stopText;
        } else {
            audio.pause();
            toggleBtn.innerHTML = startText;
        }
    });
    
    audio.addEventListener("canplay", function() {
        toggleBtn.disabled = false;
        toggleBtn.innerHTML = startText;
    });
}

// ["./blasterFX/turret2.wav", "./blasterFX/turret1.wav"]
  
window.onload = function() {
    trigger1Loop2("./widePutinMeme1.wav", "./widePutinLoop1.wav", "wideThemeBtn")
    loopSound("./phonkWalkLoop.wav", "phonkToggleBtn", "Start Phonk", "Stop Phonking")
    loopSound("./machineFX/probeDroidDroningSound.wav", "probeDroneLoop", "Start Droning", "Stop Droning")
    loopSound("./walkerLoop1.wav", "walkerLoopBtn", "Walker Go!", "Halt Walker")
};
  
  
//  ------------------------ Turret, alternating sounds ----------------
let turretSoundIndex = 0;
const turretSoundFiles = ["./blasterFX/turret2.wav", "./blasterFX/turret1.wav"];
let rifleIndex = 0;
const rifleSoundFiles = ["./softBlastFx/blastrifle1.wav", "./softBlastFx/blastrifle2.wav"];
let clangIndex = 0;
const clangSoundFiles = ["./machineFX/clang_huge_metal5.wav", "./machineFX/clang_low_heavy1.wav"]
let missIndex = 0;
const missSoundFiles = ["./machineFX/miss_heavyswing.wav", "./machineFX/miss_cut_air1.wav"]

// duoSound(turretSoundFiles, turretSoundIndex)
function duoSound(inputArr1, indexTracker) {
    const sound = new Audio(inputArr1[indexTracker]);
    sound.play();
    
  //   modulo here is a quick way to assure the index number never exceeds length
    indexTracker = (indexTracker + 1) % inputArr1.length;
    return indexTracker
  }

//   function turretDuo() {
//     const sound = new Audio(turretSoundFiles[turretSoundIndex]);
//     sound.play();
//   //   modulo here is a quick way to assure the index number never exceeds length
//     turretSoundIndex = (turretSoundIndex + 1) % turretSoundFiles.length;
//   }
//-----------------------

const probeDroidArr = ["./machineFX/probeDroid1.wav", "./machineFX/probeDroid2.wav", "./machineFX/probeDroid3.wav", "./machineFX/probeDroid4.wav", "./machineFX/probeDroid5.wav"]
const e11BlasterArray = ["./blasterFX/laserPistol.wav", 
,"./blasterFX/ue11.wav", "./blasterFX/ue12.wav"]
const calmFlybyArr = ["./machineFX/flyby1.wav", "./machineFX/flyby2.wav", "./machineFX/flyby3.wav", "./machineFX/flyby4.wav"]
const dampenedBlasts = ["./blasterFX/reptrrico01.wav", "./blasterFX/repeat1.wav",]
const probegunArr = ["./blasterFX/sprobegun01.wav", "./blasterFX/probedroidgun01.wav"]
const explosionArr = ["./blasterFX/explode1.wav", "./blasterFX/explode2.wav", "./blasterFX/explode3.wav"]
const softBlasterArray = ["./softBlastFX/blastx5.wav", "./softBlastFX/blastx6.wav", "./softBlastFX/blastx7.wav", "./softBlastFX/blastx8.wav"]
const miscBlasterArray = ["./softBlastFX/blastx0.wav", "./softBlastFX/blastx1.wav", "./softBlastFX/blastx2.wav", "./softBlastFX/blastx4.wav"]

let prevItem = null;
let selectedItems = [];

function selectRandomItem(myArray) {
  let remainingItems = myArray.filter(item => !selectedItems.includes(item));

  if (remainingItems.length === 0) {
    // All items have been selected at least once, so reset selectedItems array
    selectedItems = [];
    remainingItems = myArray.slice();
  }

  let randomIndex = Math.floor(Math.random() * remainingItems.length);
  let randomItem = remainingItems[randomIndex];

  // when array is regenerated, could repeat the last item as the first,
  // we track the previous item to avoid that
  if (randomItem === prevItem) {
    return selectRandomItem(myArray);
  }

  selectedItems.push(randomItem);
  prevItem = randomItem;

  return randomItem;
}

// for looping
let probeDroidLoopSrc = "./machineFX/probeDroidDroningSound.wav"

//  -------------------------- Button listeners -------------------
document.getElementById("atatCannon").addEventListener("click", function() {
    playSound("./blasterFX/atatCannon.wav");
});
document.getElementById("tieBlast").addEventListener("click", function() {
    playSound("./blasterFX/tieBlast.wav");
});
document.getElementById("lazTurret").addEventListener("click", function() {
    turretSoundIndex = duoSound(turretSoundFiles, turretSoundIndex);
});
document.getElementById("randomBlasters").addEventListener("click", function() {
    playSound(selectRandomItem(e11BlasterArray));
});
document.getElementById("probeBlast").addEventListener("click", function() {
    playSound(selectRandomItem(probegunArr));
});
document.getElementById("probeDroid").addEventListener("click", function() {
    playSound(selectRandomItem(probeDroidArr));
});
document.getElementById("calmFlyby").addEventListener("click", function() {
    playSound(selectRandomItem(calmFlybyArr));
});
document.getElementById("jetPack").addEventListener("click", function() {
    playSound("./machineFX/jetPack1.wav");
});
document.getElementById("crackleBtn").addEventListener("click", function() {
    playSound("./blasterFX/remotefire01.wav");
});
document.getElementById("steamBtn").addEventListener("click", function() {
    playSound("./machineFX/steamRelease1PowerDown.wav");
});
document.getElementById("craftLanding").addEventListener("click", function() {
    playSound("./machineFX/landingUnderFire.wav");
});
document.getElementById("alarm1").addEventListener("click", function() {
    playSound("./machineFX/probeDroidAlarm1.wav");
});
document.getElementById("tieFlyby").addEventListener("click", function() {
    playSound("./machineFX/tieFlyby001.wav");
});
document.getElementById("tieShotDown").addEventListener("click", function() {
    playSound("./machineFX/tieShotOutOfSky.wav");
});
document.getElementById("speeder1").addEventListener("click", function() {
    playSound("./machineFX/shortSpeederBy.wav");
});
document.getElementById("clangDuo").addEventListener("click", function() {
    clangIndex = duoSound(clangSoundFiles, clangIndex);
});
// end of utility sounds
document.getElementById("randExplode").addEventListener("click", function() {
    playSound(selectRandomItem(explosionArr));
});
document.getElementById("medExplode1").addEventListener("click", function() {
    playSound("./blasterFX/machineDestroyed1.wav");
});
document.getElementById("shwarzTheme").addEventListener("click", function() {
    playSound("./soundDrops/starWarsThemeIntroBit.wav");
});
document.getElementById("firstOrderTheme").addEventListener("click", function() {
    playSound("./soundDrops/sarWarsImperialArrivalShort.wav");
});
document.getElementById("dropBass").addEventListener("click", function() {
    playSound("./soundDrops/dropTheBass3.wav");
});
document.getElementById("itsATrap").addEventListener("click", function() {
    playSound("./soundDrops/itsaTrap.wav");
});
// soft blast collection
document.getElementById("padmeBlastSingle").addEventListener("click", function() {
    playSound("./softBlastFX/padmeBlaster1.wav");
});
document.getElementById("padmeBlastTrio").addEventListener("click", function() {
    playSound("./softBlastFX/padmeBlasterTrio.wav");
});
document.getElementById("randShot2").addEventListener("click", function() {
    playSound(selectRandomItem(softBlasterArray));
});
document.getElementById("miscBlasts").addEventListener("click", function() {
    playSound(selectRandomItem(miscBlasterArray));
});
document.getElementById("lazRifle").addEventListener("click", function() {
    rifleIndex = duoSound(rifleSoundFiles, rifleIndex);
});
document.getElementById("reloadClink").addEventListener("click", function() {
    playSound("./machineFX/reloadClink2.wav");
});
document.getElementById("rocket1").addEventListener("click", function() {
    playSound("./machineFX/rocket_through_air2.wav");
});
document.getElementById("missDuo").addEventListener("click", function() {
    missIndex = duoSound(missSoundFiles, missIndex);
});


//--------- End Sound Section ------------------------

// Get all the dropdown header and content elements on the page
const dropdownHeaders = document.querySelectorAll('.dropdown-header');
const dropdownContents = document.querySelectorAll('.dropdown-content');

// Hide all the dropdown contents initially
dropdownContents.forEach(function(content) {
  content.style.display = 'none';
});

// Add a click event listener to each dropdown header element
dropdownHeaders.forEach(function(header) {
  header.addEventListener('click', function() {
    // Find the corresponding dropdown content element for this header
    const content = header.nextElementSibling;

    // Toggle the visibility of the dropdown content
    if (content.style.display === 'none') {
      content.style.display = 'block';
    } else {
      content.style.display = 'none';
    }
  });
});
