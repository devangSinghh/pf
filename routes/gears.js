const router = require('express').Router();
const { calc } = require('../code/Sr_Gb')
router.post('/', async(req, res)=> {

    const { fwidth1, fwidth2, ko, Q, L, rpm, torque, power, cvt, hardness, modulus, module, 
        module1, module2, grade, process, material, poisson, gearbox } = req.body
    const [result, graph1, graph2] = calc(module,  fwidth1, fwidth2, L, rpm, torque, poisson, modulus, hardness, Q, ko, process, material, grade);
    res.send(result)
})

module.exports = router;
