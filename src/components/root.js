import Dartboard from './dartboard'
import { connect } from 'react-redux'
import { HIGHLIGHT_BULL } from '../action-types'
import pick from 'lodash/fp/pick'
import { getBull } from '../selectors'

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
  sections: [], // TODO fetch from redux state
  bull: getBull(state)
})

const mapDispatchToProps = (dispatch) => ({
  onMouseOverBull: ({ ring }) => dispatch({
    type: HIGHLIGHT_BULL,
    ring
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(Dartboard)
