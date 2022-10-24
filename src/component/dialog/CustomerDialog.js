import React from 'react';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import ReactDOM from "react-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import styled from 'styled-components';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import '../../assets/css/index.css';
import { ToastContainer, toast } from 'react-toastify';
import * as customerAction from '../../actions/Customer/CustomerAction';
import {validEmail,validTel} from '../../helper/Regex'
import {IsNullOrEmpty,validCitizenID} from '../../helper/Common';
import * as customerApiAction from '../../actions/api/CustomerApiAction'
import $ from 'jquery';
import queryString from 'query-string';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CustomerDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenWidth: window.innerWidth,
            custName:"",
            custLastName:"",
            email:"",
            tel:"",
            citizenId:"",
            birthDate:"",
            custId:0,
            errorCustName:"",
            errorCustLastName:"",
            errorCitizenId:"",
            errorEmail:"",
            errorTel:"",
            errorBirthDate:"",
            IsSubmitDisable:true
        }
        window.addEventListener("resize", this.updateScreenWidth);
    };

    updateScreenWidth = async () => {
        await this.setState({ screenWidth: window.innerWidth });
    };

    async componentDidMount() {
        const selectCustomer = this.props.Customer.CustomerSelect;
        const birthDate = selectCustomer?.birthDate?new Date(selectCustomer?.birthDate):""
        this.setState({ custName:selectCustomer?.customerName,custLastName:selectCustomer?.customerLastname,citizenId:selectCustomer?.citizenId,birthDate:birthDate,email: selectCustomer?.email,tel:selectCustomer?.telephone,custId:selectCustomer?.customerId});
       
    }

    async componentDidUpdate(prevProps, prevState) {
      
     if(prevProps.Customer.AlertOpen != this.props.Customer.AlertOpen)
     {
        const selectCustomer = this.props.Customer.CustomerSelect;
        const birthDate = selectCustomer?.birthDate? new Date(selectCustomer?.birthDate):""
        this.setState({ custName:selectCustomer?.customerName,custLastName:selectCustomer?.customerLastname,citizenId:selectCustomer?.citizenId,birthDate:birthDate,email: selectCustomer?.email,tel:selectCustomer?.telephone,custId:selectCustomer?.customerId});
       
    }
    }

    validateEmail = async(e) =>{
        var value = e.target.value
        if(!IsNullOrEmpty(value)){
        if(!validEmail.test(value)){
          await this.setState({email:value,errorEmail:'อีเมล์ไม่ถูกต้อง'});
        }
        else{
          await this.setState({email:value,errorEmail:''});
        }
    }
        var isDisable = this.CheckDisableSubmitButton();
        this.setState({IsSubmitDisable:isDisable});
    }

    validateTel = async(e) =>{
        var value = e.target.value
        if(!IsNullOrEmpty(value)){
        if(!validTel.test(value)){
          await this.setState({tel:value,errorTel:'เบอร์โทรศัพท์ไม่ถูกต้อง'});
        }
        else{
          await this.setState({tel:value,errorTel:''});
        }
    }
        var isDisable = this.CheckDisableSubmitButton();
        this.setState({IsSubmitDisable:isDisable});
    }

    validateCitizen = async(e) =>{
        var value = e.target.value
        if(IsNullOrEmpty(value)){
            await this.setState({citizenId:value,errorCitizenId:'กรุณากรอกเลขบัตรประชาชน'});
        }else if(!validCitizenID(value)){
          await this.setState({citizenId:value,errorCitizenId:'เลขบัตรประชาชนไม่ถูกต้อง'});
        }
        else{
          await this.setState({citizenId:value,errorCitizenId:''});
        }
    
        var isDisable = this.CheckDisableSubmitButton();
        this.setState({IsSubmitDisable:isDisable});
    }

    validateCustName = async(e) =>{
        var value = e.target.value
        if(IsNullOrEmpty(value)){
            await this.setState({custName:value,errorCustName:'กรุณากรอกเลขบัตรประชาชน'});
        }
        else{
            await this.setState({custName:value,errorCustName:''});
          }
        var isDisable = this.CheckDisableSubmitButton();
        this.setState({IsSubmitDisable:isDisable});
    }

    validateCustLastName = async(e) =>{
        var value = e.target.value
        if(IsNullOrEmpty(value)){
            await this.setState({custLastName:value,errorCustLastName:'กรุณากรอกเลขบัตรประชาชน'});
        }
        else{
            await this.setState({custLastName:value,errorCustLastName:''});
          }
        var isDisable = this.CheckDisableSubmitButton();
        this.setState({IsSubmitDisable:isDisable});
    }
    handleDateChange = async(e) =>{
      
        var value = e
        if(IsNullOrEmpty(value)){
            await this.setState({birthDate:value,errorBirthDate:'กรุณาเลือกวันเกิด'});
        }
        else{
            await this.setState({birthDate:value,errorBirthDate:''});
          }
        var isDisable = this.CheckDisableSubmitButton();
        this.setState({IsSubmitDisable:isDisable});
    }
    CheckDisableSubmitButton = () =>{
        if(!IsNullOrEmpty(this.state.errorCustName)|| IsNullOrEmpty(this.state.custName))
        {
          return true;
        }
        if(!IsNullOrEmpty(this.state.errorCustLastName)|| IsNullOrEmpty(this.state.custLastName))
        {
          return true;
        }
        if(!IsNullOrEmpty(this.state.errorCitizenId)|| IsNullOrEmpty(this.state.citizenId))
        {
          return true;
        }
        if(!IsNullOrEmpty(this.state.errorEmail))
        {
          return true;
        }
        if(!IsNullOrEmpty(this.state.errorTel))
        {
          return true;
        }
        return false
        }
      
    onClose = async() => {
        await this.props.CustomerAction.setCustomerAlert([],false,false);
    };

    handleClose = async() => {
        await this.props.CustomerAction.setCustomerAlert([],false,false);
    }

    Onsubmit = async() =>{
        try
        {
            const query = queryString.parse(this.props.location.search);
          if(this.props.Customer.IsEdit){
            var request = JSON.stringify({
                customerName:this.state.custName,
                customerLastname:this.state.custLastName,
                email:this.state.email,
                telephone:this.state.tel,
                userId:query.userId
              });
              const res = await this.props.CustomerApiAction.UpdateCustomer(this.state.custId,request);
              if(res?.data?.isError == true){
                toast.error(res?.data?.errorMsg);
                return;
                }
          }
          else
          {
            var request = JSON.stringify({
                customerName:this.state.custName,
                customerLastname:this.state.custLastName,
                email:this.state.email,
                telephone:this.state.tel,
                userId:query.userId,
                birthDate:this.state.birthDate,
                citizenId:this.state.citizenId
              });
              const res = await this.props.CustomerApiAction.AddCustomer(request);
              if(res?.data?.isError == true){
                toast.error(res?.data?.errorMsg);
                return;
                }
          }
          await this.props.CustomerAction.setCustomerAlert([],false,false);
          
    }
    catch(ex){
        toast.error("เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่");
        }
    }

    render() {
        let theme = null;
        const { SessionAlert } = this.props;
        const selectBankDetail = this.props.CustomerAction.CustomerSelect;
        const {screenWidth} = this.state;

        if (this.props.CustomerAction.CustomerSelect === true) {
            theme = createTheme({
                overrides: {
                    MuiDialog: {
                        paperFullWidth: {
                            maxWidth: '560px !important',
                            height: screenWidth <= 991.98 ? '450px !important' : '500px !important'
                        }
                    },
                    MuiDialogContent: {
                        root: {
                            padding: '0px !important'
                        }
                    }
                }
            });
        }

        return (
            <React.Fragment>
                {SessionAlert.alertstatus === true ? null
                    :
                    <React.Fragment>
                        <ThemeProvider theme={theme}>
                            <Dialog
                                fullWidth={true}
                                maxWidth={true}
                                open={this.props.Customer.AlertOpen}
                                onClose={this.handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                style={{ zIndex: '100000' }}
                            >
                                <DialogContent>                          
                    {/*New Customer Title*/}
      <div className="text-title-yellow" style={{marginBottom:'30px'}}>NEW CUSTOMER</div>

{/*Cust Name Input*/}
<input  type="text" class="form-control input"  id="InputCustomerName" placeholder="customer name" maxLength={50} value={this.state.custName} onChange={this.validateCustName.bind(this)}/>
  {/*Error Cust Name Text*/}
  <div className="form-group"  style={{padding:'0px'}}>
       <div className="text-error">{this.state.errorCustName}</div>
     </div>

{/*Cust LastName Input*/}
<input  type="text" class="form-control input"  id="InputCustomerLastName" placeholder="customer lastname" maxLength={50} value={this.state.custLastName} onChange={this.validateCustLastName.bind(this)}/>
  {/*Error Cust LastName Text*/}
  <div className="form-group"  style={{padding:'0px'}}>
       <div className="text-error">{this.state.errorCustLastName}</div>
     </div>


{/*Citizen ID Input*/}
<input  type="text" class={this.props.Customer.IsEdit?"form-control input disabled":"form-control input"}  id="InputCitizenId" placeholder="citizen id" value={this.state.citizenId} onChange={this.validateCitizen.bind(this)}/>
 {/*Error Citizen ID Text*/}
 <div className="form-group"  style={{padding:'0px'}}>
       <div className="text-error">{this.state.errorCitizenId}</div>
     </div>

{/*Birth Date*/}
<div class="form-control input" style={{padding:'0px'}}>
<DatePicker
  selected={this.state.birthDate}
  onChange={this.handleDateChange} 
  maxDate={new Date()}
  placeholderText="Select Birth Date"
/>
</div>
{/*Email Input*/}
<input  type="text" class="form-control input"  id="InputEmail" placeholder="e-mail" value={this.state.email} onChange={this.validateEmail.bind(this)}/>
 {/*Error Email Text*/}
 <div className="form-group"  style={{padding:'0px'}}>
       <div className="text-error">{this.state.errorEmail}</div>
     </div>

{/*Tel Input*/}
<input  type="text" class="form-control input"  id="InputTel" placeholder="tel." value={this.state.tel} onChange={this.validateTel.bind(this)}/>
 {/*Error Tel Text*/}
 <div className="form-group"  style={{padding:'0px'}}>
       <div className="text-error">{this.state.errorTel}</div>
     </div>


                                    {screenWidth <= 767 ?
                                        <div style={{ marginBottom: '40px' }} />
                                        :
                                        <React.Fragment>
                                            <br />
                                            <br />
                                        </React.Fragment>
                                    }

                                     {/*Button*/}      
                                    <div style={{ display: 'block', textAlign: 'center' }}>
                                        <button onClick={this.onClose} type="button" className="secondary-button2"
                                            style={screenWidth <= 767 ? { width: '40%', height: '55px', fontSize: '24px', marginRight: '5px',border: 'solid 1px #4f6137' } : { width: '155px', height: '55px', marginRight: '5px',border: 'solid 1px #4f6137'}}>ยกเลิก</button>
                                        <button onClick={this.Onsubmit} type="button" className={!this.state.IsSubmitDisable?"primary-button2":"primary-button2 disabled"}
                                            style={screenWidth <= 767 ? { width: '40%', height: '55px', fontSize: '24px' } : { width: '155px', height: '55px' }}>ตกลง</button>
                                    </div>
                                    
                                    {screenWidth <= 767 ?
                                        <div style={{ marginBottom: '10px' }} />
                                        :
                                        <br />
                                    }
                                </DialogContent>
                            </Dialog>
                        </ThemeProvider>
                    </React.Fragment >
                }
            </React.Fragment>
        );
    }

}
const mapStateToProps = state => ({
    SessionAlert:state.SessionAlert,
    Customer:state.Customer
});

const mapDispatchToProps = dispatch => ({
    CustomerAction : bindActionCreators(customerAction,dispatch),
    CustomerApiAction : bindActionCreators(customerApiAction,dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerDialog));