
import React from 'react';
import styles from './styles.scss';
import Chart from '../Chart'

const CHORDS = [
  {
    name: 'badd9',
    keys: ['b','ds','fs','cs']
  }
]

class Song extends React.Component {

  render () {
    return <div className={ styles.song }>
      { CHORDS.map((c) => {
        return <Chart name={ c.name } keys={ c.keys } />
      }) }
    </div>
  }
}

export default Song;
