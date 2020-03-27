import set from 'lodash/fp/set'

const getBull = state => {
  const { highlight } = state.dartboard

  const bull = {
    color: {
      single: 'green',
      double: 'red'
    }
  }

  if (highlight.type === 'bull') {
    return set(['color', highlight.ring], 'yellow', bull)
  } else {
    return bull
  }
}

const getDoubleAndTripleColor = index => index % 2 === 0 ? 'green' : 'red'

const getSingleColor = index => index % 2 === 0 ? 'black' : 'white'

const getSections = state => {
  const { values, highlight } = state.dartboard

  return values.map((value, index) => {
    const section = {
      color: {
        double: getDoubleAndTripleColor(index),
        triple: getDoubleAndTripleColor(index),
        innerSingle: getSingleColor(index),
        outerSingle: getSingleColor(index)
      },
      value: value
    }

    if (highlight.type === 'section' && values[highlight.index] === value) {
      return set(['color', highlight.ring], 'yellow', section)
    } else {
      return section
    }
  })
}

export { getBull, getSections }
