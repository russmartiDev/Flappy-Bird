document.addEventListener("DOMContentLoaded", function(event) { 
    var game = true;
    var score = 0;
    var best = 0;
    var moveAni = false;

    var bird ={x: 50, y: 250};
    var tunnel =[
        {x:300, y:-270},
        {x:300, y:380}
    ];
    
    document.querySelector("#play").addEventListener("click", play);

    function play() {
        game = true;
        document.getElementById('gameover').style.display ='none';
        bird.x = 50;
        bird.y = 250;
        tunnel[0].x = 300;
        tunnel[0].y = -270;
        tunnel[1].x = 300;
        tunnel[1].y = 380;
    }

    function gameOver() {
        if(!game) {
            if (score > best) {
                best = score;
            }
            document.getElementById('bestScore').innerHTML =best;
            document.getElementById('gameover').style.display ='block';
            var yourScore = 0;
            var id = setInterval(function() {
                if(yourScore > score) {
                    clearInterval(id);
                    score =0
                }else{
                document.getElementById('yourScore').innerHTML = yourScore
                yourScore++
                }
            }, 20)
        }   
    }

    function scores() {
        document.getElementById('score').innerHTML = score;
        if( bird.x == tunnel[0].x+50) {
            score++;
        }
    }

    function detectCollision() {
        for(var i =0; i<tunnel.length; i++) {
            if(bird.x < tunnel[i].x+60 && bird.x > tunnel[i].x-30 ) {
                if(bird.y < tunnel[0].y+500 ||bird.y > tunnel[1].y -35) {
                    console.log(tunnel[0].y, tunnel[1].y, bird.y)
                    game = false;
                }
            }
        }
    }

    function displayTunnel() {
        for(var i =0; i<tunnel.length; i++) {
            document.getElementById('tunnel'+i).style.top = tunnel[i].y+"px";
            document.getElementById('tunnel'+i).style.left =  tunnel[i].x+"px";
            tunnel[i].x-=2;
        } 
    }

    function generateTunnel() {
        var space = Math.floor(Math.random() * 250 +200);
        var space1 = (650 - space)*-1;
        var space2 = space;
        var spaces = [space1, space2];
        for(var i =0; i<tunnel.length; i++) {
            if(tunnel[i].x <-100) {
                tunnel[i].x = 400;
                tunnel[i].y =  spaces[i];
            }
        }
    }

    function displayBird() {
        document.getElementById('bird').style.top = bird.y+"px";
        document.getElementById('bird').style.left = bird.x+"px";
        if(!moveAni) {
            document.getElementById('bird').style.transform = "rotate(20deg)";
        }
    }

    function moveDownBird() {
        if(bird.y < 550) {
            bird.y +=2;
        }
    }

    function moveUpBird() {
        var move = 0;
        var id = setInterval(() => {
            if(move == 35) {
                clearInterval(id);
                moveAni=false;
            }else{
                move++;
                bird.y-=3;
                document.getElementById('bird').style.transform = "rotate(-20deg)";
                moveAni = true;
            }
            
        }, 1);
    }

    document.onkeydown = function(e) {
        if(e.keyCode == 32 && bird.y > 50) {
            moveUpBird();
        }
    }

    function gameLoop() {
        if(game) {
            generateTunnel();
            moveDownBird();
            displayTunnel();
            scores();
            displayBird();
            detectCollision();
            gameOver();
        }
    }
    
    setInterval(gameLoop,10);
});