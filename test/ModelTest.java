import models.Question;
import models.QuestionSet;
import org.junit.Test;

import java.util.Arrays;

import static play.test.Helpers.fakeApplication;
import static play.test.Helpers.running;

public class ModelTest {
    @Test
    public void save() {
        running(fakeApplication(), () -> {
            Question question1 = new Question();
            question1.statement = "Question 1";
            question1.correctOptionIndex = 1;
            question1.options = Arrays.asList("Option 1", "Option 2", "Option 3", "Option 4");


            Question question2 = new Question();
            question2.statement = "Question 2";
            question2.correctOptionIndex = 2;
            question2.options = Arrays.asList("Option 1", "Option 2", "Option 3", "Option 4");

            QuestionSet questionSet = new QuestionSet();
            questionSet.name = "Question Set 1";
            questionSet.setQuestionList(Arrays.asList(question1, question2));
            question1.save();
            question2.save();
            questionSet.save();
        });
    }
}