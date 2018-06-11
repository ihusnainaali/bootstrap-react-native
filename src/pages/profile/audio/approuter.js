import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'

import Recorder from './recorder/recorder'
import Player from './player/player'

export default class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Scene key='recorder' title='Recorder' component={Recorder} />
        <Scene key='player' title='Player' component={Player} />
      </Router>
    )
  }
}
