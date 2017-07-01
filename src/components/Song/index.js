
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

  componentDidMount() {
    
  }

  render () {
    console.log(this.props);
    return <div className={ styles.song }>
      { CHORDS.map((c, i) => {
        return <Chart name={ c.name } keys={ c.keys } key={ `song-chord-${i}`} />
      }) }
    </div>
  }
}

export default Song;
