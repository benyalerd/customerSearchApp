import React, { Component } from 'react';
import OtpInput from 'react-otp-input';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../assets/css/index.css';
import $ from 'jquery';
import queryString from 'query-string';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as userApiAction from '../actions/api/UserApiAction'
import {IsNullOrEmpty} from '../helper/Common';
import {TimeCounter} from '../component/timeCountdown/TimeCounter'


class OTPVerify extends Component {
    constructor(props) {
        super(props);
        this.state = 
        { width: 0, 
          height: 0,
          otp:"",
          targetDate:0
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
      }
      componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.requestOTP();
      }
      
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }
      
      componentDidUpdate(){
        
      }
      updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      }

      requestOTP = async() =>{
        const query = queryString.parse(this.props.location.search);
        if(IsNullOrEmpty(query.userId)){
            this.props.history.push('/Login');  
            return;
        }

        try
        {
        const res = await this.props.UserApiAction.RequestOTP(query.userId);
        if(res?.data?.isError == true){
        toast.error(res?.data?.errorMsg);
        return;
        }
        const THREE_DAYS_IN_MS = res?.data?.otpLifeTime * 60 * 1000;
        const NOW_IN_MS = new Date().getTime();
      
        const targetDate = NOW_IN_MS + THREE_DAYS_IN_MS;

        await this.setState({targetDate:targetDate});
        }
        catch(ex){
            toast.error("?????????????????????????????????????????? ??????????????????????????????????????????????????????????????????");
        }

      }

      checkOTP = async () => {
        const query = queryString.parse(this.props.location.search);
        if(IsNullOrEmpty(query.userId)){
            this.props.history.push('/Login');  
            return;
        }

        try
        {
        const res = await this.props.UserApiAction.CheckOTP(query.userId,this.state.otp);
        if(res?.data?.isError == true){
        toast.error(res?.data?.errorMsg);
        return;
        }
        if(res?.data?.isValidOTP == false)
        {
            toast.error("???????????? OTP ?????????????????????????????? ????????????????????????????????????????????????");
            await this.setState({otp:""});
            return;
        }
        this.props.history.push({
          pathname: '/Customer',
          search: `?userId=${query.userId}`,
         });
        }
        catch(ex){
            toast.error("?????????????????????????????????????????? ??????????????????????????????????????????????????????????????????");
        }
      }

      otpOnChange = async(otp) =>{
        await this.setState({otp:otp})
        if((this.state.otp).length == 6){
        await this.checkOTP();
        }
      }  

  render() {
    return (
        <React.Fragment>
        
        <ToastContainer />  
       
        <div className={this.state.width <= 998 ?"":"div-center div-bg-singup"} style={this.state.width <= 998 ?{}:{height:this.state.height}}>
        
        {/*OTP Div*/}
        <div className="div-otp"  style={this.state.width <= 998 ?{width:'100%' ,height:this.state.height, borderRadius:'0px'}:{}}>
     
     <div>
         {/*Enter Verification Code Title Text*/}
     <div className="text-title-yellow2" style={{marginBottom:'20px',textAlign:'center'}}>Enter Verification Code</div>

     {/*Image OTP*/}
     <img src={require('../assets/images/otpVertify.png').default}  style={{margin :'auto',width:'100px'}}/>

     {/*We have sent OTP on your number Title Text*/}
     <div className="text-title-yellow3" style={{marginBottom:'10px',marginTop:'20px',textAlign:'center'}}>We have sent OTP on your number</div>
     
      {/*OTP Input*/}
      <OtpInput
        value={this.state.otp}
        onChange={this.otpOnChange}
        numInputs={6}
        separator={<span style={{paddingLeft: '10px'}}></span>}
        containerStyle="otpVerifyContainer"
        inputStyle="otpVerifyInput"
      />
     
      {/*Didn't receive a OTP? Title Text*/}
       <div className="text-title-yellow3" style={{marginTop:'10px',display:'flex',justifyContent: 'center'}}>Didn't receive a OTP?
       <span><TimeCounter targetDate={this.state.targetDate} onClick={this.requestOTP}/></span>
 </div>

      </div>
      </div>
      </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state =>({
});

const mapDispatchToProps = dispatch =>({
    UserApiAction : bindActionCreators(userApiAction,dispatch)
});


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(OTPVerify));