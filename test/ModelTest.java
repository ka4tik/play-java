import models.Question;
import models.QuestionSet;
import org.junit.Test;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

import static play.test.Helpers.fakeApplication;
import static play.test.Helpers.running;

public class ModelTest {

    @Test
    public void loadGateCsSet1() {
        running(fakeApplication(), () -> {
            loadFile("questionsets/gate-cs-set-1");
        });
    }
    @Test
    public void loadDsQuiz()   {
        running(fakeApplication(), () -> {
           loadFile("questionsets/datastructure");
        });
    }

    private void loadFile(String fileName) {
        ClassLoader classLoader = getClass().getClassLoader();
        File file = new File(classLoader.getResource(fileName).getFile());
        try {
            Scanner scanner = new Scanner(file);
            QuestionSet questionSet = new QuestionSet();
            questionSet.name = scanner.nextLine();
            List<Question> questionList = new ArrayList<Question>();
            while(scanner.hasNextLine()) {
                Question question = new Question();
                question.statement = scanner.nextLine();
                question.options = new ArrayList<String>();
                for(int i=0;i<4;i++)
                    question.options.add(scanner.nextLine());
                question.correctOptionIndex = Integer.parseInt(scanner.nextLine());
                question.answerExplanation = scanner.nextLine();
                questionList.add(question);
                question.save();
                if(scanner.hasNextLine())
                    scanner.nextLine();
            }
            questionSet.setQuestionList(questionList);
            questionSet.save();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }
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