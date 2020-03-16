import * as React from 'react'
import styled from 'styled-components'

const Item = styled.div`
  width: 200px;
  height: 200px;
  background-color: red;
  color: gold;
`

const Items = () => (
  <React.Fragment>
    {['one', 'two', 'three', 'four', 'five'].map((el: string) => (
      <Item key={el}>{el}</Item>
    ))}
  </React.Fragment>
)

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`

const Index = () => (
  <Wrapper>
    <Items />
  </Wrapper>
)

export default Index
