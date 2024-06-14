// JavaScript source code
var goldbergMachine;
var height;
var width;
var active=false;
var millisP=0;
var names=["CH","GA","GP","JH","LC"];

function setup() {
    p5Div = document.getElementById("sketch-holder");
    var positionInfo = p5Div.getBoundingClientRect();
    height = positionInfo.height;
    width = positionInfo.width;
    var canvas = createCanvas(width, height);
    canvas.parent('sketch-holder');
    //Call the API here: Function getMachine
    loadJSON('https://goldberg-ff129-default-rtdb.firebaseio.com/machines/0/data.json',loadMachine);
    noStroke();
    background(250);
}

function draw() {   
    if(active){
        if(millis()-millisP>=2000){
            //loadJSON('https://goldberg-ff129-default-rtdb.firebaseio.com/machines/0/data/modules.json',updateMachine);
        }        
    }

}

function loadMachine(data){
    print(data);
    goldbergMachine = new Machine(data);
    drawMachine();
    active=true;
    millisP=millis();
}

function updateMachine(data){
    for(d=0;d<data.length;d++){
        //Inactive
        if(data[d].data.state==1){
            goldbergMachine.modules[d].red=0;
            goldbergMachine.modules[d].green=0;
            goldbergMachine.modules[d].blue=0;
        }
        //Waiting
        if(data[d].data.state==1){
            goldbergMachine.modules[d].red=255;
            goldbergMachine.modules[d].green=255;
            goldbergMachine.modules[d].blue=191;
        }
        //Active
        if(data[d].data.state==2){
            goldbergMachine.modules[d].red=171;
            goldbergMachine.modules[d].green=221;
            goldbergMachine.modules[d].blue=164;
            //Set waiting in the next module
            try{
                goldbergMachine.modules[goldbergMachine.modules[d].next].red=255;
                goldbergMachine.modules[goldbergMachine.modules[d].next].green=255;
                goldbergMachine.modules[goldbergMachine.modules[d].next].blue=191;
            }
            catch(error){

            }
        }
        //Sucessful
        if(data[d].data.state==3){
            goldbergMachine.modules[d].red=50;
            goldbergMachine.modules[d].green=136;
            goldbergMachine.modules[d].blue=189;
        }
    }
    drawMachine();
}

function drawMachine(){
    //List

    //Flow
    startD = 0.05*width;
    blockW = 0.90*width/goldbergMachine.modules.length;
    current = goldbergMachine.getHead();
    fill(goldbergMachine.modules[0].red,goldbergMachine.modules[0].green,goldbergMachine.modules[0].blue);    
    rect(startD+0.05*blockW,100,0.9*blockW,50);
    textSize(25);
    textAlign(CENTER,CENTER);
    fill(0);
    text(names[0],startD+0.05*blockW+blockW*0.45,175);    
    for (let n = 1; n < goldbergMachine.modules.length; n++){        
        triangle((startD+blockW*0.975)+blockW*(n-1),120,(startD+blockW*1.025)+blockW*(n-1),125,(startD+blockW*0.975)+blockW*(n-1),130);
        current=goldbergMachine.modules[current.next];
        fill(goldbergMachine.modules[n].red,goldbergMachine.modules[n].green,goldbergMachine.modules[n].blue);  
        rect((startD+0.05*blockW)+blockW*n,100,0.9*blockW,50);
        fill(0);
        text(names[n],(startD+0.05*blockW)+blockW*n+blockW*0.45,175);       
     }
    
}