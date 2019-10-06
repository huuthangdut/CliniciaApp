import React from 'react';
import {AppContext} from '../../AppProvider';

function WithContext(WrappedComponent) {
  return class extends React.PureComponent {
    render() {
      return (
        <AppContext.Consumer>
          {context =>  <WrappedComponent {...this.props} context={context} />}
        </AppContext.Consumer>
      )
    }
  }
}

export default WithContext
