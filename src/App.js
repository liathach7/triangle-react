import React, { useState, useEffect, useId } from "react";
import Triangle from "./Triangle";
import useInterval from "./useInterval";
import "./App.css";
import { range } from "lodash";

const getRandomIndex = array => {
  return Math.floor(array.length * Math.random());
};

function getDataNext(dis,angle,firstCycle) {
  const dataNext = [];
  const tri1Values = [];
  const tri2Values = [];
  const tri3Values = [];
  // const r2 = 115.5 - dis;
  const x1 = [];
  // const y1 = range(226.8,342.2,dis[0]);
  // y1.map(() => {
  //   x1.push(300)
  // })
  // const x2 = range(200,300,(dis[0]*0.866));
  // const y2 = range(400,342.3,(dis[0]*-0.5));
  // const x3 = range(400,300,(dis[0]*-0.866));
  // const y3 = range(400,342.2,(dis[0]*-0.5));
  const y1 = [];
  const x2 = [];
  const y2 = [];
  const x3 = [];
  const y3 = [];
  const a1 = 4.712;
  const a2 = 2.623;
  const a3 = 0.518;
  
  const straighter = range(226.8,342.2,dis[0]);
  // console.log('straigher: ',straighter);
  const totalLength = straighter.length + 4;
  const nearnessBetweenTris = 3;
  const myLim1 = Math.floor(totalLength/nearnessBetweenTris);
  const myLim2 = totalLength - myLim1;
  const myLim3 = totalLength - (2 * myLim1);
  const myLim4 = myLim1 * 2;
  //for adding data range to each tri point
  for (let index=0; index<straighter.length;index++) {
    let ang = (angle) * index;
    x1.push(300 + ((115.5 - (index*dis)) * Math.cos(a1-ang)));
    y1.push(342.3 + ((115.5 - (index*dis)) * Math.sin(a1-ang)));
    x2.push(300 + ((115.5 - (index*dis)) * Math.cos(a2-ang)));
    y2.push(342.3 + ((115.5 - (index*dis)) * Math.sin(a2-ang)));
    x3.push(300 + ((115.5 - (index*dis)) * Math.cos(a3-ang)));
    y3.push(342.3 + ((115.5 - (index*dis)) * Math.sin(a3-ang)));
  }
  //adds blanks at end of data range
  for (let index=0; index<(3 * nearnessBetweenTris);index++) {
    x1.push(50);
    y1.push(100);
    x2.push(48);
    y2.push(105);
    x3.push(52);
    y3.push(105);
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
        {'x': x1[index],'y': y1[index]},
        {'x': x2[index],'y': y2[index]},
        {'x': x3[index],'y': y3[index]},
        {'x': x1[index],'y': y1[index]}
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
        {'x': x1[index],'y': y1[index]},
        {'x': x2[index],'y': y2[index]},
        {'x': x3[index],'y': y3[index]},
        {'x': x1[index],'y': y1[index]}
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
      { x: 300, y: 226.8},
      { x: 200, y: 400},  
      { x: 400, y: 400},     
      { x: 300, y: 226.8}  
   ],
    [
      { x: 300, y: 226.8},
      { x: 200, y: 400},  
      { x: 400, y: 400},     
      { x: 300, y: 226.8} 
  ],
  [
    { x: 300, y: 226.8},
    { x: 200, y: 400},  
    { x: 400, y: 400},     
    { x: 300, y: 226.8}  
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
  const [dis, setDis] = useState([10]);
  const [firstCycle, setFirstCycle] = useState(0);
  const [input, setInput] = useState('');
  const [speed, setSpeed] = useState([250])
  const [angle, setAngle] = useState([0])
  // const [dataNext, setDataNext] = useState([]);


  // populate next triangle points




  useInterval(() => {
    console.log('firstCycle: ',firstCycle);
    // console.log('iteration: ',iteration);
    // console.log('datanext length: ',dataNext.length)
    // console.log('start: ',start)
    const dataNext = getDataNext(dis,angle,firstCycle);
    // console.log('dataNext: ',dataNext);
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
      const dataNext = getDataNext(dis,angle);
      setData(newData);
      setIteration(iteration + 1);
      if (iteration > dataNext[0].length - 2) {
        setFirstCycle(1);
        setIteration(0);
      };
    }
  }, speed[0]);


  return (
    <React.Fragment>
      <div class="c00">
        <div class="c01">
          <button class="startbtn" onClick={() => setStart(!start)}>
            {start ? "Stop animation" : "Start animation!"}
          </button>
          <br />
          <div class="dropdown">
            <button class="dropbtn2">Change distance</button>
          <div class="dropdown-content">
            <a onClick={() =>setDis(dis.map(value => 2))}>Small</a>
            <a onClick={() =>{setDis(dis.map(value => 5));setIteration(0);}}>Medium</a>
            <a onClick={() =>{setDis(dis.map(value => 10));setIteration(0);}}>Big</a>
          </div>
          </div>
          <br />
          <div class="dropdown">
            <button class="dropbtn2">Change speed</button>
          <div class="dropdown-content">
            <a onClick={() =>setSpeed(speed.map(value => 600))}>Slow</a>
            <a onClick={() =>setSpeed(speed.map(value => 200))}>Medium</a>
            <a onClick={() =>setSpeed(speed.map(value => 60))}>Fast</a>
          </div>
          </div>          
          {/* <div>
            <label htmlFor={id}>Please specify angle:</label>
            <input type="range" min="0" max="5" id={id} value={angle} onInput={(e) => {setAngle([parseFloat(e.target.value)]); setIteration(0);}}/>
          </div> */}
          <div class="dropdown">
            <button class="dropbtn2">Change angle</button>
          <div class="dropdown-content">
            <a onClick={() =>setAngle(angle.map(value => 0))}>None</a>
            <a onClick={() =>setAngle(angle.map(value => 0.05))}>Small</a>
            <a onClick={() =>setAngle(angle.map(value => 0.2))}>Big</a>
          </div>
          </div>   
          <br />
          <div class="dropdown">
            <button class="dropbtn">Change colour</button>
          <div class="dropdown-content">
            <a onClick={() =>setColor(color.map(value => 'red'))}>Red</a>
            <a onClick={() =>setColor(color.map(value => 'blue'))}>Blue</a>
            <a onClick={() =>setColor(color.map(value => 'green'))}>Green</a>
          </div>
          </div>
          <p>Iteration: {iteration}</p>
        </div>
        <div class="c02">
          <h1>Triangle</h1>
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