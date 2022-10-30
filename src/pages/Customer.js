import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../assets/css/index.css';
import $ from 'jquery';
import queryString from 'query-string';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "react-js-pagination";
import * as customerApiAction from '../actions/api/CustomerApiAction'
import {IsNullOrEmpty} from '../helper/Common';
import AlertDialog from '../component/dialog/AlertDialog';
import * as alertAction from '../actions/Alert/AlertAction';
import ConfirmAlertDialog from '../component/dialog/ConfirmAlertDialog';
import * as customerAction from '../actions/Customer/CustomerAction';
import CustomerDialog from '../component/dialog/CustomerDialog';

class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = 
        { width: 0, 
          height: 0,
          customerLists:[],
          customerNameSearch:"",
          citizenIdSearch:"",
          emailSearch:"",
          telSearch:"",
          totalRecord:0,
          activePage:0,
          limit:8,
          selectCustId:0
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
      
      componentDidUpdate(prevProps, prevState){
      
        if(prevProps.Customer.AlertOpen != this.props.Customer.AlertOpen)
        {
          if(this.state.customerLists?.length > 0)
          {
          this.searchCustomer();
          }
        }
      }
      updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      }

      addCustomerDialogOnclick = async () =>{
        await this.props.CustomerAction.setCustomerAlert([],true,false);
      }

      updateCustomerDialogOnclick = async (index) =>{
        var customerSelect = this.state.customerLists[index];      
        await this.props.CustomerAction.setCustomerAlert(customerSelect,true,true);
      }

      onChangeCustName = (e) =>{
        var value = e.target.value
          this.setState({customerNameSearch:value}); 
      }

      onChangeCitizenID = (e) =>{
        var value = e.target.value
          this.setState({citizenIdSearch:value}); 
      }

      onChangeEmail = (e) =>{
        var value = e.target.value
          this.setState({emailSearch:value}); 
      }

      onChangeTel = (e) =>{
        var value = e.target.value
          this.setState({telSearch:value}); 
      }

      searchCustomer = async() =>{
        try
        {
          const query = queryString.parse(this.props.location.search);
          if(IsNullOrEmpty(query.userId)){
              this.props.history.push('/Login');  
              return;
          }
          var request = JSON.stringify({
            name:this.state.customerNameSearch,
            citizenId:this.state.citizenIdSearch,
            email:this.state.emailSearch,
            telephone:this.state.telSearch,
            userId:query.userId,
            page:this.state.activePage,
            limit:this.state.limit
          });
          const res = await this.props.CustomerApiAction.SearchCustomer(request);
          if(res?.data?.isError == true){
            this.props.AlertAction.setAlert(2,res?.data?.errorMsg,true);
            return;
       }
        this.setState({totalRecord:res?.data?.totalRecord,customerLists:res?.data?.customerList})     
      }
      catch(ex){
        toast.error("เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่");
        }
      }

      exportExcel = async() =>{
        try
        {
          const query = queryString.parse(this.props.location.search);
          var request = JSON.stringify({
            name:this.state.customerNameSearch,
            citizenId:this.state.citizenIdSearch,
            email:this.state.emailSearch,
            telephone:this.state.telSearch,
            userId:query.userId,          
          });
          const res = await this.props.CustomerApiAction.ExportExcel(request);
          if(res?.data?.isError == true){
            this.props.AlertAction.setAlert(2,res?.data?.errorMsg,true);
            return;
       }
      }
      catch(ex){
        toast.error("เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่");
        }
      }

      sendAttachmentFile = async() =>{
        try
        {
          const query = queryString.parse(this.props.location.search);
          var request = JSON.stringify({
            name:this.state.customerNameSearch,
            citizenId:this.state.citizenIdSearch,
            email:this.state.emailSearch,
            telephone:this.state.telSearch,
            userId:query.userId,          
          });
          const res = await this.props.CustomerApiAction.SendAttachmentFile(request);
          if(res?.data?.isError == true){
            this.props.AlertAction.setAlert(2,res?.data?.errorMsg,true);
            return;
       }
      }
      catch(ex){
        toast.error("เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่");
        }
      }

      deleteCustomer = async(customerId)=> {
        try{
          await this.setState({selectCustId:customerId});
          await this.props.AlertAction.setConfirmAlert('ลบ Customer',this.deleteCustomerApi.bind(this),true);
        }
        catch(ex){
          toast.error("เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่");
          }
        }
      
        deleteCustomerApi = async()=> {
          const query = queryString.parse(this.props.location.search);
          var res = await this.props.CustomerApiAction.DeleteCustomer(query.userId,this.state.selectCustId);
          if(res?.data?.isError == true){
            this.props.AlertAction.setAlert(2,res?.data?.errorMsg,true);
            return;
          
          }
          await this.setState({isloading:false});
          this.props.AlertAction.setAlert(1,"ทำรายการสำเร็จ",true);
          await this.searchCustomer();
        }


  render() {
    return (
      <React.Fragment>    
      <AlertDialog/>
      <ConfirmAlertDialog/>
      <CustomerDialog/>
      <React.Fragment>
      
      <ToastContainer />  
      {this.state.width <= 998 ?
      <div style={{ backgroundColor:'#e8e7e3',width:'100%',padding:'15px',height:this.state.height}}>
      
      {/*Customer Information*/}
      <div className="form-group row">
        <div className="form-group text-title-yellow2">Customer Information</div>
        </div>
              
      <div style={{ backgroundColor:'white',borderRadius:'10px',width:'100%',marginTop:'20px',padding:'0px 10px'}}>
      {/*Customer Name Search*/}
      <div className="form-group row">
        <div className="form-group">
        <input  type="text" class="form-control input-mobile" style={{borderRadius:'10px'}}  id="InputCustNameSearch" placeholder="customer name" value={this.state.customerNameSearch} onChange={this.onChangeCustName}/>     
        </div>
        </div>

        <div className="form-group row">
            {/*Citizen Id Search*/}
        <div className="form-group col-6 ">
        <input  type="text" class="form-control input-mobile" style={{borderRadius:'10px',marginTop:'0px'}}  id="InputCitizenIdSearch" placeholder="citizen id" value={this.state.citizenIdSearch} onChange={this.onChangeCitizenID}/>     
        </div>

        {/*Tel Search*/}
        <div className="form-group col-6 ">
        <input  type="text" class="form-control input-mobile" style={{borderRadius:'10px',marginTop:'0px'}}  id="InputTelSearch" placeholder="tel." value={this.state.telSearch} onChange={this.onChangeTel}/>     
        </div>
</div>

<div className="form-group row">

            {/*Email Search*/}
        <div className="form-group col-8">
        <input  type="text" class="form-control input-mobile" style={{borderRadius:'10px',marginTop:'0px'}}  id="InputEmailSearch" placeholder="e-mail" value={this.state.emailSearch} onChange={this.onChangeEmail}/>             
        </div>

  {/*Button Search*/}
  <div className="form-group col-3" style={{textAlign: 'end'}}> <button style={{height: '30px',borderRadius: '10px'}} className="primary-button2" onClick={this.searchCustomer}>SEARCH</button></div>


      
</div>

<div className="form-group row">

            {/*CREATE NEW Button*/}
        <div className="form-group col-4" style={{textAlign: 'start',display: 'flex',alignItems: 'center'}}> <button style={{height: '30px',borderRadius: '10px'}} className="primary-button2" onClick={this.addCustomerDialogOnclick}>CREATE NEW</button></div>
            {/*Export Excel / Attachment File*/}
        {this.state.totalRecord > 0?
        <div className="form-group col-3" style={{display:'flex',justifyContent: 'start', alignItems: 'center'}}>
        <img src={require('../assets/images/excel_logo.png').default}  style={{display :'unset',width:'35px',marginRight:'5px',height:' fit-content',cursor:'pointer'}} onClick={this.exportExcel}/>
        <img src={require('../assets/images/attachment_logo.png').default}  style={{display :'unset',width:'35px',height:' fit-content',cursor:'pointer'}} onClick={this.sendAttachmentFile}/>
        </div>
  :null}

   {/*Pagination*/}
   <div className="form-group col-5 ">
        {this.state.totalRecord > 0 ?
<div className="form-group row"  style={{padding: '10px 30px 10px 30px'}}>
<Pagination
          innerClass="pagination pagination-ul"
          itemClass="pagination-li"
          itemClassFirst="pagination-li-first"
          activeClass="pagination-li-active"
          itemClassLast="pagination-li-last"
          hideDisabled={true}
          activePage={this.state.activePage+1}
          itemsCountPerPage={this.state.limit}
          totalItemsCount={this.state.totalRecord}
          onChange={this.searchCustomer}
        />
  </div> : null
    }
     </div>
          </div>
          <div className="form-group row" style={{padding:'2px'}}>
          <React.Fragment>
        {this.state.customerLists?.map(( 
            {
                customerName,
                customerLastname,
                citizenId,
                birthDate,
                email,
                telephone,
                customerId
            }, index ) => ( 
              <React.Fragment>    
                <div style={{backgroundColor:'white',padding:'10px 15px'}}>
         <div style={{backgroundColor:'#cc4d76',borderRadius:'10px',padding: '5px 15px'}}>
         <div className="form-group row">       
        <div style={{ fontSize: '20px',fontWeight: '700',color:'white'}}>{customerName} {customerLastname}</div>            
        </div>

        <div className="form-group row">

        <div style={{ fontSize: '16px',color:'white'}} className="col-6">
        <img src={require('../assets/images/citizen_Icon.png').default}  style={{display :'unset',width:'20px',height:' fit-content',cursor:'pointer'}}/>
         <span>{citizenId}</span>
          </div>     
        <div style={{ fontSize: '16px',color:'white'}} className="col-6">
        <img src={require('../assets/images/telephoneIcon.png').default}  style={{display :'unset',width:'20px',height:' fit-content',cursor:'pointer'}}/>
         <span>{telephone}</span>
         </div>     
        </div>

        <div className="form-group row">       
        <div style={{ fontSize: '16px',color:'white'}} className="col-10">
        <img src={require('../assets/images/email_Icon.png').default}  style={{display :'unset',width:'20px',height:' fit-content',cursor:'pointer'}}/>
         <span>{email}</span>
         </div>   
        <div style={{justifyContent: 'center',display: 'flex'}} className="col-2">
                <img src={require('../assets/images/edit_mobile.png').default}  style={{display :'unset',width:'25px',marginRight:'5px',height:' fit-content',cursor:'pointer'}} onClick={() => this.updateCustomerDialogOnclick(index)}/>
                <img src={require('../assets/images/delete_mobile.png').default}  style={{display :'unset',width:'25px',marginRight:'5px',height:' fit-content',cursor:'pointer'}} onClick={() => this.deleteCustomer(customerId)}/>
              </div>         
        </div>
</div>
</div>
              </React.Fragment>       
        ))}
         </React.Fragment>
        </div>
        </div>
      </div>
      : 
       <div style={{ backgroundColor:'#e8e7e3',width:'100%',padding:'15px',height:this.state.height}}>
       {/*Customer Information + Button create new*/}
       <div className="form-group row">
        <div className="form-group col-8 text-title-yellow2">Customer Information</div>
        <div className="form-group col-4" style={{textAlign: 'end'}}> <button className="primary-button2" onClick={this.addCustomerDialogOnclick}>CREATE NEW</button></div>
        </div>

        <div style={{ backgroundColor:'white',borderRadius:'10px',width:'100%',marginTop:'20px',padding:'0px 10px'}}>
         {/*Customer Name Search*/}
        <div className="form-group row">
        <div className="form-group">
        <input  type="text" class="form-control input" style={{borderRadius:'10px'}}  id="InputCustNameSearch" placeholder="customer name" value={this.state.customerNameSearch} onChange={this.onChangeCustName}/>     
        </div>
        </div>

        <div className="form-group row">
            {/*Citizen Id Search*/}
        <div className="form-group col-3 ">
        <input  type="text" class="form-control input" style={{borderRadius:'10px',marginTop:'0px'}}  id="InputCitizenIdSearch" placeholder="citizen id" value={this.state.citizenIdSearch} onChange={this.onChangeCitizenID}/>     
        </div>

            {/*Email Search*/}
        <div className="form-group col-5 ">
        <input  type="text" class="form-control input" style={{borderRadius:'10px',marginTop:'0px'}}  id="InputEmailSearch" placeholder="e-mail" value={this.state.emailSearch} onChange={this.onChangeEmail}/>     
        </div>

        {/*Tel Search*/}
        <div className="form-group col-3 ">
        <input  type="text" class="form-control input" style={{borderRadius:'10px',marginTop:'0px'}}  id="InputTelSearch" placeholder="tel." value={this.state.telSearch} onChange={this.onChangeTel}/>     
        </div>

        {/*Button Search*/}
        <div className="form-group col-1" style={{textAlign: 'end'}}> <button className="primary-button2" onClick={this.searchCustomer}>SEARCH</button></div>

        </div>

        </div>

        <div style={{ backgroundColor:'white',borderRadius:'10px',width:'100%',marginTop:'20px',padding:'0px 10px',minHeight:'470px'}}>
        
        <div className="form-group row" style={{padding:'10px'}}>

        {/*Export Excel / Attachment File*/}
        {this.state.totalRecord > 0?
        <div className="form-group col-9" style={{display:'flex',justifyContent: 'start', alignItems: 'center'}}>
        <img src={require('../assets/images/excel_logo.png').default}  style={{display :'unset',width:'35px',marginRight:'5px',height:' fit-content',cursor:'pointer'}} onClick={this.exportExcel}/>
        <img src={require('../assets/images/attachment_logo.png').default}  style={{display :'unset',width:'35px',height:' fit-content',cursor:'pointer'}} onClick={this.sendAttachmentFile}/>
        </div>
  :null}
        {/*Pagination*/}
        <div className="form-group col-3 ">
        {this.state.totalRecord > 0 ?
<div className="form-group row"  style={{padding: '10px 30px 10px 30px'}}>
<Pagination
          innerClass="pagination pagination-ul"
          itemClass="pagination-li"
          itemClassFirst="pagination-li-first"
          activeClass="pagination-li-active"
          itemClassLast="pagination-li-last"
          hideDisabled={true}
          activePage={this.state.activePage+1}
          itemsCountPerPage={this.state.limit}
          totalItemsCount={this.state.totalRecord}
          onChange={this.searchCustomer}
        />
  </div> : null
    }
       
    
        </div>
        <div className="form-group row" style={{paddingLeft: '30px',paddingTop: '15px'}}>
        <table>
        <tr className="table-head">
          <th className="table-th col-2">First Name</th>
          <th className="table-th col-2" >Last Name</th>
          <th className="table-th col-2">Citizen ID</th>
          <th className="table-th col-2">Birth Date</th>
          <th className="table-th col-2">E-mail</th>
          <th className="table-th col-1">Tel.</th>
          <th className="col-1"></th>
        </tr>
        <React.Fragment>
        {this.state.customerLists?.map(( 
            {
                customerName,
                customerLastname,
                citizenId,
                birthDate,
                email,
                telephone,
                customerId
            }, index ) => ( 
              <React.Fragment>    
            <tr className="table-body" key={index}>
              <td className="table-td">{customerName}</td>
              <td className="table-td">{customerLastname}</td>
              <td className="table-td">{citizenId}</td>
              <td className="table-td">{birthDate}</td>
              <td className="table-td">{email}</td>
              <td className="table-td">{telephone}</td>
              <td> 
                <div style={{justifyContent: 'center',display: 'flex'}}>
                <img src={require('../assets/images/edit_icon.png').default}  style={{display :'unset',width:'25px',marginRight:'5px',height:' fit-content',cursor:'pointer'}} onClick={() => this.updateCustomerDialogOnclick(index)}/>
                <img src={require('../assets/images/delete_icon.png').default}  style={{display :'unset',width:'25px',marginRight:'5px',height:' fit-content',cursor:'pointer'}} onClick={() => this.deleteCustomer(customerId)}/>
              </div>
              </td>
             
            </tr>  
              </React.Fragment>       
        ))}
         </React.Fragment>
      
      </table>
            </div>
            </div>
            
            </div>

        </div>     
  }
      </React.Fragment>
      </React.Fragment>
            
    );
  }
}

const mapStateToProps = state =>({
  Customer:state.Customer
});

const mapDispatchToProps = dispatch =>({
  AlertAction : bindActionCreators(alertAction,dispatch),
  CustomerApiAction : bindActionCreators(customerApiAction,dispatch),
  CustomerAction : bindActionCreators(customerAction,dispatch)
});


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Customer));