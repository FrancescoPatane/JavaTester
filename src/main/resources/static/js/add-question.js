$(document).ready(function () {

	$("#newQstForm").submit(function (event) {

		//stop submit the form, we will post it manually.
		event.preventDefault();

		fire_ajax_submit();

	});

});

function fire_ajax_submit() {

	var token = $("input[name='_csrf']").val();
	var header = "X-CSRF-TOKEN";

	var newQuestion = setNewQuestion();

	$.ajax({
		type: "POST",
		beforeSend: function(request) {
			request.setRequestHeader(header, token);
		},
		contentType: "application/json",
		url: "/admin/questions",
		data: JSON.stringify(newQuestion),
		dataType: 'json',
		cache: false,
		timeout: 600000,
		success: function (data) {


		},
		error: function (e) {
		}
	});

}


function setNewQuestion(){
	var exam = $("#exam").val();
	var category = $("#category").val();
	var multipleAnswers = $("#multipleAnswers").is(':checked');
	var questionText = $("#question").val();
	var explanation = $("#explanation").val();

	var answers = {};

	
	if ($("#A").val())
		answers['A'] = $("#A").val();
	
	if ($("#B").val())
		answers['B'] = $("#B").val();
	
	if ($("#C").val())
		answers['C'] = $("#C").val();
	
	if ($("#D").val())
		answers['D'] = $("#D").val();
	
	if ($("#E").val())
		answers['E'] = $("#E").val();
	
	if ($("#F").val())
		answers['F'] = $("#F").val();
	
	if ($("#G").val())
		answers['G'] = $("#G").val();
	
	if ($("#H").val())
		answers['H'] = $("#H").val();
	

	var validAnswersInput = $("#validAnswers input:checked");
	var validAnswers = [];
	validAnswersInput.each(counter => {
		validAnswers.push(validAnswersInput[counter].value);
	})

	var newQuestion = {
		exam:exam,
		category:category,
		multipleAnswers:multipleAnswers,
		data : {
				question:questionText,
				explanation:explanation,
				answers:answers,
				correctAnswers:validAnswers
		}
	}

	return newQuestion;
}