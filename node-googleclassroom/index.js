const express = require('express');

const session = require('express-session');

const googleApi = require("./helpers/googleClassRoomHelper");


const app = express();




// parse json request body && parse urlencoded request body && set session cookie settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'sdsvfd23123gregsdgfsdgfds2133877643qvgfdsgfdsgfdsgfdg',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))


app.get('/',function (req, res) {
    ping = {status : 'live' , time :new Date().getTime() }
    res.status(200).send(ping);
})


app.get('/auth',function (req, res) {
    if (req.query.code) {
        googleApi.getToken(req.query.code).then((tokens) => {
          req.session.tokens = tokens;
          req.session.save(() => {
            res.redirect("/getCourses");
          });
        });
    } else {
        res.redirect(googleApi.loginUrl());
    }
    
})



app.get('/getCourses',async function (req, res) {
    if (!req.session.tokens) {
        res.redirect("/auth");
    }else{
        tokens = req.session.tokens;
        let courses = await googleApi.getCourses(tokens)
        res.send('<html><pre>'+JSON.stringify({courses},undefined,2)+'</pre></html>')
    }


})


app.get('/addAssignment', async function (req, res) {

    if (!req.session.tokens) {
        res.redirect("/auth");
    }else{
        
        if (req.query.courseID) {

            tokens = req.session.tokens;
            courseID = req.query.courseID;


            coursework = {
                'title': 'Ant colonies 2',
                'description': 'Read the article about ant colonies and complete the quiz.',
                'materials': [
                    {'link': {'url': 'http://example.com/ant-colonies'}},
                    {'link': {'url': 'http://example.com/ant-quiz'}}
                ],
                'workType': 'ASSIGNMENT',
                'state': 'PUBLISHED',
            }
            let Addedassignment = await googleApi.getCreateAssisgnment(tokens,courseID,coursework)
            
            res.send('<html><pre>'+JSON.stringify({Addedassignment},undefined,2)+'</pre></html>')
            
        } 
    }
    
})


/*===========================================================================
---------------------------------  Run Server - -----------------------------
=============================================================================*/

const PORT = 7000
app.listen( PORT  , ()=>{
    console.log('---- Server started , Listing on PORT : ',PORT)
});

