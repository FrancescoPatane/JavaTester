//function Answers(props) {
//let keys = Object.keys(props.currentQuestion.data.answers);
//let selectionForThisQuestion = props.givenAnswers.get(props.currentQuestion.id);
//return <ul>
//{keys.map(key => (
//<Checkbox id={key} checked={selectionForThisQuestion && selectionForThisQuestion.includes(key)} text={props.currentQuestion.data.answers[key]}/>
//))}
//</ul>;
//}

function Answers(props) {
	let keys = Object.keys(props.currentQuestion.data.answers);
	let selectionForThisQuestion = props.givenAnswers.get(props.currentQuestion.id);
	return <ul>
	{keys.map(key => (
			<Checkbox id={key} checked={selectionForThisQuestion && selectionForThisQuestion.includes(key)} text={props.currentQuestion.data.answers[key]}/>
	))}
	</ul>;
}


//<input type='checkbox' className={'form-check-input'} id={key} defaultChecked={selectionForThisQuestion && selectionForThisQuestion.includes(key)}/>
//<label className={'form-check-label'} for={key}>{props.currentQuestion.data.answers[key]}</label>

//function Answers(props) {
//return (<ul>
//<li>
//<input type='checkbox' className={'form-check-input'} id={props.id} checked={props.checked}/>
//<label className={'form-check-label'} for={props.id}>id == {props.id}</label>
//</li></ul>);
//}

class Checkbox extends React.Component {
	constructor(props) {
		super(props);
//		this.state = {
//				isChecked: false,
//		};
	}
	toggleChange = () => {
//		if (this.state.isChecked)
		if (this.props.checked)
			this.props.unCheckAnswer(this.props.id);
		else
			this.props.checkAnswer(this.props.id);

//		this.setState({
//			isChecked: !this.state.isChecked,
//		});
	}
//	componentDidUpdate(prevProps) {
//	// Typical usage (don't forget to compare props):
//	if (this.props.exam !== prevProps.exam) {
//	this.fetchData();
//	}
//	}
	render() {
		return (

				<li>
				<input type='checkbox' className={'form-check-input'} id={this.props.id} checked={this.props.checked} onChange={this.toggleChange}/>
				<label className={'form-check-label'} for={this.props.id}>{this.props.text}</label>
				</li>
		);
	}
}

//function Checkbox(props) {
//return (
//<li>
//<input type='checkbox' className={'form-check-input'} id={props.id} defaultChecked={props.checked}/>
//<label className={'form-check-label'} for={props.id}>{props.text}</label>
//</li>);
//}
/*
class Answers extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
				currentQuestion: this.props.currentQuestion,
				givenAnswers:  this.props.givenAnswers
		};
	}

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (this.props.currentQuestion.id !== prevProps.currentQuestion.id) {
			this.setState({
				currentQuestion: this.props.currentQuestion,
				givenAnswers: this.props.givenAnswers
			});
		}
	}

	render() {
		let keys = Object.keys(this.state.currentQuestion.data.answers);
		let selectionForThisQuestion = this.state.givenAnswers.get(this.state.currentQuestion.id);
		return <ul>
		{keys.map(key => (
				<li>
				<input type='checkbox' className={'form-check-input'} id={key} defaultChecked={selectionForThisQuestion && selectionForThisQuestion.includes(key)}/>
				<label className={'form-check-label'} for={key}>{this.state.currentQuestion.data.answers[key]}</label>
				</li>
		))}
		</ul>;
	}


}*/

function ButtonRow(props){
	let prevButton;
	let subButton = <button className={"btn btn-secondary"} onClick={props.submit}>Submit</button>;
	let nextButton;
	if (props.showPrevious){
		prevButton = <button className={"btn btn-secondary float-left"} onClick={props.previous}>Previous</button>;
	}
	if (props.showNext){
		nextButton = <button className={"btn btn-secondary float-right"} onClick={props.next}>Next</button>;
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
				givenAnswers: new Map()
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

//		let selectedOption = []

//		let checked = document.querySelectorAll('input[type=checkbox]:checked');

//		checked.forEach(function(e){
//		selectedOption.push(e.id)
//		});

//		let newGivenAnswers = this.state.givenAnswers;
//		newGivenAnswers.set(this.state.currentQuestion.id, selectedOption);

		this.setState({
//			givenAnswers: newGivenAnswers,
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

	}

	render() {
		const { error, isLoaded, questions, currentQuestion, givenAnswers, index } = this.state;
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			let answerListNode = document.getElementById('answerList');
			if (answerListNode)
				ReactDOM.unmountComponentAtNode(document.getElementById('answerList'));
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

//<Checkbox id={key} checked={givenAnswers.get(currentQuestion.id) && givenAnswers.get(currentQuestion.id).includes(key)} text={currentQuestion.data.answers[key] checkAnswer={this.checkAnswer}/>


//<Answers currentQuestion={currentQuestion} givenAnswers={givenAnswers}/>

//<Answers id={currentQuestion.id} checked={currentQuestion.id == 1}/>

class CategorySelection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
				isLoaded: false,
				error: null,
				exam: props.exam,
				categories: [],
				category: null
		};
		this.fetchData = this.fetchData.bind(this);
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		fetch("http://localhost:8080/questions/categories?exam=" + this.props.exam)
		.then(res => res.json())
		.then(
				(result) => {
					this.setState({
						isLoaded: true,
						categories: result,
						category: result[0]
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
		);
	}

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (this.props.exam !== prevProps.exam) {
			this.fetchData();
		}
	}

	render() {
		const { error, isLoaded, categories } = this.state;
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			return <div className={"col"}>
			<label for="categorySelect">Category</label> 
			<select className={"form-control"} ref={this.props.categoryRef} onChange={this.props.onCategoryChange}>
			{categories.map(c => (<option>{c}</option>))}
			</select>    
			</div>


		}
	}
}

class SelectQuiz extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
				isLoaded: false,
				error: null,
				exams: [],
				exam: null,
				category: null
		};
		this.examRef = React.createRef();
		this.categoryRef = React.createRef();

		this.onExamChange = this.onExamChange.bind(this);
		this.onCategoryChange = this.onCategoryChange.bind(this);
		this.onStart = this.onStart.bind(this);

	}


	componentDidMount() {
		fetch("http://localhost:8080/questions/exams")
		.then(res => res.json())
		.then(
				(result) => {
					this.setState({
						isLoaded: true,
						exams: result,
						exam: result[0]
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
		);

	}


	onExamChange() {
		const select = this.examRef.current;
		this.setState({
			exam: select.value
		});
	}

	onCategoryChange() {
		const select = this.categoryRef.current;
		this.setState({
			category: select.value
		});
	}

	onStart() {
		const exam = this.examRef.current.value;
		const category = this.categoryRef.current.value;
		this.props.start(exam, category);
	}

	render() {
		const { error, isLoaded, exams, exam } = this.state;

		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			return <fieldset>
			<div className={"form-row"}>
			<div className={"col"}>
			<label for="examSelect" >Exam</label> 
			<select className={"form-control"} ref={this.examRef} onChange={this.onExamChange}>
			{exams.map(e => (<option>{e}</option>))}
			</select>
			</div>
			<CategorySelection exam={exam} categoryRef={this.categoryRef} onCategoryChange={this.onCategoryChange} />
			<div className={"col"}>
			<button className={"btn btn-secondary"} onClick={this.onStart}>Start</button>
			</div>
			</div>
			</fieldset>
		}



	}
}


class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
				isLoaded: false,
				error: null,
				exam: null,
				category: null,
				started: false
		};

		this.start = this.start.bind(this);

	}

	start(exam, category) {
		this.setState({
			exam: exam,
			category: category,
			started: true
		});
	}


	render() {
		const { error, isLoaded, started } = this.state;
		if (started)
			return <QuestionPanel />
		else
			return <SelectQuiz start={this.start}/>
	}
}

ReactDOM.render(
		<App />,
		document.getElementById('questionPanel')
);