//Follow Me Bolt
var canvas, context;
var width = window.innerWidth,
    height = window.innerHeight;

var _bolt = null;
var cursor = {
    x: Math.random() * width,
    y: Math.random() * height
};

function updateCursor(e) {
    cursor = {
        x: e.clientX,
        y: e.clientY
    }
}

function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    _bolt = Bolt({
        x: Math.random() * width,
        y: Math.random() * height
    });
    //Add mousemove listener
    document.body.addEventListener("mousemove", updateCursor.bind(this), false);
    document.body.addEventListener("touchstart", function(e) {
        updateCursor(e.touches[0]);
    }, false);
    document.body.addEventListener("touchmove", function(e) {
      e.preventDefault();
      updateCursor(e.touches[0])
    }, false);
}

var Bolt = function(args) {
    if (!args) var args = {};
    var _COF = 0.035; //coefficient of friction
    //Start coordinate
    this.x = args.x || 0;
    this.y = args.y || 0;
    this.angle = 0;
    this.update = function(x, y) {
        //apply friction on coords
        this.x += (x - this.x) * _COF;
        this.y += (y - this.y) * _COF;
        // Calculate angle rotation to cursor coordinate
        var dx = x - this.x;
        var dy = y - this.y;
        this.angle = Math.atan2(dy, dx);
    }
    return this;
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    _bolt.update(cursor.x, cursor.y);
    context.fillStyle = "rgb(0, 0, 0, 1)";
    context.fillRect(0, 0, width, height);
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);

    context.fillStyle = "rgb(255, 255, 255)";
    context.beginPath();
    context.moveTo(-0, 0);
    context.lineTo(-20, 6);
    context.lineTo(-20, -6);
    context.lineTo(-0, 0);
    context.closePath();
    context.fill();
    context.restore();
}

init();
animate();