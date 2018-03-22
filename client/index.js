import React from 'react'
import ReactDOM from 'react-dom'
import Loadable from 'react-loadable'
import Mappy from './Mappy'
import {mapboxAccessToken} from '../.env.json'

console.log(mapboxAccessToken)

const Loading = (props) => (
  <div>...Loading!</div>
)

const LoadableMap = Loadable({
  loader: () => import('./Mappy'),
  loading: Loading
})

class Main extends React.Component {

  constructor () {
    super()
    this.state = {
      showMap: false
    }
  }
  render () {
    return (
      <div>
        <button onClick={() => this.setState({showMap: !this.state.showMap})}>MAPPY</button>
        {
          this.state.showMap
          ? <Mappy />
          : null
        }
      </div>
    )

  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('app')
)
