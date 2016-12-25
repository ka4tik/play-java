package models;


/**
 * Created by kartik on 24/12/16.
 */
import com.avaje.ebean.Model;
import com.avaje.ebean.annotation.DbJson;
import play.data.validation.Constraints;

import javax.persistence.*;
import java.util.List;

@Entity
public class Question extends Model {

    @Id
    @GeneratedValue
    public Long id;

    @Constraints.Required
    @Column(columnDefinition = "TEXT")
    public String statement;

    @DbJson
    @Constraints.Required
    public List<String> options;

    @Constraints.Required
    public int correctOptionIndex;

    @Column(columnDefinition = "TEXT")
    public String answerExplanation;

    public static Finder<Long, Question> find = new Finder<Long,Question>(Question.class);

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatement() {
        return statement;
    }

    public void setStatement(String statement) {
        this.statement = statement;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public int getCorrectOptionIndex() {
        return correctOptionIndex;
    }

    public void setCorrectOptionIndex(int correctOptionIndex) {
        this.correctOptionIndex = correctOptionIndex;
    }

    public String getAnswerExplanation() {
        return answerExplanation;
    }

    public void setAnswerExplanation(String answerExplanation) {
        this.answerExplanation = answerExplanation;
    }
}
