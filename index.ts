import puppeteer from "puppeteer";

const loginComp = "4949";
const loginName = "117";
const loginPw = "209322486";
const developmentTassValue = "74764";

async function main() {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto("https://c.timewatch.co.il/punch/punch.php/");
	await page.setViewport({ width: 1080, height: 1024 });
	await page.waitForNetworkIdle();
	await page.type("#login-comp-input", loginComp);
	await page.type("#login-name-input", loginName);
	await page.type("#login-pw-input", loginPw);
	await page.click('button[type="submit"]');

	await wait(1000);
	await page.waitForSelector(".punch-info");

	const isEntry = new Date().getHours() < 15;
	await page.click(isEntry ? ".entry-btn" : ".exit-btn");

	await page.waitForSelector("#thetaskdescrInput");
	await wait(1500);
	await page.type("#thetaskdescrInput", "Needle");
	await page.select("#taskslist", developmentTassValue);
	await page.click(".modal-popup-btn-confirm");

	await page.waitForSelector(".confirmBtn");
	await page.click(".confirmBtn");
	await page.close();
	await browser.close();
}

function wait(delay = 150): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, delay));
}

main();
