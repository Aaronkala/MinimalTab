import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'

import logo from './logo.svg'
import './App.css'
import Edit from './editor'

const Container = styled.div`
  margin: 12em auto;
`

class App extends Component {
  constructor() {
    super()

    this.state = {
      initialText: null,
      saved: true,
    }
  }

  componentWillMount() {
    chrome.storage.sync.get('text', items => {
      console.log('loaded')
      if (!chrome.runtime.error) {
        console.log('items', items)
        this.setState({
          initialText: items.text,
        })
      } else {
        this.setState({
          initialText: {
            blocks: [
              {
                data: {},
                depth: 0,
                entityRanges: [],
                inlineStyleRanges: [],
                key: 'lcva',
                text: 'this is editable text!',
                type: 'unstyled',
              },
            ],
            entityMap: {},
          },
        })
      }
    })
  }

  saveChanges = (context, text) => {
    console.log('start saving')
    chrome.storage.sync.set({ text }, () => {
      // Notify that we saved.
      console.log('saved')
      this.setState({
        saved: true,
      })
    })
  }

  render() {
    return (
      <div className="App">
        <Container>
          {this.state.initialText && (
            <Edit saveFunc={this.saveChanges} data={this.state.initialText} />
          )}
        </Container>
      </div>
    )
  }
}

export default App
