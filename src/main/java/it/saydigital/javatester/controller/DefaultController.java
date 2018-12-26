package it.saydigital.javatester.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import it.saydigital.javatester.model.Question;
import it.saydigital.javatester.model.QuestionData;
import it.saydigital.javatester.repository.QuestionRepository;

@Controller
public class DefaultController {
	
	@Autowired 
	private QuestionRepository questionRepo;
	
	@GetMapping(value = { "/", "/home", "/index" })
	public String home() {
		return "index";
	}
	
	@GetMapping(value = { "/test" })
	public String testPage(Model model) {
		return "test";
	}

	@GetMapping(value = { "/admin/add" })
	public String addQuestion() {
//		Question newQuestion = new Question();
//		model.addAttribute("question", new Question());
//		model.addAttribute("question", new Question());

		return "add-question";
	}
	
//	@PostMapping(value = { "/admin/save/question" })
//	public String saveQuestion(@RequestParam("question") String question) {
//	public void saveQuestion(@ModelAttribute Question question) {
//		System.out.println(question.getExam());
//		System.out.println(question);
//		Question newQuestion = new Question();
//		QuestionData questionData = new QuestionData();
//		questionData.setQuestion(question);
//		newQuestion.setData(questionData);
//		questionRepo.save(question);
//		return "add-question";
//	}
}
	


