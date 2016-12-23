package controllers;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import controllers.pojo.QuestionAnswer;
import controllers.pojo.Review;
import models.Question;
import models.QuestionSet;
import play.Logger;
import play.mvc.Controller;
import play.mvc.Result;
import views.html.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class QuestionSetController extends Controller {

    private ObjectMapper mapper = new ObjectMapper();

    public Result index() {
        List<QuestionSet> questionSets = QuestionSet.find.all();
        return ok(QuestionSetsAll.render("Question Set", questionSets));
    }

    public Result questionSet(Long id) {
        QuestionSet questionSet = QuestionSet.find.byId(id);
        return ok(QuestionSetDisplay.render("Question Set" + id, questionSet));

    }

    public Result questionSetFlow() {
        return ok(QuestionSetFlow.render());

    }

    public Result questionSetReview(Long id) throws IOException {
        QuestionSet questionSet = QuestionSet.find.byId(id);
        Map<String, String[]> map = request().body().asFormUrlEncoded();
        String json = map.get("json_form_data")[0];
        Logger.debug("Json received: " + json);
        List<QuestionAnswer> questionAnswers = mapper.readValue(json, new TypeReference<List<QuestionAnswer>>() { });

        List<Review> reviews = new ArrayList<>();
        for(QuestionAnswer questionAnswer: questionAnswers) {
            Question question = questionSet.getQuestionList().
                    stream().filter(q -> q.getId().equals(questionAnswer.questionId))
                    .collect(Collectors.toList()).get(0);

            Review review = new Review();
                review.wasCorrect = question.correctOptionIndex == questionAnswer.userAnswer;
            review.userAnswer = questionAnswer.userAnswer;
            review.question = question;

            reviews.add(review);
        }
        String responseJson = mapper.writeValueAsString(reviews);
        Logger.info("Review: " +  responseJson);

        return ok(QuestionSetReview.render("Question Set Review" + id, questionSet, reviews));
    }




}
