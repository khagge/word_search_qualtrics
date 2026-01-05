// This code is for the neutral condition, has 10 words to be searched and a 5 minute maximum time (which can be
// adjusted to reflect your timing). Words can be found horizontally, vertically or diagonally, no reverse.

// to use this code, copy it into an empty Text/graphic question in Qualtrics (in the java script environment)
Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/

});

Qualtrics.SurveyEngine.addOnReady(function()
{
var neutralWords = [
  "illustrate","umbrella","plant","salad","corkscrew",
  "shampoo","scissors","building","butterfly","carpet"
];

var neutralGrid = [
  ['I','C','R','C','A','R','P','E','T','T','U'],
  ['C','L','O','H','U','I','D','F','R','S','S'],
  ['O','S','L','R','U','G','Q','M','C','A','C'],
  ['B','I','H','U','K','L','T','R','K','L','I'],
  ['U','R','G','A','S','S','R','I','B','A','S'],
  ['T','M','B','U','M','T','C','E','A','D','S'],
  ['T','Q','B','Q','A','P','R','R','N','N','O'],
  ['E','E','O','R','A','F','O','A','E','T','R'],
  ['R','X','P','Z','E','W','Q','O','T','W','S'],
  ['F','N','U','R','P','L','A','N','T','E','Y'],
  ['L','H','L','X','Y','X','L','J','U','S','H'],
  ['Y','J','T','W','K','F','L','A','C','G','U'],
  ['B','U','I','L','D','I','N','G','S','G','X'],
  ['O','A','Z','C','U','R','D','Q','E','G','X']
];
	
    // Shared function to save progress
function saveProgress() {
	var score = ws.getScore();
    var timingRaw = ws.getTiming();

    var cleanTiming = [];
    for (var i = 0; i < timingRaw.length; i++) {
    	if (timingRaw[i] !== -1) {
            cleanTiming.push({word: neutralWords[i], time: timingRaw[i]});
            }
        }

        cleanTiming.sort((a,b) => a.time - b.time);

        Qualtrics.SurveyEngine.setEmbeddedData("wordsFound", score);
        Qualtrics.SurveyEngine.setEmbeddedData("timingWordsFound_Clean", JSON.stringify(cleanTiming));

        console.log("Saved score:", score);
        console.log("Clean timing:", cleanTiming);
    }	
	
	
// Make WordSearch visible to console
	// Auto-advance after all 10 words have been found
window.ws = new WordSearch({
        "grid": neutralGrid, // Your grid to search
        "words": neutralWords, // The list of words to find
        "parentId": "mysearchtask",
        "onFindWord": function() {
			if (ws.getScore() === neutralWords.length) {

            console.log("All words found — auto-advancing!");
			saveProgress();
			document.getElementById("NextButton").click();
			}
		}
});

    // Save progress on manual Next click
    jQuery("#NextButton").on("click", function() {
        saveProgress();
    });

    // Auto-advance after 5 minutes (or whatever your timer is)
    setTimeout(function() {
        console.log("5-minute timer fired — saving progress and advancing");
        saveProgress();                     // <-- this ensures partial progress is saved
        document.getElementById("NextButton").click();
    }, 5*60*1000);

    // Optional: save on page unload (in case of browser navigation)
    Qualtrics.SurveyEngine.addOnUnload(saveProgress);
});
