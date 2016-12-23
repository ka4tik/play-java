package controllers.pojo;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public  class QuestionAnswer {
    public long questionId;
    public long userAnswer;
    @JsonCreator
    public QuestionAnswer(
            @JsonProperty("question_id")  long questionId,
            @JsonProperty("user_answer") long userAnswer  ) {

        this.questionId = questionId;
        this.userAnswer = userAnswer;
    }

}