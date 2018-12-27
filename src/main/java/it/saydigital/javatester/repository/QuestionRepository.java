package it.saydigital.javatester.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import it.saydigital.javatester.model.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {

	List<Question> findByExamAndCategory(String exam, String category);
	
	
	@Query( value="SELECT DISTINCT q.exam FROM question q", nativeQuery = true) 
	 List<String> findExams ();
	
	@Query( value="SELECT DISTINCT q.category FROM question q WHERE q.exam = ?1", nativeQuery = true) 
	 List<String> findCategoriesByExAM (String exam);

}