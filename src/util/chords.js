const otherChords = {
  'asus2': ['a','b','e'],
  'badd9': ['b','d#','f#','c#'],
  'f#madd9/a': ['f#','a#','c#','d#']
}

export const OCTAVE = ['f','f#','g','g#','a','a#','b','c','c#','d','d#','e']

const allChords = OCTAVE.reduce((memo, n) => {
  let position = OCTAVE.indexOf(n),
      fromEnd = OCTAVE.length - position - 1,
      third = (4 > fromEnd) ? OCTAVE[3 - fromEnd] : OCTAVE[position + 4],
      minorthird = (3 > fromEnd) ? OCTAVE[2 - fromEnd] : OCTAVE[position + 3],
      fifth = (7 > fromEnd) ? OCTAVE[6 - fromEnd] : OCTAVE[position + 7],
      nine = (2 > fromEnd) ? OCTAVE[1 - fromEnd] : OCTAVE[position + 2]

  memo[n] = [n, third, fifth]
  memo[n + 'm'] = [n, minorthird, fifth]
  memo[n + 'add9'] = [n, third, fifth, nine]
  memo[n + '/' + third] = [third, n, fifth]
  memo[n + '/' + fifth] = [fifth, n, third]
  return memo
}, {})

// console.log(JSON.stringify(allChords, null, '\t'));

export const CHORDS = Object.assign({}, allChords, otherChords)
