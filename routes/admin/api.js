const express = require('express')
const app = express()
const router = express.Router()

const all_routes_list = []
function print (path, layer) {
    if (layer.route) {
      layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
    } else if (layer.name === 'router' && layer.handle.stack) {
      layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
    } else if (layer.method) {
      all_routes_list.push({ method:layer.method.toUpperCase(), 
        path:path.concat(split(layer.regexp)).filter(Boolean).join('/') })
    }
  }
  
  function split (thing) {
    if (typeof thing === 'string') {
      return thing.split('/')
    } else if (thing.fast_slash) {
      return ''
    } else {
      var match = thing.toString()
        .replace('\\/?', '')
        .replace('(?=\\/|$)', '$')
        .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
      return match
        ? match[1].replace(/\\(.)/g, '$1').split('/')
        : '<complex:' + thing.toString() + '>'
    }
  }
  
//   app._router.stack.forEach(print.bind(null, []))
//   console.log(all_routes_list)
router.get('/', async(req, res) => {
    res.render('admin/api', { 'data':all_routes_list })
})

module.exports = router