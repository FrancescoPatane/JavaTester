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