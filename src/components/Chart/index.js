
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

// const OCTAVE = ['b','as','a','gs','g','fs','f','e','ds','d','cs','c']
const OCTAVE = ['f','fs','g','gs','a','as','b','c','cs','d','ds','e']

class Chart extends React.Component {

  renderOctave(notes=[], i) {
    return <ul className="set">
      { OCTAVE.map((k) => {
        let className = `${styles[k]} ${((k.length > 1)) ? styles.black : styles.white }`,
            finger = notes.indexOf(k),
            mark = (finger != -1) ? <span>{ finger + 1 }</span> : null

        return <li className={ className } key={ `${i}-${k}` }>{ mark }</li>
      }) }
    </ul>
  }

  render () {
    let { name, keys } = this.props
    return <div className={ styles.octave }>
      <header>{ name }</header>
      { keys.map((octave, i) => {
        return this.renderOctave(octave, i)
      }) }
    </div>
  }
}

Chart.propTypes = {
  keys: PropTypes.array,
  name: PropTypes.string
}

Chart.defaultPropTypes = {
  keys: [],
  name: 'Unnamed'
}

export default Chart;
