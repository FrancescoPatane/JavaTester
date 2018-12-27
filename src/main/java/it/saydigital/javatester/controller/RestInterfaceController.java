package it.saydigital.javatester.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import it.saydigital.javatester.model.Question;
import it.saydigital.javatester.model.QuestionData;
import it.saydigital.javatester.repository.QuestionRepository;

@RestController
public class RestInterfaceController {

	@Autowired 
	private QuestionRepository questionRepo;

	@GetMapping(value = {"/questions/exams"})
	public  List<String> getExams () {
		return questionRepo.findExams();
	}
	
	@GetMapping(value = {"/questions/categories"})
	public  List<String> getCategoriesByExam (@RequestParam("exam") String exam) {
		return questionRepo.findCategoriesByExAM(exam);
	}

	@GetMapping(value = {"/questions"})
	public List<Question> getAllQuestions (@RequestParam("exam") Optional<String> exam, @RequestParam("category") Optional<String> category) {
		if (exam.isPresent() && category.isPresent())
			return questionRepo.findByExamAndCategory(exam.get(), category.get());
		else
			return questionRepo.findAll();

	}

	@GetMapping(value = {"/questions/{id}"})
	public QuestionData getQuestion (@PathVariable Long id) {
		return questionRepo.findById(id).get().getData();
	}

	@PostMapping(value = { "/admin/questions" })
	public void saveQuestion(@RequestBody Question newQuestion) {
		questionRepo.save(newQuestion);
	}


}
