import React from 'react'

const createOnMouseOverBull = (onMouseOverBull, ring) => () => onMouseOverBull({ ring })

const Dartboard = (props) => {
  const {
    innerBullRadius,
    outerBullRadius,
    tripleRingInnerRadius,
    tripleRingOuterRadius,
    doubleRingInnerRadius,
    doubleRingOuterRadius,
    valuesRadius,
    totalRadius,
    sections,
    bull,
    onMouseOverSection,
    onMouseOverBull,
    onMouseOut
  } = props

  const center = totalRadius
  const width = totalRadius * 2
  const height = width

  return (
    <svg onMouseOut={onMouseOut} style={{ width, height }}>
      <circle
        cx={center}
        cy={center}
        r={outerBullRadius}
        style={{ fill: bull.color.single, cursor: 'pointer' }}
        onMouseOver={createOnMouseOverBull(onMouseOverBull, 'single')}
      />
      <circle
        cx={center}
        cy={center}
        r={innerBullRadius}
        style={{ fill: bull.color.double, cursor: 'pointer' }}
        onMouseOver={createOnMouseOverBull(onMouseOverBull, 'double')}
      />
    </svg>
  )
}

Dartboard.propTypes = {
  innerBullRadius: React.PropTypes.number,
  outerBullRadius: React.PropTypes.number,
  tripleRingInnerRadius: React.PropTypes.number,
  tripleRingOuterRadius: React.PropTypes.number,
  doubleRingInnerRadius: React.PropTypes.number,
  doubleRingOuterRadius: React.PropTypes.number,
  valuesRadius: React.PropTypes.number,
  totalRadius: React.PropTypes.number,
  sections: React.PropTypes.array,
  bull: React.PropTypes.object,
  onMouseOverSection: React.PropTypes.func,
  onMouseOverBull: React.PropTypes.func,
  onMouseOut: React.PropTypes.func
}

export default Dartboard
