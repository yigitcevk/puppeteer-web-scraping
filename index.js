const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.jotform.com/answers/');
    await page.screenshot({ path: 'example.png' });

    const result = await page.evaluate(() => {
        let supportPageQuestion = document.querySelectorAll(".dc-f-question");
        const supportPageQuestionList = [...supportPageQuestion];
        return supportPageQuestionList.map(h => h.innerText);
    });


    console.log(result);

    await browser.close();
})();