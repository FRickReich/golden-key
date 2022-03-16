import puppeteer from 'puppeteer';
import chai from 'chai';
import 'mocha';

import { app } from '../src/server/index';

const should = chai.should;

let server;
const PORT = 3001;

describe('Golden-Key', () =>
{   
    before(function()
    {
        this.timeout(0);
        server = app.listen(PORT);
    });

    after(() =>
    {
        server.close();
    });

    describe('frontend', () =>
    {
        
        let browser;
        let page;

        beforeEach(async () =>
        {
            browser = await puppeteer.launch({ headless: true });
            page = await browser.newPage();
        });

        afterEach(() => browser.close());

        describe('Home Page', () =>
        {
            it('show Home page', async () =>
            {
                await page.goto('http://localhost:3001');
                await page.waitForSelector('#Home > h1');
                const text = await page.$eval('#Home > h1', (e) => e.textContent);
                
                text.should.contain('Home');
            });
        });
    });
});
