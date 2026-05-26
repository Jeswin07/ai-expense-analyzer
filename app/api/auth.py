from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.db.session import get_db

from app.models.user import User

from app.schemas.user import (
    UserLogin,
    UserRegister,
    TokenResponse
)

from app.core.security import (
    create_access_token,
    hash_password,
    verify_password
)

router = APIRouter(

    prefix="/auth",

    tags=["Authentication"]
)


@router.post("/register")

def register_user(

    user_data: UserRegister,

    db: Session = Depends(get_db)
):

    existing_user = (

        db.query(User)

        .filter(
            User.email ==
            user_data.email
        )

        .first()
    )

    if existing_user:

        raise HTTPException(

            status_code=400,

            detail=
                "Email already registered."
        )

    user = User(

        username=
            user_data.username,

        email=
            user_data.email,

        hashed_password=
            hash_password(
                user_data.password
            )
    )

    db.add(user)

    db.commit()

    db.refresh(user)

    return {

        "message":
            "User registered successfully."
    }


@router.post(

    "/login",

    response_model=TokenResponse
)

def login_user(

    login_data: UserLogin,

    db: Session = Depends(get_db)
):

    user = (

        db.query(User)

        .filter(
            User.email ==
            login_data.email
        )

        .first()
    )

    if not user:

        raise HTTPException(

            status_code=401,

            detail=
                "Invalid credentials."
        )

    valid_password = verify_password(

        login_data.password,

        user.hashed_password
    )

    if not valid_password:

        raise HTTPException(

            status_code=401,

            detail=
                "Invalid credentials."
        )

    access_token = create_access_token({

        "sub": str(user.id)
    })

    return {

        "access_token":
            access_token,

        "token_type":
            "bearer"
    }
