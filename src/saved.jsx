import styled from 'styled-components'

const Saved = styled.div`
  position: fixed;
  top: 1em;
  right: 1em;
  width: 5px;
  height: 5px;
  background-color: ${p => (p.saved ? '#0EA950' : '#F65346')};
  border-radius: 50%;
`

export default Saved
