from utils.progress import ProgressManager


class ProgressService:

    def get_progress(self, job_id: str):

        manager = ProgressManager(job_id)

        return manager.read()