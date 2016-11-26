import * as d3 from 'd3';


function rad2deg(a) {
  return a * 180 / Math.PI;
}

const formatSI = d3.format('.3s');

function formatBytes(bytes) {
  return formatSI(bytes) + 'B';
}

const white = d3.hsl('white');

function stringHash(s) {
  var hash = 0
  for (let i = 0, len = s.length; i < len; i++) {
    hash = ((hash << 5) - hash) + s.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}


export { rad2deg, formatSI, formatBytes, white, stringHash };
