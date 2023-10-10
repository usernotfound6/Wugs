const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');
const {google} = require('googleapis');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: function(req,file,callback){
    const extension = file.originalname.split(".").pop()
    callback(null,`${file.fieldname}-${Date.now()}.${extension}`)
  }
})
const upload = multer({storage:storage})

// Route includes
const userRouter = require('./routes/user.router');
const onboardingRouter = require('./routes/onboarding.router');
const interestedRouter = require('./routes/interested.router');
const adminRouter = require('./routes/admin.router');
const productsRouter = require('./routes/products.router')


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/onboarding', onboardingRouter);
app.use('/api/interested', interestedRouter);
app.use('/api/admin', adminRouter);
app.use('/api/products', productsRouter);

// Serve static files
app.use(express.static('build'));

// -------------------------------
// app.post('/upload', upload.array('files'), async(req,res) => {
//   try{
//     const auth = new google.auth.GoogleAuth({
//       keyfiles:"our-chassis-401623-8599a8b4f596.json",
//       scopes: ["https://www.googleapis.com/auth/drive"]
//     })
//     console.log(auth)

//   }catch(error){
//     console.log(error)
//   }

// })

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
