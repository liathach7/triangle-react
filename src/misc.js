/*
//scatter
export default function App() {
  const [data] = useState([[300,226.8],
    [200,400],
    [400,400],
    [300,226.8]
  ]);

  const svgRef = useRef();

  
  //scatter
  useEffect(() => {
    // set up container
    const w = 500;
    const h = 500;
    const svg = d3.select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('overflow','visible')
      .style('margin-top','100px')
      .style('background','#d3d3d3')
    //set up scaling
    //circle
    const xScale = d3.scaleLinear()
      .domain([0,500])
      .range([0,w]);
    const yScale = d3.scaleLinear()
      .domain([0,500])
      .range([h,0]); 

      //.curve(d3.curveCardinal);
    //set up svg data
    //scatter
    svg.selectAll()
      .data(data)
      .enter()
      .append('circle')
        .attr('cx', d => xScale(d[0]))
        .attr('cy',d => yScale(d[1]))
        .attr('r', 2)
  }, [data]); 


  return (
    <center>
      <h1>Tirangle</h1>
      <svg ref={svgRef}></svg>
    </center>
  );
}
*/



/*
[{
    'key': p1x[1],
    'value': p1y[1]
  },
  {
    'key': p2x[1],
    'value': p2y[1],
  },
  {
    'key': p3x[1],
    'value': p3y[1]
  },
  {
    'key': p1x[1],
    'value': p1y[1]
  }
  ]);
  */

  /*
  function myMapper(data) {
  data.map(thing => ({'key':thing.key + 1,'value':thing.value+5}));
};

onClick={() =>setColors(colors.map(value => value))}

          <div class="dropdown">
            <button class="dropbtn">Change colour</button>
          <div class="dropdown-content">
            <a onClick={() =>setColorIndex(colorIndex.map(value => 'red'))}>Red</a>
            <a onClick={() =>setColorIndex(colorIndex.map(value => 'blue'))}>Blue</a>
            <a onClick={() =>setColorIndex(colorIndex.map(value => 'lawngreen'))}>Green</a>
          </div>
        </div>

*/