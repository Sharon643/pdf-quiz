import json
from json import JSONDecodeError
from pathlib import Path


class ProgressManager:
    def __init__(self, job_id: str):
        self.job_id = job_id

        self.progress_dir = Path("progress/jobs")
        self.progress_dir.mkdir(
            parents=True,
            exist_ok=True,
        )

        self.progress_file = (
            self.progress_dir / f"{job_id}.json"
        )

    def update(self, **kwargs):
        """
        Update the progress file.

        Any keyword arguments passed to this method
        are written to the progress JSON.
        """

        data = self.read() or {
            "jobId": self.job_id,
            "stage": "starting",
            "percent": 0,
            "message": "Initializing...",
            "completed": False,
        }

        data.update(kwargs)

        data["jobId"] = self.job_id

        with open(
            self.progress_file,
            "w",
            encoding="utf-8",
        ) as f:
            json.dump(
                data,
                f,
                indent=4,
            )

    def read(self):

        if not self.progress_file.exists():
            return None

        try:
            with open(
                self.progress_file,
                "r",
                encoding="utf-8",
            ) as f:
                return json.load(f)

        except JSONDecodeError:
            return {
                "jobId": self.job_id,
                "stage": "starting",
                "percent": 0,
                "message": "Initializing...",
                "completed": False,
            }