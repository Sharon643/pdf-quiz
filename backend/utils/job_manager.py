import json
from pathlib import Path

JOB_DIR = Path("data/jobs")
JOB_DIR.mkdir(parents=True, exist_ok=True)


class JobManager:

    def __init__(self, job_id: str):

        self.file = JOB_DIR / f"{job_id}.json"

    def create(self):

        with open(self.file, "w") as f:

            json.dump(
                {
                    "status": "processing"
                },
                f,
                indent=4,
            )

    def complete(
        self,
        question_count: int,
    ):

        with open(self.file, "w") as f:

            json.dump(
                {
                    "status": "completed",
                    "questionCount": question_count,
                },
                f,
                indent=4,
            )

    def read(self):

        if not self.file.exists():

            return None

        with open(self.file) as f:

            return json.load(f)