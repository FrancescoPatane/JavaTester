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
			<select className={"form-control"} ref={this.examRef} onChange={this.onExamChange}>
			{exams.map(e => (<option>{e}</option>))}
			</select>
			</div>
			<CategorySelection exam={exam} categoryRef={this.categoryRef} onCategoryChange={this.onCategoryChange} />
			<div className={"col"}>
			<button className={"btn btn-dark"} onClick={this.onStart}>Start</button>
			</div>
			</div>
			</fieldset>
		}



	}
}

//export default SelectQuiz;
//module.exports = SelectQuiz;
