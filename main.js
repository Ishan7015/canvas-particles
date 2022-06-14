const canvas = document.querySelector('canvas');
const input = document.querySelector('#input');
const c = canvas.getContext('2d');

//Canvas Resizing function
const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

//Function to get a random value between two limits;
const getRandomInteger = (minValue, maxValue) => {
    return ((Math.random() * (maxValue - minValue)) + minValue);
}

//Function to get distance between two points
const getDistance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}

const mouse = {
    x: undefined,
    y: undefined
}

let particleNumber = 50;

//Array to store particles
let particleArray = [];


window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});


//Funtion to create n particles
const createParticle = (n) => {
    for (let i = 0; i < n; i++){
        let radius = getRandomInteger(1, 5);
        let x = getRandomInteger(radius, innerWidth-radius);
        let y = getRandomInteger(radius, innerHeight-radius);
        let dx = getRandomInteger(-2, 2);
        let dy = getRandomInteger(-2, 2);
        let color = '#4d4b49';
        particleArray.push(new Particle(x, y, dx, dy, radius, color))
    }
}

const connect = () => {
    let opacity = 1;
    for (let a = 0; a < particleArray.length; a++){
        for (let b = a; b < particleArray.length; b++){
            let distance = getDistance(particleArray[a].x, particleArray[a].y, particleArray[b].x, particleArray[b].y);
            if (distance < 100) { 
                opacity = 1 - (distance / 110);
                c.strokeStyle = 'rgba(140, 85, 31,' + opacity + ')';
                c.beginPath();
                c.moveTo(particleArray[a].x, particleArray[a].y);
                c.lineTo(particleArray[b].x, particleArray[b].y);
                c.stroke();
            }
        }
    }
}

input.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        particleNumber = e.target.value;
        particleArray = [];
        createParticle(particleNumber);
        console.log(particleNumber);
    }
});

//Particle Constructor
function Particle(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = () => {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0)
            this.dx = -this.dx;
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0)
            this.dy = -this.dy;
        
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

createParticle(particleNumber);

const animate = () => {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    particleArray.forEach(particle => {
        particle.update(); 
    });
    connect();
}
animate();