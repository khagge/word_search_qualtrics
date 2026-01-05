# Enhanced word search on qualtrics

This repository is a fork of the original project by [rcalinjageman](https://github.com/rcalinjageman)
The original repository can be found here: [original repository](https://github.com/rcalinjageman/word_search]).

## Purpose of this fork
This fork is being used to advance/alter the original word search task to:
- Add timer (5 minutes by default) to original word search
- Change word search to prime for cooperation (words can be found in [Stapel & Koomen 2005](https://psycnet.apa.org/record/2005-06516-010)
- Auto-advance after either all words have been found or the timer has run out
- Record the number of words found in qualtrics, and when they were found

All code can be found in qualtrics-enhanced/.

## How to use
Copy the code in the javascript files (.js) into an empty Text/Graphic question in qualtrics, toggling the "Java Script" under Question Behavior on the left side. There are two seperate files, one for the cooperation priming (code_for_qualtrics_priming.js) and one for the neutral control group (code_for_qualtrics_neutral.js). If you wanted to assign people to either of the interventions, set embedded data to be randomly 1 or 2 and make the display of the word searches conditional on which value the participant was randomly assigned to.

To record the words found you also have to add Embedded Data in the Survey flow tab in Qualtrics, if you don't modify the code significantly those Emebedded Data are called wordsFound and timingWordsFound_Clean (Note: Embedded Data is case sensitive). You can preview the word searches by previewing the questions or question block. The found words are going to turn green and be crossed off the list. 


## Current status
Work in progress. Changes are ongoing and not yet finalized.

## Notes
This repository may diverge from the original implementation.
