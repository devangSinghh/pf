// import React, { Component } from 'react'
// import axios, {base} from '../axios-pf'
// import 'katex/dist/katex.min.css'
// import { InlineMath, BlockMath } from 'react-katex'
// import Group12 from '../assets/Group12.svg';
// import Group15 from '../assets/Group15.svg';
// import Group24 from '../assets/Group24.svg';
// import Group19 from '../assets/Group19.svg';
// import Group25 from '../assets/Group25.svg';
// import Group16 from '../assets/Group16.svg';
// import Group18 from '../assets/Group18.svg';
// import {Link} from 'react-router-dom'

// class Curve extends Component {

//     state = {
//         addendum : `{a} ={\\frac{1}{P}}`
//         ,dedendum : `{a} ={\\frac{1.57}{P}}`
//         ,pitchCircle : `{d_p} ={\\frac{N}{P}}`
//         ,baseCircle : `{d_b} ={d_p\\cos\\alpha}`
//         ,arcEqual : `\\hat{a}t = \\overline{t}b`
//         ,arcEqual1 : `\\hat{a}t = r_b(\\phi + \\alpha)`
//         ,arcEqual3 : `\\overline{t}b = r_b\\tan(\\alpha)`
//         ,arcEqual4 : `r_b(\\phi + \\alpha) = r_b\\tan(\\alpha)`
//         ,arcEqual5 : `inv(\\alpha) = \\tan(\\alpha) - \\alpha`
//         ,eqn : `\\angle23 = {\\frac{360}{4N} - \\alpha} = \\frac{\\beta}{2}`
//         ,eqn1 : `\\beta = 2({\\frac{360}{4N} - \\alpha})`
//     }

//     componentDidMount = async() => {
//     }
    

//     render() {
//         const {addendum, dedendum, pitchCircle, baseCircle, arcEqual5, arcEqual4, arcEqual3, arcEqual1, arcEqual, eqn, eqn1 } = this.state;
//         return (
//             <div className="curve-content-wrapper">
//                 <div className="row m-0 no-gutters">
//               <div className="curve-content no-gutters" style = {{height:"auto", marginTop:"0px", width:"100%"}}>
//                   <div className="content p-3 m-0">
//                       <p className="ml-2">For a spur gear, the design and sketching guarantess optimum functionality.
//                       <br/>Spur gears have teeth parallel to the axis of rotation used in the transmission of motion between parallel shafts.
//                       <br/><br/>Factors to be considered in Gear-tooth Design:
//                         <ul>
//                             <li>There should be no involute interference.</li>
//                             <li>There should be no fillet interference.</li>
//                             <li>There is ample overlap in tooth action.</li>
//                             <li>A suitable pressure angle has been selected.</li>
//                             <li> Excessive slippage should be avoided.</li>
//                         </ul>
//                         General formulae:<br/><br/>
//                         <div className="def">Addendum (a): The radial distance from the pitch circle to the top of the gear tooth:<br/><BlockMath>{addendum}</BlockMath></div>
//                         <div className="def">Dedendum (a): The radial distance from the pitch circle to the bottom of the gear tooth:<br/><BlockMath>{dedendum}</BlockMath></div>
//                         <div className="def">Pitch circle(d<sub>p</sub>):Diameter of the pitch circle from which gear is designed. It&#x2019;s an imaginary circle on which all gear calculations are done:
//                         <br/><BlockMath>{pitchCircle}</BlockMath></div>
//                         <div className="def">Base circle(d<sub>b</sub>):Diameter of the base circle, which is used to form the involute section of the gear tooth:<br/><BlockMath>{baseCircle}</BlockMath></div>
//                      Before moving further, let&#x2019;s first understand what is an involute curve.<br/>
//                    <strong>An involute of a curve is the locus of a point on a piece of taut string as the string is either unwrapped from or wrapped around the curve.</strong><br/>
//                    In case of a gear the involute is generated from its base circle as if a taut line were unwound from the circumference, the end of that line would describe a circle involute.
                   
//                    <div className="image1">
//                        <img className="img-fluid" src={Group12} alt="" />
//                     </div>

//                    <br/><br/>cord d-e-f is wrapped on the cylinder(base circle in case of gears). Point <strong>b</strong> on the cord is represents the tracing point, and as the cord is wrapped and unwrapped around the cylinder, point <strong>b</strong> will trace out the involute curve <strong>ac</strong>.<br/>
//                    <br/>The radius of the curvature
//                    of the involute varies continuously, <strong>being zero at point a</strong> and a <strong>maximum at point c</strong>. At
//                    point b the radius is equal to the distance be, since point b is instantaneously rotating
//                    about point e. Thus the generating line de is normal to the involute at all points of intersection and, at the same time, is always tangent to the cylinder A. The circle on which
//                    the involute is generated is called the <strong>base circle</strong>.<br/><br/>
//                    From figure we can say that,<br/><BlockMath>{arcEqual}</BlockMath><br/>Now since,<BlockMath>{arcEqual1}</BlockMath>
//                     and <BlockMath>{arcEqual3}</BlockMath> therefore,
//                    <BlockMath>{arcEqual4}</BlockMath> On solving we get involute function,
//                    <BlockMath>{arcEqual5}</BlockMath>
//                    If point <b>b</b> lies on pitch circle of <strong>gear</strong> then involute angle <InlineMath>{"\\alpha"}</InlineMath>
//                    is called <b>operating pressure angle</b>.<br/><br/>
//                    Now, lets start making our own gear, profile<br/><br/>
//                    1). First draw base, pitch and addendum circles.
//                    a is base circle, b is pitch circle and c is dedendum circle.
                   
//                    <div className="img image2">
//                        <img className="img-fluid img" src={Group15} alt="" />
//                     </div>
                   
//                    2).Parametric equation for involute curve generated at point 'A'(see figure below) in terms of 't' angle is:
//                         <BlockMath>{"r(\\cos t + t\\sin t)"}</BlockMath>
//                         <BlockMath>{"y = r(\\sin t - t\\cos t)"}</BlockMath>
//                         &nbsp;&nbsp;&nbsp;where 'r' is radius of base-circle.<br/><br/>

//                     <div className="img image3">
//                         <img className="img-fluid img" src={Group24} alt="" />
//                     </div>
                    
//                     You'll need to set start and end 't' values for eg. (t<sub>1</sub> = 0 and t<sub>2</sub> = 0.8) such that involute generated just passes addendum circle.(See in figure below. Involute generated just passes addendum circle.)
                    
//                     <div className="img image4">
//                         <img className="img-fluid img" src={Group19} alt=""/>
//                     </div>
                    
//                     Next, we need the angle between lines 1 and 3 to make our 2<sup>nd</sup> involute. Note that(figure below), <BlockMath>{"\\angle17 = \\frac{360}{N} "}</BlockMath> Therefore, <BlockMath>{"\\angle17 = \\frac{360}{4N} "}</BlockMath> Now angle b/w lines 1 and 2 will be <InlineMath>{"\\alpha"}</InlineMath>(as explained above while deriving involute function eqn). <BlockMath>{eqn}</BlockMath> Therefore, the beta angle (β) can be described at the base circle and define the angular distance between Inv1 and Inv2 involute curve as,<BlockMath>{eqn1}</BlockMath>

//                         <div className="image5">
//                           <img className="img-fluid" src={Group25} alt=""/>
//                         </div>

//                     3).Now we know the value of β angle therefore, we can write the parametric driven equation of the involute curve.
//                     <BlockMath>{`{\\theta}={(-t-\\frac{2\\beta\\pi}{180})}`}</BlockMath>
//                     <BlockMath>{"x = r(\\cos(\\theta) -t\\times\\sin(\\theta))"}</BlockMath>
//                     <BlockMath>{"y = r(\\sin(\\theta) +t\\times\\cos(\\theta))"}</BlockMath>
//                     Again you'll need to set the starting and end parameters (t<sub>1</sub> and t<sub>2</sub>) such that second involute just passes addendum circle (as shown in figure below).
                    
//                     <div className="img image6">
//                         <img className="img-fluid" src={Group16} alt=""/>
//                     </div>
                    
//                     4).Now you can draw the above generated involutes in circular pattern to obtain a 2-D gear sketch.
                    
//                     <div className="img image7">
//                         <img className="img-fluid" src={Group18} alt=""/>
//                     </div>
                    
//                       </p>
                          
//                   </div>
//               </div>
//           </div>
//             </div>
//         );
//     }
// }

// export default Curve;