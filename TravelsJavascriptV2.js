//general code//

var index = 1;
var prevIndex ;
var nextIndex = 2;
var landingPageSlideshowTimer = 2500 ;
var destinationPageSlideShowTimer = 3500 ;
var autoAdvanceSlide ;
var auto ;

var id1 ;
var id2 ;
var id3 ;
var fileLocation1 ;
var fileLocation2 ;
var totalImages ;
var forward ;
var firstTimeClick ; 
var toggleUpdate;


function resetIndex(totalImages){
    index = 1;
    nextIndex = 2;
    prevIndex = totalImages;
    firstTimeClick = true ;
    toggleUpdate=1;
}

function changeIndex(forward,totalImages){

//increment index//
    if(forward == true && index < totalImages){
        index++;

    }
    else if(forward == true && index === totalImages){
        index = 1;
    }
    else if(forward == false && index > 1 ){
        index--;
    }
    else{
        index = totalImages;
    }

//increment prev + next index//

    if(index < totalImages && index > 1){ 
        nextIndex = index +1 ; 
        prevIndex = index -1 ;
    }
    else if(index === totalImages){
        nextIndex = 1 ; 
        prevIndex = index -1 ;
    }
    else if(index === 1 ){
        nextIndex = index +1 ; 
        prevIndex = totalImages ;
    }
    
    console.log(index);
}

// Landing page//

function landingPageCarasel(totalImages){
    
    resetIndex(totalImages);

    id1 = "portraitImage" ;
    id2 = "landscapeImage" ;
    id3 = "landscapeImage2" ;
    prevIndex = totalImages ;
    fileLocation1 = ".\\images\\landingPageImages\\a (" ;
    fileLocation2 = ".\\images\\landingPageImages\\b (" ;

    setInterval( "changeIndex(true,14)", landingPageSlideshowTimer );
    setInterval( "updateLandingPagePictures(id1,id2,id3,fileLocation1,fileLocation2)", landingPageSlideshowTimer);
    
}

function updateLandingPagePictures(id1,id2,id3,fileLocation1,fileLocation2){

    if(toggleUpdate===1){
        document.getElementById(id1).src= fileLocation1 + index + ").jpg";
        toggleUpdate = 2;
    }
    else if(toggleUpdate===2){
        document.getElementById(id2).src= fileLocation2 + index + ").jpg"; 
        toggleUpdate = 3;
    }
    else{
        document.getElementById(id3).src= fileLocation2 + index + ").jpg"; 
        toggleUpdate = 1;
    }
}

// This is for each destination page//

function destinationChangeImage(forward,advancedByAuto){

    id1 = "previousImages" ;
    id2 = "bigImages" ;
    id3 = "nextImages" ;
    fileLocation1 = "a (";
    auto = advancedByAuto ;
    if(firstTimeClick===true){
        totalImages = prevIndex;

    }
   changeIndex(forward,totalImages);
   updateDestinationPageImage(id1,id2,id3,fileLocation1);
   if(auto===false){autoAdvanceStop();}
}

function updateDestinationPageImage(id1,id2,id3,fileLocation1){

    document.getElementById(id1).src= fileLocation1 + prevIndex + ").jpg";   
    document.getElementById(id2).src= fileLocation1 + index + ").jpg"; 
    document.getElementById(id3).src= fileLocation1 + nextIndex + ").jpg";  
    document.getElementById("index").innerHTML = index ;
    firstTimeClick = false ;
}

// Automatically advance slides buttons //

function autoAdvanceStart(){
    auto = true;
    autoAdvanceSlide = setInterval("destinationChangeImage(true)", destinationPageSlideShowTimer);
    document.getElementById("fasterButton").style.display="block";
    document.getElementById("slowerButton").style.display="block";
    document.getElementById("stopButton").style.display="block";
    document.getElementById("playButton").style.display="none";
    document.getElementById("timerText").style.display="block";
}

function autoAdvanceStop(){
    clearInterval(autoAdvanceSlide) ;
    document.getElementById("fasterButton").style.display="none";
    document.getElementById("slowerButton").style.display="none";
    document.getElementById("stopButton").style.display="none";
    document.getElementById("playButton").style.display="block";
    document.getElementById("timerText").style.display="none";
}

function destinationPageSlideShowTimerFaster(){
    clearInterval(autoAdvanceSlide) ;

    if(destinationPageSlideShowTimer >= 1000 ){
        destinationPageSlideShowTimer = destinationPageSlideShowTimer - 1000 ;
    }
    
    autoAdvanceSlide = setInterval("destinationChangeImage(true)", destinationPageSlideShowTimer);

}

function destinationPageSlideShowTimerSlower(){
    clearInterval(autoAdvanceSlide) ;

    destinationPageSlideShowTimer = destinationPageSlideShowTimer + 1000 ;
    
    autoAdvanceSlide = setInterval("destinationChangeImage(true)", destinationPageSlideShowTimer);

}
