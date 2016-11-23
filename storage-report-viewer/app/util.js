import * as d3 from 'd3';


function rad2deg(a) {
  return a * 180 / Math.PI;
}

const formatSI = d3.format('.3s');

function formatBytes(bytes) {
  return formatSI(bytes) + 'B';
}

const white = d3.hsl('white');


export { rad2deg, formatSI, formatBytes, white };
