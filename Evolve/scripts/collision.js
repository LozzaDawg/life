
function collisionBetweenTwoCircles (ea,eb){
	var diffx = Math.round(ea.x - eb.x);
	var diffy = Math.round(ea.y - eb.y);
	var distanceBetweenPoints = Math.sqrt((diffx*diffx) + (diffy*diffy));
	var combinedRadius = ea.r + eb.r;
	if (distanceBetweenPoints < combinedRadius){
		return true;
	}
	return false
}

function futureCollisionBetweenTwoCircles (ea,eb)
{
	var diffx = Math.round((ea.x + ea.xVel) - (eb.x + eb.xVel));
	var diffy = Math.round((ea.y + ea.yVel) - (eb.y + eb.yVel));
	var distanceBetweenPoints = Math.sqrt((diffx*diffx) + (diffy*diffy));
	//console.log("diffx :"+diffx+", diffy: "+diffy+". Distance: "+distanceBetweenPoints);
	var combinedRadius = ea.r + eb.r;
	if (distanceBetweenPoints < combinedRadius){

		return true;
	}
	return false
}


function futureCollisioNewRadius (ea,ear,eb)
{
	var diffx = Math.round((ea.x) - (eb.x));
	var diffy = Math.round((ea.y) - (eb.y));
	var distanceBetweenPoints = Math.sqrt((diffx*diffx) + (diffy*diffy));
	//console.log("diffx :"+diffx+", diffy: "+diffy+". Distance: "+distanceBetweenPoints);
	var combinedRadius = ear + eb.r;
	if (distanceBetweenPoints < combinedRadius){

		return true;
	}
	return false
}
