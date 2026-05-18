def test_extract_expense(client):
    response = client.post(
        "/nlp/extract-expense",
        json={
            "text":
            "Spent 200 rupees on pizza today"
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert "title" in data
    assert "amount" in data
    assert "category" in data