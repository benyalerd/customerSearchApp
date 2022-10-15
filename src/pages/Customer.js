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

class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = 
        { width: 0, 
          height: 0,
          customerLists:[{
            customerName:"Benya",
            customerLastname:"Lerd",
            citizenId:"1300100163454",
            birthDate:"06/02/2540",
            email:"benya.lerd@gmail.com",
            "telephone":"0856340730"
            },
            {
                customerName:"Benya",
                customerLastname:"Lerd",
                citizenId:"1300100163454",
                birthDate:"06/02/2540",
                email:"benya.lerd@gmail.com",
                "telephone":"0856340730"
                }],
          customerNameSearch:"",
          citizenIdSearch:"",
          emailSearch:"",
          telSearch:"",
          totalRecord:0,
          activePage:0,
          limit:10
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
      
      componentDidUpdate(){
        
      }
      updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      }


  render() {
    return (
        <React.Fragment>   
        <ToastContainer />  

       <div style={{ backgroundColor:'#e8e7e3',width:'100%',padding:'15px'}}>
       {/*Customer Information + Button create new*/}
       <div className="form-group row">
        <div className="form-group col-8 text-title-yellow2">Customer Information</div>
        <div className="form-group col-4" style={{textAlign: 'end'}}> <button className="primary-button2" >CREATE NEW</button></div>
        </div>

        <div style={{ backgroundColor:'white',borderRadius:'10px',width:'100%',marginTop:'20px',padding:'0px 10px'}}>
         {/*Customer Name Search*/}
        <div className="form-group row">
        <div className="form-group">
        <input  type="text" class="form-control input" style={{borderRadius:'10px'}}  id="InputCustNameSearch" placeholder="customer name" />     
        </div>
        </div>

        <div className="form-group row">
            {/*Citizen Id Search*/}
        <div className="form-group col-3 ">
        <input  type="text" class="form-control input" style={{borderRadius:'10px',marginTop:'0px'}}  id="InputCitizenIdSearch" placeholder="citizen id" />     
        </div>

            {/*Email Search*/}
        <div className="form-group col-5 ">
        <input  type="text" class="form-control input" style={{borderRadius:'10px',marginTop:'0px'}}  id="InputEmailSearch" placeholder="e-mail" />     
        </div>

        {/*Tel Search*/}
        <div className="form-group col-3 ">
        <input  type="text" class="form-control input" style={{borderRadius:'10px',marginTop:'0px'}}  id="InputTelSearch" placeholder="tel." />     
        </div>

        {/*Button Search*/}
        <div className="form-group col-1" style={{textAlign: 'end'}}> <button className="primary-button2" >SEARCH</button></div>

        </div>

        </div>

        <div style={{ backgroundColor:'white',borderRadius:'10px',width:'100%',marginTop:'20px',padding:'0px 10px'}}>
        
        <div className="form-group row" style={{padding:'10px'}}>

        {/*Export Excel / Attachment File*/}
        {this.state.totalRecord > 0?
        <div className="form-group col-9" style={{display:'flex',justifyContent: 'end', alignItems: 'center'}}>
        <img src={require('../assets/images/excel_logo.png').default}  style={{display :'unset',width:'35px',marginRight:'5px',height:' fit-content'}}/>
        <img src={require('../assets/images/attachment_logo.png').default}  style={{display :'unset',width:'35px',height:' fit-content'}}/>
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
        />
  </div> : null
    }
       
    
        </div>
        <div className="form-group row">
        <table>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Citizen ID</th>
          <th>Birth Date</th>
          <th>E-mail</th>
          <th>Tel.</th>
          <th></th>
          <th></th>
        </tr>
        <React.Fragment>
        {this.state.customerLists?.map(( 
            {
                customerName,
                customerLastname,
                citizenId,
                birthDate,
                email,
                telephone
            }, index ) => ( 
              <React.Fragment>    
            <tr key={index}>
              <td>{customerName}</td>
              <td>{customerLastname}</td>
              <td>{citizenId}</td>
              <td>{birthDate}</td>
              <td>{email}</td>
              <td>{telephone}</td>
              <td> <img src={require('../assets/images/edit_icon.png').default}  style={{display :'unset',width:'35px',marginRight:'5px',height:' fit-content'}}/></td>
              <td> <img src={require('../assets/images/delete_icon.png').default}  style={{display :'unset',width:'35px',marginRight:'5px',height:' fit-content'}}/></td>
            </tr>  
              </React.Fragment>       
        ))}
         </React.Fragment>
      
      </table>
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
});


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Customer));