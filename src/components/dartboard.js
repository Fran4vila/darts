import React from 'react'
import Section from './section'

const createOnMouseOverBull = (onMouseOverBull, ring) => () => onMouseOverBull({ ring })
const createOnMouseOverSection = (onMouseOverSection, ring, index) => () => onMouseOverSection({ ring, index })

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
  const initialAngle = 90
  const sectionsCount = sections && sections.length
  const sectionAngle = (sectionsCount && sectionsCount !== 0) ? 360 / sectionsCount : null

  return (
    <svg onMouseOut={onMouseOut} style={{ width, height }}>
      {sections.map((item, index) => (
        <g
          key={index}
        >
          <Section
            key={`value_${index}`}
            center={center}
            index={index}
            initialAngle={initialAngle}
            sectionAngle={sectionAngle}
            radius={valuesRadius}
            value={item.value}
          />
          <Section
            key={`doubleOuter_${index}`}
            center={center}
            index={index}
            initialAngle={initialAngle}
            sectionAngle={sectionAngle}
            radius={doubleRingOuterRadius}
            color={item.color.double}
            onMouseOverSection={createOnMouseOverSection(onMouseOverSection, 'double', index)}
          />
          <Section
            key={`doubleInner_${index}`}
            center={center}
            index={index}
            initialAngle={initialAngle}
            sectionAngle={sectionAngle}
            radius={doubleRingInnerRadius}
            color={item.color.outerSingle}
            onMouseOverSection={createOnMouseOverSection(onMouseOverSection, 'outerSingle', index)}
          />
          <Section
            key={`tripleOuter_${index}`}
            center={center}
            index={index}
            initialAngle={initialAngle}
            sectionAngle={sectionAngle}
            radius={tripleRingOuterRadius}
            color={item.color.triple}
            onMouseOverSection={createOnMouseOverSection(onMouseOverSection, 'triple', index)}
          />
          <Section
            key={`tripleInner_${index}`}
            center={center}
            index={index}
            initialAngle={initialAngle}
            sectionAngle={sectionAngle}
            radius={tripleRingInnerRadius}
            color={item.color.innerSingle}
            onMouseOverSection={createOnMouseOverSection(onMouseOverSection, 'innerSingle', index)}
          />
        </g>
      ))}
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
