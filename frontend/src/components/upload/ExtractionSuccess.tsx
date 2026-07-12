import { CheckCircle2 } from "lucide-react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

interface Props {
    fileName: string;
}

export default function ExtractionSuccess({
    fileName,
}: Props) {

    const navigate = useNavigate();

    return (

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">

            <CheckCircle2
                size={60}
                className="mx-auto text-emerald-400"
            />

            <h2 className="mt-6 text-2xl font-semibold text-white">

                Extraction Complete

            </h2>

            <p className="mt-4 text-zinc-400">

                {fileName}

            </p>

            <div className="mt-8 flex justify-center gap-4">

                <Button
                    onClick={() =>
                        navigate("/question-bank")
                    }
                >
                    View Question Bank
                </Button>

                <Button
                    variant="secondary"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    Dashboard
                </Button>

            </div>

        </section>

    );

}