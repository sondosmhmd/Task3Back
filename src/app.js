
// 4 5atwat 3l4an a3rd el ma4roo3 3la el browser

// step no.1 
// el package el a4ta8al beeha

const express = require("express")


const app = express()  // hamsek el express f mosama 3andy esmo el app


//step no.2 
// port el ha4ta8al 3leh lazem a3arafo

// const port = 3000
// el mafrood a3ml const port = el port el hatwafarhooly el sherka law la2a yb2a const port = 3000
const port = process.env.PORT || 3000



//step no.3
// el page el ha3red 3leha : esmaha eh w ha3red 3leha eh
// bttcreate bel 5atwa el oola
// 3la4an abne ay page w a7ot gwaha content lazem mn CRUD

// app.get( el saf7a eh , el saf7a de ha3ml feeha eh )
// el slash hya el home page w el home page de bnt3amel m3aha b 7agten 7aga esmaha el request w 7aga esmaha el response
// req => el database w kol da
// res ==> lma a3ml 3lamet el slash 3la el port esmo 3000 eh el haye7sal
// el response da el ha3red beeh el mo7tawa el mawgood fel saf7a


// app.get ('/' , (req,res)=>{
//     res.send("<h2> My name is Sondos</h2>")// mmkn nktb html w by2balha

// } ) ==> da hay4ta8al 3l4an maktoob abl el code bta3 el app.use  b asbakeyet el ketaba

app.get ('/prices' , (req,res)=>{
    res.send({
        name: "Sondos",
        age : 19,
        city : "cairo"
    })
} )

app.get ('/about' , (req,res)=>{
    res.send("about page")
} )

app.get ('/source' , (req,res)=>{
    res.send("source page")
} )

app.get ('/restart' , (req,res)=>{
    res.send("restart page")
} )

///////////////////////////////////////

// static path : 

const path = require("path") // yo3tbr core module
// console.log(__dirname)

const x = path.join(__dirname, '../public')  // keda ana masek el ma4roo3 beta3y b 4akl saleem 


 // 3la4an a3red saf7a static me7tag 7aga esmaha el .use()  w el express.static 

 app.use(express.static(x))


// 3l4an index b to4eer lel home page f awl lma nd5ol 3la el local host hygebhalna 
// w lakn lw 3ayzeen nd5ol 3la page html tanya hn3ml localhost:3000/data.html


//hbs

app.set('view engine', 'hbs')

// law 8ayart el masar aw 7atet el views folder gwa folder tane hadtar a3ml keda

const viewsDirectory = path.join(__dirname , "../temp/views")
app.set("views", viewsDirectory)

/////////////////////////////
//3ayez saf7at el hbs tekra2 el header bta3e

var hbs = require("hbs")

const partialsPath = path.join(__dirname , "../temp/partials")

hbs.registerPartials(partialsPath)

// keda hayekra2 el header

/////////////////////////////////////////





app.get('/', (req, res)=>{
    res.render('index' , {
        title : "HOME",
        desc : "This is the home page"
    })
})


app.get('/service', (req, res)=>{
    res.render('service' , {
        title : "service",
        desc : "This is the service page",
        img1: "images/img.jpg"
    })
})
////////////////////////////////////////////////////////////////
// el request de eh hya el bayanat el ana 3yzaha mn saf7a mo3yna
// wl bayanat de kolaha 3ebara 3n key w value

app.get('/products', (req,res)=>{
    console.log(req.query)
    
    
    
    res.send({
        product : "bmw 520i"
    })

})


/////////////////////////////////////////////

//task:
// app.get('/weather', (req,res)=>{
//     console.log(req.query)

//     if(req.query.address){
//         return res.send({
//         product : req.query.address,
//         forecast : req.query.weather
//     })
//     }else{
//         return res.send({
//         error: "You must enter the address!"
//     })
//     }
    
// })

////////////////////////////////////////////////////////////////
// using APIs

const geocode = require("./tools/geocode")
const forecast = require("./tools/forecast")

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
        error: "You must enter the address!"
    })
    }

    geocode(req.query.address , (error , data)=>{
        if(error){// elerror da by3ood 3la el geocode
            return res.send({error})
        }
        forecast (data.latitude, data.longitude, (error , forecastData)=>{
            if(error){
            return res.send({error})// el error da by3ood 3la el forecast
            }
            res.send({
                forecast : forecastData,
                location : req.query.address
            })
        })
    })
})
///////////////////////////////////////////////////////////////





//////////////////////////////////////
// 3ayz law awl lma a3ml  fel localhost:3000/ saf7a m4 3ndy yezherly not found

app.get('*', (req,res)=>{
    res.send("404 PAGE NOT FOUND")
})



//////////////////////////
//step no.4
// 5atwet el ta3reef en el browser ye2ra kol da aw ysama3 3leh

// el express feeha 5aseyet el listeneno ysama3 fel port bta3y
// w bta5od 7agten (port, w function)

app.listen( port, ()=>{
    console.log("App listening on port 3000")
} )






