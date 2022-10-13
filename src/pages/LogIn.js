import React from 'react';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../assets/css/index.css';

class LogIn extends React.Component{
  constructor(props) {
    super(props);
    this.state = 
    { 
      width: 0, 
      height: 0,
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
        

 <div className={this.state.width <= 998 ?"":"div-center div-bg-singup"} style={this.state.width <= 998 ?{}:{height:this.state.height}}>

 {/*Sign up Div*/}
 
 <div className="div-singup"  style={this.state.width <= 998 ?{width:'100%' ,height:this.state.height, borderRadius:'0px'}:{}}>
<div>
     {/*Sign up Title*/}
      <div className="text-title-pink" style={{marginBottom:'30px'}}>Log in</div>

        {/*Email Input*/}
      <input  type="email" class="form-control input"  id="InputEmail" placeholder="e-mail" />

        {/*Password Input*/}
      <input  type="password" class="form-control input"  id="InputPassword" placeholder="password" />
      
       {/*Log in Button*/}
      <div className="div-center">
      <button className="primary-button" style={{marginTop:'20px'}}>Log in</button>
      </div>

   {/*Register Link*/}
  <div className="form-group"  style={{padding:'10px 0px',textAlign:'center'}}>
    <a style={{cursor:'pointer',color:'#e6bd6f',textDecoration: 'underline'}}>Register</a>
  </div>

 </div>
</div>

</div>
      );
    }
  }
  const mapStateToProps = state =>({
    
  });
  
  const mapDispatchToProps = dispatch =>({
   
  });
  
  
  export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LogIn));