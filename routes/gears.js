const router = require('express').Router();
const { calc } = require('../code/Sr_Gb')
const { calcDia, SBD } = require('../code/shaft')
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

router.post('/shaft', async(req, res) => {
    const data = req.body;
    const kb  = parseFloat(data.kb)
    const kd = parseFloat(data.kd)
    const ke = parseFloat(data.ke)
    const kc = parseFloat(data.kc)
    const torque = parseFloat(data.torque)
    const length = parseFloat(data.length)
    const q = parseFloat(data.q)
    const qs = parseFloat(data.qs)
    const kt = parseFloat(data.kt)
    const kts = parseFloat(data.kts)
    const fos = parseFloat(data.fos)
    const d1 = parseFloat(data.d1)
    const d2 = parseFloat(data.d2)
    const g1a = parseFloat(data.g1a)
    const g2b = parseFloat(data.g2b)
    const tensile = parseFloat(data.tensile)
    const ultimate  = parseFloat(data.ultimate)
    const finish = parseFloat(data.finish) || 0
    const result = calcDia(torque, fos, q, qs, kt, kts, tensile, ultimate, kb, kc, kd, ke, d1, d2, g1a, g2b, length, finish)
    res.send(result)
})


router.post('/shaft/plot', async(req, res) => {
    const data = req.body

    const Ft1 = parseFloat(data.Ft1)
    const Ft2 = parseFloat(data.Ft2)
    const Fr1 = parseFloat(data.Fr1)
    const Fr2 = parseFloat(data.Fr2)
    const Ray = parseFloat(data.Ray)
    const Raz = parseFloat(data.Raz)
    const Rby = parseFloat(data.Rby)
    const Rbz = parseFloat(data.Rbz)
    const length = parseFloat(data.length)
    const g1a = parseFloat(data.g1a)
    const g2b = parseFloat(data.g2b)

    const BD = SBD(Ft1, Fr1, Ft2, Fr2, Ray, Raz, Rby, Rbz, length, g1a, g2b)
    res.send(BD)
})

module.exports = router;
