
console.log("test0");
/*
class langQuestion{
    language : string | null;
    theQuestion : string | null;
}
class aQuestion{
    questions : langQuestion[] | null;
    answers : string[] | null;
}

let listQuestions : aQuestion[];
*/
console.log("test1");
test();

function test(){
    console.log("AAAAAAAAAAAAA");
}

/*
Initialization();


console.log("test3");





function Initialization(){

    console.log("test2");

    let questionRaw = {Array : []};
    readTextFile("questions.txt", questionRaw);
    console.log(questionRaw);

    if (questionRaw.Array.length != 0)
    {
        let makingTheme : boolean = false;
        let makingQuestion : number = 0;
        let makingAnswer : boolean = false;
        let weContinue : boolean = true;
        let theCurrentQuestion : string = questionRaw.Array[0];

        let aLangQuestion : langQuestion ={language : null, theQuestion : null};
        let aNewQuestion : aQuestion={questions : null, answers : null};

    
        //Making the questions : 
        for(let i = 1; weContinue && i < questionRaw.Array.length ; i++)
        {
            
            if(!makingTheme)
            {
                theCurrentQuestion = questionRaw.Array[i];
                makingTheme = true;
                aNewQuestion = new aQuestion;
            }
            else if(questionRaw.Array[i] == theCurrentQuestion)
            {
                makingTheme = false;
                listQuestions.concat(aNewQuestion);
            }
            else if(questionRaw.Array[i] == "question")
            {
                if(makingQuestion == 0)
                    makingQuestion = 1;
                else if (makingQuestion == 2)
                    makingQuestion = 0;
                else
                    weContinue = false;
            }
            else if(questionRaw.Array[i] == "answer")
            {
                if(makingAnswer)
                    makingAnswer = !makingAnswer;
            }
            else if(makingQuestion == 1)
            {
                aLangQuestion = new langQuestion;
                aLangQuestion.language = questionRaw.Array[i];
            }
            else if(makingQuestion == 2)
            {
                aLangQuestion.theQuestion = questionRaw.Array[i];
                if(aLangQuestion.language != null && aLangQuestion.theQuestion != null)
                    if (aNewQuestion.questions == null)
                        aNewQuestion.questions = [aLangQuestion];
                    else
                        aNewQuestion.questions.concat(aLangQuestion); 
                else
                    weContinue = false;

            }
            else if(makingAnswer)
            {
                if(aNewQuestion.answers != null)
                    aNewQuestion.answers.concat(questionRaw.Array[i]);
                else
                    aNewQuestion.answers = [questionRaw.Array[i]];
            }
        }
    }

    console.log(listQuestions);
    

}
*/
/*
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
}*/