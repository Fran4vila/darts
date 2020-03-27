import React from 'react'
// import { angleCoord } from '../util/trigonometry'

// const getPath = (center, angleStart, angleEnd, innerRadius, outerRadius) => {
//   const XangleStart = center + innerRadius * Math.cos((Math.PI / 180) * angleStart)
//   const YangleStart = center + innerRadius * Math.sin((Math.PI / 180) * angleStart)

//   const angleInner = angleCoord(center, innerRadius, angleStart)
//   const angleOuter = angleCoord(center, outerRadius, angleEnd)

//   const paramD =
//   'M ' + center + ',' + center +
//   ' A ' + innerRadius + ',' + innerRadius + ' 0 0,1 ' + ' ' + angleInner.x + ',' + angleInner.y +
//   ' L ' + XangleStart + ',' + YangleStart +
//   ' A ' + outerRadius + ',' + outerRadius + ' 0 0,0 ' + ' ' + angleOuter.x + ',' + angleOuter.y +
//   ' z'
//   return paramD
// }

const getPath2 = (center, angleStart, angleEnd, radius) => {
  const XangleStart = center + radius * Math.cos((Math.PI / 180) * angleStart)
  const YangleStart = center + radius * Math.sin((Math.PI / 180) * angleStart)

  const XangleEnd = center + radius * Math.cos((Math.PI / 180) * angleEnd)
  const YangleEnd = center + radius * Math.sin((Math.PI / 180) * angleEnd)

  const paramD =
  'M ' + center + ', ' + center +
  // ' A' + radius + ',' + radius + ' 0 0, 1 ' + ' ' + XangleEnd + ',' + YangleEnd +
  ' L ' + XangleStart + ',' + YangleStart +
  ' A ' + radius + ',' + radius + ' 0 0, 1 ' + ' ' + XangleEnd + ',' + YangleEnd +
  ' z'
  return paramD
}

const Section = (props) => {
  const {
    center,
    index,
    sectionsCount,
    radius,
    color,
    onMouseOverSection
  } = props

  const angle = 360 / sectionsCount
  const angleStart = index * angle
  const angleEnd = (index + 1) * angle

  return (
    <path
      d={getPath2(center, angleStart, angleEnd, radius)}
      // d={getPath(center, angleStart, angleEnd, innerRadius, outerRadius)}
      style={{ fill: color, cursor: 'pointer' }}
      onMouseOver={onMouseOverSection}
    />
  )
}

Section.propTypes = {
  center: React.PropTypes.number,
  index: React.PropTypes.number,
  sectionsCount: React.PropTypes.number,
  radius: React.PropTypes.number,
  color: React.PropTypes.string,
  onMouseOverSection: React.PropTypes.func
}

export default Section
