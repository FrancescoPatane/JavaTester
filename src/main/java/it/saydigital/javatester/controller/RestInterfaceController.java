package it.saydigital.javatester.controller;

import java.util.List;
import java.util.Map;

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
	
	@GetMapping(value = {"/questions"})
	public List<Question> getAllQuestions () {
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
