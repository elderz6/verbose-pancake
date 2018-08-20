[1mdiff --git a/books-server/.env b/books-server/.env[m
[1mindex 6b35ba1..87a49d5 100644[m
[1m--- a/books-server/.env[m
[1m+++ b/books-server/.env[m
[36m@@ -1,6 +1,6 @@[m
 MONGODB_URL = mongodb://joaozin:admin123@ds133621.mlab.com:33621/mern_shop123[m
 JWT_SECRET = secretkey[m
[31m-HOST=http://localhost:8080[m
[32m+[m[32mHOST=http://localhost:3000[m
 EMAIL_HOST=smtp.mailtrap.io[m
 EMAIL_PORT=2525[m
 EMAIL_USER=98ffcad69719f3[m
[1mdiff --git a/books-server/src/models/User.js b/books-server/src/models/User.js[m
[1mindex 8575d46..af5db20 100644[m
[1m--- a/books-server/src/models/User.js[m
[1m+++ b/books-server/src/models/User.js[m
[36m@@ -37,7 +37,7 @@[m [muserSchema.methods.setConfirmationToken = function setConfirmationToken()[m
 [m
 //Generate confirmation URL[m
 userSchema.methods.generateConfirmURL = function generateConfirmURL() {[m
[31m-  return `${process.env.HOST}/confirmation/${this.confirmationToken}`;[m
[32m+[m[32m  return `localhost:3000/confirmation/${this.confirmationToken}`;[m
 };[m
 [m
 //Generate JSON Web Token[m
[1mdiff --git a/books-server/src/routes/auth.js b/books-server/src/routes/auth.js[m
[1mindex 769c45d..e2704e7 100644[m
[1m--- a/books-server/src/routes/auth.js[m
[1m+++ b/books-server/src/routes/auth.js[m
[36m@@ -19,12 +19,13 @@[m [mrouter.post('/', (req, res) =>[m
     });[m
 });[m
 [m
[31m-router.post('/confirmation', (req, res) => {[m
[32m+[m[32mrouter.post('/confirmation', (req, res) =>[m
[32m+[m[32m{[m
   const token = req.body.token;[m
   User.findOneAndUpdate([m
     { confirmationToken : token},[m
     { confirmationToken : '', confirmed: true},[m
[31m-    {new: true})[m
[32m+[m[32m    { new: true })[m
     .then(user =>[m
       user[m
         ? res.json({ user: user.toAuthJSON()})[m
[1mdiff --git a/books-server/src/routes/users.js b/books-server/src/routes/users.js[m
[1mindex 5d2d692..3d43719 100644[m
[1m--- a/books-server/src/routes/users.js[m
[1m+++ b/books-server/src/routes/users.js[m
[36m@@ -14,17 +14,12 @@[m [mrouter.post('/', (req, res) =>[m
   user.setPassword(password);[m
   user.setConfirmationToken();[m
   user.save()[m
[31m-    .then( user => {[m
[31m-      sendConfirmationEmail(user);[m
[31m-      res.json({ user: user.toAuthJSON() });[m
[32m+[m[32m    .then( userRecord => {[m
[32m+[m[32m      sendConfirmationEmail(userRecord);[m
[32m+[m[32m      res.json({ user: userRecord.toAuthJSON() });[m
     })[m
[31m-    .catch(err =>{[m
[31m-      const fail = err.errors.email.message;[m
[31m-      return([m
[31m-        res.status(400)[m
[31m-          .json({ errors:fail })[m
[31m-      );[m
[31m-    });[m
[32m+[m[32m    .catch(err => res.status(400).json({ errors:parseErrors(err.errors)})[m
[32m+[m[32m    );[m
 });[m
 [m
 [m
[1mdiff --git a/src/App.js b/src/App.js[m
[1mindex 18a0417..c326aff 100644[m
[1m--- a/src/App.js[m
[1m+++ b/src/App.js[m
[36m@@ -9,10 +9,10 @@[m [mimport SignupPage from './components/Pages/SignupPage';[m
 import ConfirmationPage from './components/Pages/ConfirmationPage';[m
 import PropTypes from 'prop-types';[m
 [m
[31m-const App = ({ location }) => ([m
[32m+[m[32mconst App = ({ location, isAuthenticated }) => ([m
   <div className='ui container'>[m
     <Route location={location} path='/' exact component={ HomePage }/>[m
[31m-    <Route location={location} path='/confirmation/:token' exact component={ ConfirmationPage }/>[m
[32m+[m[32m    <Route location={ location } path='/confirmation/:token' exact component={ ConfirmationPage }/>[m
     <GuestRoute location={location} path='/login' exact component={ LoginPage }/>[m
     <GuestRoute location={location} path='/signup' exact component={ SignupPage }/>[m
     <UserRoute location={location} path='/dashboard' exact component={ DashboardPage }/>[m
[36m@@ -22,7 +22,7 @@[m [mconst App = ({ location }) => ([m
 App.propTypes ={[m
   location:PropTypes.shape({[m
     pathname:PropTypes.string.isRequired[m
[31m-  }).isRequired[m
[32m+[m[32m  }).isRequired,[m
 };[m
 [m
 export default App;[m
[1mdiff --git a/src/actions/auth.js b/src/actions/auth.js[m
[1mindex 41015cc..6531d15 100644[m
[1m--- a/src/actions/auth.js[m
[1m+++ b/src/actions/auth.js[m
[36m@@ -27,4 +27,7 @@[m [mexport const logout = () => dispatch =>[m
 export const confirm = token =>[m
   dispatch => api.user.confirm(token)[m
     .then(user =>[m
[31m-      dispatch(userLoggedIn(user)));[m
[32m+[m[32m    {[m
[32m+[m[32m      localStorage.bookJWT = user.token;[m
[32m+[m[32m      dispatch(userLoggedIn(user));[m
[32m+[m[32m    });[m
[1mdiff --git a/src/api/api.js b/src/api/api.js[m
[1mindex 47082e8..69da325 100644[m
[1m--- a/src/api/api.js[m
[1m+++ b/src/api/api.js[m
[36m@@ -8,8 +8,8 @@[m [mexport default {[m
     signup: user =>[m
       axios.post('/api/users',  user )[m
         .then(res => res.data.user),[m
[31m-    confirm: user =>[m
[31m-      axios.post('/api/auth/confirmation', user.token)[m
[32m+[m[32m    confirm: token =>[m
[32m+[m[32m      axios.post('/api/auth/confirmation', {token})[m
         .then(res => res.data.user)[m
   }[m
 };[m
[1mdiff --git a/src/components/Pages/ConfirmationPage.js b/src/components/Pages/ConfirmationPage.js[m
[1mindex 97da475..1dcedaa 100644[m
[1m--- a/src/components/Pages/ConfirmationPage.js[m
[1m+++ b/src/components/Pages/ConfirmationPage.js[m
[36m@@ -35,25 +35,27 @@[m [mclass ConfirmationPage extends Component {[m
     const {loading, success} = this.state;[m
     return ([m
       <div>[m
[31m-        { loading && (<Message icon>[m
[31m-          <Icon  name='circle notched' loading/>[m
[31m-          <Message.Header>[m
[32m+[m[32m        { loading && ([m
[32m+[m[32m          <Message icon>[m
[32m+[m[32m            <Icon  name='circle notched' loading/>[m
[32m+[m[32m            <Message.Header>[m
             Validating the email[m
[31m-          </Message.Header>[m
[31m-        </Message>[m
[31m-        )}[m
[31m-        { !this.state.loading && (<Message success icon>[m
[31m-          <Icon  name='checkmark'/>[m
[31m-          <Message.Header>[m
[31m-            谢谢[m
[31m-            <Link to='/dashboard'>[m
[31m-              <Button>[m
[31m-                Go to Dashboard[m
[31m-              </Button>[m
[31m-            </Link>[m
[31m-          </Message.Header>[m
[31m-        </Message>[m
[32m+[m[32m            </Message.Header>[m
[32m+[m[32m          </Message>[m
         )}[m
[32m+[m[32m        { !loading && success &&[m
[32m+[m[32m          (<Message success icon>[m
[32m+[m[32m            <Icon  name='checkmark'/>[m
[32m+[m[32m            <Message.Header>[m
[32m+[m[32m              谢谢, Verified[m
[32m+[m[32m              <Link to='/dashboard'>[m
[32m+[m[32m                <Button>[m
[32m+[m[32m                  Go to Dashboard[m
[32m+[m[32m                </Button>[m
[32m+[m[32m              </Link>[m
[32m+[m[32m            </Message.Header>[m
[32m+[m[32m          </Message>[m
[32m+[m[32m          )}[m
       </div>[m
     );[m
   }[m
