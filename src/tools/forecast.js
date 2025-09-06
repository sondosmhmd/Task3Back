
const request = require("request")

const forecast = (latitude, longtitude, callback) => {

    const urlcode = "http://api.weatherapi.com/v1/current.json?key=8f32990d3e7e4a7ea4f114551252508&q="+ latitude+ "," + longtitude //3l4an 3ayzhom dynamic


    request ({url : urlcode , json: true} , (error, response)=>{

        if(error){
            callback ("Unable to connect to weather api" , undefined )
        }else if(response.body.error){
            callback (response.body.error.message  , undefined)
        }else{
            callback ( undefined , response.body.location.name + " it is " +response.body.current.condition.text +" temperature is "+ response.body.current.temp_c+ " Celcius")
        }

    
    } )

}


module.exports = forecast