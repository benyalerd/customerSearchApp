import React from 'react';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../assets/css/index.css';

class Register extends React.Component{
  constructor(props) {
    super(props);
    this.state = 
    { width: 0, 
      height: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
 
    render(){
      
      return(
        <div>
        <div>Register</div>
       </div>
    
      );
    }
  }
  const mapStateToProps = state =>({
  });
  
  const mapDispatchToProps = dispatch =>({
   
  });
  
  
  export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Register));