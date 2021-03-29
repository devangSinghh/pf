const router = require('express').Router();
const { calc } = require('../code/Sr_Gb')
router.post('/', async(req, res)=> {

    // const { fwidth1, fwidth2, ko, Q, L, rpm, torque, power, cvt, hardness, modulus, module, 
    //     module1, module2, grade, process, material, poisson, gearbox, npinioni, npinionf, ngeari, ngearf } = req.body
        const data = req.body
        const module = parseFloat(data.module) || 2;
        const rpm = parseFloat(data.rpm);
        const torque = parseFloat(data.torque);
        const power = parseFloat(data.power);
        const cvt = parseFloat(data.cvt);
        const hardness = parseFloat(data.hardness) || 250; //in Brinell
        const modulus = parseFloat(data.modulus) || 202;
        const fwidth1 = parseFloat(data.fwidth1);
        const fwidth2 = parseFloat(data.fwidth2);
        const ko = parseFloat(data.ko) || 1.25;
        const Q = parseFloat(data.Q) || 11;
        const L = parseFloat(data.L);
        const poisson = parseFloat(data.poisson) || 0.29;
        const process = parseInt(data.process) || 0; 
        const material = parseInt(data.Qmaterial) || 0;
        const grade = parseInt(data.grade) || 1;
        const npinioni = parseFloat(data.npinioni);
        const npinionf = parseFloat(data.npinionf);
        const ngeari = parseFloat(data.ngeari);
        const ngearf = parseFloat(data.ngearf);
        const minFOS = parseFloat(data.minFOS)
        const redi = parseFloat(data.redi)
        const redf = parseFloat(data.redf)
    const [result, graph1, graph2, stats] = calc(module,  fwidth1, fwidth2, npinioni, npinionf, ngeari, ngearf, L, rpm, torque, poisson, modulus, hardness, Q, ko, process, material, grade, minFOS, redi, redf);
    res.send([result, graph1, graph2, stats])
})

module.exports = router;
