

$(document).ready(function () {
var options = [
	{
		question: "Who was the main villain in Friday the 13th?", 
		choice: ["Elias Voorhees", "Jason Voorhees", "Pamela Voorhees",],
		answer: 2,
		photo : "assets/images/Pamela_Voorhees.jpg"
	 },
	 {
	 	question: "Where did A Nightmare on Elm Street take place?", 
		choice: ["Springwood, Ohio", "Springfield, California", "Cunnungham County, New Jersey",],
		answer: 0,
		photo: "assets/images/Freddie-Kruger.jpg"
	 }, 
 
	{
		question: "Finish this quote: all work and no play _?", 
		choice: ["Makes Johnny a dull boy", "Makes Danny a dull boy", "Makes Jack a dull boy"],
		answer: 2,
		photo: "assets/images/Jack_Torrence.jpg"
	}, 
	{
		question: "Which Movie Premierd first? ", 
		choice: ["Frankenstien","The Wolf Man", "Dracula" ],
		answer: 2,
		photo: "assets/images/Dracula.jpg"
    },
    {
        question: "What was the name of the first horror movie?",
        choice: ["Nosferatu", "Dr. Jekyll and Mr. Hyde", "Le Manoir du Diable"],
		answer: 2 ,
		photo: "assets/images/Manoir_du_diable.jpg"
    }];

var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 20;
var intervalId;
var userGuess ="";
var running = false;
var qCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];



$("#reset").hide();

$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
	holder.push(options[i]);
}
	})

function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}

function decrement() {
	$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

	
	if (timer === 0) {
		unanswerCount++;
		stop();
		$("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
}


function stop() {
	running = false;
	clearInterval(intervalId);
}

function displayQuestion() {
	
	index = Math.floor(Math.random()*options.length);
	pick = options[index];


		$("#questionblock").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			
			userChoice.attr("data-guessvalue", i);
			$("#answerblock").append(userChoice);

}




$(".answerchoice").on("click", function () {
	
	userGuess = parseInt($(this).attr("data-guessvalue"));


	if (userGuess === pick.answer) {
		stop();
		correctCount++;
		userGuess="";
		$("#answerblock").html("<p>Correct!</p>");
		hidepicture();

	} else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#answerblock").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answerblock").empty();
		timer= 20;


	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#questionblock").empty();
		$("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
		$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerblock").empty();
	$("#questionblock").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})

})
    
