function Answer(props) {
	var keys = Object.keys(props.map);
	return <ul>
	{keys.map(key => (
			<li>
			<input type='checkbox' className={'form-check-input'} id={key} />
			<label className={'form-check-label'} for={key}>{props.map[key]}</label>
			</li>
	))}
	</ul>;
}


class QuestionPanel extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
				isLoaded: false,
				error: null,
				questions: [],
				currentQuestion: null,
				index: 0
		};
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
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

	render() {
		const { error, isLoaded, questions, currentQuestion } = this.state;
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			return (
					<fieldset>
					<div className={"form-group"}>
					<textarea className={"form-control"} rows="10" value={currentQuestion.data.question} readonly></textarea>
					</div>
					<div className={"form-group"}>
					<Answer map={currentQuestion.data.answers} />
					</div>
					<hr />
					<div className={"form-group"}>
					<button className={"btn btn-secondary"} onClick={this.previous}>Previous</button>
					<button className={"btn btn-secondary float-right"} onClick={this.next}>Next</button>
					</div>
					</fieldset>
			);
		}
	}
}

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