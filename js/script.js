var chess=document.getElementById("chess");
var con=chess.getContext("2d");

var me = true;
var over = false;
var wins = [];
for(var i = 0; i < 15; i++){
	wins[i] = [];
	for(var j = 0;j < 15; j++){
		wins[i][j] = [];
	}
}

//横的赢法
var count = 0;
for(var i = 0; i < 15; i++){
	for(var j = 0; j < 11; j++){
		for(var k = 0; k < 5; k++){
			wins[i][j+k][count] = true;
		}
		count++;
	}
}
//竖的赢法
for(var i = 0; i < 15; i++){
	for(var j = 0; j < 11; j++){
		for(var k = 0; k < 5; k++){
			wins[j+k][i][count] = true;
		}
		count++;
	}
}
//斜线赢法
for(var i = 0; i < 11; i++){
	for(var j = 0; j < 11; j++){
		for(var k = 0; k < 5; k++){
			wins[i+k][j+k][count] = true;
		}
		count++;
	}
}
//反斜线赢法
for(var i = 0; i < 11; i++){
	for(var j = 14; j > 3; j--){
		for(var k = 0; k < 5; k++){
			wins[i+k][j-k][count] = true;
		}
		count++;
	}
}
console.info(count);
//赢法的统计数组
var myWin = [];
var computerWin = [];
for(var i = 0; i < count; i++){
	myWin[i] = 0;
	computerWin[i] = 0;
}
var saveChess = [];
for(var i = 0; i < 15; i++){
	saveChess[i] = [];
	for(var j = 0; j < 15; j++){
		saveChess[i][j] = 0;
	}
}
con.strokeStyle="#b9b9b9";
//画出棋盘
function drawChessPan(){
for (var i = 0; i < 15;i++) {
    con.moveTo(15+i*30,15);
    con.lineTo(15+i*30,435);
    con.stroke();
    con.moveTo(15,15+i*30);
    con.lineTo(435,15+i*30);
    con.stroke();
  }
}
drawChessPan();
//drawChess(0,0,true);
//drawChess(1,1,false);
   /* con.beginPath();
    con.arc(200,200,100,0,2*Math.PI);
    con.closePath();
    var gradient1 = con.createRadialGradient(200,200,50,200,200,20);
    gradient1.addColorStop(0,"#0a0a0a");
    gradient1.addColorStop(1,"#636667");
    con.fillStyle = gradient1;
    con.fill();*/

 //画出棋子
function drawChess(j, k, me){
    con.beginPath();
    con.arc(15+j*30,15+k*30,13,0,2*Math.PI);
    con.closePath();
    var gradient = con.createRadialGradient(15+j*30+2,15+k*30-2,13,15+j*30+2,15+k*30-2,0);
    if(me){
    	gradient.addColorStop(0,"#0a0a0a");
    	gradient.addColorStop(1,"#636667");
    } else{
        gradient.addColorStop(0,"#d1d1d1");
    	gradient.addColorStop(1,"#f9f9f9");
    }
    con.fillStyle = gradient;
    con.fill();
}

//可以落子
chess.onclick = function(e) {
	if(over)
		return;
	if(!me)
		return;
	var x = e.offsetX;
	var y = e.offsetY;
	var j = Math.floor(x / 30);
	var k = Math.floor(y / 30);
	if(saveChess[j][k] == 0){
	drawChess(j, k, me);
	saveChess[j][k] = 1;
	for(var n = 0; n<count; n++){
		if(wins[j][k][n]) {
			myWin[n]++;
			//console.log(myWin[n]);
			//console.log(wins[j][k][n]);
		    computerWin[n] = 6;
		    if(myWin[n] == 5){
		    window.alert("you win!");
		    over = true;
	    }
    }
  }
  if(!over){
  	me = !me;
  	computerAI();
  }
}
}
//computerAI()实现人机对战
var computerAI = function(){

   var max=0;
   var u=0;
   var v=0;
   var mySocre = [];
   var computerSocre = [];
   for(var i=0; i<15; i++){
   	mySocre[i] = [];
   	computerSocre[i] = [];
    for(var j=0; j<15; j++){
    	mySocre[i][j] = 0;
    	computerSocre[i][j] = 0;
    }
   }
for(var i=0; i<15; i++){
	for(var j=0; j<15; j++){
		if(saveChess[i][j] == 0){
		for(var k=0; k<count; k++){
			if(wins[i][j][k]){
		    if(myWin[k] == 1){
			mySocre[i][j] += 200;
		    }
		    else if(myWin[k] == 2)
		    	mySocre[i][j] += 400;
		    else if(myWin[k] == 3)
		    	mySocre[i][j] += 2000;
		    else if(myWin[k] == 4)
		    	mySocre[i][j] += 10000;
        		if(computerWin[k] == 1){
			computerSocre[i][j] += 220;
		    }
		    else if(computerWin[k] == 2)
		    	computerSocre[i][j] += 420;
		    else if(computerWin[k] == 3)
		    	computerSocre[i][j] += 2200;
		    else if(computerWin[k] == 4)
		    	computerSocre[i][j] += 20000;
		}
		}
		if (mySocre[i][j] > max) {
			max = mySocre[i][j];
			u = i;
			v = j;
		}else if(mySocre[i][j] == max){
			if(computerSocre[i][j] > computerSocre[u][v]){
				u = i;
				v = j;
			}
		}
		if (computerSocre[i][j] > max) {
			max = computerSocre[i][j];
			u = i;
			v = j;
		}else if(computerSocre[i][j] == max){
			if(mySocre[i][j] > mySocre[u][v]){
				u = i;
				v = j;
			}
		}
	}
   	}
}
   	//if(saveChess[u][v] == 0){
drawChess(u,v,false);
console.log(u);
console.log(v);
saveChess[u][v] = 2;
	for(var n = 0; n<count; n++){
		if(wins[u][v][n]) {
			computerWin[n]++;
			//console.log(myWin[n]);
			//console.log(wins[j][k][n]);
		    myWin[n] = 6;
		    if(computerWin[n] == 5){
		    window.alert("you lost!");
		    over = true;
	    }
    }
  }
    if(!over){
  	me = !me;
  }

}