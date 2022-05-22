class AsyncGame {
    constructor() {
        this.API_BASE = 'https://u-workshops.herokuapp.com',
        this.MY_HEADERS = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }

    /* 
        Note: most of these methods will use the `fetch` API
        It's ok if you don't fully understand it yet! You can think of it as a 'blackbox' for now
    */

    async createUser(name) {
        // POST request to the /new_user endpoint
        try {
            const res = await fetch(this.API_BASE + '/new_user', {
                method: "POST",
                headers: this.MY_HEADERS,
                body: JSON.stringify({name}),
            });
            console.log(name, "was created");
        } catch{
            (err) => console.log(err);
        }
    }

    async addToQABank({ question, answer, ownerId }) {
        // POST request to /new_qa
        try{
            const qa = await fetch(this.API_BASE + '/new_qa', {
                method: 'POST',
                headers: this.MY_HEADERS,
                body: JSON.stringify({ question, answer, ownerId }),
            });
            console.log(qa);
        } catch{
            (err) => console.log(err);
        }
    }

    async getAllQuestions() {
        // GET request to /all_questions
        // Note! More questions will be added as other students progress in this workshop.
        // Ask around to see who's added new questions!
        try{
            const data = await fetch(this.API_BASE + '/all_questions');
            const results = await data.json();
            console.log(results);
        } catch{
            (err) => console.log(err)
        }
    }

    async answerQuestion({ qaId, answer, userId  }) {
        // POST request to /answer_question
        // Note! In the response of this request you'll see whether your answer was correct or not.
        // If you answered incorrectly, try again or bring it up with the user who posted the question!
        try {
            const res = await fetch(this.API_BASE + '/answer_question', {
                method: "POST",
                headers: this.MY_HEADERS,
                body: JSON.stringify({ qaId, answer, userId }),
            });
            const results = await res.json();
            console.log(results);
        } catch{
            (err) => console.log(err);
        }
    }

    async getAnswerSubmissions() {
        // GET request to /answer_submission
        try{
            const data = await fetch(this.API_BASE + '/answer_submission');
            const submissions = await data.json();
            console.log(submissions);
            return submissions;
        } catch{
            (err) => console.log(err)
        }
    }

    async getUsers(){
        // GET request to /the_users
        try{
            const data = await fetch(this.API_BASE + '/the_users');
            const results = await data.json();
            console.log(results);
            return results;
        } catch{
            (err) => console.log(err)
        }
    }

    async calculateUserScores() {
        // +1 points for questions you've answered correctly
        // -1 points for questions you've answered incorrectly

        // This is the most "complicated" method - but you've got this ;)

        // Guidelines for this part (ignore if you want an extra challenge!)
        /*
            - Get the users
            - Get the submissions
            - Create an `scores` object
            - Loop through each user ID
                - Extract the username
                - Filter the correct submissions with matching user ID
                - Filter the incorrect submissions with matching user ID
                - Add a new entry to `scores` with the user's name and their score (correct.length - incorrect.length)

            Example of `score` at the end of this: 
            {
                Kayla: 12,
                Darwin: -1
            }
        */
        try{
            const users = await this.getUsers();
            const submissions = await this.getAnswerSubmissions();
            const scores = {};
            const usersArr = Object.keys(users);

            usersArr.forEach(id => {
                const usersName = users[userId].name;
                const correct = submissions.filter( submission => (id == submission.userId && submission.correct) );
                const incorrect = submissions.filter( submission => (id == submission.userId && !submission.correct) );
                scores[usersName] = correct.length - incorrect.length;
            });
            console.log(scores);
        } catch{
            (err) => console.log(err);
        }
        
    }

}

const game = new AsyncGame()
// Remember the server is unexpected, it might return an error!

// Example of running the game:
//game.createUser("Stav");
//game.addToQABank({question: "What's the name of the nordic god of thunder?", answer: "Thor", ownerId: 2});

//game.getAllQuestions();
//game.answerQuestion({qaId: 3, answer: "Maccabi Haifa", userId: 2});

//game.getUsers(); // <-- how can you output the results from here *without* console.log in the method?
//game.getAnswerSubmissions();
game.calculateUserScores();