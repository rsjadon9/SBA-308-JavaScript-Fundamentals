// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};

// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];

function get_assignment(assignment_id, ag) {
    for (let i = 0; i < ag.assignments.length; i++) {
        let current_assignment = ag.assignments[i];
        if (current_assignment.id === assignment_id) {
            return current_assignment;
        }
    }
}

function getLearnerData(course, ag, submissions) {
    try {

        if (course.id != ag.course_id) {
            throw "Course Id do not match";
        }

        // here, we would process this data to achieve the desired result.

        const learner_data = new Map();

        const todayTime = new Date();

        for (let i = 0; i < submissions.length; i++) {
            const s = submissions[i];

            console.log("Reading learner_id " + s.learner_id + " for assignment_id " + s.assignment_id);

            const assignment_data = get_assignment(s.assignment_id, ag);
            if (assignment_data == undefined) {
                throw "Assignment Id not found. learner_id " + s.learner_id + " for assignment_id " + s.assignment_id;
            } else if (assignment_data.points_possible == 0) {
                throw "points_possible is zero.Cannot divide by zero. learner_id " + s.learner_id + " for assignment_id " + s.assignment_id;
            } else {

                const dueDate = Date.parse(assignment_data.due_at);
                if (dueDate > todayTime) {
                    console.log("Skipping because dueDate is in future. learner_id " + s.learner_id + " for assignment_id " + s.assignment_id);
                    continue;
                }
                let pointsToDeduct = 0;
                if (s.submission.submitted_at > assignment_data.due_at) {
                    console.log("Submission is late. learner_id " + s.learner_id + " for assignment_id " + s.assignment_id);
                    pointsToDeduct = .1 * parseInt(assignment_data.points_possible);
                    console.log("Late submission deduction " + pointsToDeduct + ". learner_id " + s.learner_id + " for assignment_id " + s.assignment_id);
                }
                const scoreWithDeduction = parseInt(s.submission.score) - pointsToDeduct;
                const learner_assignment_percent = scoreWithDeduction / parseInt(assignment_data.points_possible);

                const learner_submission_data = {
                    assignment_id: s.assignment_id,
                    percent: learner_assignment_percent,
                    scoreWithDeduction: scoreWithDeduction,
                    ad: assignment_data
                };

                let learner_assignment = learner_data.get(s.learner_id);
                if (learner_assignment == undefined) {
                    learner_assignment = [];
                }

                learner_assignment.push(learner_submission_data);

                console.log("Total " + learner_assignment.length + " submission so far learner_id=>" + s.learner_id);

                learner_data.set(s.learner_id, learner_assignment);

            }
        }

        //store final output here
        const final_output = [];

        learner_data.forEach((values, leaner_id) => {
            const output = {
                id: leaner_id
            }
            let totalScore = 0;
            let totalPointPossible = 0;
            for (let i = 0; i < values.length; i++) {
                const currentLearnerObj = values[i];
                const learnerScore = currentLearnerObj.scoreWithDeduction;
                const pointPossible = currentLearnerObj.ad.points_possible;

                totalScore = totalScore + learnerScore;
                totalPointPossible = totalPointPossible + pointPossible;

                output[currentLearnerObj.assignment_id] = currentLearnerObj.percent;
            }
            console.log('key=>' + leaner_id);
            console.log('totalScore=>' + totalScore + " totalPointPossible=>" + totalPointPossible);
            const avg = totalScore / totalPointPossible;

            //I found total score and total point which will help calculate average
            output.avg = avg;

            console.log(avg);
            final_output.push(output);

        });

        return final_output;

    } catch (error) {
        console.log("Cannot produce result due to errors !");
        console.log(error);
    }
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log("************ This is final result***********");

console.log(result);
