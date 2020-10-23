const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const googleApi = require("../helper/google_classroom");



const googleClassJoin= catchAsync(async (req, res) => {
    res.redirect(googleApi.loginUrl());
});

const googleClassConnect = catchAsync(async (req, res) => {
    if (req.query.code) {
        let tokens = await googleApi.getToken(req.query.code);
        coursework = {
            'title': 'Ant colonies',
            'description': 'Read the article about ant colonies and complete the quiz.',
            'materials': [
                {'link': {'url': 'http://example.com/ant-colonies'}},
                {'link': {'url': 'http://example.com/ant-quiz'}}
            ],
            'workType': 'ASSIGNMENT',
            'state': 'PUBLISHED',
        }
        let courses = await googleApi.getCreateAssisgnment(tokens,'201852309874',coursework)
        //let courses = await googleApi.getCourses(tokens)
        res.send('<html><pre>'+JSON.stringify({courses},undefined,2)+'</pre></html>')
        
    } 
});

module.exports = {
    googleClassJoin,
    googleClassConnect
};