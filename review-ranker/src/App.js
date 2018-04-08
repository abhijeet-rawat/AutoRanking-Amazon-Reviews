import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {MyTable} from './MyTable.js';
import Modal from 'react-modal';
import ReactStars from 'react-stars';


const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};


class App extends Component {
  constructor(props){
      super(props);

      this.state={
         modalIsOpen:false,
         modalData:{
             rating:0,
             reviewtext:"",
             upvotes:0,
             downvotes:0,
             submitclicked:false
         }
      };

  }

  addReview=(e)=>{
      this.setState({
          modalIsOpen:true,
          modalData:{
              rating:0,
              reviewtext:"",
              upvotes:0,
              downvotes:0,
              submitclicked:false

          }
      });
  };

  handleCancel=(e)=>{
      this.setState({
         modalIsOpen:false
      });
  };

  ratingChanged=(e)=>{
      this.setState((prevState) => ({
          modalData:{
           rating:e,
           reviewtext:document.getElementById("rtext").value,
           upvotes: prevState.modalData.upvotes,
           downvotes: prevState.modalData.downvotes,
              submitclicked:false
          }
      }));
  };

  handleSubmit=(e)=>{
     let reviewtext=document.getElementById("rtext").value;

      this.setState((prevState) => ({
          modalIsOpen:false,
          modalData:{
              rating:prevState.modalData.rating,
              reviewtext:reviewtext,
              upvotes: prevState.modalData.upvotes,
              downvotes: prevState.modalData.downvotes,
              submitclicked:true
          }
      }));
  };

  upVoted=(e)=>{
      this.setState((prevState) => ({
          modalData:{
              rating:prevState.modalData.rating,
              reviewtext:document.getElementById("rtext").value,
              upvotes: prevState.modalData.upvotes+1,
              downvotes: prevState.modalData.downvotes,
              submitclicked:false
          }
      }));
  };

    downVoted=(e)=>{
        this.setState((prevState) => ({
            modalData:{
                rating:prevState.modalData.rating,
                reviewtext:document.getElementById("rtext").value,
                upvotes: prevState.modalData.upvotes,
                downvotes: prevState.modalData.downvotes+1,
                submitclicked:false
            }
        }));
    };


  render() {
    return(
          <div className="App">
              <div>
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
               <h1 className="App-title">Welcome to Review Ranker</h1>
            </header>
            <p className="App-intro">

            </p>
              </div>
              <MyTable modalData={this.state.modalData}/>
              <br/>

              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterModalOpen}
                onRequestClose={this.handleCancel}
                contentLabel={"Example Modal"}
                style={customStyles}
              >
                  <h2 ref={subtitle => this.subtitle = subtitle}>Add Review</h2>
                  <br/>
                  <div style={{display: "flex"}}>
                       <div style={{paddingRight: 20}}>Review Text :</div>
                       <textarea style={{width: 300, height:100,backgroundColor:"#e0ebeb"}} autoFocus={true} id={"rtext"}/>
                  </div>
                  <br/>
                  <div style={{display:"flex"}}>
                      <div style={{paddingRight: 50, marginTop:10 }}>Ratings:</div>
                      <ReactStars
                          count={5}
                          onChange={this.ratingChanged}
                          value={this.state.modalData.rating}
                          size={24}
                          half={false}
                          color2={'#ffd700'} />
                  </div>

                  <br/>

                  <div style={{display:"flex"}}>
                      <button type="button" className="btn btn-info  glyphicon glyphicon-thumbs-up" onClick={this.upVoted} style={{width:40,height:30, marginRight: 10}}/>
                      <input style={{width:40,height:30,marginRight: 30, backgroundColor:"#e0ebeb", textAlign:"center" }} value={this.state.modalData.upvotes} readOnly/>
                      <button type="button" className="btn btn-info  glyphicon glyphicon-thumbs-down"  onClick={this.downVoted} style={{width:40,height:30, marginRight: 10}}/>
                      <input style={{width:40,height:30,marginRight: 30, backgroundColor:"#e0ebeb", textAlign:"center"}}  value={this.state.modalData.downvotes} readOnly/>
                  </div>

                  <br/>

                  <div  style={{display:"flex" }}>
                      <button onClick={this.handleSubmit} className="btn btn-success" style={{marginRight: 30}}>Submit</button>
                      <button onClick={this.handleCancel} className="btn btn-danger">Close</button>
                  </div>

              </Modal>

              <button className="btn btn-primary" onClick={this.addReview}>Add Review</button>
          </div>

    );
  }
}

export default App;
