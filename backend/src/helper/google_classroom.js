const google = require("googleapis").google;

const googleConfig = {
    clientId: '634354354075-mnukebqeqjtirr8udg0tpo96mrn7ubht.apps.googleusercontent.com',
    clientSecret: 'Q1fFXiPVIrR_OOzcQALn60CZ',
    redirect: 'http://localhost:8000/v1/googleclassroom/redirect'
  };
   
  const createConnection = () => {
    return new google.auth.OAuth2(
      googleConfig.clientId,
      googleConfig.clientSecret,
      googleConfig.redirect
    );
  };
   
  const getConnectionUrl = (auth) => {
    return auth.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/classroom.courses.readonly",
        "https://www.googleapis.com/auth/classroom.rosters.readonly",
        "https://www.googleapis.com/auth/classroom.coursework.students.readonly",
        "https://www.googleapis.com/auth/classroom.coursework.students",
        "https://www.googleapis.com/auth/classroom.coursework.me.readonly",
        "https://www.googleapis.com/auth/classroom.coursework.me"
       ],
    });
  };
   
  /**
   * Exported functions
   */
   
  module.exports.loginUrl = () => {
    const auth = createConnection();
    return getConnectionUrl(auth);
  };
   
  module.exports.getToken = async (code) => {
    const auth = createConnection();
    const data = await auth.getToken(code);
    return data.tokens;
  };
   
  module.exports.getCourses = async (tokens) => {
    const auth = createConnection();
    auth.setCredentials(tokens);
   
    const res = await google
      .classroom({ version: "v1", auth })
      .courses.list({ pageSize: 10 });
   
    return res.data.courses ? [...res.data.courses] : [];
  };

  module.exports.getCreateAssisgnment= async (tokens,courseid, assign) => {
    const auth = createConnection();
    auth.setCredentials(tokens);
   
    const res = await google
      .classroom({ version: "v1", auth })
      .courses.courseWork.create({courseId:courseid , resource:assign},)
   
    return res
  };