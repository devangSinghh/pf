function OD(i, const1) {
    var funct = x => Math.pow(x, 4) - const1*x - Math.pow(i*0.001, 4);
    var count = 0, a=0, b=1, c = (a+b)/2;
    while(count < 150) {
        count += 1;
         c = (a+b)/2;
        var f_a = funct(a);
        var f_b = funct(b);
        var f_c = funct(c);
        if(f_a*f_c < 0) {
            b = c;
        }
        if(f_b*f_c < 0) {
            a = c;
        }
    
}
    return c;

}

export function calcDia(torque, FOS, q, qs, kt, kts, Syt, Sut, kb, kc, kd, ke, gearpd1, gearpd2, dg1a, dg2b, length, surfaceFinish) {
    let result = [];
    let Ft1 = torque*2000/gearpd1; //z-plane
    let Ft2 = torque*2000/gearpd2; //z-plane
    let Fr1 = Ft1 * Math.tan(Math.PI/9); //y-plane
    let Fr2 = Ft2 * Math.tan(Math.PI/9); //y-plane
    let F_tot1 = Math.sqrt(Math.pow(Fr1, 2) + Math.pow(Ft1, 2)); //in N (Gear-1)
    let F_tot2 = Math.sqrt(Math.pow(Fr2, 2) + Math.pow(Ft2, 2)); //in N (Gear-2)        
    let Raz = (Ft1*(length-dg1a) - Ft2*dg2b)/length;
    let Ray = -(Fr1*(length-dg1a) + Fr2*dg2b)/length;
    let Rbz = (-Ft2*(length-dg2b) + Ft1*dg1a)/length;
    let Rby = (-Fr2*(length-dg2b) + Fr1*dg1a)/length;
    let Ra = Math.sqrt(Math.pow(Raz, 2) + Math.pow(Ray, 2));
    let Rb = Math.sqrt(Math.pow(Rbz, 2) + Math.pow(Rby, 2));
    let Moment_Gear_1xz = Raz*dg1a*0.001;
    let Moment_Gear_1xy = Ray*dg1a*0.001;
    let Moment_Gear_2xz = Rbz*dg2b*0.001;
    let Moment_Gear_2xy = Ray*dg2b*0.001;
    let Total_Moment_Gear1 = Math.sqrt(Math.pow(Moment_Gear_1xz, 2) + Math.pow(Moment_Gear_1xy, 2));
    let Total_Moment_Gear2 = Math.sqrt(Math.pow(Moment_Gear_2xz, 2) + Math.pow(Moment_Gear_2xy, 2));
    let Worst_case_moment = Total_Moment_Gear1 > Total_Moment_Gear2 ? Total_Moment_Gear1 : Total_Moment_Gear2;
    let Mm = 0, Ta = 0, a = 1.58, b = -0.085;
    if(surfaceFinish === 0) {
        a = 1.58;
        b = -0.085
    }
    if(surfaceFinish === 1) {
        a = 4.51;
        b = -0.265;
    }
    if(surfaceFinish === 2) {
        a = 57.7;
        b = -0.718;
    }
    if(surfaceFinish === 3) {
        a = 272;
        b = -0.995
    }
    let Se_ = 0.5*Sut*Math.pow(10, 6);
    if(Sut <= 1400) {
         Se_ = 0.5*Sut*Math.pow(10, 6);
    }
    if(Sut > 1400) {
         Se_ = 700*Math.pow(10, 6);
    }
    let ka = a*Math.pow(Sut, b);
    //endurance limit at the critical location of a machine part in the geometry and condition of use
    let Se = ka*kb*kc*kd*ke*Se_;
    let kf = 1 + q*(kt - 1);
    let kfs = 1 + qs*(kts - 1);
    let a__ = (2*kf*Worst_case_moment/Se) + (Math.sqrt(3)*kfs*torque*(Math.pow(10, -6))/Sut);
    let const1 = (16*a__*FOS/Math.PI);
    for(let i = 8;i<=80;i++){
        result.push({FOS:FOS, length:length, inner_D:i, outer_D:OD(i, const1)*1000, q:q, qShear:qs, Ft1:Ft1, Ft2:Ft2, Fr1:Fr1, Fr2:Fr2, Raz:Raz, Ray:Ray, Rbz:Rbz, Rby:Rby, dg1a:dg1a, dg2b:dg2b});
    }
    return result;

}

export function SBD(Ft1, Fr1, Ft2, Fr2, Ray, Raz, Rby, Rbz, length, dg1a, dg2b) {
    let count1=0, count2=0;
    let shear_force_points_xz = [];
    let shear_force_points_yz = [];
    let bendingMoment_points_xz = [];
    let bendingMoment_points_yz = [];
    let max_shearForce_xz = 0;
    let max_shearForce_yz = 0;
    let max_bendingMoment_xz = 0;
    let max_bendingMoment_yz = 0;
    
    //Shear force Diagram in x-z plane
    for(let i=0;i<=length;i++) {
        const force_xz = (i <= dg1a) ? Raz:(i <= length-dg2b ? (Raz-Ft1): (i < length ? (Raz-Ft1+Ft2) : 0));
         max_shearForce_xz = (max_shearForce_xz < force_xz) ? force_xz : max_shearForce_xz;
        shear_force_points_xz.push({name:count1++, x:i, shear_force_xz:force_xz});
    }
    //Shear force Diagram in y-z plane
    for(let i=0;i<=length;i++) {
        const force_yz = (i <= dg1a) ? Ray:(i <= length-dg2b ? (Ray-Fr1): (i < length ? (Ray-Fr1+Fr2) : 0));
         max_shearForce_yz = (max_shearForce_yz < force_yz) ? force_yz : max_shearForce_yz;
        shear_force_points_yz.push({name:count2++, x:i, shear_force_yz:force_yz});
    }
    count1 = 0;
    count2 = 0;
    //Bending moment Diagram x-z plane
    for(let i=0;i<=length;i++) {
        const bendingMoment_xz = (i<=dg1a) ? Raz*i : (i<=(length-dg2b) ? (Raz*i - Ft1*(i-dg1a)) : (i<length ? (Raz*i - Ft1*(i-dg1a) + Ft2*(i-length + dg2b)) : 0));
         max_bendingMoment_xz = (max_bendingMoment_xz < bendingMoment_xz) ? bendingMoment_xz : max_bendingMoment_xz;
        bendingMoment_points_xz.push({name:count1++, x:i, bending_moment_xz:bendingMoment_xz*0.001});
    }

    //Bending moment Diagram y-z plane
    for(let i=0;i<=length;i++) {
        const bendingMoment_yz = (i<=dg1a) ? Ray*i : (i<=length-dg2b ? (Ray*i - Fr1*(i-dg1a)) : (i<length ? (Ray*i - Fr1*(i-dg1a) + Fr2*(i-length + dg2b)) : 0));
         max_bendingMoment_yz = (max_bendingMoment_yz < bendingMoment_yz) ? bendingMoment_yz : max_bendingMoment_yz;
        bendingMoment_points_yz.push({name:count2++, x:i, bending_moment_yz:bendingMoment_yz*0.001});
    }
    return [shear_force_points_xz, shear_force_points_yz, bendingMoment_points_xz, bendingMoment_points_yz, max_shearForce_xz, max_shearForce_yz, max_bendingMoment_xz*0.001, max_bendingMoment_yz*0.001];
}

console.log(SBD(3000,1600,800,200,1500,300,500,200,130,80,10));
console.log(1);
//console.log(calcDia(185.44, 1.4, 0.82, 0.85, 1.45, 1.62, 470, 700, 0.9, 1, 1, 0.702, 121, 61, 80, 10, 130, 0));
//console.log(Math.pow(10, -6));