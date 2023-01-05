//Countries and territories (Aland, Gibraltar...) For now only Europe

let countries = ["Aland","Andorra","Albania","Armenia","Austria","Azerbaijan","Belarus","Belgium",
"Bosnia and Herzegovina","Bulgaria","Croatia","Cyprus","Czechia","Denmark","Estonia","Faroe","Finland",
"France","Georgia","Germany","Gibraltar","Greece","Guernsey","Hungary","Iceland","Ireland", "Isle of Man","Italy","Jersey",
"Kosovo", "Latvia","Liechtenstein","Lithuania","Luxembourg","Malta","Moldova","Monaco","Montenegro","Netherlands",
"North Macedonia","Norway","Poland", "Portugal", "Romania","Russia","San Marino","Serbia","Slovakia",
"Slovenia","Spain","Sweden","Switzerland","Turkey","Ukraine","United Kingdom", "Vatican City"];

let frenchCountries = ["Aland", "Andorre", "Albanie", "Arménie", "Autriche", "Azerbaïdjan", "Bélarussie", 
"Belgique", "Bosnie-Herzégovine", "Bulgarie", "Croatie", "Chypre", "Tchéquie", "Danemark", "Estonie", "Féroe",
"Finlande", "France", "Géorgie", "Allemagne", "Gibraltar", "Grèce", "Guernesey", "Hongrie", "Islande", "Irlande", "Île du Man",
"Italie", "Jersey", "Kosovo", "Lettonie", "Liechtenstein", "Lituanie", "Luxembourg", "Malte", "Moldavie", "Monaco",
"Monténégro", "Pays-Bas", "Macédoine du Nord", "Norvège", "Pologne", "Portugal", "Roumanie", "Russie", "Saint-Marin",
"Serbie", "Slovaquie", "Slovénie", "Espagne", "Suède", "Suisse", "Turquie", "Ukraine", "Royaume Uni", "Vatican"];


let language = [["English", "English", countries, ["Back","New Question", "Delete Current", "Change Language", "Validate", "Train!"]],
                ["French", "Français", frenchCountries, ["Retour","Nouvelle Question", "Supprimer la liste actuel", "Changer de Langue", "Valider", "S'entraîner !"]]];




let listQuestions = [];

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

console.log("test1");


//---------------------------------------The Main-----------------------------

Initialization();

document.addEventListener('DOMContentLoaded', function() {
    //InitLanguage();
    InitQuestion();
    setMyKeyDownListener();
    InitDropDown();


    
    LanguageMenu(true)
  });


//----------------------------------End - The Main-----------------------------





function Initialization(){ //The function creating the questions from the txt file


    let questionRaw = {Array : []};
    readTextFile("questions.txt", questionRaw);

    if (questionRaw.Array.length != 0)
    {
        // The conditions to be in a theme, and writing in questions or answer
        let makingTheme /*: boolean*/ = true;
        let makingQuestion /*: number 0, 1 or 2*/ = 0;
        let makingAnswer /*: boolean*/ = false;

        //To stop the loop. Replace by return 1 ?
        let weContinue /*: boolean*/ = true;

        // the Raw File
        let theCurrentQuestion /*: string*/ = questionRaw.Array[0];

        
        let aNewQuestion = ([], []) /*: aQuestion*/;
        let theCurrentLanguage = "";

    
        //Making the questions : 
        for(let i = 1; weContinue && i < questionRaw.Array.length ; i++)
        {
            //console.log(questionRaw.Array[i]);
            if(questionRaw.Array[i] == "");
            else if(!makingTheme)
            {
                theCurrentQuestion = questionRaw.Array[i];
                makingTheme = true;
                aNewQuestion = ([],[])
            }
            else if(questionRaw.Array[i] == theCurrentQuestion)
            {
                makingTheme = false;
                listQuestions.push(aNewQuestion);
            }
            else if(questionRaw.Array[i] == "question")
            {
                if(makingQuestion == 0)
                    makingQuestion = 1;
                else if (makingQuestion == 1)
                    makingQuestion = 0;
                else
                    weContinue = false;
            }
            else if(questionRaw.Array[i] == "answer")
            {
                makingAnswer = !makingAnswer;
            }
            else if(makingQuestion == 1)
            {
                theCurrentLanguage =  questionRaw.Array[i];
                makingQuestion = 2;
            }
            else if(makingQuestion == 2)
            {
                if(typeof(aNewQuestion[0])=='undefined')
                    aNewQuestion[0]=[[theCurrentLanguage, questionRaw.Array[i]]]; 
                else
                    aNewQuestion[0].push([theCurrentLanguage, questionRaw.Array[i]]); 
                
                makingQuestion = 1;
            }
            else if(makingAnswer)
            {
                if(typeof(aNewQuestion[1])=='undefined')
                    aNewQuestion[1]=[questionRaw.Array[i]]; 
                else
                    aNewQuestion[1] = AddInSortedList(aNewQuestion[1], questionRaw.Array[i]);
            }
        }
    }

    

}

function InitQuestion(){
    let rand = Math.floor(Math.random() * listQuestions.length);
    let englishQuestion;
    let currentLanguage;
    let missingLanguage = true;
    console.log(document.getElementById("HTMLQuestion"));
    winningList=listQuestions[rand][1];
    for(let i = 0; i<listQuestions[rand].length; i++)
    {
        currentLanguage = listQuestions[rand][0][i];
        if(currentLanguage[0]==language[currentLanguageIndex])
        {
            document.getElementById("HTMLQuestion").innerHTML=currentLanguage[1];
            i=listQuestions[rand].length;
            missingLanguage=false;
        }
        else if(currentLanguage[0]=="English") 
        {
            englishQuestion = currentLanguage[1];
        }   
    }
    if(missingLanguage)
    {
        console.log("here");
        if(englishQuestion === undefined)
            document.getElementById("HTMLQuestion").innerHTML=("The question doesn't exist in English nor " + gameLanguage + ". Restart another question.");
        else
            document.getElementById("HTMLQuestion").innerHTML=englishQuestion;
    }
    
}

function InitLanguage(){
    document.getElementById("ddLanguage").innerHTML=""
    for(let i = 0; i< language.length; i++)
        document.getElementById("ddLanguage").innerHTML+=("<a class=\"ddLanguage-item\" href=\"javascript:SetLanguage('"+language[i][0]+ "')\">"+Language[i][0]+"</a>");
}
  
function SetLanguage(newIndex, Init){
    currentLanguageIndex=newIndex;
    console.log(Init)
    if (inLanguageMenu) {
        if(Init)
            document.getElementById("validate").innerHTML = language[newIndex][3][4];
        else
            document.getElementById("back").innerHTML = language[newIndex][3][0];
    }
    else{
        document.getElementById("newQuestion").innerHTML = language[newIndex][3][1];
        document.getElementById("deleteCurrent").innerHTML = language[newIndex][3][2];
        document.getElementById("changeLanguage").innerHTML = language[newIndex][3][3];
        InitDropDown()
    }
}

function LanguageMenu(Init){
    gameScreen = document.getElementById("main").innerHTML;
    inLanguageMenu = true;
    let theMenu="";
    for(let i =0;i<language.length; i++)
        theMenu+="<button type=\"button\" onclick=\"SetLanguage("+ i +","+ Init +")\">"+ language[i][1] +"</button>";
    document.getElementById("mainSection").innerHTML=theMenu;
    document.getElementById("mainSection").className="menuLanguage";
    if(!Init)
        document.getElementById("theFooter").innerHTML="<button type=\"button\" onclick=\"Back(false)\" id=\"back\">"+language[currentLanguageIndex][3][0]+"</button>";
    else
    {
        document.getElementById("main").innerHTML+="<br><br><section><button type=\"button\" onclick=\"Back(true)\" id=\"validate\">"+language[currentLanguageIndex][3][4]+"</button></section>";
        document.getElementById("theFooter").innerHTML="";
    }
        
}

function Back(Init){
    inLanguageMenu = false;
    document.getElementById("main").innerHTML = gameScreen;
    SetLanguage(currentLanguageIndex, Init);
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      let dropdowns = document.getElementsByClassName("dropdown-content");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

function InitDropDown(){
    document.getElementById("propositions").innerHTML=""
    for(let i = 0; i< language[currentLanguageIndex][2].length; i++)
       document.getElementById("propositions").innerHTML+= "<option value=\""+language[currentLanguageIndex][2][i]+"\">";
}

function Restart(){
    document.getElementById("playerAnswerList").innerHTML="";
    document.getElementById("theGoodAnswerList").innerHTML="";
    document.getElementById("inputAnswer").disabled=false;
    currentList=[];
    InitQuestion();
}

function DeleteAll(){
    document.getElementById("playerAnswer").innerHTML="";
    document.getElementById("playerAnswerList").innerHTML="";
    currentList =[];
}

function Enter(){
    let theInput = document.getElementById("inputAnswer").value;
    let tempValue = "";


    let countryIndex=-1;
    for(let j = 0 ; j<language[currentLanguageIndex][2].length;j++)
        {
            if(language[currentLanguageIndex][2][j]==theInput)
                countryIndex=j;
        }
    if (countryIndex!=-1)
    {
        currentList=AddInSortedList(currentList, theInput);

        document.getElementById("playerAnswerList").innerHTML="";
        for(let i = 0; i<currentList.length;i++)
        {
            tempValue = (document.getElementById("playerAnswerList").innerHTML+"<tr><td id=\""+currentList[i]+"\">"+currentList[i]+"</td></tr>");
            document.getElementById("playerAnswerList").innerHTML=tempValue;
        }
    
        document.getElementById("inputAnswer").value = "";
    }
    else
    {
        console.log("Not valid");
    }

    

    
}

function Validate(){

    document.getElementById("theGoodAnswerList").innerHTML="";
    
    /*for(let i = 0; i<winningList.length;i++)
        document.getElementById("theGoodAnswerList").innerHTML=(document.getElementById("theGoodAnswerList").innerHTML+"<tr><td id=\"Good"+winningList[i]+"\">"+winningList[i]+"</td></tr>");
    */
   let j = 0
   console.log(winningList)
    for(let i = 0; i<language[currentLanguageIndex][2].length;i++){
        if (winningList[j]==language[0][2][i]){
            translatedWinningList=AddInSortedList(translatedWinningList, language[currentLanguageIndex][2][i]);
            j++
        }
    }
    for(let i = 0; i<translatedWinningList.length;i++)
        document.getElementById("theGoodAnswerList").innerHTML=(document.getElementById("theGoodAnswerList").innerHTML+"<tr><td id=\"Good"+winningList[i]+"\">"+translatedWinningList[i]+"</td></tr>");

    document.getElementById("inputAnswer").value="";
    document.getElementById("inputAnswer").disabled=true;
    Correction();
}

function Correction(){
    if(currentList || currentList==[]){
        let i = 0;
        let j = 0;
    for(; (i<currentList.length || j<translatedWinningList.length);)
    {
        console.log(currentList[i] + " " + translatedWinningList[j]);
        if(currentList[i]==translatedWinningList[j])
         {
            document.getElementById(currentList[i]).innerHTML="<p style=\"color:"+goodAnswerColor+";\">"+currentList[i]+"</p>";
            document.getElementById(currentList[i]).innerHTML="<p style=\"background-color:"+goodAnswerBGColor+";\">"+currentList[i]+"</p>";
            document.getElementById("Good"+winningList[j]).innerHTML="<p style=\"color:"+goodAnswerColor+";\">"+translatedWinningList[j]+"</p>";
            document.getElementById("Good"+winningList[j]).innerHTML="<p style=\"background-color:"+goodAnswerBGColor+";\">"+translatedWinningList[j]+"</p>";
            i++;
            j++;
        }
        else if((currentList[i]<winningList[j]))
        {
            document.getElementById(currentList[i]).innerHTML="<p style=\"color:"+badAnswerColor+";\">"+currentList[i]+"</p>";
            document.getElementById(currentList[i]).innerHTML="<p style=\"background-color:"+badAnswerBGColor+";\">"+currentList[i]+"</p>";
            i++;
        }
        else if((currentList[i]>winningList[j]))
        {
            document.getElementById("Good"+winningList[j]).innerHTML="<p style=\"color:"+badAnswerColor+";\">"+translatedWinningList[j]+"</p>";
            document.getElementById("Good"+winningList[j]).innerHTML="<p style=\"background-color:"+badAnswerBGColor+";\">"+translatedWinningList[j]+"</p>";
            j++;
        }

        if (i==currentList.length)
        {
            for(;j<winningList.length;j++)
            {
                document.getElementById("Good"+winningList[j]).innerHTML="<p style=\"color:"+badAnswerColor+";\">"+translatedWinningList[j]+"</p>";
                document.getElementById("Good"+winningList[j]).innerHTML="<p style=\"background-color:"+badAnswerBGColor+";\">"+translatedWinningList[j]+"</p>";
            }
        }
        else if (j==winningList.length)
        {
            for(;i<currentList.length;i++)
            {
                document.getElementById(currentList[i]).innerHTML="<p style=\"color:"+badAnswerColor+";\">"+currentList[i]+"</p>";
                document.getElementById(currentList[i]).innerHTML="<p style=\"background-color:"+badAnswerBGColor+";\">"+currentList[i]+"</p>";
            }
        }
    }
    }
}

function AddInSortedList(theList, theElement){
    let newList = [];
    let elementAdded = false;
    if(theList && theList.length>0)
    {
        if(theList[0]>theElement)
        {
            newList = [theElement].concat(theList);
            elementAdded=true;
        }
        for(let i = 0; i<theList.length && !elementAdded;i++)
        {
            if(theList[i]==theElement)
            {
                newList = theList;
                elementAdded= true;
            }
            else if(theList[i]>theElement)
            {
                newList = [].concat(theList.slice(0, i),[theElement],theList.slice(i))
                elementAdded=true;
            }
        }
        if(!elementAdded){
            newList = theList;
            newList.push(theElement);
        }
    }
    else
        newList = [theElement];
    return newList;
}

function SortList(theList){
    if(theList && theList.length>1){
        let theMax;
        let theMaxIndex;
        let tempValue;
        console.log("List Length : " + theList.length);
        for(let i = 0; i< theList.length; i++)
        {
            console.log("Iterantion n"+i);
            console.log("Sort Length : "+(theList.length-i-1));
            theMax=theList[0];
            theMaxIndex=0;
            for(let j = 0; j< theList.length-i; j++)
            {
                if(theMax<theList[j])
                {
                    theMax=theList[j];
                    theMaxIndex=j;
                }

            }
            theList[theMaxIndex]=theList[theList.length-i];
            theList[theList.length-i]=theMax;

        }
    }
}





function setMyKeyDownListener() {
    window.addEventListener("keydown",
    function(event){
        if (event.key == "Enter"){
            Enter(); 
        }
    });
}

function readTextFile(file, newList) { //Merci StackOverflow
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function (){
        if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status == 0){
                let allText = rawFile.responseText;
                newList.Array=allText.split(/\r?\n/);
            }
        }
    }
    
    rawFile.send(null);
}
