'use strict';

const navbar =  document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navbarToggler = document.querySelector("[data-nav-toggler]");

navbarToggler.addEventListener("click", function(){
    navbar.classList.toggle("active");
    this.classList.toggle("active");
});

for(let i = 0; i < navbarLinks.length; i++)
{
    navbarLinks[i].addEventListener("click", function(){
        navbar.classList.remove("active");
        navbarToggler.classList.remove("active");
    });
}

const header = document.querySelector("[data-header]"); 

window.addEventListener("scroll", function(){
    if(window.scrollY >= 200){
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
})



const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const cursor = document.querySelector(".cursor");

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = "white";
});

window.addEventListener("mousemove", function (e) {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  cursor.style.top = x;
  cursor.style.left = y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";

    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();



// let playerState = 'idle';
// const dropdown = document.getElementById('animations');
// dropdown.addEventListener('change', function(e){
//     playerState = e.target.value;
// })

// const canvas = document.getElementById('canvas1');
// const ctx = canvas.getContext('2d');
// const CANVAS_WIDTH = canvas.width = 600;
// const CANVAS_HEIGHT = canvas.height = 600;
// const playerImage = new Image();

// playerImage.src = 'shadowdog.png';
// const spritewidth = 575 //width/nb columns  6876/12
// const spriteheight = 523 //height/nb rows  5230/10
// let gameFrame = 0
// const staggerFrames = 5;
// const spriteAnimations = [];
// const animationStates = [
//     {
//         name: 'idle',
//         frames: 7,
//     }    

// ];
// animationStates.forEach((state, index) => {
//     let frames = {
//         loc: [],
//     }
//     for(let j=0; j< state.frames; j++)
//     {
//         let positionX = j * spritewidth;
//         let positionY = index * spriteheight;
//         frames.loc.push({x: positionX, y: positionY});
//     }
//     spriteAnimations[state.name] = frames;
// });

// function animate(){
//     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//     let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
//     let framex = spritewidth * position;
//     let framey = spriteAnimations[playerState].loc[position].y;
//     ctx.drawImage(playerImage, framex, framey, spritewidth, spriteheight, 0, 0, spritewidth, spriteheight)
//     gameFrame++;
//     requestAnimationFrame(animate);
// }
// animate();