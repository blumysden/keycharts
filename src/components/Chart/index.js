
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

// const OCTAVE = ['b','as','a','gs','g','fs','f','e','ds','d','cs','c']
const OCTAVE = ['f','fs','g','gs','a','as','b','c','cs','d','ds','e']

class Chart extends React.Component {

  breakAcrossOctaves(notes) {
    return notes.reduce((memo, n, i) => {
      if (i == 0 || OCTAVE.indexOf(n) < OCTAVE.indexOf(notes[i - 1])) {
        memo.push([])
      }
      memo[memo.length - 1].push(n)
      return memo
    }, [])
  }

  renderOctave(notes=[], i, fingerOffset) {
    return <ul className="set" key={ `octave-${i}` }>
      { OCTAVE.map((k) => {
        let className = `${styles[k]} ${((k.length > 1)) ? styles.black : styles.white }`,
            finger = notes.indexOf(k),
            mark = (finger != -1) ? <span>{ finger + 1 + fingerOffset }</span> : null

        return <li className={ className } key={ `${i}-${k}` }>{ mark }</li>
      }) }
    </ul>
  }

  render () {
    let { name, keys } = this.props,
        fingers = 0;
    return <div className={ styles.octave }>
      <header>{ name }</header>
      { this.breakAcrossOctaves(keys).map((octave, i) => {
        let elem = this.renderOctave(octave, i, fingers)
        fingers += octave.length
        return elem
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
