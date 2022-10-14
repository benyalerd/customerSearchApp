import React from 'react';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../assets/css/index.css';
import {validEmail,validPassword} from '../helper/Regex'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {IsNullOrEmpty} from '../helper/Common';
import AlertDialog from '../component/dialog/AlertDialog';
import * as alertAction from '../actions/Alert/AlertAction';
import * as loginApiAction from '../actions/api/UserApiAction'
import $ from 'jquery';
import queryString from 'query-string';

class LogIn extends React.Component{
  constructor(props) {
    super(props);
    this.state = 
    { 
      width: 0, 
      height: 0,
      loginErrorText:"",   
      email:"",
      password:""
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

  onChangeEmail = (e) =>{
    var value = e.target.value
      this.setState({email:value,emailErrorText:''}); 
  }
  
  onChangePasword = (e) =>{
    var value = e.target.value
      this.setState({password:value});
  }
  LoginOnClick = async() =>{
    try {
    if(IsNullOrEmpty(this.state.email) || IsNullOrEmpty(this.state.password) || !validEmail.test(this.state.email) || !validPassword.test(this.state.password)){
        this.setState({loginErrorText:"อีเมล์หรือรหัสผ่านไม่ถูกต้อง"})
    }
    else{
      const res = await this.props.LoginApiAction.Login(this.state.email,this.state.password);
      if(res?.data?.isError == true){
        this.props.AlertAction.setAlert(2,res?.data?.errorMsg,true);
        return;
   }
   await this.props.history.push({
    pathname: '/OTPVerify',
    search: `?userId=${res?.data?.userId}`,
   });
   
  }
}
   catch(ex){
     toast.error("เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่");
   }
   }
      
  
  
    RegisterLinkOnclick = () => {
      this.props.history.push('/Register');
    }

    render(){
      return(     
        <React.Fragment>    
        <AlertDialog/>
        <React.Fragment>
        
        <ToastContainer />  
       
 <div className={this.state.width <= 998 ?"":"div-center div-bg-singup"} style={this.state.width <= 998 ?{}:{height:this.state.height}}>

 {/*Sign up Div*/}
 
 <div className="div-singup"  style={this.state.width <= 998 ?{width:'100%' ,height:this.state.height, borderRadius:'0px'}:{}}>
<div>
     {/*Sign up Title*/}
      <div className="text-title-yellow" style={{marginBottom:'30px'}}>Log in</div>

        {/*Email Input*/}
      <input  type="email" class="form-control input"  id="InputEmail" placeholder="e-mail" value={this.state.email} onChange={this.onChangeEmail.bind(this)}/>

        {/*Password Input*/}
      <input  type="password" class="form-control input"  id="InputPassword" placeholder="password" value={this.state.password} onChange={this.onChangePasword.bind(this)}/>
      
        {/*Error Text*/}
     <div className="form-group"  style={{padding:'0px'}}>
       <div className="text-error">{this.state.loginErrorText}</div>
     </div>

       {/*Log in Button*/}
      <div className="div-center">
      <button className="primary-button" style={{marginTop:'20px'}}  onClick={this.LoginOnClick}>Log in</button>
      </div>

   {/*Register Link*/}
  <div className="form-group"  style={{padding:'10px 0px',textAlign:'center'}}>
    <a style={{cursor:'pointer',color:'#e6bd6f',textDecoration: 'underline'}}  onClick={this.RegisterLinkOnclick} >Register</a>
  </div>

 </div>
</div>

</div>
</React.Fragment>  
</React.Fragment>
      );
    }
  }
  const mapStateToProps = state =>({
    
  });
  
  const mapDispatchToProps = dispatch =>({
    AlertAction : bindActionCreators(alertAction,dispatch),
    LoginApiAction : bindActionCreators(loginApiAction,dispatch)
  });
  
  
  export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LogIn));