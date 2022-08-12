import puppeteer from "puppeteer"


(async () => {
    const url_list = process.argv.slice(2)
    for (let i = 0; i < url_list.length; i++) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url_list[i], {
            waitUntil: 'networkidle0',
            timeout: 50000
        });

        const hubble_distance = await page.$eval("span#allbyname_27", text => text.textContent) + " +/- " + await page.$eval("span#allbyname_28", text => text.textContent)
        const morphology = await page.$eval("span#allbyname_31", text => text.textContent)
        const diameter = await page.$eval("span#allbyname_39", text => text.textContent)
        const absolute_mag = [
            await page.$eval("span#allbyname_50", text => text.textContent),
            await page.$eval("span#allbyname_55", text => text.textContent),
            await page.$eval("span#allbyname_60", text => text.textContent),
            await page.$eval("span#allbyname_65", text => text.textContent),
            await page.$eval("span#allbyname_70", text => text.textContent),
        ]
        console.log();
        console.log("URL                                : http://ned.ipac.caltech.edu/byname?objname=Ngc+783&hconst=67.8&omegam=0.308&omegav=0.692&wmap=4&corr_z=1");
        console.log("Hubble Distance (CMD) [Mpc]        :", hubble_distance);
        console.log("Morphology                         :", morphology);
        console.log("Diameter [kpc]                     :", diameter);
        console.log("Absolute Mag or νLν [W]            ");
        console.log("   UV                             :", absolute_mag[0]);
        console.log("   Visible                        :", absolute_mag[1]);
        console.log("   Near-IR                        :", absolute_mag[2]);
        console.log("   Far-IR                         :", absolute_mag[3]);
        console.log("   Radio                          :", absolute_mag[4]);
        console.log()
        await browser.close();
    }
    process.exit(0);
})();
