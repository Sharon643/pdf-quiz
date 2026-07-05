import json
from pathlib import Path
from json import JSONDecodeError


class ProgressManager:
    def __init__(self, job_id: str):
        self.job_id = job_id

        self.progress_dir = Path("progress/jobs")
        self.progress_dir.mkdir(parents=True, exist_ok=True)

        self.progress_file = self.progress_dir / f"{job_id}.json"

    def update(
        self,
        stage: str,
        percent: int,
        message: str,
        completed: bool = False,
    ):

        data = {
            "jobId": self.job_id,
            "stage": stage,
            "percent": percent,
            "message": message,
            "completed": completed,
        }

        with open(self.progress_file, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4)



    def read(self):

        if not self.progress_file.exists():
            return None

        try:
            with open(self.progress_file, "r", encoding="utf-8") as f:
                return json.load(f)

        except JSONDecodeError:
            # File is currently being written.
            return {
                "jobId": self.job_id,
                "stage": "starting",
                "percent": 0,
                "message": "Initializing...",
                "completed": False,
            }