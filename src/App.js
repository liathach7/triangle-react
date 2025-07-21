import React, { useState, useEffect, Component } from "react";
import Triangle from "./Triangle";
import useInterval from "./useInterval";
import "./App.css";
import { range, random } from "lodash";

const getRandomIndex = array => {
  return Math.floor(array.length * Math.random());
};

function getColor(color) {
  // alert('here');
  const listColors = ['blue','red','green','pink','yellow','purple'];
  const myIndex = listColors.indexOf(color[0]);
  if (myIndex > -1) {
    listColors.splice(myIndex,1);
  }
  const myRanInd = random(0,(listColors.length - 1));
  const myColor = listColors[myRanInd];
  return myColor
}

function getDataNext(dis,angle,firstCycle,ranAng, prevRanAng,startPoints,prevStartPoints) {
  const dataNext = [];
  const tri1Values = [];
  const tri2Values = [];
  const tri3Values = [];
  // const r2 = 115.5 - dis;
  const x1 = [];
  const y1 = [];
  const x2 = [];
  const y2 = [];
  const x3 = [];
  const y3 = [];
  const x1t2 = [];
  const y1t2 = [];
  const x2t2 = [];
  const y2t2 = [];
  const x3t2 = [];
  const y3t2 = [];
  const a1 = 4.712 + ranAng;
  const a2 = 2.623 + ranAng;
  const a3 = 0.518 + ranAng;
  const a1t2 = 4.712 + prevRanAng;
  const a2t2 = 2.623 + prevRanAng;
  const a3t2 = 0.518 + prevRanAng;
  
  const straighter = range(226.8,342.2,dis);
  // console.log('straigher: ',straighter);
  const totalLength = straighter.length + (dis * 0);
  //change nearbetweentris according to angle to make spirallin triangles align
  //const nearnessBetweenTris = 3.5;
  if (angle[0] === 0.045) {
    var nearnessBetweenTris = 9;
  }
  else {
    if (angle[0] === 0.03) {
      var nearnessBetweenTris = 7;
    }
    else {
      var nearnessBetweenTris = 3.5;
    }
  }


  const myLim1 = Math.floor(totalLength/nearnessBetweenTris);
  const myLim2 = totalLength - myLim1;
  const myLim3 = totalLength - (2 * myLim1);
  const myLim4 = myLim1 * 2;

  //for adding data range to each tri point
  for (let index=0; index<straighter.length;index++) {
    let ang = (angle) * index;
    x1.push(startPoints[0][0] + ((115.5 - (index*dis)) * Math.cos(a1-ang)));
    y1.push(startPoints[0][1] + ((115.5 - (index*dis)) * Math.sin(a1-ang)));
    x2.push(startPoints[1][0] + ((115.5 - (index*dis)) * Math.cos(a2-ang)));
    y2.push(startPoints[1][1] + ((115.5 - (index*dis)) * Math.sin(a2-ang)));
    x3.push(startPoints[2][0] + ((115.5 - (index*dis)) * Math.cos(a3-ang)));
    y3.push(startPoints[2][1] + ((115.5 - (index*dis)) * Math.sin(a3-ang)));
  }
  //same as above but for prevRanang
  for (let index=0; index<straighter.length;index++) {
    let ang = (angle) * index;
    x1t2.push(prevStartPoints[0][0] + ((115.5 - (index*dis)) * Math.cos(a1t2-ang)));
    y1t2.push(prevStartPoints[0][1] + ((115.5 - (index*dis)) * Math.sin(a1t2-ang)));
    x2t2.push(prevStartPoints[1][0] + ((115.5 - (index*dis)) * Math.cos(a2t2-ang)));
    y2t2.push(prevStartPoints[1][1] + ((115.5 - (index*dis)) * Math.sin(a2t2-ang)));
    x3t2.push(prevStartPoints[2][0] + ((115.5 - (index*dis)) * Math.cos(a3t2-ang)));
    y3t2.push(prevStartPoints[2][1] + ((115.5 - (index*dis)) * Math.sin(a3t2-ang)));
  }
  //adds blanks at end of data range
  for (let index=0; index<(3 * nearnessBetweenTris);index++) {
    x1.push(50);
    y1.push(100);
    x2.push(48);
    y2.push(105);
    x3.push(52);
    y3.push(105);
    x1t2.push(50);
    y1t2.push(100);
    x2t2.push(48);
    y2t2.push(105);
    x3t2.push(52);
    y3t2.push(105);
  }
  //tri1 fills from 0 to full length of data point range
  for (let index=0; index<totalLength;index++) {
    tri1Values.push([
      {'x': x1[index],'y': y1[index]},
      {'x': x2[index],'y': y2[index]},
      {'x': x3[index],'y': y3[index]},
      {'x': x1[index],'y': y1[index]}
    ]);
  }
  //tri2 fills partly from different starting index, then adds from 0 for limited length
  if (firstCycle === 0) {
    for (let index=0; index<myLim1;index++) {
      tri2Values.push([
        {'x': x1[index],'y': y1[index]},
        {'x': x2[index],'y': y2[index]},
        {'x': x3[index],'y': y3[index]},
        {'x': x1[index],'y': y1[index]}
      ]);
    }
  }
  else {
    for (let index=(myLim2); index<totalLength;index++) {
      tri2Values.push([
        {'x': x1t2[index],'y': y1t2[index]},
        {'x': x2t2[index],'y': y2t2[index]},
        {'x': x3t2[index],'y': y3t2[index]},
        {'x': x1t2[index],'y': y1t2[index]}
      ]);
    }
  }
  for (let index=0; index<myLim2; index++) {
    tri2Values.push([
      {'x': x1[index],'y': y1[index]},
      {'x': x2[index],'y': y2[index]},
      {'x': x3[index],'y': y3[index]},
      {'x': x1[index],'y': y1[index]}
    ]);
  }
  //tri3 is the same but different limit length
  if (firstCycle === 0) {
    for (let index=0; index<myLim4;index++) {
      tri3Values.push([
        {'x': x1[index],'y': y1[index]},
        {'x': x2[index],'y': y2[index]},
        {'x': x3[index],'y': y3[index]},
        {'x': x1[index],'y': y1[index]}
      ]);
    }
  }
  else {
    for (let index=(myLim3); index<totalLength;index++) {
      tri3Values.push([
        {'x': x1t2[index],'y': y1t2[index]},
        {'x': x2t2[index],'y': y2t2[index]},
        {'x': x3t2[index],'y': y3t2[index]},
        {'x': x1t2[index],'y': y1t2[index]}
      ]);
    }
  }
  for (let index=0; index<myLim3; index++) {
    tri3Values.push([
      {'x': x1[index],'y': y1[index]},
      {'x': x2[index],'y': y2[index]},
      {'x': x3[index],'y': y3[index]},
      {'x': x1[index],'y': y1[index]}
    ]);
  }
  dataNext.push(tri1Values);
  dataNext.push(tri2Values);
  dataNext.push(tri3Values);
  return dataNext;
}

function App() {

  // const firstCycle = 0;
  const origData = [[300,226.8],[200,400],[400,400],[300,226.8]];
  const origDataXY = [
    { x: 300, y: 226.8},
    { x: 200, y: 400},  
    { x: 400, y: 400},     
    { x: 300, y: 226.8}     
  ]
  const origDataNested = [
    [
      { x: 260, y: 226.8},
      { x: 160, y: 400},  
      { x: 360, y: 400},     
      { x: 260, y: 226.8}  
   ],
    [
      { x: 260, y: 226.8},
      { x: 160, y: 400},  
      { x: 360, y: 400},     
      { x: 260, y: 226.8} 
  ],
  [
    { x: 260, y: 226.8},
    { x: 160, y: 400},  
    { x: 360, y: 400},     
    { x: 260, y: 226.8}  
 ]
 ];
  const triangle1 = [
    { x: 300, y: 276.8},
    { x: 243.3, y: 375},  
    { x: 356.7, y: 375},     
    { x: 300, y: 276.8}  
    ];
  const triangle2 = [
    { x: 300, y: 326.8},
    { x: 286.6, y: 350},  
    { x: 313.4, y: 350},     
    { x: 300, y: 326.8}        
    ];



  //useStates

  const [iteration, setIteration] = useState(0);
  const [start, setStart] = useState(false);
  const [color, setColor] = useState(['blue'])
  const [data,setData] = useState(origDataNested);
  const [counter,setCounter] = useState(2);
  const [dis, setDis] = useState(1.5);
  const [firstCycle, setFirstCycle] = useState(0);
  const [input, setInput] = useState('');
  const [speed, setSpeed] = useState([60]);
  const [angle, setAngle] = useState([0]);
  const [ranAng, setRanAng] = useState(0);
  const [prevRanAng, setPrevRanAng] = useState(0);
  const [startPoints, setStartPoints] = useState([[260,342],[260,342],[260,342]]);
  const [prevStartPoints, setPrevStartPoints] = useState([[260,342],[260,342],[260,342]]);
  const [disState,setDisState] = useState('orig');
  const [prevOrig, setPrevOrig] = useState(false);
  const [changeFactor, setChangeFactor] = useState(0);
  const [bgColor, setBgColor] = useState('blue');

  //parametres for spinning triangles
  const noAngDis = [1.7,1.8,1.9];
  const smallAngDis = [1.4,1.6,1.8];
  const medAngDis = [0.35,0.4,0.45];
  const bigAngDis = [0.38,0.4,0.42];

  function getSmallDis(angle) {
    if (angle === 0.1) {
      return bigAngDis[0]
    }
    if (angle === 0.05) {
      return medAngDis[0]
    }
    if (angle === 0.025) {
      return smallAngDis[0]
    }      
    if (angle === 0) {
      return 1.3
    }    
  }

  function getMedDis(angle) {
    // alert('angle is ',angle);
    if (angle === 0.1) {
      return bigAngDis[1]
    }
    if (angle === 0.05) {
      return medAngDis[1]
    }  
    if (angle === 0.025) {
      return smallAngDis[1]
    }      
    if (angle === 0) {
      return 1.5
    }    
  }

  function getBigDis(angle) {
    // alert('angle is ',angle);
    if (angle === 0.1) {
      return bigAngDis[2]
    }
    if (angle === 0.05) {
      return medAngDis[2]
    }  
    if (angle === 0.025) {
      return smallAngDis[2]
    }      
    if (angle === 0) {
      return 1.7
    }    
  }
  // populate next triangle points




  useInterval(() => {
    console.log('firstCycle: ',firstCycle);
    // console.log('iteration: ',iteration);
    // console.log('datanext length: ',dataNext.length)
    // console.log('start: ',start)
    const dataNext = getDataNext(dis,angle,firstCycle,ranAng,prevRanAng,startPoints,prevStartPoints);
    if (iteration > dataNext[0].length - 2) {
      setFirstCycle(1);
      setIteration(0);
      const dataNext = getDataNext(dis,angle,firstCycle,ranAng,prevRanAng,startPoints,prevStartPoints);}
    const tri1 = triangle1.map((entry,index) => {
      return {
        ...entry,
          x: dataNext[0][iteration][index].x,
          y: dataNext[0][iteration][index].y
      }
    }) 
    const tri2 = triangle1.map((entry,index) => {
      return {
        ...entry,
          x: dataNext[1][iteration][index].x,
          y: dataNext[1][iteration][index].y
      }
    }) 
    const tri3 = triangle1.map((entry,index) => {
      return {
        ...entry,
          x: dataNext[2][iteration][index].x,
          y: dataNext[2][iteration][index].y
      }
    }) 
    const newData=[];
    newData.push(tri1);
    newData.push(tri2);
    newData.push(tri3);
    // console.log('iteration: ',iteration);
    // console.log('newData: ',newData);
    
    if (start && counter < 4) {
      const dataNext = getDataNext(dis,angle, firstCycle, ranAng,prevRanAng,startPoints,prevStartPoints);
      setData(newData);
      setIteration(iteration + 1);
      // if (iteration === 4) {
      //   console.log('prevranang: ',prevRanAng);
      //   console.log('ranang: ',ranAng);
      // }
      if (iteration > dataNext[0].length - 2) {
        setFirstCycle(1);
        setIteration(0);
        setPrevRanAng(ranAng);
        const myRan = random(0,6283);
        setRanAng(myRan/1000);
        //const changeFactor = 150;
        var myRanx1 = random(-changeFactor,changeFactor);
        var myRany1 = random(-changeFactor,changeFactor);
        var myRanx2 = random(-changeFactor,changeFactor);
        var myRany2 = random(-changeFactor,changeFactor);
        var myRanx3 = random(-changeFactor,changeFactor);
        var myRany3 = random(-changeFactor,changeFactor);
        //experiment
        var myRandyx1 = myRanx1 + startPoints[0][0];
        var myRandyy1 = myRany1 + startPoints[0][1];
        var myRandyx2 = myRanx2 + startPoints[1][0];
        var myRandyy2 = myRany2 + startPoints[1][1];
        var myRandyx3 = myRanx3 + startPoints[2][0];
        var myRandyy3 = myRany3 + startPoints[2][1];
        // console.log('randoms: ',myRanx1,myRany1,myRanx2,myRany2,myRanx3,myRany3);
        // console.log('prevstartpoints1: ',prevStartPoints[0][0],prevStartPoints[0][1]);
        // console.log('startPoints1: ',startPoints[0][0],startPoints[0][1]);
        setPrevStartPoints([[startPoints[0][0],startPoints[0][1]],[startPoints[1][0],startPoints[1][1]],[startPoints[2][0],startPoints[2][1]]]);
        // if (prevOrig) {
        //   //this line keeps it based always on previous
        //   setStartPoints([[(prevStartPoints[0][0]+myRanx1),(prevStartPoints[0][1]+myRany1)],[(prevStartPoints[1][0]+myRanx2),(prevStartPoints[1][1]+myRany2)],[(prevStartPoints[2][0]+myRanx3),(prevStartPoints[2][1]+myRany3)]]);
        //   setDisState('prev');
        // }
        // else {
        //   //this line keeps it based on original
        //   setStartPoints([[(300+myRanx1),(342+myRany1)],[(300+myRanx2),(342+myRany2)],[(300+myRanx3),(342+myRany3)]]);
        //   setDisState('orig');        
        // }
        //this line keeps it based always on previous
        setStartPoints([[myRandyx1,myRandyy1],[myRandyx2,myRandyy2],[myRandyx3,myRandyy3]]);
        setDisState('prev'); 
        // console.log('prevstartpoints2: ',prevStartPoints[0][0],prevStartPoints[0][1]);
        // console.log('startPoints2: ',startPoints[0][0],startPoints[0][1]);               
      };
    }
  }, speed[0]);



  return (
    <React.Fragment>
      {/* <div class="99">
        <h1 class="99">Triangle</h1>
      </div> */}
      <div class="c00">
        <div class="c01">
          <button class="startbtn" onClick={() => setStart(!start)}>
            {start ? "Stop" : "Start!"}
          </button>
          <br />
          <div>
          <button class="dropbtn2">Change speed</button>
          </div>
          <div class="speedbtns">
            <div class="speedbtn">
              <button class="speedbtn1"><a onClick={() =>setSpeed(speed.map(value => value - (value/10)))}>+</a></button>
              <button class="speedbtn2"><a onClick={() =>setSpeed(speed.map(value => value + (value/10)))}>-</a></button>
            </div>
          </div>       
          <div>
            <div>
              <button class="dropbtn3">
              <label htmlFor="slider">Change angle</label>
              <input type="range" min="0" max="0.045" step="0.015" id="slider" value={angle} onInput={(e) => {setAngle([parseFloat(e.target.value)]); setIteration(0); setFirstCycle(0);}}/>
              </button>
            </div>
            
          </div>
          <div>
            <div>
              <button class="dropbtn3" style={{backgroundColor: 'steelblue'}}>
              <label htmlFor="slider">wonkiness factor</label>
              <input type="range" min="0" max="100" step="1" id="slider" value={changeFactor} onInput={(e) => {setChangeFactor([parseFloat(e.target.value)]);}}/>
              </button>
            </div>
            
          </div>          
          <div>
            <button class="dropbtn5" onClick={() => {setColor(color.map(value => getColor(color)));}}><a>Change color</a></button>
          </div>   
          <button class="resetbtn" onClick={() => {setStartPoints([[300,342],[300,342],[300,342]]);setPrevStartPoints([[300,342],[300,342],[300,342]]);}}>
            Reset
          </button>          
          {/* <p>Iteration: {iteration}</p> */}
        </div>
        <div class="c02">
          <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Triangle</h1>
          <Triangle data={data} color={color} />
        </div>
      </div>
      <div>
        <p>thanks for visiting!</p>
      </div>
    </React.Fragment>
  );
}

export default App;