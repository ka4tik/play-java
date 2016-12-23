$(document).ready(function () {

    console.log("Dom loaded");

    var isReview = $('.root').data('is-review');
    console.log("isReview: " + isReview);
    console.log("type isReview: " + typeof isReview);

    if (isReview) {
        console.log("got here true");

        $(".question").each(function () {

            var qid = $(this).data('question-id');
            var was_correct = $(this).data('was-correct');
            var user_answer = $(this).data('user-answer');
            var correct_answer = $(this).data('correct-answer');
            console.log("qid: " + qid);
            console.log("user_answer: " + user_answer);
            console.log("correct answer: " + correct_answer);
            if (was_correct) {
                $(this).addClass("light-green");
            } else {
                $(this).addClass("light-red");
            }
            if (user_answer != -1) {
                $('.question-answer[data-question-id="' + qid + '"][data-answer-value="' + user_answer + '"]').addClass('selected-answer bg-info text-white');
            }

        });
    }
    if (!isReview) {
        console.log("got here false");
        $('body').on('click touchstart tap', '.question-answer', function () {

            console.log("Clicked: " + this);
            var qid = $(this).attr('data-question-id');
            var value = $(this).attr('data-answer-value');
            $('input[type="radio"][name="' + qid + '"][value="' + value + '"]').prop('checked', true);
            $('.selected-answer[data-question-id="' + qid + '"]').removeClass('selected-answer bg-info text-white');
            $(this).addClass('selected-answer');
            $(this).addClass('bg-info text-white');


        });
    }


    if (!isReview) {
        $("form").submit(function (e) {

            e.preventDefault();
            e.stopPropagation();
            $("body").addClass("loading");

            var questions = [];

            $(".question").each(function () {

                // Make an object for each question
                // This should have the question ID, the user Answer and the time taken.

                questionObj = {};

                var question_id = $(this).data('question-id');
                var user_answer = $(this).find("input:checked").val();

                if (user_answer == undefined) {
                    var user_answer = "-1";
                }

                questionObj['question_id'] = question_id;
                questionObj['user_answer'] = user_answer;

                // Now we want to put that object within the array of questions

                questions.push(questionObj);

                console.log('Logged a question');

            });
            var question_set_id = $('.root').attr('data-question-set-id');
            console.log("Question set id: " + question_set_id);
            var jsonQuestions = JSON.stringify(questions);
            console.log(jsonQuestions);

            $("#json_form_data").val(jsonQuestions);
            this.submit();

        });
    }

});
