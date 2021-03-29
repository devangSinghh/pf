const { FOS } = require('./lib')
calc = (module, fw1, fw2, npi, npf, ngi, ngf, length, rpm, torque, pr, elasticModulus, hardness, Q, Ko, process, material, grade, minFOS, redi, redf) => {
    let result = []
    let graph1 = []
    let graph2 = []
    let stats = []
    let minFOS_bending = 101, minFOS_contact = 101
    let index_min_FOS_bending = 0, index_min_FOS_contact = 0
    let count1 = 0, count2 = 0
    for(let n1=npi;n1<=npf;n1++) {
        for(let n2=ngi;n2<=ngf;n2++) {
            let reduction = n2/n1
            if (reduction > redf || reduction < redi) continue;
            let len = module*(n1 + n2 + 2) + 12 //in mm
            for(let f = fw1 ; f<=fw2; f+=0.1) {
                let fos =  FOS(module, n1, n2, f, rpm, torque, pr, elasticModulus, hardness, Q, Ko, process, material, grade)
                if(len <= length && fos[0]>=minFOS && fos[1]>=minFOS) {
                    if (minFOS_bending > fos[0]) {
                        index_min_FOS_bending = count1
                        minFOS_bending = fos[0]
                        console.log(index_min_FOS_bending, minFOS_bending)
                    }
                    if (minFOS_contact > fos[1]) {
                        index_min_FOS_contact = count1
                        minFOS_contact = fos[1]
                        console.log(index_min_FOS_contact, minFOS_contact)
                    }
                    result.push({key:count1, module:module, faceWidth:f, n_pinion:n1, n_gear:n2, reduction:reduction, bending_fos:fos[0], contact_fos:fos[1], length:len, qualityN:Q, overload:Ko,})
                    graph1.push({name:count1++, length:len, bendingFOS:fos[0], contactFOS:fos[1], N_pinion:n1, N_gear:n2})
                    graph2.push({name:count2++, length:len, contactFOS:fos[1], N_pinion:n1, N_gear:n2})
                }

            }  
        }
        
    }
    stats.push({
        minFOS_bending:minFOS_bending, 
        minFOS_contact:minFOS_contact, 
        minLength:result[0].length, 
        minF:fw1, 
        i_FOSb:index_min_FOS_bending, 
        i_FOSc:index_min_FOS_contact
    })
    return [result, graph1, graph2, stats];
}

module.exports = {
    calc : calc
}