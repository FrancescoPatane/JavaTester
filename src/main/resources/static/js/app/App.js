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

class App extends React.Component {
	
	render() {
		return <QuestionPanel />
	}
}

ReactDOM.render(
		<App />,
		document.getElementById('questionPanel')
);