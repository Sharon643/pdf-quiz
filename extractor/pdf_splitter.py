import fitz
import os


class PDFSplitter:

    def __init__(self, chunk_size=10):
        self.chunk_size = chunk_size

    def split(self, pdf_path, output_dir):

        os.makedirs(output_dir, exist_ok=True)

        doc = fitz.open(pdf_path)

        chunk_files = []

        for start in range(0, len(doc), self.chunk_size):

            end = min(start + self.chunk_size, len(doc))

            new_doc = fitz.open()

            new_doc.insert_pdf(
                doc,
                from_page=start,
                to_page=end - 1
            )

            filename = os.path.join(
                output_dir,
                f"chunk_{start+1}_{end}.pdf"
            )

            new_doc.save(filename)
            new_doc.close()

            chunk_files.append(filename)

        doc.close()

        return chunk_files