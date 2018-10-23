import bg1 from '../assets/img/bg1.jpg'
import bg2 from '../assets/img/bg2.jpg'
import bg3 from '../assets/img/bg3.jpg'
import bg4 from '../assets/img/bg4.jpg'
import bg5 from '../assets/img/bg5.jpg'
import bg6 from '../assets/img/bg6.jpg'
import bg7 from '../assets/img/bg7.jpg'
import bg8 from '../assets/img/bg8.jpg'

import font1 from '../assets/fonts/Krub-Light.eot'
// import font2 from '../assets/fonts/Krub-Light.svg'
import font3 from '../assets/fonts/Krub-Light.ttf'
import font4 from '../assets/fonts/Krub-Light.woff'
import font5 from '../assets/fonts/Krub-Light.woff2'

import font6 from '../assets/fonts/Krub-Regular.eot'
// import font7 from '../assets/fonts/Krub-Regular.svg'
import font8 from '../assets/fonts/Krub-Regular.ttf'
import font9 from '../assets/fonts/Krub-Regular.woff'
import font10 from '../assets/fonts/Krub-Regular.woff2'

import font11 from '../assets/fonts/Roboto-Black.eot'
// import font12 from '../assets/fonts/Roboto-Black.svg'
import font13 from '../assets/fonts/Roboto-Black.ttf'
import font14 from '../assets/fonts/Roboto-Black.woff'
import font15 from '../assets/fonts/Roboto-Black.woff2'

import { Observable } from 'rxjs'

class Loader {
  constructor () {
    this.assets = [
      bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8
    ]

    this.fonts = {
      'Krub Light': [font1, /* font2, */ font3, font4, font5],
      'Krub Regular': [font6, /* font7, */ font8, font9, font10],
      'Roboto Black': [font11, /* font12, */ font13, font14, font15]
    }

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
          observer.next(this.loadedElem / this.getLength())
          if (this.loadedElem === this.getLength) {
            this.loadEnd()
            observer.complete()
          }
        })
        a.src = src
        phantom.appendChild(a)
      })

      Object.keys(this.fonts).forEach((key) => {
        let ftl = this.fonts[key]
        let text = ftl.map((path) => { return 'url(' + path + ')' })
        let phantom = new FontFace(key, text.join(','))
        phantom.load().then((loadedPhantom) => {
          document.fonts.add(loadedPhantom)
          this.loadedElem++
          observer.next(this.loadedElem / this.getLength())
          if (this.loadedElem === this.getLength) {
            this.loadEnd()
            observer.complete()
          }
        })
      })
    })
  }

  getLength () {
    return this.assets.length + Object.keys(this.fonts).length
  }

  loadEnd () {
    document.querySelector('.loading-sequence').parentNode.removeChild(document.querySelector('.loading-sequence'))
  }
}

const loader = new Loader()
export default loader
