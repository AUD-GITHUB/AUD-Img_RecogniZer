
Webcam.set({
    width : 400,
    height : 300,
    image_format : 'png',
    png_quality : 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function clickImg(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img src = "' + data_uri + '" id = "result_img">';
    });
}

console.log('ml5.version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/q6UBba9pQ/model.json',modelLoaded);

function modelLoaded(){
    console.log("The model has been loaded");
}

function identifyImg(){
    img = document.getElementById("result_img");
    classifier.classify(img, gotResult);
}

result_object = document.getElementById("result_object");
result_accuracy = document.getElementById("result_accuracy");

function gotResult(error,results){
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        result_object.style.visibility = 'visible';
        result_accuracy.style.visibility = 'visible';
        result_object.innerHTML = results[0].label;
        result_accuracy.innerHTML = results[0].confidence.toFixed(3) * 100 + "%";
    }
}