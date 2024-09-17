const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');

const newcart = require('./models/cart')
const Advertisement = require('./models/Advertisement');
const Movie = require('./models/Movie');
const Categories = require('./models/categories');
const url = require('url');
var nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");
var flash = require("connect-flash");
var message1= "in valid OTP";
var path = require("path");
var User = require("./models/User");
var contact = require("./models/contact")
var u = require("./models/User");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var morgan = require("morgan");
const storage = require('node-sessionstorage')


// now edit 
const app = express();


// login start
const collection=require("./models/mongodb");
const { waitForDebugger } = require("inspector");

app.use(flash());

app.use(express.json())
app.set("view engine","ejs")

app.use(express.urlencoded({extended:false}))

// login end

app.use("/assets", express.static('assets'))
app.set("view engine","ejs")


// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];


// DATABASE CONNECTION
// mongoose.connect('mongodb://localhost:27017/Fitlane_Sorts')
const db = mongoose.connection;
db.once('error', (err)=>{
    console.log(err);    
});
db.on("open", ()=>{
    console.log("database connection success");
})

function required_LOgin(target){
  if (req.session.user && req.cookies.user_sid) {
    res.sendFile(__dirname + "/public/dashboard.html");
  } else {
    res.redirect("/login");
  }
}


// page rendar code
app.get('/',async(req,res)=>{
  const cricket = await Movie.find({Category:"Cricket Sports"}); // ye query hai 
  const Football = await Movie.find({Category:"Football Sports"}); // ye query hai
  const Badmintons = await Movie.find({Category:"Badminton"}); // ye query hai
  const volleyballs  = await Movie.find({Category:"volleyball"}); // ye query hai
  const kabaddis  = await Movie.find({Category:"Kabaddi"}); // ye query hai
  const tennis  = await Movie.find({Category:"Tennis"}); // ye query hai
  const tamilnadu  = await Movie.find({Category:"Tamilnadu traditional game"}); // ye query hai


//  const enter = db.myCol.find();  


  console.log('item set:', storage.getItem('Status'))


  // storage.setItem('foo', 'bar')
  // console.log('item set:', storage.getItem('foo'))

    const movie  = await Movie.find();
    const ad  = await Advertisement.find();
    res.render("Home", {
      movie,ad,cricket,Football,Badmintons,volleyballs,kabaddis,tennis,tamilnadu
    });
  

})

// logi & signup

app.get('/Login',async(req,res)=>{
  res.render("login3",)})

app.get('/About',async(req,res)=>{
    res.render("About",)})  

app.get('/Checkout',async(req,res)=>{
  res.render("checkout",)})


app.get("/signup",(req,res)=>{
    res.render("signup")
  })

app.get("/adminlogin",async(req,res)=>{
  

    res.render("adminlogin")
  })

 
    
app.get('/sidenavbar',async(req,res)=>{
    res.render("sidenavbar")})
    
app.get('/adminlogin',async(req,res)=>{
    res.render("adminlogin")})  

// signup form
// app.post("/signup", async(req,res)=>{
//   const data=new collection ({
//     email:req.body.email,
//     password:req.body.password
//   }  );
//   console.log(data);
//   await data.save();
//   const movie  = await Movie.find();
//   const ad  = await Movie.find();

//   res.render("Home", {
//     movie, ad
//   }) 

    
// })
// signup form end 

// login form
// app.post("/login", async(req,res)=>{

//   try{
//    const check =await collection.findOne({email:req.body.name})
//    if(check.password===req.body.password){
    
//     const ad  = await Advertisement.find();;
//     const movie  = await Movie.find();
     
//    res.render("Home",{ad,movie})
//   }
//   else{
//    res.send("wrong password")
//   }
 
//  }
//   catch{
//    res.send("wrong details")
//   }
 
  
//  }) 
// login form end


// logi & signup end
  
app.get('/Products',async(req,res)=>{
  try{
    var movie = '';
    var cat = ""
    const queryObject = url.parse(req.url,true).query;
    const ProductCat = queryObject.cat
    db.collection("Category").find().toArray(function(err, result) {
      if (err) throw err;
      cat = result;
      // db.close();
    });


    app.post('/product',async(req,res)=>{
      var names = req.body.search_bar ;
      const result = {name : names};

      if (names == ''){
        movie  = await Movie.find();
        ad  = await Advertisement.find();
        res.render("Products", {
        movie,ad
    });
        
      }

      else{
        console.log("asdfghjk")
        movie = await Movie.find(result);
        res.render("Products",{
          movie
        })
      }
      
      console.log(movie)
    });


    if (ProductCat != "") {
      var names = ProductCat
      movie = await Movie.find({Category: names});
      if(movie == ""){
        movie = await Movie.find();
        console.log(cat)
      }
      else{
        movie = await Movie.find({Category: names});

      }
      res.render("Products",{
        movie,cat
      })
    }

    // movie  = await Movie.find();
    // res.render("Products", {
    //   movie
    // });


    }catch (err){
        console.log("err: "+ err); 
      }
      
  
})


  

app.get('/product-details',async(req,res)=>{
    const queryObject = url.parse(req.url,true).query;
    const ProductId = queryObject.id
    const movie  = await Movie.findById(ProductId);
    console.log(movie.name)
    // if (Id){
    //   const data=new newcart ({
    //     product_id:Id
    //   }  );
    //   console.log(data);
    //   await data.save();}

    res.render("product_detail",{
      movie
    })
  })




  





  


  app.get('/advdetails',async(req,res)=>{
    const queryObject = url.parse(req.url,true).query;
    const ProductId = queryObject.id
    const Id = queryObject.id
    // console.log(Id)
    // const ad  = await ad.findById(ProductId);
    const ad  = await Advertisement.findById(Id);
    // if (Id){
    //   const data=new newcart ({
    //     product_id:Id
    //   }  );
    //   console.log(data);
    //   await data.save();}

    res.render("advertisment_details",{
      ad
    })
  })






app.get('/Viewcart',async(req,res)=>{
  const movie  = await Movie.find();
  res.render("Cart",{
    movie
  })
})


app.get('/Buys',async(req,res)=>{
  const queryObject = url.parse(req.url,true).query;
  const ProductId = queryObject.id
  const movie  = await Movie.findById(ProductId);
  res.render("Buy",{
    movie
  })
})

app.get('/Advertisement', async (req, res, next)=>{
  try{
    const ad = await Advertisement.find();
    res.render("Advertisement", {
      ad, 
    });
  }catch (err){
    console.log("err: "+ err); 
  }
  
})


app.post('/advert', async ( req, res, next)=>{
  const {name, Description,Collection, AdvertismentBanner, img} = req.body;
  const advertisement = new Advertisement({
    name,
    Description,
    Collection,
    AdvertismentBanner
  });

  // SETTING IMAGE AND IMAGE TYPES
  saveImage(advertisement, img);
  try{
    const newAdvertisement = await advertisement.save();
    console.log(newAdvertisement);  
    res.redirect("/Advertisement");
  }catch (err){
    console.log(err);    
  }
});


app.get('/catego', async (req, res, next)=>{
  try{
    const movie  = await Categories.find();
    res.render("categories", {
      movie
    });
  }catch (err){
    console.log("err: "+ err); 
  }
})

app.get('/Cart',async(req,res)=>{
  const queryObject = url.parse(req.url,true).query;
  const ProductId = queryObject.id
  const cart  = await Movie.findById(ProductId);
  const data=new newcart ({
    product_id:ProductId
  }  );
  await data.save();
  // const cart  = await Movie.findById(ProductId);
  res.render("cart",{cart})})


app.post('/cat', async ( req, res, next)=>{
  const {categories, img} = req.body;
  const Category = new Categories({
    categories,
    img

  });


  // SETTING IMAGE AND IMAGE TYPES
  saveImage(Category, img);
  try{
    const newCategory = await Category.save();
    console.log(newCategory);  
    res.redirect("/catego");
  }catch (err){
    console.log(err);    
  }
});



function saveImage(advertisement, imgEncoded) {
  // CHECKING FOR IMAGE IS ALREADY ENCODED OR NOT
  if (imgEncoded == null) return;

  // ENCODING IMAGE BY JSON PARSE
  // The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string
  const img = JSON.parse(imgEncoded);
  console.log( "JSON parse: "+ img);
  
  // CHECKING FOR JSON ENCODED IMAGE NOT NULL 
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
  // AND HAVE VALID IMAGE TYPES WITH IMAGE MIME TYPES
  if (img != null && imageMimeTypes.includes(img.type)) {

    // https://nodejs.org/api/buffer.html
    // The Buffer class in Node.js is designed to handle raw binary data. 
    // SETTING IMAGE AS BINARY DATA
    advertisement.img = new Buffer.from(img.data, "base64");
    advertisement.imgType = img.type;
  }
}

// end



// MIDDLEWARE
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

// ROUTES
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

// ROUTES
app.get("/Product_upload", async (req, res, next) => {
  try{
    const movie  = await Movie.find();
    res.render("Product_upload", {
      movie
    });
  }catch (err){
    console.log("err: "+ err); 
  }
});




app.post('/add', async ( req, res, next)=>{
  const {name, Price,Description,Category,  img} = req.body;
  const movie = new Movie({
    name,
    Price,
    Description,
    Category,
    
  });

  // SETTING IMAGE AND IMAGE TYPES
  saveImage(movie, img);
  try{
    const newMovie = await movie.save();
    console.log(newMovie);  
    res.redirect('/Product_upload')  ;
  }catch (err){
    console.log(err);    
  }
});
app.post('/AdVadd', async ( req, res, next)=>{
  const {name, Collection,Description,AdvertismentBanner,  img} = req.body;
  const movie = new Advertisement ({
    name,
    Collection,
    AdvertismentBanner,
    Description,
    
    
  });

  // SETTING IMAGE AND IMAGE TYPES
  saveImage(movie, img);
  try{
    const newMovie = await movie.save();
    console.log(newMovie);  
    res.redirect('/Product_upload')  ;
  }catch (err){
    console.log(err);    
  }
});








function saveImage(movie, imgEncoded) {
  // CHECKING FOR IMAGE IS ALREADY ENCODED OR NOT
  if (imgEncoded == null) return;

  // ENCODING IMAGE BY JSON PARSE
  // The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string
  const img = JSON.parse(imgEncoded);
  console.log( "JSON parse: "+ img);
  
  // CHECKING FOR JSON ENCODED IMAGE NOT NULL 
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
  // AND HAVE VALID IMAGE TYPES WITH IMAGE MIME TYPES
  if (img != null && imageMimeTypes.includes(img.type)) {

    // https://nodejs.org/api/buffer.html
    // The Buffer class in Node.js is designed to handle raw binary data. 
    // SETTING IMAGE AS BINARY DATA
    movie.img = new Buffer.from(img.data, "base64");
    movie.imgType = img.type;
  }
}

app.use(morgan("dev"));
 
// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));
 
// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());
 
// initialize express-session to allow us track the logged-in user across sessions.
app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60000,
    },
  })
);
 
//flash message start
// app.use(flash())
// app.get('/',(req,res)=>{
//   req.flash('message', message1)
//   res.send(req.flash('message'))
// })

//flash message end

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});
 
// middleware function to check for logged-in users


// ye code comment kerna hai abi ke liye nahi kiYA hu comment
var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};
 
// route for Home-Page
// app.get("/", sessionChecker, (req, res) => {
//   res.redirect("/login");
// });


// app.get('/forget',async(req,res)=>{
//   const email = req.flash('email')
//   if (req.session.user && req.cookies.user_sid) {
//     res.render("forget",{email});
//   } else {
//     next();
//   }
// });




// go to forget page
app.get('/forget',async(req,res)=>{
  const email = req.flash('email')
      
  res.render("forget",{email});


})

var UserEmail = ''

// go to pasw page
app.get('/psw',async(req,res)=>{
  var user = await User.findOne({ email: UserEmail });  
  res.render("pasw");


})

// generate otp
var otpVrification = ''

app.get('/otp',async(req,res)=>{
  const queryObject = url.parse(req.url,true).query;
  UserEmail = queryObject.email
  const max = 99999
  const min= 10000
  const result = Math.random()*(max - min) + min
  const otp = Math.floor(result)
  req.session.otp = otp.toString();
  var otpVrify = req.session.otp
  otpVrification = req.session.otp
  console.log(otpVrify)
  console.log(otpVrification)
  req.session.cookie.expires = 60000
  SentEmail(UserEmail,otpVrify)
  const otpverify = req.flash('otp')

   
  res.render("otpverification",{otpverify});


})




// forget password
app.post("/forget", async(req,res)=>{
  var username = req.body.email
  UserEmail = username
  try {
    // find user by email
    var user = await User.findOne({ email: username }).exec(); // query hai ye 
    
    if(!user) {
        // res.redirect("/login");
        req.flash('email',"Invalid Email")
        res.redirect("/forget");
    }
    
    res.redirect(`/otp/?email=${username}`);
    
  } catch (error) {
    console.log(error)
  }


    
})
// app.get('/otpVerify', sessionChecker, (req, res) => {
  
//   const userName = req.flash('user')
//   res.render("otpverification",{userName});
// });

// otp verify code
app.post("/otpVerify", async(req,res)=>{
  var otps = req.body.otp
  

  try {
    // check otp match or not
    if(otps  == otpVrification) {
        res.redirect(`/psw`);
    }
    else{
      req.flash('otp','invalid otp')
      res.redirect('/otp');


    }
    
  } catch (error) {
    console.log(error)
  }


    
})


// send emailll



function SentEmail(UserEmail,result){

    var transporter = nodemailer.createTransport({
      service: 'Hotmail',
      auth: {
        user: '',//yaha pe tera email
        pass: ''// yaha pe tera password 
      }
    });

    var mailOptions = {
      from: '',//yaha pe tera username dal 
      to: UserEmail,
      subject: 'Email otp verfication',
      text: result,
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}

// send emailll


// password update
app.post("/Paswords", async(req,res)=>{
  var passwords = req.body.password
  var Cpaswword = req.body.Cpassword

  var user = await User.findOne({ email: UserEmail });

  


  try {
    if(passwords === Cpaswword) {

      password2 = bcrypt.hashSync(passwords,10)
      User.findOneAndUpdate({email:UserEmail},{$set:{password:password2}}, {new:true}, (error, data)=> {
        if(error){
          console.log(error)
        }else{
          console.log(data) 
        }
      })
      console.log("psw match ")
      res.redirect('/login');
    }
    else
    {Console.log("psw does not match ")}
    } catch (error) {
      console.log(error)
    }
  

    
})

app
  .route("/signup")
  .get(sessionChecker, (req, res) => {
    res.sendFile(__dirname + "/public/signup.html");
  })
  .post((req, res) => {
 
    var user = new User({
      username: req.body.username,
      email: req.body.email,
      password:req.body.password,
      role:"coustomer"
    });
    user.save((err, docs) => {
      if (err) {
        res.redirect("/signup");
      } else {
          console.log(docs)
        req.session.user = docs;
        res.redirect("/Login");
      }
    });
  });


  //aj ka hai 
  
  app.get('/admin',async(req,res)=>{

    var CountUser = await User.find() //query hai length dunne ke liye 
    var length = CountUser.length

    var Countresponse = await contact.find() //query hai length dunne ke liye 
    var length2 = Countresponse.length

    res.render("admin",{length,length2})})

  app.get('/table',async(req,res)=>{
    table = await User.find()   /// query hai ye 
    res.render("tables",{table});
  
  })

  //aj ka hai
 
// route for user Login
app
  .route("/login")
  .get(sessionChecker, (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
  })
  .post(async (req, res) => {
    var username = req.body.username,
      password = req.body.password;
 
      try {
        var user = await User.findOne({ username: username}).exec();
        if(!user) {
            res.redirect("/login");
        }

        if(user.role == "coustomer") {
        
        user.comparePassword(password, (error, match) => {
            if(!match) {
              res.redirect("/login");
            }
        });
        req.session.user = user;
        
        // User.findOneAndUpdate({username:username},{$set:{Login:"true"}}).exec();
        User.findOneAndUpdate({username:username,role:"coustomer"},{$set:{Login:true}}, {new:true}, async(error, data) => {
          if(error){
            console.log(error)
          }else{
            const find  =  await User.findOne({username:username}); // ye query hai
            // var a = Movie.findById('63c3febbb6a469603486150c')
            storage.setItem('Status', find.Login);
            console.log(find.Login)
            console.log(find.email)
            console.log(find._id)

           
          }
        })
        res.redirect("/");
      }

      else if(user.role == "Admin"){
        res.redirect("/admin")
      }
    } catch (error) {
      console.log(error)
    }
  });
 
// route for user's dashboard
app.get("/dashboard", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.sendFile(__dirname + "/public/dashboard.html");
  } else {
    res.redirect("/login");
  }
});
 
// route for user logout
app.get("/logout", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie("user_sid");
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});


app.get('/Contact',async(req,res)=>{
  res.render("contact")}) 

// app.post("/contact",(req,res)=>{
//   var name = req.body.name;
//   var email = req.body.email;
//   var phone = req.body.company_name;
//   var message = req.body.message;
//   var subject = req.body.subject;

//   var data = {
//       "name": name,
//       "email" : email,
//       "phno": phone,
//       "message" : message,
//       "subject" : subject,
//   }
// console.log(data) //niche vala query hai 
//   db.collection('contact').insertOne(data,(err,collection)=>{
//       if(err){
//           throw err;
//       }
//       console.log("Record Inserted Successfully");
//   });

//   return res.redirect('contact')

// })


app.post("/contact",(req,res)=>{
  var data = new contact({
  "name" : req.body.name,
  "email" : req.body.email,
  "phno" : req.body.phone,
  "message" : req.body.message,
  "subject" : req.body.subject,
})
  
console.log(data) //niche vala query hai 
  db.collection('contacts').insertOne(data,(err,collection)=>{
      if(err){
          throw err;
      }
      console.log("Record Inserted Successfully");
  });

   res.redirect('contact')

})







app.get('/Contact',async(req,res)=>{
  res.render("contact",{data})}) 
  
// app.get('/coustomerResponse',async(req,res)=>{
//   contactR = await contact.find()
//   res.render("coustomerResponse",{contactR})}) 

app.get('/coustomerResponse',async(req,res)=>{
  // contactE= await contacts.find()
  var contactE = await contact.find()
  console.log(contactE)
  res.render("coustomerResponse",{contactE});
  
  })




const port = process.env.PORT || 4000;
app.listen(port, () => console.log("Server is running on : " + port));
