Webcam.set({
    width: 300,
    height: 250,
    image_format: 'png',
    png_quality: 90
});

Webcam.attach("#my_webcam");

function take_pic(){
    Webcam.snap(function(uri){
        document.getElementById("selfie_pic").innerHTML = "<img src= '"+uri+"' id = 'picture' >";
    });
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/MvMGeZ9B1/model.json", model_loaded);

function model_loaded(){
    console.log("Model is loaded");
}

function identify(){
    identify_pic = document.getElementById("picture");
    classifier.classify(identify_pic, got_results);
}


function got_results(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("confidence").innerHTML= "Accuracy: "+ (results[0].confidence*100).toFixed(2)+ "%";
        document.getElementById("person_name").innerHTML= "Object: " + results[0].label;
    }
}