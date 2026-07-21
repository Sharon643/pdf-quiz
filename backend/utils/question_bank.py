from datetime import datetime

from sqlalchemy import select, update
from sqlalchemy.orm import Session

from database.database import SessionLocal
from database.models import QuestionBank


class QuestionBankManager:

    def __init__(
        self,
        db: Session | None = None,
    ):
        self.external_db = db
        self.db = db or SessionLocal()

    def close(self):
        if not self.external_db:
            self.db.close()

    # ==================================================
    # Serialize
    # ==================================================

    def _serialize_bank(
        self,
        bank: QuestionBank,
    ) -> dict:

        return {
            "id": bank.id,

            "fileName":
                bank.file_name,

            "questionCount":
                bank.question_count,

            "uploadedAt": (
                bank.uploaded_at.isoformat()
                if bank.uploaded_at
                else None
            ),

            "lastModified": (
                bank.uploaded_at.isoformat()
                if bank.uploaded_at
                else None
            ),

            "active":
                bank.active,
        }

    # ==================================================
    # Create Question Bank
    # ==================================================

    def create_bank(
        self,
        file_name: str,
        question_count: int,
        user_id: str,
    ) -> dict:

        try:

            # Only deactivate THIS USER'S banks.

            self.db.execute(
                update(QuestionBank)
                .where(
                    QuestionBank.user_id
                    == user_id
                )
                .values(
                    active=False
                )
            )

            bank = QuestionBank(
                user_id=user_id,

                file_name=file_name,

                question_count=
                    question_count,

                active=True,

                uploaded_at=
                    datetime.utcnow(),
            )

            self.db.add(
                bank
            )

            self.db.commit()

            self.db.refresh(
                bank
            )

            return (
                self._serialize_bank(
                    bank
                )
            )

        except Exception:

            self.db.rollback()

            raise

    # ==================================================
    # Update Modified
    # ==================================================

    def update_modified(
        self,
        bank_id: str,
        user_id: str,
    ) -> bool:

        bank = self.db.scalar(
            select(QuestionBank)
            .where(
                QuestionBank.id
                == bank_id,

                QuestionBank.user_id
                == user_id,
            )
        )

        return (
            bank is not None
        )

    # ==================================================
    # Get All Banks
    # ==================================================

    def get_all_banks(
        self,
        user_id: str,
    ) -> list[dict]:

        statement = (
            select(QuestionBank)
            .where(
                QuestionBank.user_id
                == user_id
            )
            .order_by(
                QuestionBank
                .uploaded_at
                .desc()
            )
        )

        banks = self.db.scalars(
            statement
        ).all()

        return [
            self._serialize_bank(
                bank
            )
            for bank in banks
        ]

    # ==================================================
    # Get Active Bank
    # ==================================================

    def get_active_bank(
        self,
        user_id: str,
    ):

        statement = (
            select(QuestionBank)
            .where(
                QuestionBank.user_id
                == user_id,

                QuestionBank.active
                .is_(True),
            )
            .limit(1)
        )

        bank = self.db.scalar(
            statement
        )

        if not bank:
            return None

        return (
            self._serialize_bank(
                bank
            )
        )

    # ==================================================
    # Set Active Bank
    # ==================================================

    def set_active_bank(
        self,
        bank_id: str,
        user_id: str,
    ) -> bool:

        try:

            # Important:
            # Find the bank using BOTH
            # bank ID and authenticated user.

            bank = self.db.scalar(
                select(QuestionBank)
                .where(
                    QuestionBank.id
                    == bank_id,

                    QuestionBank.user_id
                    == user_id,
                )
            )

            if not bank:
                return False

            # Only deactivate banks belonging
            # to this user.

            self.db.execute(
                update(QuestionBank)
                .where(
                    QuestionBank.user_id
                    == user_id
                )
                .values(
                    active=False
                )
            )

            bank.active = True

            self.db.commit()

            return True

        except Exception:

            self.db.rollback()

            raise

    # ==================================================
    # Delete Bank
    # ==================================================

    def delete_bank(
        self,
        bank_id: str,
        user_id: str,
    ) -> bool:

        try:

            bank = self.db.scalar(
                select(QuestionBank)
                .where(
                    QuestionBank.id
                    == bank_id,

                    QuestionBank.user_id
                    == user_id,
                )
            )

            if not bank:
                return False

            was_active = (
                bank.active
            )

            self.db.delete(
                bank
            )

            self.db.flush()

            # If active bank was deleted,
            # activate this user's newest
            # remaining bank.

            if was_active:

                statement = (
                    select(QuestionBank)
                    .where(
                        QuestionBank.user_id
                        == user_id
                    )
                    .order_by(
                        QuestionBank
                        .uploaded_at
                        .desc()
                    )
                    .limit(1)
                )

                next_bank = (
                    self.db.scalar(
                        statement
                    )
                )

                if next_bank:

                    next_bank.active = (
                        True
                    )

            self.db.commit()

            return True

        except Exception:

            self.db.rollback()

            raise

    # ==================================================
    # Get One Bank
    # ==================================================

    def get_bank(
        self,
        bank_id: str,
        user_id: str,
    ):

        bank = self.db.scalar(
            select(QuestionBank)
            .where(
                QuestionBank.id
                == bank_id,

                QuestionBank.user_id
                == user_id,
            )
        )

        if not bank:
            return None

        return (
            self._serialize_bank(
                bank
            )
        )