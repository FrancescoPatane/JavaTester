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

	class SelectQuiz extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
					isLoaded: false,
					error: null,
					exams: [],
					exam: null,
					categories: [],
					category: null
			};
			this.examRef = React.createRef();
			this.onExamChange = this.onExamChange.bind(this);

		}
		
		
		componentDidMount() {
			fetch("http://localhost:8080/questions/exams")
			.then(res => res.json())
			.then(
					(result) => {
						this.setState({
							exams: result,
							exam: result[0]
						});
						
						
						fetch("http://localhost:8080/questions/categories?exam=" + this.state.exam)
						.then(res2 => res2.json())
						.then(
								(result2) => {
									this.setState({
										isLoaded: true,
										categories: result2,
										category: result2[0]
									});
								},
								(error) => {
									this.setState({
										isLoaded: true,
										error
									});
								}
						);
						
						
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

		render() {
			const { error, isLoaded, exams, categories } = this.state;

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
				<div className={"col"}>
				<label for="categorySelect">Category</label> 
				<select className={"form-control"} id="categorySelect">
				{categories.map(c => (<option>{c}</option>))}
				</select>    
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

			this.setExam = this.setExam.bind(this);
		}

		setExam(exam) {
			this.setState({
				exam: exam
			});
		}

		render() {
			const { error, isLoaded, started } = this.state;
			if (started)
				return <QuestionPanel />
			else
				return <SelectQuiz />
		}
	}

	ReactDOM.render(
	<App />,
	document.getElementById('questionPanel')
	);