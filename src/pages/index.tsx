import * as React from 'react'
import { getJson } from 'fetchyeah'
import styled from 'styled-components'

type Strings = {
  strings: Array<string>
}

const Item = styled.div`
  width: 200px;
  height: 200px;
  background-color: red;
  color: gold;
  margin: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Items = ({ strings }: Strings) => (
  <React.Fragment>
    {strings.map((el: string) => (
      <Item key={el}>{el}</Item>
    ))}
  </React.Fragment>
)

const Wrapper = styled.main`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export default class Index extends React.Component<null, Strings> {
  state = {
    strings: ['hello'],
  }

  handleClick = () => {
    getJson('/api/strings')
      // @ts-ignore
      .then((res: Array<string>) => {
        this.setState({ strings: res })
      })
  }

  render() {
    return (
      <Wrapper>
        <button onClick={this.handleClick}>click me</button>
        <Items strings={this.state.strings} />
      </Wrapper>
    )
  }
}
