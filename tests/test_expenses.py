def test_create_expense(client):
    response = client.post(
        "/expenses/",
        json={
            "title": "Coffee",
            "amount": 5.5,
            "category": "Food"
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert data["title"] == "Coffee"
    assert data["amount"] == 5.5
    assert data["category"] == "Food"


def test_get_expenses(client):
    response = client.get("/expenses/")

    assert response.status_code == 200
    assert isinstance(response.json(), list)