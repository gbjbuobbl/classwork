video = "";
objects = [];

function preload() {
    video = createVideo("video.mp4");
    video.hide()
}

function setup() {
    canvas = createCanvas(440,250);
    canvas.center();
}

function draw() {
    image(video,0,0,440,250);
    if(status != ""){
        objectDetector.detect(video, gotResults);
        for(i = 0; i <= objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects :"+ objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%" + objects[i].x , objects[i].y);
            noFill();
            stroke("#FF0000")
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Object";
}

function modelLoaded() {
    console.log(" model loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResults(error , results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results
}