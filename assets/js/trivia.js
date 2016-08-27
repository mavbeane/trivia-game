$(document).ready(function() {

    //Global Variables
    var selectedAnswer;
    var countdown;
    var correctAnswers = 0;
    var wrongAnswers = 0;
    var questionNumber = 0;


    // Timing Functions
    function run(){
        counter = setInterval(decrement, 1000);
    };
    function decrement(){
        countdown--;
        console.log(countdown);
        $('#countdown').html(countdown);

        if (countdown == 0) {
            stop();
            timeup()
        };
    }
    function stop(){
        clearInterval(counter);
    }


    // Question Objects
    var questions = [];
    questions[0] = {
        question: 'Earmuffs.',
        choices: ['Old School', 'The Internship', 'Couples Retreat', 'Wedding Crashers'],
        correctAnswer: 'Old School',
        videoLink: 'http://www.youtube.com/embed/f9bt5APRf_w?autoplay=1&start=86&end=93&controls=0&modestbranding=1&showinfo=0&rel=0',
        videoLength: 9000,
    };
    questions[1] = {
        question: "I'm glad he's single 'cause I'm gonna climb that like a tree.",
        choices: ['The Boss', 'Spy', 'St. Vincent', 'Bridesmaids'],
        correctAnswer: 'Bridesmaids',
        videoLink: 'http://www.youtube.com/embed/Z7c6RgddcYE?autoplay=1&start=0&end=4&controls=0&modestbranding=1&showinfo=0&rel=0',
        videoLength: 6000,
    };
    questions[2] = {
        question: "I have nipples, Greg. Could you milk me?",
        choices: ['The Intern', 'Meet the Parents', 'Meet the Fockers', 'Silver Linings Playbook'],
        correctAnswer: 'Meet the Parents',
        videoLink: 'http://www.youtube.com/embed/FXI21S4ZWJU?autoplay=1&start=0&end=13&controls=0&modestbranding=1&showinfo=0&rel=0',
        videoLength: 13500,
    };
    questions[3] = {
        question: "That's what I love about these high school girls man. I get older, they stay the same age.",
        choices: ['Magic Mike', 'Failure to Launch ', 'Mud', 'Dazed and Confused'],
        correctAnswer: 'Dazed and Confused',
        videoLink: 'http://www.youtube.com/embed/bwN7LVQfVgw?autoplay=1&start=30&end=40&controls=0&modestbranding=1&showinfo=0&rel=0',
        videoLength: 12000,
    };


    //GAME PLAY
    play();

    function play() {
        if (questionNumber < questions.length) {

            $('#progress').html((questionNumber + 1) + ' / ' + questions.length);

            $('#question').html(questions[questionNumber].question);

            $.each(questions[questionNumber].choices, function (index, value) {

                console.log(value);
                $('#choices').append('<input type="button" class="choice" value="' + value + '">');

            });

            countdown = 15;
            run();

            $('.choice').click(function () {

                selectedAnswer = $(this).val();

                if (selectedAnswer == questions[questionNumber].correctAnswer) {
                    stop();
                    correct();
                } else if (selectedAnswer != questions[questionNumber].correctAnswer) {
                    stop();
                    wrong();
                };

            });
        } else {
            $('#question').html('<h2>GAME OVER!</h2><br><h2>You got ' + correctAnswers + ' out of ' + questions.length + ' questions correct!</h2>');

        };
    };


    function playVideo() {

        $('#video').html('<iframe width="420" height="315" src="' + questions[questionNumber].videoLink + '"></iframe>');

        //Stop video after done playing quote (based on object's video length)
        setTimeout(play, questions[questionNumber].videoLength);

    }
    
    function correct() {

        correctAnswers++;

        $('#choices').empty();
        $('#question').html('<h2 class="red">Correct! The movie is ' + questions[questionNumber].correctAnswer + '<div id="video"></div>');

        playVideo();

        questionNumber++;

    };
    function wrong() {

        wrongAnswers++;

        $('#choices').empty();
        $('#question').html('<h2>Wrong! The movie is ' + questions[questionNumber].correctAnswer + '</h2><div id="video"></div>');
        playVideo();

        questionNumber++;

    };
    function timeup() {

        console.log('Time is up');
        wrongAnswers++;

        $('#choices').empty();
        $('#question').html('<h2>You ran out of time! The movie is ' + questions[questionNumber].correctAnswer + '<div id="video"></div>');
        playVideo();

        questionNumber++;


    }

});