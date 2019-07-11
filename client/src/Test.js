import React, { Component } from 'react';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "Lindsey"
    };
  };

  componentDidMount() {
    console.log(`%c➤ Rendering (%s)`, "color: crimson; font-weight: bold;", "Test", "\n", this.props, "\n", this.state);
  }
  

  render() {

    return (
      <div style={{color: "white", marginTop: "200px"}}>
        This is the Test Component
      </div>
    );
  }

}

export default Test;
