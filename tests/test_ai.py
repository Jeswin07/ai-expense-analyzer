def test_ai_summary_endpoint(client):
    response = client.get("/ai/summary")

    assert response.status_code == 200

    data = response.json()

    assert "ai_summary" in data