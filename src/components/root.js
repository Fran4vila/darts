import Dartboard from './dartboard'
import { connect } from 'react-redux'
import { HIGHLIGHT_BULL, HIGHLIGHT_SECTION, HIGHLIGHT_NONE } from '../action-types'
import pick from 'lodash/fp/pick'
import { getBull, getSections } from '../selectors'

const mapStateToProps = (state) => ({
  ...pick([
    'innerBullRadius',
    'outerBullRadius',
    'tripleRingInnerRadius',
    'tripleRingOuterRadius',
    'doubleRingInnerRadius',
    'doubleRingOuterRadius',
    'valuesRadius',
    'totalRadius'
  ], state.dartboard),
  sections: getSections(state),
  bull: getBull(state)
})

const mapDispatchToProps = (dispatch) => ({
  onMouseOverBull: ({ ring }) => dispatch({
    type: HIGHLIGHT_BULL,
    ring
  }),
  onMouseOverSection: ({ ring, index }) => dispatch({
    type: HIGHLIGHT_SECTION,
    ring,
    index
  }),
  onMouseOut: () => dispatch({
    type: HIGHLIGHT_NONE
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(Dartboard)
