/*
 Let's start by applying the class of 'img-responsive' to all images.
 */

var numberOfQuestionsAttempted = 0;

$(".container img").addClass('img-responsive');

/*
 Let's now make all tables responsive.
 */

$("table").addClass('table table-hover').wrap("<div class='table-responsive'></div>");

/*
 * Javascript Stopwatch class
 * http://www.seph.dk
 *
 * Copyright 2009 Seph soliman
 * Released under the MIT license (do whatever you want - just leave my name on it)
 * http://opensource.org/licenses/MIT
 */

// * Stopwatch class {{{
Stopwatch = function(listener, resolution) {
    this.startTime = 0;
    this.stopTime = 0;
    this.totalElapsed = 0; // * elapsed number of ms in total
    this.started = false;
    this.listener = (listener != undefined ? listener : null); // * function to receive onTick events
    this.tickResolution = (resolution != undefined ? resolution : 500); // * how long between each tick in milliseconds
    this.tickInterval = null;

    // * pretty static vars
    this.onehour = 1000 * 60 * 60;
    this.onemin  = 1000 * 60;
    this.onesec  = 1000;
}
Stopwatch.prototype.start = function() {
    var delegate = function(that, method) { return function() { return method.call(that) } };
    if(!this.started) {
        this.startTime = new Date().getTime();
        this.stopTime = 0;
        this.started = true;
        this.tickInterval = setInterval(delegate(this, this.onTick), this.tickResolution);
    }
}
Stopwatch.prototype.stop = function() {
    if(this.started) {
        this.stopTime = new Date().getTime();
        this.started = false;
        var elapsed = this.stopTime - this.startTime;
        this.totalElapsed += elapsed;
        if(this.tickInterval != null)
            clearInterval(this.tickInterval);
    }
    return this.getElapsed();
}
Stopwatch.prototype.reset = function() {
    this.totalElapsed = 0;
    // * if watch is running, reset it to current time
    this.startTime = new Date().getTime();
    this.stopTime = this.startTime;
}
Stopwatch.prototype.restart = function() {
    this.stop();
    this.reset();
    this.start();
}
Stopwatch.prototype.getElapsed = function() {
    // * if watch is stopped, use that date, else use now
    var elapsed = 0;
    if(this.started)
        elapsed = new Date().getTime() - this.startTime;
    elapsed += this.totalElapsed;

    var hours = parseInt(elapsed / this.onehour);
    elapsed %= this.onehour;
    var mins = parseInt(elapsed / this.onemin);
    elapsed %= this.onemin;
    var secs = parseInt(elapsed / this.onesec);
    var ms = elapsed % this.onesec;

    return {
        hours: hours,
        minutes: mins,
        seconds: secs,
        milliseconds: ms
    };
}
Stopwatch.prototype.setElapsed = function(hours, mins, secs) {
    this.reset();
    this.totalElapsed = 0;
    this.totalElapsed += hours * this.onehour;
    this.totalElapsed += mins  * this.onemin;
    this.totalElapsed += secs  * this.onesec;
    this.totalElapsed = Math.max(this.totalElapsed, 0); // * No negative numbers
}
Stopwatch.prototype.toString = function() {
    var zpad = function(no, digits) {
        no = no.toString();
        while(no.length < digits)
            no = '0' + no;
        return no;
    }
    var e = this.getElapsed();
    //return zpad(e.hours,2) + ":" + zpad(e.minutes,2) + ":" + zpad(e.seconds,2);
    return zpad(e.hours*60 + e.minutes,2) + ":" + zpad(e.seconds,2);
}
Stopwatch.prototype.setListener = function(listener) {
    this.listener = listener;
}
// * triggered every <resolution> ms
Stopwatch.prototype.onTick = function() {
    if(this.listener != null) {
        this.listener(this);
    }
}
// }}}

var allquestions = $(".question");
var totalQuestions = allquestions.size();
var myWatch = [];
var globalWatch = new Stopwatch();

for (i = 1; i <= totalQuestions; i++) {

    //Shove the stopwatches for each question into an array.

    myWatch[i] = new Stopwatch();
    thisquestion = $(".question[data-questionnumber='" + i + "']");

    thisquestion.find(".timer").text(myWatch[i].toString());

}

function updateClock(watch) {
    var number = $(".question.active").data("questionnumber");
    thisquestion.find(".timer").text(myWatch[number].toString());
    $(".globaltimer").text(globalWatch.toString());
}


function showOnlyQuestion(number) {

    //Stop all the stopwatches.

    for (i = 1; i <= totalQuestions; i++) {

        myWatch[i].stop();
    }

    thisquestion = $(".question[data-questionnumber='" + number + "']");
    allquestions.hide();
    allquestions.removeClass("active");
    thisquestion.show();
    thisquestion.addClass("active");
    $('.bottombar-highlight').removeClass('bottombar-highlight');
    $(".bottombar-questions[data-questionnumber='" + number + "']").addClass('bottombar-highlight');

    //Start/resume the appropriate watch and set its listener to update
    //every second.
    myWatch[number].start();
    myWatch[number].setListener(updateClock);
    updateButtons();


}

function initialiseQuestions() {
    firstquestion = $(".question").first().data("questionnumber");
    showOnlyQuestion(firstquestion);
    myWatch[1].start();
    globalWatch.start();
}


function nextQuestion() {

    var activeQuestion = $(".question.active").data("questionnumber");
    var newQuestion = activeQuestion + 1;
    if (newQuestion <= totalQuestions) { showOnlyQuestion(newQuestion); };

}

function previousQuestion() {
    var activeQuestion = $(".question.active").data("questionnumber");
    var newQuestion = activeQuestion - 1;
    if (newQuestion >= 1) { showOnlyQuestion(newQuestion); }
}

function updateButtons() {
    var activeQuestion = $(".question.active").data("questionnumber");
    $(".nextButton").show();
    $(".previousButton").hide();
    $(".fakeSubmitButton").hide();

    if (activeQuestion == totalQuestions) {

        $(".nextButton").hide();

        $(".fakeSubmitButton").show();

    }

    if (activeQuestion == 1) {
        $(".previousButton").hide();
    }
    else {
        $(".previousButton").show();
    }

}

$(window).resize(function() {
    if(34*$('.bottombar-questions').length > $(window).width() - 2*$('.nextButton').width()){
        $('.pagination').width($(window).width() - 2*$('.nextButton').width() - 2*$('.backscroll').width());
    } else {
        $('.forwardscroll').hide();
        $('.backscroll').hide();
    }
});

$(document).ready(function() {

    if(34*$('.bottombar-questions').length > $(window).width() - 2*$('.nextButton').width()){
        $('.pagination').width($(window).width() - 2*$('.nextButton').width() - 2*$('.backscroll').width());
    } else {
        $('.forwardscroll').hide();
        $('.backscroll').hide();
    };

    $('body').on('click touchstart tap','.forwardscroll',function(){
        $('.pagination').animate({
            scrollLeft: '+=150'
        },350);
    });

    $('body').on('click touchstart tap','.backscroll',function(){
        $('.pagination').animate({
            scrollLeft: '-=150'
        },350);
    });

    initialiseQuestions();

    $('.exit-icon').tooltip();

    $('body').on('click touchstart tap', '.question_answer', function(){
        var qname = $(this).attr('data-question-id');
        var value = $(this).attr('data-answer-value');
        $('input[type="radio"][name="'+qname+'"][value="'+value+'"]').prop('checked', true);
        $(this).prop('checked', false);
        $('.selected-answer[data-question-id="'+qname+'"]').removeClass('selected-answer');
        $(this).addClass('selected-answer');

        numberOfQuestionsAttempted++;

    });

    $('body').keydown(function(event) {
        if (event.which == 37) {
            event.preventDefault();
            $(".previousButton").click();
        }
        if (event.which == 39) {
            event.preventDefault();
            $('.nextButton').click();
        }
    });

    $(".nextButton").click(function(e) {
        nextQuestion();
        e.preventDefault();
    });

    $(".previousButton").click(function(e) {
        previousQuestion();
        e.preventDefault();
    });

    $('.btn-submit-completed').click(function(){
        $('.submitButton').click();
    });

    $(".fakeSubmitButton").click(function(e) {

        // Check to see if there are any blank questions

        if (numberOfQuestionsAttempted < $(".question").length)
        {
            // If so, confirm with them.
            swal({
                    title: "Submit Answers",
                    text: "Looks like you've left some questions blank. Our system will not regard those questions as having been attempted, and they will be excluded from your score. Obviously this won't happen in the real BMAT, so make sure you mark an answer for everything you want marked.",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Relax, I know what I'm doing. Just mark my answers please :)",
                    closeOnConfirm: true },
                function(){
                    $('.submitButton').click();
                });
        }
        else
        {
            $('.submitButton').click();
        }

    });

    $(".solutionButton").click(function(e) {
        $(this).parent().parent().find(".solution").slideToggle();
        e.preventDefault();
    });

    var submitted = 0;
    console.log(submitted);
    if (submitted == 0)
    {
        $("#practice_form").on('submit', function(e) {

            var form = this;
            e.preventDefault();
            $("body").addClass("loading");

            var questions = [];

            $(".question").each(function() {

                // Make an object for each question
                // This should have the question ID, the user Answer and the time taken.

                questionObj = {};

                var question_id = $(this).data('questionid');
                var user_answer = $(this).find("input:checked").val();
                var time_taken = $(this).find(".timer").text();

                if (user_answer == undefined) { var user_answer = "0"; }

                questionObj['question_id'] = question_id;
                questionObj['user_answer'] = user_answer;
                questionObj['time_taken']  = time_taken;

                // Now we want to put that object within the array of questions

                questions.push(questionObj);

                console.log('Logged a question');

            });

            //Now we want to send this array of questions to the server.

            //questions.push(token);
            console.log(questions);
            console.log($('input[name=_token]').val());

            var input = $("<input>")
                .attr("type", "hidden")
                .attr("name", "questiondata").val(JSON.stringify(questions));

            $('#practice_form').append($(input));

            submitted = 1;
            console.log(submitted);
            // $("#practice_form").submit();
            //
            form.submit();
            /*
             $.ajax({
             url:'/questionbank/practice/processing',
             data: {
             questions:questions,
             _token: $('input[name=_token]').val()
             },
             type:'POST',
             success:function(data){

             console.log("The server has returned usable data! This is good.")
             console.log(data);

             // Show the containers containing correct answer + solution + stats

             $(".solution-container").slideDown();

             $(".review-row").slideDown();

             $(".timer").hide();
             $(".timer-label").hide();
             $('.normal-row').hide();

             $(".submitButton").remove();

             $('.panel-heading-heading').append(': Review');

             data.forEach(function(question) {

             if (question.was_user_correct == true) {
             backgroundClass = "btn-success";
             }
             else if (question.user_answer == "0") {
             backgroundClass = "btn-default";
             }
             else if (question.was_user_correct == false) {
             backgroundClass = "btn-danger";
             }

             // Colorise the review buttons appropriately.

             $(".review").find('.review-questions[data-questionid='+question.question_id+']').addClass(backgroundClass);

             // Show the time taken for the user to complete the question.

             $(".solution-container").find('.user-time-taken[data-questionid='+question.question_id+']').text(question.time_taken);

             });


             },
             error:function(data) {
             alert('failed');
             console.log(data);
             }
             });


             e.preventDefault();
             */
        });

    }

});