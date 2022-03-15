import puppeteer from 'puppeteer';
import chai from 'chai';
import 'mocha';

import { app } from '../src/server/index';
import { User } from '../src/server/models';

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

    before((done) =>
    {
        User.deleteOne({ username: 'frontend@example.com' }, (err : Error) =>
        {
            done();
        });
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

        describe('Registration Page', () =>
        {
            it('show Registration page', async () =>
            {
                await page.goto('http://localhost:3001/signup');
                await page.waitForSelector('#Register > h1');
                const text = await page.$eval('#Register > h1', (e) => e.textContent);
                
                text.should.contain('Registration');
            });
    
            it('fail to register a new user', async () =>
            {
                await page.goto('http://localhost:3001/signup');
                await page.type('#usernameInput', 'testUser');
                await page.type('#passwordInput', 'test1234');
                await page.type('#passwordConfirmationInput', 'test1234');
    
                await page.click('#loginButton');
                
                await page.waitFor(1000);

                const text = await page.$eval('.Notification', (e) => e.textContent);
    
                text.should.contain('Username must be an email adress!');
            });

            it('register a new user', async () =>
            {
                await page.goto('http://localhost:3001/signup');
                await page.type('#usernameInput', 'frontend@example.com');
                await page.type('#passwordInput', 'test1234');
                await page.type('#passwordConfirmationInput', 'test1234');
    
                await page.click('#loginButton');

                await page.waitForNavigation();
                const url = await page.url();

                url.should.have.string('/login');
                
            });
        });

        describe('Login Page', () =>
        {
            it('show Login page', async () =>
            {
                await page.goto('http://localhost:3001/login');
                await page.waitForSelector('#Login > h1');
                const text = await page.$eval('#Login > h1', (e) => e.textContent);
                
                text.should.contain('Login');
            });

            it('Login test user', async () =>
            {
                await page.goto('http://localhost:3001/login');
                await page.type('#usernameInput', 'frontend@example.com');
                await page.type('#passwordInput', 'test1234');
                
                await page.click('#loginButton');

                await page.waitForNavigation();
                
                const url = await page.url();

                url.should.have.string('/dashboard');
            });
        });
    });
});
