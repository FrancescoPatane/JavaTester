function Answers(props) {
	let keys = Object.keys(props.currentQuestion.data.answers);
	let selectionForThisQuestion = props.givenAnswers.get(props.currentQuestion.id);
	return <ul>
	{keys.map(key => (
			<Checkbox id={key} checked={selectionForThisQuestion && selectionForThisQuestion.includes(key)} text={props.currentQuestion.data.answers[key]}/>
	))}
	</ul>;
}



class Checkbox extends React.Component {
	constructor(props) {
		super(props);
	}
	toggleChange = () => {
		if (this.props.checked)
			this.props.unCheckAnswer(this.props.id);
		else
			this.props.checkAnswer(this.props.id);
	}
	render() {
		return (

				<li>
				<input type='checkbox' className={'form-check-input'} id={this.props.id} checked={this.props.checked} onChange={this.toggleChange}/>
				<label className={'form-check-label'} for={this.props.id}>{this.props.text}</label>
				</li>
		);
	}
}

function ButtonRow(props){
	let prevButton;
	let subButton = <button className={"btn btn-dark"} onClick={props.submit}>Submit</button>;
	let nextButton;
	if (props.showPrevious){
		prevButton = <button className={"btn btn-dark float-left"} onClick={props.previous}>Previous</button>;
	}
	if (props.showNext){
		nextButton = <button className={"btn btn-dark float-right"} onClick={props.next}>Next</button>;
	}
	return (
			<div className={"form-row"}>
			<div className={"col"}>
			{prevButton}
			</div>
			<div className={"col"}>
			{subButton}
			</div>
			<div className={"col"}>
			{nextButton}
			</div>
			</div>
	);
}



class QuestionPanel extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
				isLoaded: false,
				error: null,
				questions: [],
				currentQuestion: null,
				index: 0,
				givenAnswers: new Map(),
				submitted: false
		};
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
		this.submit = this.submit.bind(this);
		this.checkAnswer = this.checkAnswer.bind(this);
		this.unCheckAnswer = this.unCheckAnswer.bind(this);

	}


	componentDidMount() {
		fetch("http://localhost:8080/questions")
		.then(res => res.json())
		.then(
				(result) => {
					this.setState({
						isLoaded: true,
						questions: result,
						currentQuestion: result[this.state.index]
					});
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
		);
	}

	checkAnswer(answerId) {
		let newGivenAnswers = this.state.givenAnswers;

		if (newGivenAnswers.has(this.state.currentQuestion.id))
			newGivenAnswers.get(this.state.currentQuestion.id).push(answerId);
		else
			newGivenAnswers.set(this.state.currentQuestion.id, [answerId]);

		this.setState({
			givenAnswers: newGivenAnswers,
		});

	}

	unCheckAnswer(answerId) {
		let newGivenAnswers = this.state.givenAnswers;

		let asnwersForQUestion = newGivenAnswers.get(this.state.currentQuestion.id);
		let index = asnwersForQUestion.indexOf(answerId);

		if (index > -1) {
			asnwersForQUestion.splice(index, 1);
		}

		this.setState({
			givenAnswers: newGivenAnswers,
		});
	}

	next() {


		this.setState({
			index: this.state.index + 1,
			currentQuestion: this.state.questions[this.state.index + 1]
		});
	}

	previous() {
		this.setState({
			index: this.state.index - 1,
			currentQuestion: this.state.questions[this.state.index - 1]
		});
	}

	submit() {
		this.setState({
			submitted: true
		});
	}

	render() {
		const { error, isLoaded, questions, currentQuestion, givenAnswers, index, submitted } = this.state;
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			if (submitted){
				return (
						<div>
						{questions.map( q => (
								<Results question={q} givenAnswers={givenAnswers}/>
						))}
						</div>
				);
			}else{
				return (
						<fieldset>
						<div className={"form-group"}>
						<textarea className={"form-control"} rows="10" value={currentQuestion.data.question} readonly></textarea>
						</div>
						<div className={"form-group"} id="answerList">
						<ul>
						{Object.keys(currentQuestion.data.answers).map(key => (
								<Checkbox id={key} checked={givenAnswers.get(currentQuestion.id) && givenAnswers.get(currentQuestion.id).includes(key)} text={currentQuestion.data.answers[key]} checkAnswer={this.checkAnswer} unCheckAnswer={this.unCheckAnswer}/>
						))}
						</ul>
						</div>
						<hr />
						<ButtonRow previous={this.previous} next={this.next} submit={this.submit} showNext={index<questions.length-1} showPrevious={index>0}/>
						</fieldset>
				);
			}
		}
	}
}


function arraysEqual(arr1, arr2) {
	if(arr1.length !== arr2.length)
		return false;
	for(var i = arr1.length; i--;) {
		if(arr1[i] !== arr2[i])
			return false;
	}

	return true;
}

function Results(props) {
	let answers = props.question.data.answers;
	let correctAnswers = props.question.data.correctAnswers;
	let givenAnswers = props.givenAnswers.get(props.question.id);
	let img = null;
	if (givenAnswers && arraysEqual(correctAnswers.sort(), givenAnswers.sort()))
		img = <img className={"float-right"} src="/img/correct.png" height="40" width="40" />;
	else
		img = <img className={"float-right"} src="/img/wrong.png" height="40" width="40" />;
	return (
			<fieldset>
			<div className={"row"}>
			<div className={"col-10"}>
			<div className={"form-group"}>
			<textarea className={"form-control"} rows="6" value={props.question.data.question} readonly></textarea>
			</div>
			</div>
			<div className={"col-2"}>
			{img}
			</div>
			</div>
			<div className={"row"}>
			<div className={"col-4"}>
			<div className={"form-group"}>
			<ResultAnswers answers={answers} correctAnswers={correctAnswers} givenAnswers={givenAnswers}/>
			</div>
			</div>
			<div className={"col-8"}>
			<div className={"form-group"}>
			<textarea className={"form-control"} rows="7" value={props.question.data.explanation} readonly></textarea>
			</div>
			</div>
			</div>
			</fieldset>		
	);
}

function ResultAnswers(props){
	let keys = Object.keys(props.answers);

	return(
			<ul>
			{keys.map(key => (
					<ResultAnswer answers={props.answers} correctAnswers={props.correctAnswers} givenAnswers={props.givenAnswers} answerKey={key} text={props.answers[key]}/>
			))}
			</ul>	
	);
}


function ResultAnswer (props){
	let colorClass="";
	let checked = props.givenAnswers && props.givenAnswers.includes(props.answerKey);

	if (checked){
		if (props.correctAnswers.includes(props.answerKey))
			colorClass = "right-answer";
		else
			colorClass = "wrong-answer";
	}else{
		if (props.correctAnswers.includes(props.answerKey))
			colorClass = "right-answer";
	}

	return(
			<li>
			<input type="checkbox" className={"form-check-input"} checked={checked}/>
			<label className={"form-check-label "+colorClass} >{props.text}</label>	
			</li>
	);
}



