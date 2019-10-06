import React from 'react';

const AppContext = React.createContext();

class AppProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        value: 'test'
    };
  }
  
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

export { AppContext, AppProvider as default }