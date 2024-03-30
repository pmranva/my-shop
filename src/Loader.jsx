import React from 'react'
import styles from './loader.module.css'
import image1 from './assests/loader.gif'
import ReactDOM, { createPortal }  from 'react-dom'

const Loader = () => {
  return createPortal(
    <div className={styles.wrapper}>
        <div className={styles.loader}>
            <img src={image1} alt="Loading..." />
        </div>
    </div>,document.getElementById('loader')
  )
}

export default Loader
