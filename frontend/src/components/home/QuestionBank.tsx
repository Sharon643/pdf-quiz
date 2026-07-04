import Card from "../ui/Card";

type Props = {

    questionCount: number;

    subjects: number;

};

function QuestionBank({

    questionCount,

    subjects,

}: Props) {

    return (

        <Card>

            <h2 className="text-2xl font-semibold">

                Question Bank

            </h2>

            <div className="mt-4 space-y-2">

                <p>

                    Questions: <strong>{questionCount}</strong>

                </p>

                <p>

                    Subjects: <strong>{subjects}</strong>

                </p>

            </div>

        </Card>

    );

}

export default QuestionBank;