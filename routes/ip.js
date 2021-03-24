const router = require('express').Router()
const http = require('http');
const IpRecord = require('../models/recordIp')
// const ipstack = require('ipstackclient')
const recordIp = require('ipstack')
// const IpStackClient = ipstack.create(process.env.IP_ACCESS_KEY, false);
router.get('/add', async(req, res) => {

      let callback = async(err, res) => {
        if(err) return res.send(err)

        const iprecord = new IpRecord({
                ip : res.ip,
                type : res.type,
                continent_name : res.continent_name,
                country_name : res.country_name,
                region_name : res.region_name,
                city : res.city,
                zip : res.zip,
                latitude : res.latitude,
                longitude : res.longitude,
                location_capital : res.location.capital,
                country_flag : res.location.country_flag,
        })

        const savedIpRecord = await iprecord.save()
        ipAddress = savedIpRecord
    }
    
    http.get({
        hostname: 'api.ipstack.com',
        port: 80,
        path: `/check?access_key=${process.env.IP_ACCESS_KEY}`,
        agent: false  
      }, response => {
        let record = '';
        response.on('data', d => { 
            record += d
            record = JSON.parse(record)
        })

        response.on('end', () => {
            if(record) callback(null, record)
            else callback('could not get public ip address :(')
        })
    })

})

router.get('/', async(req, res) => {
   const data = await IpRecord.find({  })
   res.send(data)
})


module.exports = router