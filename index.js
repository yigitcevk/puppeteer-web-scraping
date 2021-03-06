const puppeteer = require('puppeteer');
const fileSystem = require('fs/promises');

let data = [{
    question: "question text", 
    url: URL,
    repliesNum: 0
}];

async function start() {

    /**
     * page opening
     */
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.jotform.com/answers/');
    
    /**
     * reading questions one by one
     * go to innerText in questions
     * save into the questionTextArr
     */
    const questionTextArr = await page.evaluate(() => {
        //Array.from(document.getElementsByClassName("dc-f-question"));
        let question = document.getElementsByClassName("dc-f-question-name");
        const questionList = [...question];

        return questionList.map(h => h.innerText);
    });

    /**
     * reading questions one by one 
     * go to innerHTML in questions
     * save into the innerHtmlArr
     */
    const innerHtmlArr = await page.evaluate(() => {
        let question = document.getElementsByClassName("dc-f-question-name");
        const questionList = [...question];

        return questionList.map(h => h.innerHTML);
    });

    /**
     * reading replies one by one 
     * take #text in replies which is the number of replies
     * save into the repliesNumArr
     */
    const repliesNumArr = await page.evaluate(() => {
        let replies = document.getElementsByClassName("dc-f-replies");
        const questionList = [...replies];

        return questionList.map(h => h.innerText);
    });

    /**
     * string manipulation on innerHtmlArr and repliesNumArr
     * object assignment into data array
     */
    for (let i = 0; i < questionTextArr.length; i++) {

        const urlStartIndex = innerHtmlArr[i].indexOf("=");
        const urlEndIndex = innerHtmlArr[i].indexOf(">");
        const replieStartIndex = 0;
        const replieEndIndex = repliesNumArr[i].indexOf("\n");

        let object = {
            question: questionTextArr[i], 
            url: innerHtmlArr[i].substring(urlStartIndex+2,urlEndIndex-1), 
            repliesNum: repliesNumArr[i].substring(replieStartIndex,replieEndIndex)
        };
        insertObject(data, object);
    } 

    //await fileSystem.writeFile("data.txt", data.join("\r\n"));

    await browser.close();
}

start();

function insertObject(arr, obj) {

    // append object
    arr.push(obj);
    
    console.log(obj);
}
