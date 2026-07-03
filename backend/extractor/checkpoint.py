import os


class Checkpoint:

    @staticmethod
    def completed(chunk_file, output_dir):

        filename = os.path.basename(chunk_file)
        filename = filename.replace(".pdf", ".json")

        return os.path.exists(
            os.path.join(output_dir, filename)
        )