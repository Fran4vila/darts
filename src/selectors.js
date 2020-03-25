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

export { getBull }
