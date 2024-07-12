import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './animate.css';
import $ from "jquery"

var timer;
var counting = false
var hold = false

class Clock extends React.Component{
  constructor(props){super(props)
    this.state = {
      hour: '25',
      minutes: '00',
      break: '5',
      session: '25'
    }//end of supper

    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
    this.reset = this.reset.bind(this)
    this.play = this.play.bind(this)
  }//end of constructor

  increment(e){
if(e.target.value === 'incrementBreak'){
  let num = Number(this.state.break)
  if(num !== 25){
    num++
    this.setState({break: num.toString()})
  }
  else{
    num = 1
    // this.setState{break: num.toString()}
    this.setState({break: num.toString()})
  }//end of inner else
}//end of if

else if(e.target.value === 'incrementSession'){
  if(counting === false){
    let num = Number(this.state.hour)
    let num1 = Number(this.state.session)
    
    if(num !== 25){
      num++
      num1++
      num < 10 ? this.setState({hour: '0' + num.toString()}): this.setState({hour: num.toString()})
      this.setState({session: num1.toString()})
    }
    else{
      num = 1
      num1 = 1
      this.setState({hour: '0' + num.toString()})
      this.setState({session: num1.toString()})
    }

  }//end of inner if 
}//end of if else
  }//end of increment funct

  decrement(e){
    if(e.target.value === 'decrementBreak'){
      let num = Number(this.state.break)
      if(num === 1 ){
     this.setState({break: '25'})
      }//end of if
      else{
        num--
        this.setState({break: num.toString()})
      }//end of else
    }//end of if

    else if(e.target.value === 'decrementSession' ){
      if(counting === false){
      let num = Number(this.state.hour)
      
      if(num === 1){
        this.setState({hour: '25'})
        this.setState({session: '25'})
      }//end of second inner if
      else{
        num--
        num < 10 ? this.setState({hour: '0' + num.toString()}): this.setState({hour: num.toString()})
        this.setState({session: num.toString()})
      }
      }//end of inner if 

    }
  }//end of decrement funct

  reset(){

    if(!counting){
  this.setState({hour: '25'})
  this.setState({minutes: '00'})
  this.setState({break: '5'})
  this.setState({session: '25'})

  $("#timer").css({color: 'lime'})
  $("#clock-container").css({animation: 'none'})
    }
  }//end of reset funct

  countDown(val){
    if(val){

      timer = setInterval(()=>{
      let h = Number(this.state.hour)
      let m = Number(this.state.minutes)
      let start = Number(this.state.break)

      if(h === 0){

        if(m <= 59 && m > 11){
          $("#timer").css({
            color: 'orange'
          })

          $("#clock-container").css({
            animation: 'clock-bg1 1s infinite'
          })
        }//end of if

        else if(m <= 11 && m !== 0){

          $("#timer").css({
            color: 'red'
          })

          $("#clock-container").css({
            animation: 'clock-bg2 .5s infinite'
          })
        }//end of else if
      }//end of animtion if

      else{
        $("#timer").css({
          color: 'lime'
        })

        $("#clock-container").css({
          animation: 'none'
        })
      }//end of animtion else if

      if(m === 0){

        if(h === 0){

        let pause = setTimeout(()=>{
         hold = true
          clearTimeout(pause)
        }, 4000)//end of timeout

        if(hold){
          h = start
          h < 10 ? this.setState({hour: '0' + h.toString()}) : this.setState({hour: h.toString()})
          this.setState({minutes: '00'})
          hold = false
        }
        else{
          $("#timer").css({
            color: 'lime'
          })

          $("#clock-container").css({
            animation: 'none'
          })
        }

        }//end of inner if

        else{
          --h
          h < 10 ? this.setState({hour: '0' + h.toString()}) : this.setState({hour: h.toString()})
          this.setState({minutes: '59'})
        }//end of inner else

      }//end of outer if

      else{
        --m
        m < 10 ? this.setState({minutes: '0' + m.toString()}) : this.setState({minutes: m.toString()})
      }//end of outer else

    
    }, 1000)//end of interval
  }//end of if
  
else{clearInterval(timer)}

if(val){

  $("#play-pause").text("pause")
  $("#play-pause").css({
    border: '1px solid yellow',
    animation: 'play 2s infinite',
    boxShadow: '.5px .5px 30px .5px black'
  })
}//end of second if

else{

  $("#play-pause").text("play")
  $("#play-pause").css({
    border: 'none',
    animation: 'none',
    boxShadow: '.5px .5px 4px .5px black'
  })
}//end of else 

  }//end of countDown func

  play(){

  !counting ? counting = true: counting = false
 this.countDown(counting)

  }//end of play func
  
  
  render(){
    return(
      <>
      <h1 id  = 'clock-header'><u>COUNTDOWN CLOCK</u></h1>
        <div id = 'clock-container'>

      <div id = 'time-screen'>
        <h1 id = 'timer'>{this.state.hour}:{this.state.minutes}</h1>
      </div>

      <div id = 'controls'>
      <div id = 'break-container' className = 'controls-sections'>
        <h3 id = 'break-label' className = 'sections-label'>Break Length</h3>
        <h4 className = 'back-value'>{this.state.break}</h4>

        <div className = 'button-container'>
        <button className = 'increment' value = 'incrementBreak' onClick={this.increment}>+</button>
      <button className = 'decrement' value = 'decrementBreak' onClick={this.decrement}>-</button>
      </div>

      </div>
      <div id = 'main-controlers'>
      <button id = 'play-pause' onClick={this.play}>play</button>
      <button id = 'reset' onClick={this.reset}>Reset</button>
      </div>


      <div id = 'session-container' className = 'controls-sections'>
      <h3 id = 'session-label' className = 'sections-label'>Session Length</h3>
      <h4 className = 'back-value'>{this.state.session}</h4>

      <div className = 'button-container'>
      <button className = 'increment' value = 'incrementSession' onClick={this.increment}>+</button>
      <button className = 'decrement' value = 'decrementSession' onClick={this.decrement}>-</button>
      </div>

      </div>
      </div>
        </div>
        </>
    )
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<Clock />)