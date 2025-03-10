import React,{useState, useEffect} from 'react';

export default function App() {
  const [sum,setSum]=useState(0);

  const Add=(e)=>{
    e.preventDefault();
    let numOne=document.querySelector('#num1').value;
    let numTwo=document.querySelector('#num2').value;
    let sum = parseInt(numOne) + parseInt(numTwo);
    setSum(sum);
  }

  return (
    <center>
      <h1>Calculator</h1>
      <form>
        <input type="text" id="num1"/>
        <input type="text" id="num2"/>
        <input type="text" id="result" value={sum} readOnly />
        <button className="b1" onClick={Add}></button>
      </form>
    </center>
  );
}
