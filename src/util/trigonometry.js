const toRadians = Math.PI / 180

function angleCoord (center, radius, angle) {
  return {
    x: center + radius * Math.cos(toRadians * angle),
    y: center + radius * Math.sin(toRadians * angle)
  }
}

export default angleCoord
