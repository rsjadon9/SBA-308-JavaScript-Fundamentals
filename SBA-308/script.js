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
    return {};
}

function getLearnerData(course, ag, submissions) {


    // here, we would process this data to achieve the desired result.

    const learner_data = new Map();

    submissions.forEach(s => {

        console.log("Reading learner_id " + s.learner_id + " for assignment_id " + s.assignment_id);

        const assignment_data = get_assignment(s.assignment_id, ag);
        const learner_assignment_percent = s.submission.score / assignment_data.points_possible;

        let learner_assignment = learner_data.get(s.learner_id);
        if (learner_assignment == undefined) {
            learner_assignment = [];
        }

        learner_assignment.push({
            assignment_id: s.assignment_id,
            percent: learner_assignment_percent,
            sd: s.submission,
            ad: assignment_data
        });

        console.log("Total " + learner_assignment.length + " submission so far learner_id=>" + s.learner_id);

        learner_data.set(s.learner_id, learner_assignment);

    });

    console.log(learner_data);

    //store final output here
    const final_output = [];

    //loop for each learner so that I can calculate average for each learner
    learner_data.forEach((values, key) => {
        const output = {
            id: key //key is learner id
        }

        let total_points_possible = 0;
        let total_score = 0;

        //value is all submission for that learner
        values.forEach(r => {

            total_score = total_score + r.sd.score;

            total_points_possible = total_points_possible + r.ad.points_possible;

            output[r.assignment_id] = r.percent;

        });

        //I found total score and total point which will help calculate average
        output.avg = total_score / total_points_possible;

        console.log("learner_id=>" + key + " has avg " + output.avg + " and total_Score " + total_score + " and total_points_possible " + total_points_possible);

        //store record for this learner
        final_output.push(output);

    });

    return final_output;

}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log("************ This is final result***********");

console.log(result);
