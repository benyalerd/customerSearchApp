import React from 'react';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../assets/css/index.css';
import {validEmail,validPassword} from '../helper/Regex'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {IsNullOrEmpty} from '../helper/Common';

class Register extends React.Component{
  constructor(props) {
    super(props);
    this.state = 
    { width: 0, 
      height: 0,
      email:"",
      password:"",
      confirmPassword:"",
      emailErrorText:"",
      passwordErrorText:"",
      confirmPasswordErrorText:"",
      IsRegisterDisable:true,
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
 
  validateEmail = async(e) =>{
    var value = e.target.value
    if(IsNullOrEmpty(value)){
      await this.setState({email:value,emailErrorText:'กรุณากรอกอีเมล์'});
    }
    else if(!validEmail.test(value)){
      await this.setState({email:value,emailErrorText:'อีเมล์ไม่ถูกต้อง'});
    }
    else{
      await this.setState({email:value,emailErrorText:''});
    }
    var isDisable = this.CheckDisableRegisterButton();
    this.setState({IsRegisterDisable:isDisable});
  }

  validatePasword = async(e) =>{
    var value = e.target.value
    if(IsNullOrEmpty(value)){
      await this.setState({password:value,passwordErrorText:'กรุณากรอกรหัสผ่าน'});
    }
    else if(!validPassword.test(value)){
      await this.setState({password:value,passwordErrorText:'รหัสผ่านต้องเป็นตัวเลขหรือตัวอักษรขนาด 8-20 ตัว'});
    }
    else{
      await this.setState({password:value,passwordErrorText:''});
    }
  
    var isDisable = this.CheckDisableRegisterButton();
    this.setState({IsRegisterDisable:isDisable});
  }
  
  validateConfirmPasword = async(e) =>{
    var value = e.target.value
    if(this.state.password != value){
      await this.setState({confirmPassword:value,confirmPasswordErrorText:'รหัสผ่านไม่ตรงกัน'});
    }
    else{
      await this.setState({confirmPassword:value,confirmPasswordErrorText:''});
    }
    
    var isDisable = this.CheckDisableRegisterButton();
    this.setState({IsRegisterDisable:isDisable});
  }

  registerOnClick = async() =>{
    try
    {
       
  }
  catch(ex){
    toast.error("เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่");
    }
  }
  
  backOnClick = () =>{
    this.props.history.push('/Login');
  }
  
  CheckDisableRegisterButton = () =>{
    if(!IsNullOrEmpty(this.state.emailErrorText)|| IsNullOrEmpty(this.state.email))
    {
      return true;
    }
    if(!IsNullOrEmpty(this.state.passwordErrorText)|| IsNullOrEmpty(this.state.password))
    {
      return true;
    }
    if(!IsNullOrEmpty(this.state.confirmPasswordErrorText)|| IsNullOrEmpty(this.state.confirmPassword))
    {
      return true;
    }
    return false
    }

    render(){
      
      return(
               

 <div className={this.state.width <= 998 ?"":"div-center div-bg-singup"} style={this.state.width <= 998 ?{}:{height:this.state.height}}>

 {/*Sign up Div*/}
 
 <div className="div-singup"  style={this.state.width <= 998 ?{width:'100%' ,height:this.state.height, borderRadius:'0px'}:{}}>
<div>
     {/*Sign up Title*/}
      <div className="text-title-yellow" style={{marginBottom:'30px'}}>Sing up</div>

        {/*Email Input*/}
      <input  type="email" class="form-control input"  id="InputEmail" placeholder="e-mail" value={this.state.email} onChange={this.validateEmail.bind(this)}/>

  {/*Error Email Text*/}
  <div className="form-group"  style={{padding:'0px'}}>
       <div className="text-error">{this.state.emailErrorText}</div>
     </div>

        {/*Password Input*/}
      <input  type="password" class="form-control input"  id="InputPassword" placeholder="password" value={this.state.password} onChange={this.validatePasword.bind(this)} />
      
        {/*Error Password Text*/}
     <div className="form-group"  style={{padding:'0px'}}>
       <div className="text-error">{this.state.passwordErrorText}</div>
     </div>

        {/*Repeat Password Input*/}
        <input  type="password" class="form-control input"  id="InputRepeatPassword" placeholder="repeat password" value={this.state.confirmPassword} onChange={this.validateConfirmPasword.bind(this)}/>
      
           {/*Error Repeat Password Text*/}
     <div className="form-group"  style={{padding:'0px'}}>
       <div className="text-error">{this.state.confirmPasswordErrorText}</div>
     </div>


       {/*Log in Button*/}
      <div className="div-center">
      <button className="primary-button" style={{marginTop:'20px'}}>Sing up</button>
      </div>

   {/*Back Link*/}
  <div className="form-group"  style={{padding:'10px 0px',textAlign:'center'}}>
    <a style={{cursor:'pointer',color:'#e6bd6f',textDecoration: 'underline'}} onClick={this.backOnClick}>Back</a>
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
  
  
  export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Register));