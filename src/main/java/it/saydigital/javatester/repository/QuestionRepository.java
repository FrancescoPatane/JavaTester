package it.saydigital.javatester.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import it.saydigital.javatester.model.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {


}