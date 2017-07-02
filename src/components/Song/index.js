
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
    let current = [...this.state.visibleCharts]

    if (Array.isArray(chord)) {
      let chords = [...new Set(chord)]
      if (current.length == chords.length) {
        current = []
      } else {
        current = chords
      }
    } else {
      chord = chord.trim()
      let nowAt = current.indexOf(chord)

      if (nowAt != -1) {
        current.splice(nowAt, 1)
      } else {
        current.push(chord)
      }
    }
    console.log(current);
    this.setState({ visibleCharts: current })
  }

  chartIsVisible(chord) {
    return this.state.visibleCharts.indexOf(chord.trim()) != -1
  }

  renderSection({ section, chords, words }, i) {
    chords = (chords.split(',') || []).map((c) => c.trim())
    return <div className={ styles.section } key={ `song-section-${i}`}>
      <header className={ styles.sectiontitle }>{ section }</header>
      <div className={ styles.chords }>
        { chords.map((c) => {
            let className = styles.chordname
            if (this.chartIsVisible(c)) {
              className += ` ${styles.showing}`
            }
            return <span className={ className } onClick={ () => this.toggleChordChart(c) }>{ c }</span>
        }) }
        <span className={ styles.chordname } onClick={ () => this.toggleChordChart(chords) }>ALL</span>
      </div>
      <div className="chords-charts">
        { [...new Set(chords)].map((c, i) => {
          if (this.chartIsVisible(c)) {
            return <Chart name={ c } keys={ CHORDS[c.toLowerCase()] } key={ `song-chord-${i}`} />
          } else {
            return null
          }
        }) }
      </div>
      <div className={ styles.words } dangerouslySetInnerHTML={ {__html: marked(words)}} />
    </div>
  }

  render() {
    let { title, song } = this.state

    return <div className={ styles.song }>
      <header className={ styles.title }>{ title }</header>
      { song.map((section, i) => {
        return this.renderSection(section, i)
      }) }
    </div>
  }
}

export default Song;
