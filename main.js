var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'en-US';


prediction_1 = "";

prediction_2 = "";

function start() {
    document.getElementById("head").innerHTML = "";
    recognition.start();
    
  
}

function end(){
    recognition.stop();
}


recognition.onresult = function (event) {

    console.log(event);
    console.log(Content);

    var Content = event.results[0][0].transcript;

    document.getElementById("head").innerHTML = Content;
    console.log(Content);
    if (Content == "take my selfie") {
        console.log("taking selfie --- ");
        speak();
    }
}


function speak() {
    var synth = window.speechSynthesis;

    speak_data = "Taking you Selfie and Identifiying It";

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    
    setTimeout(function()
    { 
        snapshot();
        check();
    },3000);
}
Webcam.set({
    width: 450,
    height: 300,
    image_format: "jpeg",
    jpeg_quality: 90,
});
webcam = document.getElementById("webcam_view");
Webcam.attach(webcam);
function snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("snapshot_view").innerHTML = "<img src='" + data_uri + "'id='captured_image'>"
    });
}
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/aaT0f8r02/model.json", modelLoaded);

function modelLoaded() {
    console.log("modelLoaded");
}
function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResults);
    document.getElementById("prediction_1","prediction_2").innerHTML="";

}
function gotResults(error, results) {

    if (error) {
        console.error(error);
    }

    else {
        console.log(results);

        prediction_1 = results[0].label;

        prediction_2 = results[1].label;

        document.getElementById("prediction_1").innerHTML = prediction_1;

        document.getElementById("prediction_2").innerHTML = prediction_2;

        if (prediction_1 == "Vulcan salute") {
            document.getElementById("prediction_1_gesture").innerHTML="&#128406;";
        }
        if (prediction_1 == "Thumbs Up"){
            document.getElementById("prediction_1_gesture").innerHTML="&#128077;";   
        }
        if (prediction_1 == "Thumbs down"){
            document.getElementById("prediction_1_gesture").innerHTML="&#128078;";   
        }
        if (prediction_1 == "Peace"){
            document.getElementById("prediction_1_gesture").innerHTML="&#9996;";   
        }
        if (prediction_1 == "hi"){
            document.getElementById("prediction_1_gesture").innerHTML="&#9995;";   
        }
        if (prediction_1 == "swag"){
            document.getElementById("prediction_1_gesture").innerHTML="&#129311;";   
        }
        if (prediction_1 == "Superb"){
            document.getElementById("prediction_1_gesture").innerHTML="&#128076;";   
        }
        if (prediction_2 == "Vulcan salute") {
            document.getElementById("prediction_2_gesture").innerHTML="&#128406;";
        }
        if (prediction_2 == "Thumbs up"){
            document.getElementById("prediction_2_gesture").innerHTML="&#128077;";   
        }
        if (prediction_2 == "Thumbs down"){
            document.getElementById("prediction_2_gesture").innerHTML="&#128078;";   
        }
        if (prediction_2 == "Peace"){
            document.getElementById("prediction_2_gesture").innerHTML="&#9996;";   
        }
        if (prediction_2 == "hi"){
            document.getElementById("prediction_2_gesture").innerHTML="&#9995;";   
        }
        if (prediction_2 == "swag"){
            document.getElementById("prediction_2_gesture").innerHTML="&#129311;";   
        }
        if (prediction_2 == "Superb"){
            document.getElementById("prediction_2_gesture").innerHTML="&#128076;";   
        }
    }
}

