
import React from 'react';
import styles from './styles.scss';

function Chart() {
  return <div className={ styles.octave }>
    <ul className={ `set` }>
      <li className={ `${styles.white} ${styles.b}` }></li>
      <li className={ `${styles.black} ${styles.as}` }></li>
      <li className={ `${styles.white} ${styles.a}` }></li>
      <li className={ `${styles.black} ${styles.gs}` }></li>
      <li className={ `${styles.white} ${styles.g}` }></li>
      <li className={ `${styles.black} ${styles.fs}` }></li>
      <li className={ `${styles.white} ${styles.f}` }></li>
      <li className={ `${styles.white} ${styles.e}` }></li>
      <li className={ `${styles.black} ${styles.es}` }></li>
      <li className={ `${styles.white} ${styles.d}` }></li>
      <li className={ `${styles.black} ${styles.cs}` }></li>
      <li className={ `${styles.white} ${styles.c}` }></li>
    </ul>
  </div>
}

export default Chart;
