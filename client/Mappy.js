import React, {Component} from 'react'
import {mapboxAccessToken} from '../.env.json'

const mapboxJs = 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.1/mapbox-gl.js'
const mapboxCss = 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.1/mapbox-gl.css'

const setUpMap = () => {
  window.mapboxgl.accessToken = mapboxAccessToken
  const map = new window.mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9'
  })
  return map
}

const loaded = (script) => new Promise((resolve) => {
  script.onload = () => resolve(setUpMap())
})

export default class Mappy extends Component {
  constructor () {
    super()
    this.state = {
      loaded: false
    }
  }

  async componentDidMount () {
    if (Mappy.map) {
      Mappy.map = setUpMap()
      return
    }
    console.log('loaded first time')
    const script = document.createElement('script')
    const link = document.createElement('link')
    script.src = mapboxJs
    link.href = mapboxCss
    link.rel = 'stylesheet'
    link.onload = () => console.log('!')
    document.body.append(script)
    document.body.append(link)
    const map = await loaded(script)
    Mappy.map = map
    this.setState({loaded: true})
  }

  render () {
    if (this.state.loaded) {
      console.log(window.mapboxgl)
    }
    return (
      <div>
        <div id='map' style={{width: '400px', height: '300px'}} />
      </div>
    )
  }
}
