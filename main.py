from extractor.extractor import Extractor


def main():

    pdf_path = "data/pdfs/sample.pdf" 

    extractor = Extractor()

    extractor.run(pdf_path)


if __name__ == "__main__":
    main()