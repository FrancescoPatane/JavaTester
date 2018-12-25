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

	var answers = {
			A: $("#A").val(),
			B: $("#B").val(),
			C: $("#C").val(),
			D: $("#D").val(),
			E: $("#E").val(),
			F: $("#F").val(),
			G: $("#G").val(),
			H: $("#H").val()
	};

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