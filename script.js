//Countries and territories (Aland, Gibraltar...) For now only Europe


const countries = [
    [["Aland","Aland"],[]],
    [["Andorra","Andorre"],[]],
    [["Albania", "Albanie"],[]],
    [["Armenia", "Arménie"],[]],
    [["Austria", "Autriche"],[]],
    [["Azerbaijan", "Azerbaïdjan"],[]],
    [["Belarus", "Bélarussie"],[]],
    [["Belgium", "Belgique"],[]],
    [["Bosnia and Herzegovina", "Bosnie-Herzégovine"],[]],
    [["Bulgaria", "Bulgarie"],[]],
    [["Croatia", "Croatie"],[]],
    [["Cyprus", "Chypre"],[]],
    [["Czechia", "Tchéquie"],[]],
    [["Denmark", "Danemark"],[]],
    [["Estonia", "Estonie"],[]],
    [["Faroe", "Féroé"],[]],
    [["Finland", "Finlande"],[]],
    [["France", "France"],[]],
    [["Georgia", "Géorgie"],[]],
    [["Germany", "Allemagne"],[]],
    [["Gibraltar", "Gibraltar"],[]],
    [["Greece", "Grèce"],[]],
    [["Guernsey", "Guernesey"],[]],
    [["Hungary", "Hongrie"],[]],
    [["Iceland", "Islande"],[]],
    [["Ireland", "Irlande"],[]],
    [["Isle of Man", "Ile du Man"],[]],
    [["Italy", "Italie"],[]],
    [["Jersey", "Jersey"],[]],
    [["Kosovo", "Kosovo"],[]],
    [["Latvia", "Lettonie"],[]],
    [["Liechtenstein", "Liechtenstein"],[]],
    [["Lithuania", "Lituanie"],[]],
    [["Luxembourg", "Luxembourg"],[]],
    [["Malta", "Malte"],[]],
    [["Moldova", "Moldavie"],[]],
    [["Monaco", "Monaco"],[]],
    [["Montenegro", "Monténégro"],[]],
    [["Netherlands", "Pays-Bas"],[]],
    [["North Macedonia", "Macédoine du Nord"],[]],
    [["Norway", "Norvège"],[]],
    [["Poland", "Pologne"],[]],
    [["Portugal", "Portugal"],[]],
    [["Romania", "Roumanie"],[]],
    [["Russia", "Russie"],[]],
    [["San Marino", "Saint Marin"],[]],
    [["Serbia", "Serbie"],[]],
    [["Slovakia", "Slovaquie"],[]],
    [["Slovenia", "Slovénie"],[]],
    [["Spain", "Espagne"],[]],
    [["Sweden", "Suède"],[]],
    [["Switzerland", "Suisse"],[]],
    [["Turkey", "Turquie"],[]],
    [["Ukraine", "Ukraine"],[]],
    [["United Kingdom", "Royaume Uni"],[]],
    [["Vatican City", "Vatican"],[]]
  ];
  
  
  let language = [
    [
      "English",
      "English",
      [
        "Back",
        "New Question",
        "Delete Current",
        "Change Language",
        "Validate",
        "Train!",
      ],
    ],
    [
      "French",
      "Français",
      [
        "Retour",
        "Nouvelle Question",
        "Supprimer la liste actuel",
        "Changer de Langue",
        "Valider",
        "S'entraîner !",
      ],
    ],
  ];

let listQuestions = [];

let questionIndex;

let winningList;
let translatedWinningList;
let currentList;

let inLanguageMenu = false;

const goodAnswerColor = "#98D98B";
const goodAnswerBGColor = "#284D32";
const badAnswerColor = "#EB9181";
const badAnswerBGColor = "#52201A";

let gameScreen;
let currentLanguageIndex = 0;
let dropDownTB = [];

//---------------------------------------The Main-----------------------------

Initialization();

document.addEventListener("DOMContentLoaded", function () {
  //InitLanguage();
  InitQuestion();
  setMyKeyDownListener();
  InitDropDown();
  LanguageMenu(true);
});

//----------------------------------End - The Main-----------------------------

function Initialization() {//The function creating the questions from the txt file

  let questionRaw = { Array: [] };
  readTextFile("questions.txt", questionRaw);

  if (questionRaw.Array.length != 0) {
    // The conditions to be in a theme, and writing in questions or answer
    let makingTheme /*: boolean*/ = true;
    let makingQuestion /*: number 0, 1 or 2*/ = 0;
    let makingAnswer /*: boolean*/ = false;
    let makingPicture /*: boolean*/ = false;

    //To stop the loop. Replace by return 1 ?
    let weContinue /*: boolean*/ = true;

    // the Raw File
    let theCurrentQuestion /*: string*/ = questionRaw.Array[0];

    let aNewQuestion = ([], []); /*: aQuestion*/
    let theCurrentLanguage = "";

    //Making the questions :
    for (let i = 1; weContinue && i < questionRaw.Array.length; i++) {
      //console.log(questionRaw.Array[i]);
      if (questionRaw.Array[i] == "");
      else if (!makingTheme) {
        theCurrentQuestion = questionRaw.Array[i];
        makingTheme = true;
        aNewQuestion = ([], []);
      } else if (questionRaw.Array[i] == theCurrentQuestion) {
        makingTheme = false;
        listQuestions.push(aNewQuestion);
      } else if (questionRaw.Array[i] == "question") {
        if (makingQuestion == 0) makingQuestion = 1;
        else if (makingQuestion == 1) makingQuestion = 0;
        else weContinue = false;
      } else if (questionRaw.Array[i] == "answer") {
        makingAnswer = !makingAnswer;
      } else if (questionRaw.Array[i] == "picture") {
        makingPicture = !makingPicture;
      } else if (makingQuestion == 1) {
        theCurrentLanguage = questionRaw.Array[i];
        makingQuestion = 2;
      } else if (makingQuestion == 2) {
        if (typeof aNewQuestion[0] == "undefined")
          aNewQuestion[0] = [[theCurrentLanguage, questionRaw.Array[i]]];
        else aNewQuestion[0].push([theCurrentLanguage, questionRaw.Array[i]]);

        makingQuestion = 1;
      } else if (makingAnswer) {
        if (typeof aNewQuestion[1] == "undefined")
          aNewQuestion[1] = [questionRaw.Array[i]];
        else
          aNewQuestion[1] = AddInSortedList(
            aNewQuestion[1],
            questionRaw.Array[i]
          );
      } else if (makingPicture) {
        if (typeof aNewQuestion[2] == "undefined")
          aNewQuestion[2] = [questionRaw.Array[i]];
        else
          aNewQuestion[2] = AddInSortedList(
            aNewQuestion[2],
            questionRaw.Array[i]
          );
      }
    }
  }
  //console.log(listQuestions)
  //Question Index in countries

  
  let half;
  let notFound = true;
  let k;
  const clength = countries.length;
  for(let i = 0; i < listQuestions.length; i++)
  {
    k=0;
    //console.log(listQuestions[i][1])
    for(let j = 0; j < listQuestions[i][1].length; j++)
    {
      //console.log(listQuestions[i][1][j])
      while(k<clength && listQuestions[i][1][j].toLowerCase() != countries[k][0][0].toLowerCase() )
      {
        k++
      }
      if(k==clength)
      {
        j=listQuestions[i][1].length;
        console.log("problem with the question "+ listQuestions[i][0][0]);
      } else if (listQuestions[i][1][j].toLowerCase()==countries[k][0][0].toLowerCase())
      {
        countries[k][1].push(i)
      }
      
    }
  }
        


}

function InitQuestion() {//To get a random question from the list
  questionIndex = Math.floor(Math.random() * listQuestions.length);
  if (typeof(listQuestions[questionIndex][2])=="undefined")
  {
    document.getElementById("PicAndQuest").innerHTML = '<div id="HTMLQuestion" class="HTMLQuestion">placeholder here</div>'
    document.getElementById("HTMLQuestion").style="text-align:center;";
    console.log("undefined")
  }
  else
  {
    let randPic = listQuestions[questionIndex][2][Math.floor(Math.random() * listQuestions[questionIndex][2].length)];
    document.getElementById("PicAndQuest").innerHTML='<img id="thePic", class="thePic" src="./images/' + randPic + '">';
    document.getElementById("PicAndQuest").innerHTML += '<div id="HTMLQuestion" class="HTMLQuestion">placeholder here</div>'
    document.getElementById("HTMLQuestion").style="text-align:left;";
  }
  LanguageQuestion();
}

function LanguageQuestion() {//To set the language from the current question
  let englishQuestion;
  let currentLanguage;
  let missingLanguage = true;
  winningList = listQuestions[questionIndex][1];
  for (let i = 0; i < listQuestions[questionIndex][0].length; i++) {
    currentLanguage = listQuestions[questionIndex][0];
    if (currentLanguage[i][0] == language[currentLanguageIndex][0]) {
      document.getElementById("HTMLQuestion").innerHTML = currentLanguage[i][1];
      i = listQuestions[questionIndex][0].length;
      missingLanguage = false;
    } else if (currentLanguage[i][0] == "English") {
      englishQuestion = currentLanguage[i][1];
    }
  }
  if (missingLanguage) {
    console.log("here");
    if (englishQuestion === undefined)
      document.getElementById("HTMLQuestion").innerHTML =
        "The question doesn't exist in English nor " +
        language[currentLanguageIndex][0] +
        ". Restart another question.";
    else document.getElementById("HTMLQuestion").innerHTML = englishQuestion;
  }
}

function LanguageMenu(Init) {//To switch to the language menu (if Init True, Train! button instead of Back button)
  gameScreen = document.getElementById("main").innerHTML;
  inLanguageMenu = true;
  let theMenu = "";
  for (let i = 0; i < language.length; i++)
    theMenu +=
      '<button type="button" onclick="SetLanguage(' +
      i +
      "," +
      Init +
      ')"  class="menuButton" >' +
      language[i][1] +
      "</button>";
  document.getElementById("mainSection").innerHTML = theMenu;
  document.getElementById("mainSection").className = "menuLanguage";
  if (!Init)
    document.getElementById("theFooter").innerHTML =
      '<button type="button" onclick="Back(false)" id="back">' +
      language[currentLanguageIndex][2][0] +
      "</button>";
  else {
    document.getElementById("main").innerHTML +=
      '<br><br><section><button type="button" onclick="Back(true)" style="width:120px;" id="train">' +
      language[currentLanguageIndex][2][5] +
      "</button></section>";
    document.getElementById("theFooter").innerHTML = "";
  }
}

function SetLanguage(newIndex, Init) {//Change the language of the game
  currentLanguageIndex = newIndex;
  if (inLanguageMenu) {
    if (Init)
      document.getElementById("train").innerHTML = language[newIndex][2][5];
    else document.getElementById("back").innerHTML = language[newIndex][2][0];
  } else {
    document.getElementById("newQuestion").innerHTML = language[newIndex][2][1];
    document.getElementById("deleteCurrent").innerHTML =
      language[newIndex][2][2];
    document.getElementById("changeLanguage").innerHTML =
      language[newIndex][2][3];
    document.getElementById("validate").innerHTML = 
      language[newIndex][2][4];
    InitDropDown();
    LanguageQuestion();
  }
}

function InitDropDown() {//The dropdown for the textbox : to write the answer
  document.getElementById("propositions").innerHTML = "";
  for (let i = 0; i < countries.length; i++)
    document.getElementById("propositions").innerHTML +=
      '<option value="' + countries[i][0][currentLanguageIndex] + '">';
}

function Restart() {//The New Question Button
  document.getElementById("playerAnswerList").innerHTML = "";
  document.getElementById("theGoodAnswerList").innerHTML = "";
  document.getElementById("inputAnswer").disabled = false;
  currentList = [];
  InitQuestion();
}

function DeleteAll() {//The Delete All Button
  document.getElementById("playerAnswer").innerHTML = "";
  document.getElementById("playerAnswerList").innerHTML = "";
  currentList = [];
}

function Enter() {
  let theInput = document.getElementById("inputAnswer").value;
  let tempValue = "";

  let countryIndex = -1;
  for (let j = 0; j < countries.length; j++) {
    if (countries[j][0][currentLanguageIndex].toLowerCase() == theInput.toLowerCase()) countryIndex = j;
  }
  if (countryIndex != -1) {
    currentList = AddInSortedList(currentList, countries[countryIndex][0][currentLanguageIndex]);

    document.getElementById("playerAnswerList").innerHTML = "";
    for (let i = 0; i < currentList.length; i++) {
      tempValue =
        document.getElementById("playerAnswerList").innerHTML +
        '<tr><td id="' +
        currentList[i] +
        '">' +
        currentList[i] +
        "</td></tr>";
      document.getElementById("playerAnswerList").innerHTML = tempValue;
    }

    document.getElementById("inputAnswer").value = "";
  } else {
    console.log("Not valid");
  }
}

function Back(Init) {//The Back Button
  inLanguageMenu = false;
  document.getElementById("main").innerHTML = gameScreen;
  SetLanguage(currentLanguageIndex, Init);
}

function Validate() {//To print the answers and call Correction()

  document.getElementById("theGoodAnswerList").innerHTML = "";
  translatedWinningList = [];
  let j = 0;
  for (let i = 0; i < countries.length; i++) {
    if (winningList[j] == countries[i][0][0]) {
      translatedWinningList = AddInSortedList(
        translatedWinningList,
        countries[i][0][currentLanguageIndex]
      );
      j++;
    }
  }
  for (let i = 0; i < translatedWinningList.length; i++) {
    document.getElementById("theGoodAnswerList").innerHTML =
      document.getElementById("theGoodAnswerList").innerHTML +
      '<tr><td id="Good' +
      winningList[i] +
      '">' +
      translatedWinningList[i] +
      "</td></tr>";
  }

  document.getElementById("inputAnswer").value = "";
  document.getElementById("inputAnswer").disabled = true;
  Correction();
}

function Correction() {//To highlight the good and bad answers
  if (currentList || currentList == []) {
    let i = 0;
    let j = 0;
    console.log(currentList + ", " + translatedWinningList)
    for (; i < currentList.length || j < translatedWinningList.length; ) {
      console.log(currentList[i] + " " + translatedWinningList[j]);
      if (currentList[i] == translatedWinningList[j]) {
        document.getElementById(currentList[i]).innerHTML =
          '<p style="color:' +
          goodAnswerColor +
          ';">' +
          currentList[i] +
          "</p>";
        document.getElementById(currentList[i]).innerHTML =
          '<p style="background-color:' +
          goodAnswerBGColor +
          ';">' +
          currentList[i] +
          "</p>";
        document.getElementById("Good" + winningList[j]).innerHTML =
          '<p style="color:' +
          goodAnswerColor +
          ';">' +
          translatedWinningList[j] +
          "</p>";
        document.getElementById("Good" + winningList[j]).innerHTML =
          '<p style="background-color:' +
          goodAnswerBGColor +
          ';">' +
          translatedWinningList[j] +
          "</p>";
        i++;
        j++;
      } else if (currentList[i] < translatedWinningList[j]) {
        document.getElementById(currentList[i]).innerHTML =
          '<p style="color:' + badAnswerColor + ';">' + currentList[i] + "</p>";
        document.getElementById(currentList[i]).innerHTML =
          '<p style="background-color:' +
          badAnswerBGColor +
          ';">' +
          currentList[i] +
          "</p>";
        i++;
      } else if (currentList[i] > translatedWinningList[j]) {
        document.getElementById("Good" + winningList[j]).innerHTML =
          '<p style="color:' +
          badAnswerColor +
          ';">' +
          translatedWinningList[j] +
          "</p>";
        document.getElementById("Good" + winningList[j]).innerHTML =
          '<p style="background-color:' +
          badAnswerBGColor +
          ';">' +
          translatedWinningList[j] +
          "</p>";
        j++;
      }

      if (i == currentList.length) {
        for (; j < winningList.length; j++) {
          document.getElementById("Good" + winningList[j]).innerHTML =
            '<p style="color:' +
            badAnswerColor +
            ';">' +
            translatedWinningList[j] +
            "</p>";
          document.getElementById("Good" + winningList[j]).innerHTML =
            '<p style="background-color:' +
            badAnswerBGColor +
            ';">' +
            translatedWinningList[j] +
            "</p>";
        }
      } else if (j == winningList.length) {
        for (; i < currentList.length; i++) {
          document.getElementById(currentList[i]).innerHTML =
            '<p style="color:' +
            badAnswerColor +
            ';">' +
            currentList[i] +
            "</p>";
          document.getElementById(currentList[i]).innerHTML =
            '<p style="background-color:' +
            badAnswerBGColor +
            ';">' +
            currentList[i] +
            "</p>";
        }
      } 
    }
  }
}

function AddInSortedList(theList, theElement) {//Add in sorted list
  let newList = [];
  let elementAdded = false;
  if (theList && theList.length > 0) {
    if (theList[0] > theElement) {
      newList = [theElement].concat(theList);
      elementAdded = true;
    }
    for (let i = 0; i < theList.length && !elementAdded; i++) {
      if (theList[i] == theElement) {
        newList = theList;
        elementAdded = true;
      } else if (theList[i] > theElement) {
        newList = [].concat(
          theList.slice(0, i),
          [theElement],
          theList.slice(i)
        );
        elementAdded = true;
      }
    }
    if (!elementAdded) {
      newList = theList;
      newList.push(theElement);
    }
  } else newList = [theElement];
  return newList;
}

function setMyKeyDownListener() {//To get the enter button
  window.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
      Enter();
    }
  });
}

function readTextFile(file, newList) {//To read a txt file
  let rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        let allText = rawFile.responseText;
        newList.Array = allText.split(/\r?\n/);
      }
    }
  };

  rawFile.send(null);
}
