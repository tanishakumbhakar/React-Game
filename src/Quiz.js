import React,{Component} from 'react';
import QuizOptions from './QuizOptions';
import classNames from 'classnames';
class Quiz extends Component{
	constructor(props){
		super(props);
		let riddle=this.playGame();
		let correct=false;
		let gameover=false;
		this.state={riddle};
		this.renderOptions=this.renderOptions.bind(this);
		this.checkResults=this.checkResults.bind(this);
		this.play=this.play.bind(this);
	}
	checkResults(option){
		if(this.state.riddle.answer===option)
		{
			this.setState({correct:true,gameover:true});
		}
		else
		{
			this.setState({correct:false,gameover:true});
		}

	}
	generateRandomOptions(sum){

		let resultsArray=[];
		let randomNumberArray=[];
		while(randomNumberArray.length<=3)
		{
			let randomNumber=this.randomNumber(1,19);
			if(randomNumberArray.indexOf(randomNumber)>-1)
				continue;
			else
				randomNumberArray.push(randomNumber);
		}
		for(let i=0;i<3;i++)
		{
			let addSubtract=this.randomNumber(0,1);
			let result=sum;
			if(addSubtract==1)
			{
				result+=randomNumberArray[i];
				resultsArray.push(result);
			}
			else
			{
				result-=randomNumberArray[i];
				resultsArray.push(result);
			}
		}
		
		return resultsArray;
	}
	randomNumber(min,max)
	{
		return Math.floor(Math.random()*(max-min+1))+min;
	}
	playGame(){
		let field1=this.randomNumber(20,50);
		let field2=this.randomNumber(20,50);
		let result=field1+field2;
		let resultsArray=this.generateRandomOptions(result);
		resultsArray.push(result);
		resultsArray.sort(function(a,b){
			return (0.5-Math.random());
		});
		
		let riddle={
			resultsArray:resultsArray,
			field1:field1,
			field2:field2,
			answer:result
		};
		if(this.state && this.state.gameover)
		{
			this.setState({riddle:riddle});
		}
		else
		{
			return riddle;
		}

	}
	renderOptions(){
		return(

			<div className="options">
			 	{this.state.riddle.resultsArray.map((option,i)=>
			 		<QuizOptions option={option} key={i} checkResults={(option)=>this.checkResults(option)}/>

			 	)
			 }
				
				

			</div>



			);

	}
	renderMessage(){
		if(this.state.correct){
			return <h3>Good Job!Hit the button to play again</h3>;
		}
		else{
			return <h3>Ohh Ohh!Hit the button below to play again</h3>;
		}
	}
	play(){
		this.setState({correct:false,gameover:false});
		this.playGame();
	}
	render(){
		return(

			<div className="quiz">
				<div className="quiz-content">
				<p className="question">What is the sum of <span className="text-info">{this.state.riddle.field1} </span> and <span className="text-info">{this.state.riddle.field2}</span>?</p>
				{this.renderOptions()}

				
				</div>
				 
				<div className={classNames("after",{'hide':!this.state.gameover},{'wrong animated zoomInDown':!this.state.correct},{'correct animated zoomInDown':this.state.correct})}>
					{this.renderMessage()}
				</div>
				<div className="play-again">
					<a className="button" onClick={this.play}>Play Again</a>
				</div>

				
			</div>

			);
	}
}
export default Quiz;