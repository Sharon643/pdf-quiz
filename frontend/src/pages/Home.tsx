import { useEffect, useState } from "react";

import Hero from "../components/home/Hero";
import QuestionBank from "../components/home/QuestionBank";
import ModeSelector from "../components/home/ModeSelector";
import UploadCard from "../components/home/UploadCard";

import { getQuestionBank } from "../services/questionBank";

function Home() {
    const [questionCount, setQuestionCount] = useState(0);
    const [subjects, setSubjects] = useState(0);

    useEffect(() => {
        async function loadQuestionBank() {
            try {
                const data = await getQuestionBank();

                setQuestionCount(data.questionCount);
                setSubjects(data.subjects);
            } catch (error) {
                console.error("Failed to load question bank:", error);
            }
        }

        loadQuestionBank();
    }, []);

    return (
        <main className="mx-auto max-w-4xl p-8">
            <Hero />
            
            <UploadCard />

            <QuestionBank
                questionCount={questionCount}
                subjects={subjects}
            />

            <ModeSelector />
        </main>
    );
}

export default Home;