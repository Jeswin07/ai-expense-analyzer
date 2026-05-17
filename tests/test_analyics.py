def test_analytics_summary(client):
    response = client.get("/analytics/summary")

    assert response.status_code == 200

    data = response.json()

    assert "total_spending" in data
    assert "top_category" in data
    assert "insight" in data
