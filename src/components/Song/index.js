
import React from 'react';
import styles from './styles.scss';
import Chart from '../Chart'
import $ from 'jquery'
import archieml from 'archieml'
import marked from 'marked'
import { CHORDS } from '../../util/chords'

class Song extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      song: [],
      visibleCharts: []
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

  toggleChordChart(chord) {
    let current = this.state.visibleCharts.slice(),
        nowAt = current.indexOf(chord)

    if (nowAt != -1) {
      current.splice(nowAt, 1)
    } else {
      current.push(chord)
    }
    console.log(current);
    this.setState({ visibleCharts: current })
  }

  renderSection({ section, chords, words }, i) {
    let { visibleCharts } = this.state

    return <div className="section" key={ `song-section-${i}`}>
      <header>{ section }</header>
      <div className="chords">
        { chords.split(',').map((c) => {
            return <span className={ styles.chordname } onClick={ () => this.toggleChordChart(c) }>{ c.trim()}</span>
        }) }
      </div>
      <div className={ styles.words } dangerouslySetInnerHTML={ {__html: marked(words)}} />
      <div className="chords-charts">
        { chords.split(',').map((c, i) => {
          if (visibleCharts.indexOf(c) == -1) {
            return null
          }
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
