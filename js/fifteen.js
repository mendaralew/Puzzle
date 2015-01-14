"use strict";

var emptyDiv;

$(document).ready(function() {
	//maintian the location of the blank space
	emptyDiv = 
    {
        x: (15 % 4) * 100,
        y: (Math.floor(15 / 4) * 100)
    };
	$("#puzzlearea div").each(function(i,divP) {

        var x = ((i % 4) * 100);
        var y = (Math.floor(i / 4) * 100);  
    
        $(divP)
        .addClass("puzzlepiece")
        .css({
            left: x + 'px',
            top: y + 'px',
            backgroundImage: 'url("background.jpg")', "background-position": -x + 'px ' + (-y) + 'px'
        })
        .click(move)
        .mouseover(preClick);
        
        divP.x = x;
        divP.y = y;
    }); 
	
    
    $('#shufflebutton').click(shuffler);
});
//moves the pieces around
function shufflePieces()
{
	$("#puzzlearea div").each(function(index,divP){
    	if(findBlank(divP))
    	{
    		divP.move = move;
    		divP.move();
    	}
        
    });
}
//calls the shufflePieces a number of times and re-shuffles the pieces
function shuffler()
{
    for (var i = 0; i < 500; i++) {
    	shufflePieces();
    }
}
/*The blank space location is returned with var location. Swap the puzzle piece with the blank location
 * Nothing happens if the findBlank returns false
 * */
function move() {
		var location = findBlank(this);
		if (location) {
			modifyBlankLocation(this);
			if (location == "right") {
				$(this).css({
					left : parseInt($(this).css("left")) + 100 + 'px',
					top: parseInt($(this).css("top")) + 'px'
				});
			} else if (location == "down") {
				$(this).css({
					left : parseInt($(this).css("left")) + 'px',
					top : parseInt($(this).css("top")) + 100 + 'px'
				});
			} else if (location == "left") {
				$(this).css({
					left : parseInt($(this).css("left")) - 100,
					top: parseInt($(this).css("top")) + 'px'
				});
			} else if (location == "top") {
				$(this).css({
					left : parseInt($(this).css("left")) + 'px',
					top : parseInt($(this).css("top")) - 100
				});
			}
		} 
}
//change the location of the black space with the swapped puzzlepiece
function modifyBlankLocation(div)
{
	emptyDiv.x = parseInt($(div).css("left")); //get the location of the previous 
	emptyDiv.y = parseInt($(div).css("top"));
	//alert(emptyDiv.x + ", " + emptyDiv.y);
}
//return the location of the blank space return false if there is no blank space as a neighbour
function findBlank(div)
{
	// if blank space is at the bottom of the clicked div
	if((parseInt($(div).css("left")) == emptyDiv.x) && ((parseInt($(div).css("top")) + 100) == emptyDiv.y))
		return "down";
	// if blank space is on the right
	else if(((parseInt($(div).css("left")) + 100) == emptyDiv.x) && (parseInt($(div).css("top")) == emptyDiv.y))
		return "right";
	// if blank space is on the left
	else if(((parseInt($(div).css("left")) - 100) == emptyDiv.x) && (parseInt($(div).css("top")) == emptyDiv.y))
	{
		return "left";
	}
	// if blank space is at the top
	else if((parseInt($(div).css("left")) == emptyDiv.x) && ((parseInt($(div).css("top")) - 100) == emptyDiv.y))
		return "top";
	else return false;
}
//Change the color of the puzzle piece if it is eligible to be swapped with the blank space
function preClick()
{
	if(findBlank(this)){
		$(this).addClass("movablepiece");
	}
	else $(this).removeClass("movablepiece");
}
