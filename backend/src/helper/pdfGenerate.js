const puppeteer = require('puppeteer');
var fs = require('fs');
var ejs = require('ejs');



async function templatecompile(abspath,templatename,data){
    var compiled = ejs.compile(fs.readFileSync(abspath+ 'template/'+templatename+'.ejs', 'utf8'));
    var html = compiled(data);
    return html;
}


async function createPDF(abspath, templatename,mydata){
    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        //await page.goto('https://example.com');
        //await page.screenshot({path: 'example.png'});
        //await page.setContent('<h1> Test </h1>');
        
        
        let data = {text : mydata }
        let compiledData = await templatecompile(abspath, templatename,data)
        
        await page.setContent(compiledData)


        var timestamp = new Date().getUTCMilliseconds();
        const pdf =  await page.pdf({
            path: abspath+'mypdf-'+timestamp+'.pdf', 
            format: 'A4',
            printBackground:true,
        });

        await browser.close();
        return pdf
    }
    catch(e){
        console.log('error is :'+e)
    }
}

module.exports =  createPDF