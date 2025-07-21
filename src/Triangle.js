import React, { useRef, useEffect } from "react";
import { select, scaleBand, scaleLinear, max, line } from "d3";
import useResizeObserver from "./useResizeObserver";
import { values } from "lodash";

function Triangle({ data, color, dis, dataNext }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const w = 400;
  const h = 700;
  const yCorrect = 200;
  const xCorrect = 150;



  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current)
        .attr('width', w)
        .attr('height', w);


    const xScale = scaleLinear()
        .domain([0,w])
        .range([0,450]);
    const yScale = scaleLinear()
        .domain([0,w])
        .range([0,450]);
    const myLine = line(
      (d) => (d.x - xCorrect) * 1.5,
      (d) => (d.y - yCorrect) * 1.5
    );
    const myLine2 = line(
      (d) => d.x + 100,
      (d) => d.y - yCorrect + 100
    );
        // .x(function(d) { return xScale(d.x)})
        // .y(function(d) { return yScale(d.y) - yCorrect});
    //color each of 3 triangles separately
    if (color[0] === 'blue') {
      var color1 = 'darkblue';
      var color2 = 'blue';
      var color3 = 'dodgerblue';
    }
    if (color[0] === 'green') {
      var color1 = 'darkgreen';
      var color2 = 'yellowgreen';
      var color3 = 'chartreuse';
    }
    if (color[0] === 'red') {
      var color1 = 'darkred';
      var color2 = 'red';
      var color3 = 'orange';
    }    
    if (color[0] === 'pink') {
      var color1 = 'deeppink';
      var color2 = 'hotpink';
      var color3 = 'lightpink';
    }        
    if (color[0] === 'yellow') {
      var color1 = 'gold';
      var color2 = 'yellow';
      var color3 = 'lightyellow';
    }    
    if (color[0] === 'purple') {
      var color1 = 'purple';
      var color2 = 'darkviolet';
      var color3 = 'mediumpurple';
    }                 


    // draw the bars
    svg.selectAll('path').remove()

    svg
    .selectAll('.temp-path')
    .data(data)
    .enter()
    .append('path')
    .attr('d', myLine(data[0]))
    .attr('fill','none')
    .attr('stroke',color1);
    svg
    .selectAll('.temp-path')
    .data(data)
    .enter()
    .append('path')
    .attr('d', myLine(data[1]))
    .attr('fill','none')
    .attr('stroke',color2);
    svg
    .selectAll('.temp-path')
    .data(data)
    .enter()
    .append('path')
    .attr('d', myLine(data[2]))
    .attr('fill','none')
    .attr('stroke',color3);

    // svg
    // .selectAll('.temp-path')
    // .data(data)
    // .enter()
    // .append('path')
    // .attr('d', value => myLine2(value))
    // .attr('fill','none')
    // .attr('stroke','red');


  }, [data, dimensions, color, dis, dataNext]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default Triangle;