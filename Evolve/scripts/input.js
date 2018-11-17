var keys = [];

function controls(){
	if(keys[80]){	//P
    pause();
	}
  if(keys[82]){  //R
    resume();
  }
	if(keys[69]){  //R
		console.log(entities);
	}
}

document.body.addEventListener('keydown', function (e) {
	keys[e.keyCode] = true;
})
document.body.addEventListener('keyup', function (e) {
	keys[e.keyCode] = false;
})
