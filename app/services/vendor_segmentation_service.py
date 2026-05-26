from collections import defaultdict

import numpy as np

from sklearn.cluster import KMeans

from sqlalchemy.orm import Session

from app.models.expense import Expense


def get_vendor_segmentation(
    db: Session
):

    expenses = (
        db.query(Expense).all()
    )

    if not expenses:
        return []

    vendor_data = defaultdict(
        lambda: {
            "total_spend": 0,
            "transaction_count": 0
        }
    )

    # Aggregate vendor metrics

    for expense in expenses:

        vendor = (
            expense.vendor
            or "Unknown"
        )

        vendor_data[vendor][
            "total_spend"
        ] += expense.amount

        vendor_data[vendor][
            "transaction_count"
        ] += 1

    vendors = list(
        vendor_data.keys()
    )

    features = []

    for vendor in vendors:

        features.append([
            vendor_data[vendor][
                "total_spend"
            ],

            vendor_data[vendor][
                "transaction_count"
            ]
        ])

    x_train = np.array(features)

    # Prevent clustering issues

    cluster_count = min(
        3,
        len(vendors)
    )

    model = KMeans(
        n_clusters=cluster_count,
        random_state=42,
        n_init=10
    )

    clusters = model.fit_predict(x_train)

    segment_labels = {
        0: "Operational Vendors",
        1: "Strategic Vendors",
        2: "Low Usage Vendors"
    }

    results = []

    for index, vendor in enumerate(vendors):

        results.append({

            "vendor": vendor,

            "total_spend": round(
                vendor_data[vendor][
                    "total_spend"
                ],
                2
            ),

            "transaction_count":
                vendor_data[vendor][
                    "transaction_count"
                ],

            "segment":
                segment_labels.get(
                    int(clusters[index]),
                    "Vendor Segment"
                )
        })

    return results
