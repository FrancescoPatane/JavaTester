package it.saydigital.javatester.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import it.saydigital.javatester.model.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {

	List<Question> findByExamAndCategory(String exam, String category);

}