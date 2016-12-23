package models;

import com.avaje.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.*;
import java.util.List;

/**
 * Created by kartik on 24/12/16.
 */

@Entity
public class QuestionSet extends Model{

    @Id
    @GeneratedValue
    public Long id;

    @Constraints.Required
    public String name;

    @ManyToMany
    @Constraints.Required
    public List<Question> questionList;

    public static Finder<Long, QuestionSet> find = new Finder<Long,QuestionSet>(QuestionSet.class);


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Question> getQuestionList() {
        return questionList;
    }

    public void setQuestionList(List<Question> questionList) {
        this.questionList = questionList;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
