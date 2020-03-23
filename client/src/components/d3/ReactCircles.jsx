import React, { useEffect, useState } from 'react';
import { selectAll, select } from 'd3';
function ReactCircles() {
  let [state, updateState] = useState({
    data: '[32, 57, 112]',
    fill: 'steelblue',
    baseR: 30,
  });
  useEffect(() => {
    //Creates our initial 3 circles
    var svg = select('svg');
    let circle = svg.selectAll('circle');
    circle.style('fill', state.fill);
    circle.attr('r', Number(state.baseR));
    circle.data(state.data);
    circle.attr('r', function(d) {
      return Math.sqrt(d);
    });
    circle.attr('cx', function(d, i) {
      return i * 100 + 30;
    });
  }, []);
  useEffect(() => {
    var svg = select('svg');
    let circle = svg.selectAll('circle');
    circle.data(JSON.parse(state.data));
  }, [state]);
  return (
    <div>
      <svg width="720" height="120">
        <circle cx="40" cy="60" r="10"></circle>
        <circle cx="80" cy="60" r="10"></circle>
        <circle cx="120" cy="60" r="10"></circle>
      </svg>
      <input
        type="text"
        placeholder="fill"
        onChange={e =>
          updateState({
            data: e.target.value,
            fill: state.fill,
            baseR: state.baseR,
          })
        }
      ></input>
      <input
        type="number"
        min="0"
        placeholder="baseR"
        onChange={e =>
          updateState({
            data: state.data,
            baseR: e.target.value,
            fill: state.baseR,
          })
        }
      ></input>
    </div>
  );
}
export default ReactCircles;
