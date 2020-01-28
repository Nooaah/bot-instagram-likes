const puppeteer = require('puppeteer')

const SECRET_EMAIL = 'noah.chtl'
const SECRET_PASSWORD = 'teamcauet'
const TAG = 'nodejs'
const NB_LIKES = 300

const main = async () => {
    const browser = await puppeteer.launch({
        headless: false,
    })
    const page = await browser.newPage()
    await page.goto('https://www.instagram.com/accounts/login/', {
        waitUntil: 'networkidle2'
    })
    await page.waitForSelector('form')
    await page.type('input[name="username"]', SECRET_EMAIL)
    await page.type('input[name="password"]', SECRET_PASSWORD)
    await page.click('button[type="submit"]')
    await page.waitFor(4000);
    await page.click('div[role="dialog"] > div > div:nth-child(3) > button:nth-child(2)')

    await page.waitFor(2500);

    await page.screenshot({
        path: 'img/screen.png'
    });

    function wait(ms) {
        var d = new Date();
        var d2 = null;
        do {
            d2 = new Date();
        }
        while (d2 - d < ms);
    }

    await page.click('div[role="button"][tabindex="0"] > div > span:nth-child(2)')
    await page.type('input[placeholder="Search"]', TAG)

    const page2 = await browser.newPage()
    await page2.goto('https://www.instagram.com/explore/tags/' + TAG, {
        waitUntil: 'networkidle2'
    })

    await page2.click('img[decoding="auto"]')
    
    var likeGive = 0;
    for (i = 1; i < NB_LIKES; i++) {
        wait(1000);
        try {
            await page2.click('svg[aria-label="Like"][width="24"]:nth-child(' + 1 + ')')
            likeGive++;
            console.log('Nombre de Likes donnés :' + likeGive);
        } catch (error) {
        }
        await page2.click('.coreSpriteRightPaginationArrow')
        wait(500);
    }
}
main()