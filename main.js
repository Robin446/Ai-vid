status = "";
objects = [];
video = "";

function preload(){
    video = createVideo("video.mp4");
    video.hide();
}
function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
}

function start(){
    object_detector = ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML = "Status: detecting objects";
}

function modelloaded(){
    console.log("model is loaded");
    status = "true";
    video.speed(1);
    video.volume(0);
    video.loop();
}

function draw(){
    image(video,0,0,480,380);
    if(status != ""){
        object_detector.detect(video,gotresult);
        for(i = 0;i < objects.length;i++){
            document.getElementById("status").innerHTML = "Status: objects detected";
            document.getElementById("number_of_objects").innerHTML = "number of objects detected are: "+objects.length;

            fill("tomato");
            noFill();
            stroke("aqua");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label +" "+percent+"%",objects[i].x +15,objects[i].y +15);
            rect(objects[i].x,objects[i].y, objects[i].width,objects[i].height)
        }
        
    }
}

function gotresult(result,error){
    if(error){
        console.error(error);
    }
    console.log(result);
    objects = result;
}