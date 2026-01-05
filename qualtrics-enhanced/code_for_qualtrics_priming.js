// This code is the priming version, with words from Stapel & Koomen (2005), words are hidden vertically,
// horizontally and diagonally, no reverse.
// To use this code, paste it into a text/graphic question in Qualtrics.

Qualtrics.SurveyEngine.addOnReady(function() {

    var primingWords = [
      "collective","trust","contribute","collaborate","society",
      "community","assist","share","united","support"
    ];

    var primingGrid = [
     ['C','O','L','L','A','B','O','R','A','T','E'],
     ['U','G','X','K','M','P','V','H','D','L','A'],
     ['N','B','F','T','R','U','S','T','O','C','S'],
     ['I','C','A','D','P','L','G','E','S','M','S'],
     ['T','S','O','C','I','E','T','Y','U','R','I'],
     ['E','H','C','N','O','J','W','Q','P','K','S'],
     ['D','Y','E','O','T','A','F','C','P','B','T'],
     ['S','K','U','F','M','R','L','H','O','G','Y'],
     ['H','P','S','T','Q','M','I','W','R','D','B'],
     ['A','E','R','O','S','L','U','B','T','C','V'],
     ['R','I','G','H','X','D','P','N','U','F','W'],
     ['E','O','J','C','V','A','K','Q','I','T','M'],
     ['Z','D','U','B','C','F','H','P','L','T','E'],
     ['C','O','L','L','E','C','T','I','V','E','Y']
    ];
	
    // Shared function to save progress
    function saveProgress() {
        var score = ws.getScore();
        var timingRaw = ws.getTiming();

        var cleanTiming = [];
        for (var i = 0; i < timingRaw.length; i++) {
            if (timingRaw[i] !== -1) {
                cleanTiming.push({word: primingWords[i], time: timingRaw[i]});
            }
        }

        cleanTiming.sort((a,b) => a.time - b.time);

        Qualtrics.SurveyEngine.setEmbeddedData("wordsFound", score);
        Qualtrics.SurveyEngine.setEmbeddedData("timingWordsFound_Clean", JSON.stringify(cleanTiming));

        console.log("Saved score:", score);
        console.log("Clean timing:", cleanTiming);
    }

    // Initialize WordSearch
    window.ws = new WordSearch({
        "grid": primingGrid,
        "words": primingWords,
        "parentId": "mysearchtask",
        "onFindWord": function() {
            if (ws.getScore() === primingWords.length) {
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
