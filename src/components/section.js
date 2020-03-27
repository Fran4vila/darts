import React from 'react'
import angleCoord from '../util/trigonometry'

const getPath = (center, angleStart, angleEnd, radius) => {
  const XangleStart = center + radius * Math.cos((Math.PI / 180) * angleStart)
  const YangleStart = center + radius * Math.sin((Math.PI / 180) * angleStart)

  const XangleEnd = center + radius * Math.cos((Math.PI / 180) * angleEnd)
  const YangleEnd = center + radius * Math.sin((Math.PI / 180) * angleEnd)

  const paramD =
  'M ' + center + ', ' + center +
  ' L ' + XangleStart + ',' + YangleStart +
  ' A ' + radius + ',' + radius + ' 0 0, 1 ' + ' ' + XangleEnd + ',' + YangleEnd +
  ' z'
  return paramD
}

const Section = (props) => {
  const {
    center,
    index,
    initialAngle,
    sectionAngle,
    radius,
    color,
    onMouseOverSection,
    value
  } = props

  const drawSectionValue = (center, radius, initialAngle, sectionAngle, index, value) => {
    const coord = angleCoord(center, radius, sectionAngle * index - initialAngle)

    return (<text
      x={coord.x}
      y={coord.y}
      style={{textAnchor: 'middle', alignmentBaseline: 'central', fontFamily: 'Arial'}}
    >
      {value}
    </text>)
  }

  const toCenterAngle = sectionAngle / 2
  const startingAngle = initialAngle + toCenterAngle
  const angleStart = index * sectionAngle - startingAngle
  const angleEnd = (index + 1) * sectionAngle - startingAngle

  return (
    value
      ? drawSectionValue(center, radius, initialAngle, sectionAngle, index, value)
    : (<path
      d={getPath(center, angleStart, angleEnd, radius)}
      style={{ fill: color, cursor: 'pointer' }}
      onMouseOver={onMouseOverSection}
    />)
  )
}

Section.propTypes = {
  center: React.PropTypes.number,
  index: React.PropTypes.number,
  initialAngle: React.PropTypes.number,
  sectionAngle: React.PropTypes.number,
  radius: React.PropTypes.number,
  color: React.PropTypes.string,
  onMouseOverSection: React.PropTypes.func,
  value: React.PropTypes.number
}

export default Section
