import React from 'react'
import LoadingOverlay from 'react-loading-overlay-ts'
import styled from 'styled-components'

export interface Props {
  active: boolean | undefined
  text?: string | undefined
}

const StyledLoader = styled(LoadingOverlay)`
  &.MyLoader_wrapper {
    height: 100%;
  }
  .MyLoader_overlay {
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
  }
  .MyLoader_content {
    color: #008387;
    * {
      stroke: #008387;
    }
  }
`
 
const Loading: React.FC<Props> = ({ active, text, children }) => {
  return (<StyledLoader classNamePrefix="MyLoader_" active={active} text={text} spinner >{children}</StyledLoader>)
}

export default Loading