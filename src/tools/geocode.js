
const request = require("request")


const geocode = (address , callback) => {

    const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?proximity=ip&access_token=pk.eyJ1Ijoic2lyaXVzMTUiLCJhIjoiY21mNDB2dzAxMDBwazJqc2Z4dXJ2eXg3OSJ9.1JuRZYeErsYWUdhHTgiHyQ"
   request({url: geocodeUrl , json:true} , (error , response)=>{
        if(error){
               callback ("Unable to connect to geocode service" , undefined )
           }else if(response.body.message){
               callback (response.body.message  , undefined)
           }else if(response.body.features.length === 0){
               callback ("Unable to find location", undefined)
           }
           else{
               callback(undefined , {
             longitude : response.body.features[0].center[0],
             latitude : response.body.features[0].center[1]
        } )
           }
   }
   )

    
} 


module.exports = geocode