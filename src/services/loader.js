import bg1 from '../assets/img/bg1.jpg'
import bg2 from '../assets/img/bg2.jpg'
import bg3 from '../assets/img/bg3.jpg'
import bg4 from '../assets/img/bg4.jpg'
import bg5 from '../assets/img/bg5.jpg'
import bg6 from '../assets/img/bg6.jpg'
import bg7 from '../assets/img/bg7.jpg'
import bg8 from '../assets/img/bg8.jpg'

import { Observable } from 'rxjs'

class Loader {
  constructor () {
    this.assets = [
      bg1,
      bg2,
      bg3,
      bg4,
      bg5,
      bg6,
      bg7,
      bg8
    ]
    this.loadedElem = 0
  }

  start () {
    this.loadedElem = 0
    return new Observable(observer => {
      let phantom = document.createElement('div')
      phantom.classList.add('loading-sequence')
      phantom.style.display = 'none'
      document.getElementById('app').appendChild(phantom)
      this.assets.forEach((src) => {
        const a = new Image(0, 0)
        a.addEventListener('load', () => {
          this.loadedElem++
          observer.next(this.loadedElem / this.assets.length)
          if (this.loadedElem === this.assets.length) {
            this.loadEnd()
            observer.complete()
          }
        })
        a.src = src
        phantom.appendChild(a)
      })
    })
  }

  loadEnd () {
    document.querySelector('.loading-sequence').parentNode.removeChild(document.querySelector('.loading-sequence'))
  }
}

const loader = new Loader()
export default loader
