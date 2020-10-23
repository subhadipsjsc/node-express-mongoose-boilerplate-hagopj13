const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const createPDF = require('../helper/pdfGenerate')


const pdfFolder = '/home/tech1101/insteract/node-express-mongoose-boilerplate/backend/src/pdfs/'


const download1= catchAsync(async (req, res) => {
    let data = 'my default data';
    if (req.query.data) {
        data = req.query.data
    }
    const pdf = await createPDF(pdfFolder , 'download1', data)
    res.set({ 
        'Content-Type': 'application/pdf', 
        'Content-Length': pdf.length 
    }).send(pdf)
});



module.exports = {
    download1
};