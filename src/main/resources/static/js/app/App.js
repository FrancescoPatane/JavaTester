function Answer(props) {
//	var html="<ul>";
	var keys = Object.keys(props.map);
//	for (var i = 0; i<keys.length; i++){



//	html += "<li><input type='checkbox' className={'form-check-input'} id=" + keys[i] + "/>";
//	html += "<label className={'form-check-label'} for=" + keys[i] + ">" + props.map.valueOf(keys[i]) + "</label></li>";
//	}
//	html +="</ul>";
	return <ul>
				{keys.map(key => (
						<li>
						<input type='checkbox' className={'form-check-input'} id={key} />
						<label className={'form-check-label'} for={key}>{props.map[key]}</label>
						</li>
				))}
			</ul>;
//	return  <hr/>;
	//keys.map(key => (<hr/>));
}

//<input type='checkbox' className={'form-check-input'} id={key}/>
//<label className={'form-check-label'} for={key}>{props.map[key]}</label> 

class QuestionPanel extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
				isLoaded: false,
				error: null,
				questions: [],
				currentQuestion: null

		};
	}


	componentDidMount() {
		fetch("http://localhost:8080/questions")
		.then(res => res.json())
		.then(
				(result) => {
					this.setState({
						isLoaded: true,
						questions: result,
						currentQuestion: result[0]
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
		)
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
					<textarea className={"form-control"} rows="10" readonly>{currentQuestion.data.question}</textarea>
					</div>
					<div className={"form-group"}>
					{/*<Answer map={currentQuestion.data.answers}/>*/}
					<Answer map={currentQuestion.data.answers} />
					</div>
					</fieldset>
//					{Object.keys(currentQuestion.data.answers).map(function(object, i){
//					return <ObjectRow obj={object} key={i} />;
//					})}


//					<fieldset>

//					<div class="form-group">
//					<textarea class="form-control" id="questio" rows="10"></textarea>
//					</div>

//					<div class="form-group">

//					<ul>
//					<li><input type="checkbox" class="form-check-input" id="A">
//					<label class="form-check-label" for="B">Opzione A bla bla bla</label></li>
//					<li><input type="checkbox" class="form-check-input" id="A"> 
//					<label class="form-check-label" for="B">Opzione B bla bla bla</label></li>
//					</ul>

//					</div>

//					</fieldset>	
			);
		}
	}
}

ReactDOM.render(
		<QuestionPanel />,
		document.getElementById('questionPanel')
);