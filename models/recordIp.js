const mongoose = require('mongoose')

const time = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})

const ip = mongoose.Schema({
    ip : String,
    hostIp : String,
    type : String,
    continent_name : String,
    country_name : String,
    region_name : String,
    city : String,
    zip : String,
    latitude : String,
    longitude : String,
    location_capital : String,
    country_flag : String,
    time_of_request : {type:String, default:time}

})

module.exports = mongoose.model('ip-records', ip)