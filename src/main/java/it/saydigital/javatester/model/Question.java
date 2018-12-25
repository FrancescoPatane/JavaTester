package it.saydigital.javatester.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import org.hibernate.annotations.Type;


@Entity
public class Question {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Type(type = "JsonType")
	private QuestionData data;

	@Lob
	private byte[] image;
	
	private String exam;
	private String category;
	private Boolean multipleAnswers;
	
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public QuestionData getData() {
		return data;
	}
	public void setData(QuestionData data) {
		this.data = data;
	}
	public byte[] getImage() {
		return image;
	}
	public void setImage(byte[] image) {
		this.image = image;
	}
	public String getExam() {
		return exam;
	}
	public void setExam(String exam) {
		this.exam = exam;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public Boolean isMultipleAnswers() {
		return multipleAnswers;
	}
	public void setMultipleAnswers(Boolean multipleAnswers) {
		this.multipleAnswers = multipleAnswers;
	}
	
	


}
