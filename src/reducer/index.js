import { HIGHLIGHT_SECTION, HIGHLIGHT_BULL, HIGHLIGHT_NONE } from '../action-types'
import merge from 'lodash/fp/merge'

const initialState = {
  dartboard: {
    innerBullRadius: 10,
    outerBullRadius: 20,
    tripleRingInnerRadius: 80,
    tripleRingOuterRadius: 100,
    doubleRingInnerRadius: 180,
    doubleRingOuterRadius: 200,
    valuesRadius: 220,
    totalRadius: 240,
    values: [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5],
    highlight: {
      type: 'none', // 'none' || 'bull' || 'section'
      ring: null,
      index: null
    }
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case HIGHLIGHT_BULL:
      return merge(state, {
        dartboard: {
          highlight: {
            type: 'bull',
            ring: action.ring,
            index: null
          }
        }
      })
    default:
      return state
  }
}
