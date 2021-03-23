const router = require('express').Router()
const recordIp = require('ipstack')
const IpRecord = require('../models/recordIp')
const https = require('https')

router.get('/', async(req, res) => {
     let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
     if (ip.substr(0, 7) == "::ffff:") {
        ip = ip.substr(7)
      }

      let callback = (err, ip) => {
        if(err) return res.send(e)

        recordIp(ip, process.env.IP_ACCESS_KEY, async(e, res) => {
            if (e) return res.send(e)

            const iprecord = await new IpRecord({
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

        })
    };
    
    https.get({ host: 'api.ipify.org' }, response => {
        let ip = '';
        response.on('data', d => { 
            ip += d
        })

        response.on('end', () => {
            if(ip) callback(null, ip)
            else callback('could not get public ip address :(')
        })
    })

})



module.exports = router