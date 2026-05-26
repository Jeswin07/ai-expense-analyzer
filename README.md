# FinFlow AI — AI-Powered Business Intelligence & Operational Analytics Platform

## Overview
FinFlow AI is a full-stack AI-powered Business Intelligence and Operational Analytics platform designed to help organizations analyze operational expenses, monitor financial health, detect anomalies, forecast future spending, and generate AI-driven business insights.

The platform combines:
* Enterprise expense management
* AI-powered financial intelligence
* Predictive analytics & forecasting
* Operational KPI analysis
* Natural language expense extraction
* Business Intelligence dashboards
* Cloud-native deployment workflows
* CI/CD automation pipelines

FinFlow AI was built to simulate production-style software engineering and enterprise analytics workflows using modern full-stack architecture, AI integration, DevOps automation, and scalable backend design.

## Key Features

### Enterprise Expense Management
* Create, update, and delete operational expenses
* Department-wise expense tracking
* Vendor-level operational analysis
* GST and invoice management
* Payment method tracking
* Category-based operational spending analysis
* Search and filtering capabilities

### AI-Powered Natural Language Expense Extraction
Users can describe expenses naturally. 
**Examples:**
> "Spent ₹18,500 on AWS cloud hosting"
> "Paid ₹3,200 for office internet"
> "Marketing campaign cost ₹45,000"
> "Uber ride for ₹450 yesterday"

**The AI system automatically extracts:**
* Expense title
* Amount
* Expense category
* Expense date

*Powered by: Groq API, Llama 3.3 70B*

### Business Intelligence & Analytics
**Operational KPIs**
* Total operational spending
* Financial health score
* Average daily operational expenditure
* Top spending category
* Department-level analytics
* Vendor spending intelligence
* Monthly burn-rate analysis
* Budget utilization tracking

### Predictive Analytics & Forecasting
The platform includes AI-powered operational forecasting:
* Historical operational trend analysis
* Future expense forecasting
* Confidence interval visualization
* Monthly projection analytics
* Operational trend prediction

**Forecasting dashboards include:**
* Historical vs forecast visualization
* Upper/lower confidence bounds
* Enterprise-style BI charts

### AI Financial Intelligence
AI-generated business insights include:
* Spending behavior analysis
* Budget risk analysis
* Operational anomaly detection
* Financial discipline evaluation
* Vendor spending intelligence
* Recurring operational expense detection
* AI-generated optimization suggestions

### Operational Anomaly Detection
The platform automatically identifies:
* Unusual spending spikes
* Operational outliers
* Budget anomalies
* High-risk transactions
* Suspicious operational patterns

### Vendor Intelligence & Segmentation
Vendor analytics engine provides:
* Vendor segmentation analysis
* Vendor spend distribution
* High-value vendor identification
* Operational procurement insights

### CSV Data Ingestion Pipeline
Supports enterprise-scale operational data ingestion:
* Bulk CSV upload
* Automated operational data processing
* Structured expense ingestion
* Large-scale analytics processing
* User-specific data ownership

### Authentication & Security
* JWT-based authentication
* Protected API routes
* User-specific analytics
* Secure token-based authorization
* Environment-based secret management

## Tech Stack
* **Frontend:** React, Vite, Tailwind CSS, Axios, Recharts, React Router DOM
* **Backend:** FastAPI, SQLAlchemy, Pydantic, PostgreSQL, JWT Authentication
* **AI & Machine Learning:** Groq API, Llama 3.3 70B, Scikit-learn, Time-series forecasting, Operational anomaly detection, Predictive analytics pipelines
* **DevOps & Cloud Infrastructure:** Docker, GitHub Actions, AWS EC2, Nginx, Linux (Ubuntu), CI/CD Automation
* **Testing & Code Quality:** pytest, pylint, GitHub Actions CI pipeline

## System Architecture

```text
React Frontend
        ↓
Protected API Layer
        ↓
FastAPI Backend
        ↓
Business Intelligence Engine
        ↓
PostgreSQL Database
        ↓
AI/ML Analytics Services
        ↓
Groq LLM API
```

## CI/CD Pipeline
The platform implements automated Continuous Integration and Continuous Deployment workflows using GitHub Actions.

**Continuous Integration:**
```text
Git Push
   ↓
GitHub Actions
   ↓
Install Dependencies
   ↓
Run pytest
   ↓
Run pylint
   ↓
Validate Build
```

**Continuous Deployment:**
```text
Git Push
   ↓
GitHub Actions
   ↓
SSH into AWS EC2
   ↓
Pull Latest Code
   ↓
Rebuild Docker Containers
   ↓
Restart FastAPI Services
```

## Project Structure
```text
ai-expense-analyzer/
│
├── app/
│   ├── api/
│   ├── core/
│   ├── db/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   └── utils/
│
├── tests/
├── finflow/
├── .github/workflows/
├── Dockerfile
├── pyproject.toml
├── main.py
└── README.md
```

## Local Development Setup

### Backend Setup

**1. Clone Repository**
```bash
git clone <repository-url>
cd ai-expense-analyzer
```

**2. Install Dependencies**
```bash
uv sync
```

**3. Configure Environment Variables**
Create a `.env` file:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/finflow_ai
SECRET_KEY=your_secret_key
GROQ_API_KEY=your_groq_api_key
```

**4. Start Backend**
```bash
uv run uvicorn main:app --reload
```
*Backend runs on: `http://127.0.0.1:8000`*

### Frontend Setup
```bash
cd finflow
npm install
npm run dev
```
*Frontend runs on: `http://localhost:3000`*

## Docker Deployment

**Build Docker Image:**
```bash
sudo docker build -t finflow-ai .
```

**Run Docker Container:**
```bash
sudo docker run -d \
  -p 8000:8000 \
  --env-file .env \
  --name finflow-ai \
  finflow-ai
```

## AWS EC2 Deployment
Deployment architecture includes:
* Ubuntu EC2 server
* Dockerized FastAPI backend
* Nginx reverse proxy
* Automated CI/CD deployment
* GitHub Actions integration

Production deployment supports:
* Automated container rebuilds
* Production API restart workflows
* Secure environment variable management
* Reverse proxy routing

## API Endpoints

### Authentication APIs
* `POST /auth/register`
* `POST /auth/login`

### Expense APIs
* `GET /expenses`
* `POST /expenses`
* `PUT /expenses/{id}`
* `DELETE /expenses/{id}`

### Analytics APIs
* `GET /analytics/summary`

### AI APIs
* `GET /ai/summary`
* `POST /nlp/extract-expense`

### Business Intelligence APIs
* `GET /forecasting`
* `GET /vendor-segmentation`
* `GET /anomaly-detection`

### CSV Import APIs
* `POST /csv-import`

## Testing

**Run Unit Tests:**
```bash
uv run -m pytest
```

**Run Pylint:**
```bash
uv run pylint app
```

## Engineering Concepts Explored
* **Software Engineering:** Full-stack architecture, REST API design, protected routing, authentication workflows, modular backend structure, enterprise dashboard architecture.
* **AI Engineering:** LLM integration, prompt engineering, structured JSON extraction, AI-generated financial insights, NLP-based expense parsing.
* **Machine Learning & Analytics:** Time-series forecasting, operational anomaly detection, vendor segmentation, predictive analytics, KPI intelligence systems.
* **DevOps & Deployment:** Docker containerization, Linux server management, AWS EC2 deployment, reverse proxy architecture, GitHub Actions automation, CI/CD workflows.

## Screenshots

### Authentication Dashboard
![Authentication Dashboard](assets/auth-dashboard.png)

### Operational Analytics Dashboard
![Operational Analytics Dashboard](assets/operational-analytics.png)

### Expense Management
![Expense Management](assets/expense-management.png)

### Business Intelligence Forecasting
![Business Intelligence Forecasting](assets/bi-forecasting.png)

### AI Financial Insights
![AI Financial Insights](assets/ai-insights.png)

### NLP Expense Extraction
![NLP Expense Extraction](assets/nlp-extraction.png)

## Future Improvements
Potential future enhancements:
* Kubernetes deployment
* Real-time streaming analytics
* Role-based access control
* Multi-tenant architecture
* Advanced AI forecasting models
* Monitoring & observability
* PDF/Excel reporting
* WebSocket real-time dashboards

## Author
Jeswin K Reji

## License
Built for portfolio, learning, and production-style software engineering exploration.