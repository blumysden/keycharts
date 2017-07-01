
import React from 'react';
import styles from './styles.scss';
import Chart from '../Chart'
import $ from 'jquery'
import archieml from 'archieml'

const CHORDS = {
  'badd9': ['b','ds','fs','cs'],
  'f#madd9/a': ['fs','as','cs','ds'],
  'asus2': ['a','b','e'],
  'e': []
}

class Song extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      song: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: `/songs/${this.props.routeParams.id}.aml`,
      dataType: 'text'
    }).then((aml) => {
      let song = archieml.load(aml);
      this.setState(Object.assign({}, this.state, song))
    })
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  renderSection({ section, chords, text }, i) {
    return <div className="section" key={ `song-section-${i}`}>
      <header>{ section }</header>
      <div className="chords">
        { chords.split(',').map((c, i) => {
          let chord = c.trim()
          return <Chart name={ chord } keys={ CHORDS[chord.toLowerCase()] } key={ `song-chord-${i}`} />
        }) }
      </div>
    </div>
  }

  render() {
    let { title, song } = this.state

    return <div className={ styles.song }>
      <header>{ title }</header>
      { song.map((section, i) => {
        return this.renderSection(section, i)
      }) }
    </div>
  }
}

export default Song;
