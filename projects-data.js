/* ==========================================================================
   PORTFOLIO PROJECTS DATA REPOSITORY
   Thirteen public projects aligned with PORTFOLIO_KNOWLEDGE.md.
   ========================================================================== */

const PORTFOLIO_PROJECTS = [
  {
    id: "mapping-to-sql-gemma",
    num: "01",
    category: "llm",
    categoryLabel: "Fine-tuning",
    solutionType: "Data Migration Tool",
    filterGroups: ["data-automation"],
    role: "Lead AI Engineer / MLOps",
    title: "Automated SQL Generation Tool",
    cardSummary: "Converts analyst Excel mapping sheets into ready-to-run SQL locally without exposing private banking data.",
    outcomeBadge: "100% On-Premise Privacy",
    cardTags: ["Local AI", "Excel-to-SQL", "FastAPI"],
    shortDesc: "Eliminates days of manual query writing during banking data migrations—letting analysts upload Excel mapping sheets to generate production SQL locally with 100% on-premise data privacy.",
    domain: "LLM Fine-Tuning · PEFT / 8-bit LoRA · Data Migrations · On-Premise Serving",
    execution: "Client delivery — local model serving",
    models: "Mistral-7B-Instruct-v0.3 · 8-bit LoRA (r=8, α=16) · FastAPI",
    featured: true,
    liveDemo: "demo-sql-finetuning.html",
    liveDemoTitle: "Interactive Model Evaluation & Fine-Tuning Inspector",
    liveDemoDesc: "Inspect step-by-step training loss curves (1.049 → 0.184), compare base vs. fine-tuned sample SQL generation, and test pre-inference schema and mapping rule normalization in an interactive browser simulation.",
    highlights: [
      "Self-serve FastAPI + web UI workflow: analysts upload Excel/CSV mapping sheets and export valid JSON/SQL locally",
      "Fine-tuned Mistral-7B-Instruct-v0.3 on 900 JSONL pairs using 8-bit quantized LoRA (r=8, alpha=16)",
      "Fits inside an 8.5 GB peak VRAM budget so banking schemas run on a single local GPU with $0 cloud API fees",
      "Pre-inference rule normalizer standardizes informal analyst mapping shorthand and resolves implicit foreign-key join paths before model generation",
      "Live walkthrough, weights, and setup guide handed over so the client team operates and maintains it independently"
    ],
    techStack: ["Mistral-7B-Instruct-v0.3", "PEFT / 8-bit LoRA", "bitsandbytes (8-bit)", "PyTorch", "HuggingFace SFTTrainer", "FastAPI", "Uvicorn", "Jinja2", "ANSI SQL"],
    starSummary: {
      situation: "Banking and enterprise migration teams spent days manually coding multi-table SQL queries from messy analyst Excel mapping sheets, while strict privacy rules banned sending schemas to external cloud APIs.",
      task: "Build an on-premise tool that lets analysts upload mapping sheets and generate valid ANSI SQL inside JSON on existing single-GPU hardware without external cloud calls.",
      action: "Benchmarked Google Gemma 2B on 50 samples, upgraded to Mistral-7B-Instruct-v0.3 on 900 pairs with 8-bit quantized LoRA (r=8, alpha=16) under 8.5 GB VRAM, added pre-inference mapping rule normalization and join-key inference, and deployed an on-premise self-service web portal.",
      result: "Replaced slow manual query writing with a local self-serve upload workflow, dropped training loss from 1.049 to 0.184 (min 0.173 at step 500), and handed over model weights and setup documentation via live walkthrough."
    },
    sections: [
      {
        title: "Business Workflow & On-Premise Need",
        icon: "fa-bullseye",
        content: `
          <p>During banking data warehouse migrations, business analysts document source-to-target rules in Excel and CSV spreadsheets, leaving data engineers with days of repetitive SQL translation. Because strict financial privacy policies prohibited sending proprietary table schemas to cloud LLM APIs, the client needed a self-serve application running completely inside their own environment on modest GPU hardware (8.5 GB VRAM).</p>
        `
      },
      {
        title: "Iterative Model Adaptation & Pre-Inference Normalization",
        icon: "fa-brain",
        content: `
          <p>After benchmarking Google Gemma 2B on 50 initial samples showed struggles with long multi-table joins, the system was upgraded and delivered using:</p>
          <ul>
            <li><strong>8-Bit Quantized LoRA Adaptation:</strong> Fine-tuned Mistral-7B-Instruct-v0.3 on 900 JSONL mapping-to-SQL pairs (rank r=8, alpha=16 on attention projections) via Hugging Face SFTTrainer within an 8.5 GB peak VRAM budget (T4 / RTX 3090).</li>
            <li><strong>Pre-Inference Mapping &amp; Join Normalization:</strong> Standardizes informal analyst transformation shorthand into canonical SQL expressions and automatically infers missing foreign-key join relationships from table schemas before inference.</li>
            <li><strong>Dialect-Safe JSON Output:</strong> Generates structured JSON wrapping ANSI SQL with INNER, LEFT, and FULL/RIGHT OUTER joins, COALESCE null-fallback logic, and deterministic table aliasing.</li>
          </ul>
        `
      },
      {
        title: "Self-Serve Delivery, Handover & Demo",
        icon: "fa-server",
        content: `
          <p>Deployment and client enablement highlights:</p>
          <ul>
            <li><strong>On-Premise Self-Service Web Portal:</strong> Delivered a browser-based FastAPI upload portal where analysts drop in Excel/CSV mapping workbooks, inspect generated SQL and JSON manifests, and export production queries with zero external cloud exposure.</li>
            <li><strong>Verified Convergence:</strong> Cross-entropy loss decreased from 1.049 (step 10) to 0.184 (step 700), with a minimum of 0.173 at step 500.</li>
            <li><strong>Live Handover:</strong> Ran a live walkthrough demonstrating upload-to-SQL workflows and delivered weights, source repository, and setup runbooks to the client team.</li>
            <li><strong>Interactive Demo:</strong> Inspect loss curves, sample SQL outputs, and pre-inference rule normalization in the <a href="../../demo-sql-finetuning.html" style="color:var(--accent-bright); text-decoration:underline; font-weight:600;">Interactive SQL Fine-Tuning Demo</a>.</li>
          </ul>
        `
      }
    ]
  },
  {
    id: "enterprise-json-query-enhancer",
    num: "02",
    category: "llm",
    categoryLabel: "Data pipelines",
    solutionType: "Workflow Automation Tool",
    filterGroups: ["data-automation"],
    role: "Full-Stack AI & Data Systems Engineer",
    title: "Automated Data Pipeline Builder",
    cardSummary: "Turns spreadsheet rules into complete Spark data pipeline configs and safely updates live tables in seconds.",
    outcomeBadge: "Weeks of setup → Seconds",
    cardTags: ["Workflow Automation", "Python", "Spark"],
    shortDesc: "Replaces weeks of manual Spark ETL coding with a self-serve pipeline compiler that generates 7-stage DAG configs and patches new tables into live workflows without breaking upstream jobs.",
    domain: "Data Engineering · Apache Spark DAG Compiler · Incremental Schema Updates",
    execution: "Client delivery — 6–8 day sprint",
    models: "Google Gemini 2.0 / 2.5 Flash · Flask REST API · Pandas · AST & Schema Validation",
    featured: false,
    liveDemo: "demo-etl-generator.html",
    liveDemoTitle: "Interactive ETL DAG Compiler Demo",
    liveDemoDesc: "Explore the browser-side sample compiler: upload or choose mapping spreadsheets, inspect join keys, compile 7-stage Spark DAG manifests, and test the Incremental Schema Enhancer.",
    highlights: [
      "Compresses 2–4 weeks of manual Spark ETL JSON configuration into seconds from Excel/CSV sheets",
      "Incremental Schema Enhancer diffs and patches new tables/columns into live DAGs without rewriting working upstream flows",
      "10 automated pre-flight validation checks catch broken configs before expensive Spark cluster runs",
      "Generates standardized 7-stage Spark DAG JSON configs (date partitions, parallel extracts, joins, target write)",
      "Delivered in a 6–8 day rapid sprint with a Google Meet walkthrough and setup runbook"
    ],
    techStack: ["Google Gemini 2.0/2.5 Flash", "Python", "Flask REST API", "Pandas", "Apache Spark DAG JSON", "Incremental Schema Enhancer", "AST & JSON Schema Validation", "ANSI SQL"],
    starSummary: {
      situation: "Follow-up enterprise data migration teams spent 2 to 4 weeks manually writing multi-stage Apache Spark DAG JSON configs and risked breaking live pipelines whenever analysts added new columns or tables.",
      task: "Deliver a self-serve compiler that builds 7-stage Spark DAG manifests from spreadsheets and safely patches schema updates into existing DAG files.",
      action: "Built a Python/Flask service with Gemini Flash and Pandas to compile 7-stage DAG manifests, created an Incremental Schema Enhancer for delta patching, and added 10 pre-flight validation checks in a 6–8 day sprint.",
      result: "Automated pipeline configuration and schema evolution with zero manual JSON rewriting, walked the engineering team through the workflow on Google Meet, and handed over the repository and setup guide."
    },
    sections: [
      {
        title: "Stakeholder Problem & Rapid Sprint Scope",
        icon: "fa-bullseye",
        content: `
          <p>After automating single-query generation, the client's data engineers needed full multi-stage Apache Spark ETL orchestration configs—and a safe way to add newly requested tables without rewriting tested production JSON files by hand. Built and delivered in a focused 6–8 day sprint, this compiler turns analyst mapping spreadsheets directly into cluster-ready Spark DAG manifests.</p>
        `
      },
      {
        title: "7-Stage Spark DAG Workflow",
        icon: "fa-diagram-project",
        content: `
          <p>Engineers upload mapping sheets via the web UI and receive a validated 7-stage Spark DAG manifest:</p>
          <ul>
            <li><strong>Stage 1 — Partition Scoping:</strong> Extracts execution date parameters to prevent costly full-table warehouse scans.</li>
            <li><strong>Stages 2–5 — Parallel Source Extraction:</strong> Generates isolated source extraction queries with deterministic dataframe aliasing across upstream tables.</li>
            <li><strong>Stage 6 — Unified Integration &amp; Null-Safety SQL:</strong> Combines multi-table join transformations with standardized COALESCE fallback handling.</li>
            <li><strong>Stage 7 — Target Warehouse Persistence:</strong> Configures partitioned write-through loading into target data warehouse tables.</li>
          </ul>
        `
      },
      {
        title: "Incremental Schema Patching, Pre-Flight Safety & Handover",
        icon: "fa-shield-halved",
        content: `
          <p>Operational safety checks and post-sprint handover:</p>
          <ul>
            <li><strong>Incremental Schema Enhancer:</strong> Automatically diffs newly added tables or attributes and patches them into existing DAG JSON manifests without modifying verified upstream flows.</li>
            <li><strong>10 Automated Pre-Flight Checks:</strong> Verifies JSON schema structure, flow ID ordering, column references, DAG acyclicity, and path writeability before cluster deployment.</li>
            <li><strong>Walkthrough & Documentation:</strong> Conducted a live Google Meet walkthrough with the client team and delivered the codebase and operational setup guide.</li>
            <li><strong>Interactive Demo:</strong> Test pipeline compilation and delta patching in the <a href="../../demo-etl-generator.html" style="color:var(--accent-bright); text-decoration:underline; font-weight:600;">Interactive ETL DAG Compiler Demo</a>.</li>
          </ul>
        `
      }
    ]
  },
  {
    id: "ai-classroom-monitor",
    num: "03",
    category: "cv",
    categoryLabel: "Production ML",
    solutionType: "Video Analytics Portal",
    filterGroups: ["web-saas"],
    role: "Full-Stack AI Engineer (Sole Developer)",
    title: "Classroom Attendance & Engagement Monitor",
    cardSummary: "Automatically tracks student attendance, phone distractions, and engagement scores from recorded lectures.",
    outcomeBadge: "Automated lecture review",
    cardTags: ["Computer Vision", "Web Portal", "AWS"],
    shortDesc: "Replaces hours of manual lecture video review with automated student attendance, phone/sleeping distraction alerts, color-coded video overlays, and a 0–100 attentiveness scorecard.",
    domain: "Computer Vision · Video Analytics · Cloud Media Delivery · Behavioral Scoring",
    execution: "Client delivery — classroom video analytics",
    models: "AWS Rekognition Video · OpenCV · MoviePy · DynamoDB · S3 Pre-Signed URLs",
    featured: true,
    liveDemo: "demo-classroom-cv.html",
    liveDemoTitle: "Interactive Computer Vision Telemetry Demo",
    liveDemoDesc: "Experience live video telemetry simulation: inspect bounding boxes (faces, laptops, phones, sleeping alerts), scrub time-aligned events, and test the attentiveness scoring formula.",
    highlights: [
      "Admin enrollment + video upload workflow replacing hours of manual proctor video scrubbing",
      "AWS Rekognition Video matches enrolled faces (75% confidence), tracks 8 emotions, and spots study vs. phone objects",
      "Computes objective 0–100 attentiveness scores (60% emotion + 40% forward gaze minus phone penalties)",
      "Multi-frame sleeping alert (eye closure ≥ 80% + head tilt |Roll| ≥ 45° or |Pitch| ≥ 35°) and IoU visitor deduplication",
      "Renders color-coded H.264 overlay video stored on S3 (1-hour pre-signed HTTP Range streaming) with DynamoDB telemetry"
    ],
    techStack: ["AWS Rekognition Video", "OpenCV / MoviePy", "Django 5", "AWS DynamoDB", "AWS S3 (Pre-Signed URLs)", "SQLite", "Preact / Vite", "REST APIs", "Token Auth"],
    starSummary: {
      situation: "Educational institutions and training teams needed objective attendance, engagement, and distraction metrics from recorded lectures without paying proctors to watch hours of footage.",
      task: "Build an automated video review portal where administrators enroll student photos once, upload class recordings, and review annotated video plus engagement scores.",
      action: "Sole developer of a Django 5 + Preact/Vite platform integrating AWS Rekognition Video, OpenCV/MoviePy bounding-box compositing, 0–100 attentiveness and sleeping detection heuristics, and DynamoDB/S3 persistence.",
      result: "Replaced manual lecture auditing with automated student recognition, time-aligned distraction tracking, overlay video playback via secure S3 pre-signed URLs, and downloadable session audit logs."
    },
    sections: [
      {
        title: "Stakeholder Problem & Admin Workflow",
        icon: "fa-graduation-cap",
        content: `
          <p>Training administrators had hundreds of hours of recorded lectures and no practical way to audit attendance or spot disengaged students consistently. The platform turns this into a two-step workflow: admins enroll student reference photos once into AWS Rekognition Face Collections, then upload lecture videos to receive annotated playback and an objective engagement scorecard.</p>
        `
      },
      {
        title: "Automated Engagement & Distraction Scoring",
        icon: "fa-video",
        content: `
          <p>Turns raw computer vision signals into actionable classroom metrics:</p>
          <ul>
            <li><strong>Face Search & Object Grouping:</strong> Matches enrolled students at a 75% confidence threshold, tracks 8 discrete emotions, and classifies laptops/notebooks as study items vs. phones/earbuds as distractions.</li>
            <li><strong>0–100 Attentiveness Score:</strong> Weighted 60% facial emotion confidence and 40% forward eye gaze, deducting points for nearby mobile phone detections.</li>
            <li><strong>Sleeping & Visitor Tracking:</strong> Flags sustained sleeping events (eyes closed ≥ 80% with |Roll| ≥ 45° or |Pitch| ≥ 35°) and uses spatial IoU clustering so unrecognized visitors aren't double-counted.</li>
          </ul>
        `
      },
      {
        title: "Video Overlay Rendering, Cloud Storage & Demo",
        icon: "fa-server",
        content: `
          <p>Full-stack delivery and playback infrastructure:</p>
          <ul>
            <li><strong>Visual Overlay Rendering:</strong> Server-side OpenCV and MoviePy pipeline burns green boxes for enrolled students and red boxes for distractions/unrecognized faces into H.264 video for instant review.</li>
            <li><strong>Secure Media &amp; Telemetry:</strong> Stores frame-level events in AWS DynamoDB, relational session audit logs on the backend, and serves S3 videos to the Preact/Vite frontend via 1-hour pre-signed URLs with HTTP Range scrubbing.</li>
            <li><strong>Interactive Demo:</strong> Inspect overlays and test attentiveness scoring in the <a href="../../demo-classroom-cv.html" style="color:var(--accent-bright); text-decoration:underline; font-weight:600;">Interactive Computer Vision Telemetry Demo</a>.</li>
          </ul>
        `
      }
    ]
  },
  {
    id: "ai-healthcare-scribe",
    num: "04",
    category: "mlops",
    categoryLabel: "LLM applications",
    solutionType: "AI Voice Agent & Web Portal",
    filterGroups: ["chatbots-voice", "web-saas"],
    role: "Full-Stack AI & Systems Engineer (Sole Developer)",
    title: "AI Clinic Receptionist & Portal",
    cardSummary: "Answers clinic booking calls 24/7, sends WhatsApp confirmations, and alerts doctors when lab reports arrive.",
    outcomeBadge: "24/7 booking & lab alerts",
    cardTags: ["Voice AI", "Workflow Automation", "Web Portals"],
    shortDesc: "Automates 24/7 clinic phone bookings, WhatsApp confirmations, and diagnostic lab report alerts—connecting an AI voice front desk to role-based Doctor, Lab, and Operations portals.",
    domain: "Voice AI Telephony · Healthcare Automation · HL7 FHIR R4 · n8n Workflows",
    execution: "End-to-end healthcare platform",
    models: "ElevenLabs Conversational AI · FastAPI · n8n Workflows · HL7 FHIR R4",
    featured: false,
    highlights: [
      "24/7 AI phone booking over SIP telephony connected to FastAPI scheduling endpoints with slot holds",
      "Multi-factor caller verification (phone + name + DOB) handles shared family numbers plus emergency transfer triage",
      "n8n webhook workflows automate WhatsApp booking confirmations, payment links, doctor lab alerts, and follow-up calls",
      "3 role-restricted React/Next.js portals (Doctor, Diagnostic Lab, Ops Console) enforcing strict clinical privacy",
      "HL7 FHIR R4 canonical models + swappable HIS adapters backed by PostgreSQL Row-Level Security and S3 signed URLs"
    ],
    techStack: ["FastAPI", "Python", "ElevenLabs Conversational AI", "SIP Telephony", "n8n Workflows", "WhatsApp API", "HL7 FHIR R4", "React / Next.js", "PostgreSQL (RLS)", "Celery / Redis", "AWS S3", "Docker"],
    starSummary: {
      situation: "Specialty clinics lose patients to busy reception phone lines while receptionists spend hours sending manual WhatsApp reminders and doctors waste consultation time chasing missing diagnostic lab reports.",
      task: "Automate inbound patient scheduling, WhatsApp confirmations, and lab-to-doctor follow-up workflows across patients, doctors, and diagnostic labs.",
      action: "Connected ElevenLabs Voice AI over SIP telephony to FastAPI slot-booking endpoints with multi-factor verification and emergency call transfers, orchestrated n8n WhatsApp/report webhooks, and built 3 React/Next.js portals on HL7 FHIR R4 + PostgreSQL RLS.",
      result: "Delivered an integrated clinic operations platform eliminating front-desk call bottlenecks, automating post-call WhatsApp confirmations, restricting lab staff away from private clinical notes, and closing the follow-up loop automatically."
    },
    sections: [
      {
        title: "Stakeholder Problem & End-to-End Clinic Workflow",
        icon: "fa-shield-halved",
        content: `
          <p>Clinics face three daily bottlenecks: missed patient booking calls, manual WhatsApp payment/appointment reminders, and delayed doctor reviews when diagnostic labs send PDFs over email or WhatsApp. CareLoop streamlines all three stakeholder journeys in one system:</p>
          <ul>
            <li><strong>Patients:</strong> Call the clinic 24/7, switch languages naturally, verify identity via phone + name + DOB (resolving shared family numbers), confirm real doctor slots, and receive instant WhatsApp confirmation and payment links.</li>
            <li><strong>Doctors:</strong> View daily schedules, AI call transcripts, prior lab results, and clinical history in the Doctor Portal, and issue structured lab orders in one click.</li>
            <li><strong>Diagnostic Labs & Ops:</strong> Labs log into a restricted portal showing only patient ID, test name, and ordering doctor (hiding private clinical notes) to upload PDF reports and biomarkers, immediately triggering doctor alerts.</li>
          </ul>
        `
      },
      {
        title: "Voice Scheduling, Safety Triage & n8n Automation",
        icon: "fa-phone-volume",
        content: `
          <p>Engineered to protect clinical safety and eliminate manual front-desk coordination:</p>
          <ul>
            <li><strong>Telephony Tool Integration:</strong> ElevenLabs SIP voice agent invokes FastAPI endpoints to query live doctor availability, place temporary database locks on slots, and commit verified appointments.</li>
            <li><strong>Emergency Symptom Triage:</strong> Keyword and intent safety rules recognize acute symptoms (chest pain, trauma, breathing difficulty) and transfer the call straight to human clinic staff.</li>
            <li><strong>Webhook-Driven n8n Pipelines:</strong> Automatically dispatch WhatsApp confirmations, payment links, post-call summaries, doctor notifications upon lab upload, and outbound follow-up booking calls.</li>
          </ul>
        `
      },
      {
        title: "HL7 FHIR R4 Interoperability & Data Governance",
        icon: "fa-lock",
        content: `
          <p>Built for both standalone clinics and existing hospital deployments:</p>
          <ul>
            <li><strong>HL7 FHIR R4 Canonical Schema:</strong> Models <code>Patient</code>, <code>Practitioner</code>, <code>Slot</code>, <code>Appointment</code>, <code>ServiceRequest</code>, <code>DiagnosticReport</code>, and <code>Encounter</code> with adapter interfaces for FHIR REST or HL7 v2 hospital systems.</li>
            <li><strong>Access Governance:</strong> Protected with PostgreSQL Row-Level Security (RLS), role-scoped UI views, short-lived AWS S3 signed URLs for medical PDFs, and containerized Docker deployment.</li>
          </ul>
        `
      }
    ]
  },
  {
    id: "ai-quiz-generation-saas",
    num: "05",
    category: "llm",
    categoryLabel: "LLM applications",
    solutionType: "Live EdTech SaaS",
    filterGroups: ["web-saas"],
    role: "Full-Stack AI Engineer",
    title: "Quizentia - AI Quiz & Assessment Builder",
    liveUrl: "https://quizentia.com/",
    cardSummary: "Turns PDFs, diagrams, YouTube videos, and web links into editable practice quizzes in seconds.",
    outcomeBadge: "Live · quizentia.com",
    cardTags: ["SaaS Product", "Multimodal AI", "React"],
    shortDesc: "Live EdTech SaaS (quizentia.com) that turns PDFs, diagrams, YouTube videos, and web links into editable assessments across 4 question types—cutting hours of manual test creation down to seconds.",
    domain: "Generative AI · EdTech SaaS · Multimodal Ingestion · Full-Stack Product",
    execution: "Live SaaS product — quizentia.com",
    models: "OpenAI GPT-4o / GPT-4o-mini · Vision API · PyMuPDF · EasyOCR",
    featured: false,
    highlights: [
      "Live at quizentia.com: eliminates hours of manual assessment creation for educators, trainers, and students",
      "5 input parsers: PDFs (PyMuPDF), up to 5 images/diagrams (Vision + EasyOCR), YouTube videos, Web URLs, and raw text",
      "Generates 4 editable question formats (MCQ, True/False, Fill in the Blanks, Matching Pairs) validated via Pydantic",
      "Interactive React 19 + Zustand practice mode with instant grading, inline question editing, and PDF/JSON/TXT export",
      "Full SaaS billing/quota readiness: JWT HTTP-only refresh rotation, free vs. paid weekly quotas, SlowAPI limits, MySQL 8.0"
    ],
    techStack: ["FastAPI", "React 19 / TypeScript", "OpenAI GPT-4o & Vision", "PyMuPDF", "EasyOCR / PyTesseract", "yt-dlp", "Trafilatura / Playwright", "Zustand", "MySQL 8.0", "Docker"],
    starSummary: {
      situation: "Educators, corporate trainers, and students spent hours manually drafting quiz questions and answer keys from scattered PDFs, handwritten whiteboard photos, YouTube lectures, and web articles.",
      task: "Build and ship a live self-serve SaaS platform supporting all 5 content formats, inline quiz editing, interactive practice, and clean exports with SaaS account tiers.",
      action: "Sole full-stack builder using FastAPI, 5 specialized ingestion parsers, OpenAI GPT-4o/Vision with Pydantic validation, MySQL 8.0 usage quotas, JWT cookie auth, SlowAPI rate limiting, and a React 19 + Tailwind CSS v4 frontend.",
      result: "Launched live at quizentia.com, compressing hours of manual quiz authoring into seconds across 5 input sources and 4 interactive exportable question formats."
    },
    sections: [
      {
        title: "Stakeholder Need & Live SaaS Product (quizentia.com)",
        icon: "fa-graduation-cap",
        content: `
          <p>Course creators and educators needed a single workspace to convert real study materials—multi-page textbooks, diagram screenshots, lecture videos, and online articles—directly into structured assessments without tedious copy-pasting. Live at <a href="https://quizentia.com/" target="_blank" rel="noopener noreferrer" style="color:var(--accent-bright); text-decoration:underline;">quizentia.com</a>, Quizentia handles ingestion, interactive practice, editing, and document export end to end.</p>
        `
      },
      {
        title: "5 Multimodal Ingestion Pipelines & 4 Question Formats",
        icon: "fa-file-lines",
        content: `
          <p>Dedicated FastAPI extraction pipelines normalize diverse learning sources before validated schema generation:</p>
          <ul>
            <li><strong>PDF Textbooks &amp; Handouts:</strong> High-speed PyMuPDF document parsing that preserves paragraph structure and repairs line-break hyphenation across multi-page files.</li>
            <li><strong>Diagrams &amp; Photos:</strong> OpenAI Vision API paired with EasyOCR and PyTesseract (supporting up to 5 images per upload) to parse slides, flowcharts, and handwritten notes.</li>
            <li><strong>YouTube Videos &amp; Web Articles:</strong> Automated video transcript extraction plus headless Playwright and Trafilatura article parsing for dynamic web URLs and token-bounded text.</li>
            <li><strong>Structured Outputs:</strong> Enforces Pydantic validation to generate <strong>MCQ, True/False, Fill in the Blanks, and Matching Pairs</strong>.</li>
          </ul>
        `
      },
      {
        title: "Interactive Workspace & SaaS Infrastructure",
        icon: "fa-server",
        content: `
          <p>Production engineering supporting real users and subscription limits:</p>
          <ul>
            <li><strong>Visual Editor, Practice &amp; Export:</strong> React 19 + TypeScript + Tailwind CSS v4 + Zustand editor lets users modify/delete questions, run instant-graded Practice Mode, and export to <code>PDF</code> (<code>jsPDF</code>), <code>JSON</code>, or <code>TXT</code>.</li>
            <li><strong>SaaS Security &amp; Metering:</strong> JWT access + HTTP-only refresh cookie rotation with <code>bcrypt</code>, free vs. paid weekly generation limits tracked in Dockerized MySQL 8.0, <code>SlowAPI</code> rate limits, and <code>GeoLite2</code> analytics.</li>
          </ul>
        `
      }
    ]
  },
  {
    id: "enterprise-pms-innovation-analytics",
    num: "06",
    category: "llm",
    categoryLabel: "Customer integration",
    solutionType: "Live Enterprise Web Platform",
    filterGroups: ["web-saas"],
    role: "Full-Stack AI Engineer (Sole Developer)",
    title: "Compelion - Enterprise Strategy & Project Platform",
    liveUrl: "https://www.compelion.com/",
    cardSummary: "Turns executive goals into department tasks, tracks process metrics, escalates risks, and publishes bilingual insights.",
    outcomeBadge: "Live · compelion.com",
    cardTags: ["Enterprise Portal", "Analytics", "Azure SSO"],
    shortDesc: "Live enterprise management platform (compelion.com) with Azure MSAL SSO and a 6-level org hierarchy that turns executive briefs into department tasks, tracks Statistical Process Control (SPC) metrics, escalates delivery risks, and publishes bilingual insights.",
    domain: "Enterprise PMS · Microsoft Azure MSAL · SPC Analytics · Bilingual CMS",
    execution: "Client delivery — live at compelion.com",
    models: "Google Gemini API · OpenAI DALL-E 3 · FLAML (AutoML) · Django Channels",
    featured: false,
    highlights: [
      "Live at compelion.com: 6-level org hierarchy (Organizations to Roles) with 3 RBAC tiers and Microsoft Azure MSAL SSO",
      "5 structured AI planning workflows (Problem Statement to Executive Report) turn strategic briefs into trackable execution",
      "Statistical Process Control (SPC) charts, Cost-Benefit Analysis (CBA), FLAML AutoML forecasting, and automated risk escalation",
      "Real-time Django Channels WebSocket chat rooms and embedded Excalidraw collaborative whiteboards",
      "English/Arabic bilingual CMS drafting articles with Gemini, banner visuals via DALL-E 3, and audio podcast attachments"
    ],
    techStack: ["Django 4.2 / DRF", "React 18 / Redux Toolkit", "PostgreSQL", "Azure MSAL OAuth 2.0", "Google Gemini API", "OpenAI DALL-E 3", "FLAML (AutoML)", "Django Channels", "Excalidraw", "ApexCharts / Mermaid.js", "Stripe API", "OpenAPI / Swagger"],
    starSummary: {
      situation: "Enterprise leadership and PMO teams lacked a unified system connecting high-level strategic initiatives to department tasks, process variance metrics (SPC), and automated blocker escalation—relying on fragmented spreadsheets.",
      task: "Architect and ship an enterprise project management and analytics platform supporting multi-level org governance, Azure SSO, AI work-breakdown workflows, live collaboration, and bilingual publishing.",
      action: "Built the Django REST + PostgreSQL backend and React 18/Ant Design frontend with a 6-level org schema, 3 RBAC tiers, Azure MSAL & Google OAuth 2.0, Stripe billing, 5 Gemini planning workflows, SPC + FLAML analytics, Excalidraw/WebSocket collaboration, and an English/Arabic CMS.",
      result: "Launched live at compelion.com with standardized OpenAPI documentation, giving executives end-to-end visibility from strategic brief to risk-monitored execution and bilingual thought leadership."
    },
    sections: [
      {
        title: "Executive Problem & Multi-Tenant Governance (compelion.com)",
        icon: "fa-briefcase",
        content: `
          <p>Enterprise PMOs struggled to keep strategic plans connected to day-to-day department execution. Built and launched at <a href="https://www.compelion.com/" target="_blank" rel="noopener noreferrer" style="color:var(--accent-bright); text-decoration:underline;">compelion.com</a>, Compelion replaces disconnected spreadsheets with a single multi-tenant workspace secured by Microsoft Azure MSAL and Google OAuth 2.0 SSO plus Stripe subscription billing.</p>
        `
      },
      {
        title: "6-Level Org Hierarchy, AI Task Breakdown & Quantitative Analytics",
        icon: "fa-sitemap",
        content: `
          <p>Engineered to match real enterprise governance and operations tracking:</p>
          <ul>
            <li><strong>Organizational Hierarchy &amp; RBAC:</strong> Models 6 nested levels (<code>Organizations &rarr; Divisions &rarr; Departments &rarr; Strategic Themes &rarr; Teams &rarr; Roles</code>) governed by 3 RBAC tiers (<code>Employees</code>, <code>Admins</code>, <code>Superadmins</code>).</li>
            <li><strong>5 Gemini Planning Workflows:</strong> Structured AI planning workflows covering Problem Statement, Idea Generator, Task Breakdown, Scorecard, and Executive Report convert brief strategic inputs into structured project milestones, subtasks, and evaluation scorecards.</li>
            <li><strong>SPC, Forecasting &amp; Risk Escalation:</strong> Computes Statistical Process Control (SPC) charts, Cost-Benefit Analysis (CBA), FLAML AutoML forecasts, team workload/sentiment metrics, and a risk matrix that automatically escalates critical blockers up departments.</li>
          </ul>
        `
      },
      {
        title: "Real-Time Collaboration & Bilingual (EN/AR) Publishing",
        icon: "fa-language",
        content: `
          <p>Cross-team communication and content workflows inside the same platform:</p>
          <ul>
            <li><strong>Live Workspaces:</strong> Multi-room chat built on <code>Django Channels</code> WebSockets alongside embedded <code>Excalidraw</code> whiteboards and <code>ApexCharts</code> / <code>Highcharts</code> / <code>Plotly.js</code> / <code>Mermaid.js</code> visuals.</li>
            <li><strong>Bilingual CMS:</strong> English and Arabic publishing workflow using Gemini to draft insights articles, OpenAI DALL-E 3 for header artwork, and attached audio podcasts, backed by standardized OpenAPI documentation.</li>
          </ul>
        `
      }
    ]
  },
  {
    id: "autonomous-social-content-engine",
    num: "07",
    category: "mlops",
    categoryLabel: "Customer integration",
    solutionType: "Content & Publishing Automation",
    filterGroups: ["data-automation"],
    role: "Full-Stack AI Engineer",
    title: "Executive LinkedIn & Podcast Automation",
    cardSummary: "Researches topics, schedules a 5-day bilingual queue of LinkedIn posts, articles, and podcasts, and replies to comments.",
    outcomeBadge: "Saves 10+ hrs/week",
    cardTags: ["Content Automation", "AI Agents", "Django"],
    shortDesc: "Eliminates 10+ hours/week of manual executive publishing—automatically researching topics, pre-building a 5-day bilingual queue of LinkedIn posts, chart-backed articles, and two-speaker podcasts, and managing follow-up comments.",
    domain: "Content Operations · LinkedIn OAuth 2.0 · Django-Q2 · Bilingual Publishing",
    execution: "Client delivery — Django publishing operations",
    models: "OpenAI Responses API (GPT-4.1) · PyAutoGen · OpenAI TTS · Django-Q2",
    featured: true,
    highlights: [
      "Pre-builds a 5-day queue of English/Arabic LinkedIn posts, research articles, and images every midnight via Django-Q2",
      "Multi-agent research pipeline combines OpenAI web search, consulting-insights scraping, ChromaDB, and PyAutoGen agents with charts/diagrams",
      "Generates dual-speaker English/Arabic podcasts (OpenAI TTS + PyDub) from articles or uploaded PDF/Word documents and sends Gmail newsletters",
      "LinkedIn OAuth 2.0 (personal & company pages, 60-day token health alerts) with human-in-the-loop review before publish",
      "Automates a 3-comment post-publish chain (linking client blog compelion.com) and author-mention comment replies with duplicate/jitter guards"
    ],
    techStack: ["Django 3.2", "OpenAI Responses API", "PyAutoGen", "ChromaDB", "Django-Q2", "LinkedIn OAuth 2.0", "OpenAI TTS", "PyDub", "Gmail API", "BeautifulSoup4", "Pillow"],
    starSummary: {
      situation: "An executive consulting team spent over 10 hours a week researching industry topics, writing bilingual (English and Arabic) LinkedIn posts and deep articles, recording audio, and manually replying to comments.",
      task: "Build one Django operations console that pre-drafts a weekly bilingual content package (posts, research articles, charts, podcasts, newsletters) and automates official-API publishing and engagement.",
      action: "Engineered a multi-agent research pipeline (OpenAI Responses web search, BeautifulSoup scraping, ChromaDB, PyAutoGen), a 5-day Django-Q2 midnight queue, PyDub dual-speaker TTS podcasts, Gmail newsletters, LinkedIn OAuth publishing, and duplicate-guarded 3-step comment workflows.",
      result: "Operators simply review and approve pre-generated bilingual drafts in one dashboard while keeping scheduled publishing, blog cross-links, comment replies, and email newsletters synced on one database-backed system."
    },
    sections: [
      {
        title: "Stakeholder Bottleneck & Editorial Workflow",
        icon: "fa-layer-group",
        content: `
          <p>Executive marketing teams lose entire workdays coordinating separate tools for research, bilingual copywriting (English and Arabic), data charts, podcast recording, and LinkedIn community management. Built for a consulting publishing team, this Django console brings the entire weekly content workflow into one operator dashboard:</p>
          <ul>
            <li><strong>Posts &amp; Images:</strong> Drafts English and Arabic LinkedIn posts tailored to weekly weekday topics with Pillow + OpenAI generated banners for personal or company pages.</li>
            <li><strong>Rolling 5-Day Lookahead Queue:</strong> A daily midnight job checks today plus four days ahead and pre-populates empty slots so editorial teams always review ready-to-publish drafts instead of starting from a blank page.</li>
            <li><strong>Podcasts &amp; Newsletters:</strong> Converts finished articles or uploaded PDF and Word documents into alternating male/female two-speaker podcasts in English or Arabic and emails subscriber lists via Gmail API with signed unsubscribe links.</li>
          </ul>
        `
      },
      {
        title: "Research Article & Multi-Agent Pipeline",
        icon: "fa-magnifying-glass",
        content: `
          <p>Multi-agent editorial orchestration pairs structured OpenAI Responses pipelines with selective PyAutoGen helper agents:</p>
          <ul>
            <li><strong>Live Web &amp; Consulting Insights Search:</strong> Gathers web sources alongside <code>BeautifulSoup4</code> scraping of consulting-insights portals and ChromaDB context.</li>
            <li><strong>Structured Section &amp; Chart Planning:</strong> Plans titles and sections, builds interactive <code>ApexCharts</code> figures and <code>Mermaid.js</code> diagrams where needed, and stores bilingual English/Arabic versions on one record.</li>
          </ul>
        `
      },
      {
        title: "Queue Reliability & Official LinkedIn API Constraints",
        icon: "fa-clock",
        content: `
          <p>Designed for predictable operations without extra broker overhead:</p>
          <ul>
            <li><strong>Database-Backed Django-Q2 Queue:</strong> Uses the main relational database instead of requiring the client team to operate a separate Redis service.</li>
            <li><strong>OAuth 2.0 &amp; Comment Chains:</strong> Monitors 60-day LinkedIn token expirations before failure. After publishing, triggers a 3-comment chain (technical point, relevant link to the client's <code>compelion.com</code> blog API, and CTA) plus jitter-spaced replies using API member-mention tags and answered-ID deduplication.</li>
          </ul>
        `
      }
    ]
  },
  {
    id: "docuchat-enterprise-agentic-rag",
    num: "08",
    category: "llm",
    categoryLabel: "LLM applications",
    solutionType: "Document Q&A Chatbot",
    filterGroups: ["chatbots-voice"],
    role: "Full-Stack AI Engineer",
    title: "Contract & Policy Assistant AI",
    cardSummary: "Private local assistant that cross-examines 200+ page contracts and HR manuals with exact page citations.",
    outcomeBadge: "200+ page PDFs · Cited Q&A",
    cardTags: ["Document Chatbot", "Local AI", "Citations"],
    shortDesc: "Private, on-premise multi-document Q&A workspace that lets legal and HR teams cross-examine 200+ page contracts and policy manuals in seconds—returning exact document filenames and page number citations with zero cloud data exposure.",
    domain: "Enterprise RAG · Local LLMs · Contract & Policy Compliance · Document Search",
    execution: "Dual-mode local delivery — FastAPI + Streamlit & Django",
    models: "Ollama (Llama 3.1, Mistral) · ChromaDB · Sentence Transformers (all-MiniLM-L6-v2)",
    featured: false,
    highlights: [
      "Private local execution: answers complex queries across 200+ page HR manuals and legal contracts with zero cloud API uploads",
      "Multi-document cross-examination: select multiple PDFs simultaneously to compare clauses side-by-side in one query",
      "Pydantic-enforced citation schema requires every response to show exact source document filenames and page numbers",
      "PyPDF2 overlapping chunker preserves section headings and page numbers in persistent ChromaDB metadata",
      "Delivered two deployment options: lightweight FastAPI + Streamlit app and multi-user Django app with saved bookmarks"
    ],
    techStack: ["FastAPI", "Django", "Streamlit", "ChromaDB", "Ollama (Llama 3.1, Mistral)", "Sentence Transformers (all-MiniLM-L6-v2)", "PyPDF2", "Pydantic", "PostgreSQL / SQLite"],
    starSummary: {
      situation: "Legal, HR, and compliance teams spent hours manually searching across 200+ page policy manuals and vendor contracts, unable to upload confidential legal documents to external cloud chatbots or trust unverified AI summaries.",
      task: "Build an on-premise document Q&A system supporting multi-contract comparison and strict page-level citations for fast audit verification.",
      action: "Built a PyPDF2 section/page metadata chunker, local all-MiniLM-L6-v2 embeddings in ChromaDB, local Ollama (Llama 3.1, Mistral) inference with Pydantic citation contracts, and packaged both FastAPI + Streamlit and multi-user Django deployments.",
      result: "Cut policy and contract clause lookup from hours to seconds across 200+ page PDFs while keeping 100% of legal data on local infrastructure with verifiable document-and-page citations and saved audit bookmarks."
    },
    sections: [
      {
        title: "Stakeholder Need: Fast, Auditable & Strictly Private Search",
        icon: "fa-file-shield",
        content: `
          <p>HR and legal teams needed to compare vendor SLAs, termination clauses, and internal policies across thick 200+ page PDFs without violating client confidentiality by sending agreements to public LLM providers—and without wasting time double-checking vague AI summaries.</p>
        `
      },
      {
        title: "Verifiable Citations & Multi-Document Retrieval",
        icon: "fa-magnifying-glass",
        content: `
          <p>Engineered for trustworthy compliance workflows:</p>
          <ul>
            <li><strong>Metadata-Rich Ingestion:</strong> <code>PyPDF2</code> parses overlapping text chunks while preserving exact section headings and page numbers on every chunk stored in persistent <code>ChromaDB</code> collections.</li>
            <li><strong>Cross-Contract Selection:</strong> Users filter and query across multiple uploaded documents in a single question to compare obligations side by side.</li>
            <li><strong>Enforced Source Attribution:</strong> Local embeddings (<code>all-MiniLM-L6-v2</code>) and local <code>Ollama</code> models (<code>Llama 3.1</code>, <code>Mistral</code>) output Pydantic-validated responses listing the source filename and page number for every claim.</li>
          </ul>
        `
      },
      {
        title: "Two Ready-to-Deploy Workspaces",
        icon: "fa-server",
        content: `
          <p>Shipped in two configurations depending on client team size:</p>
          <ul>
            <li><strong>Lightweight Mode (FastAPI + Streamlit):</strong> Rapid single-team local workspace for immediate PDF indexing and multi-document Q&amp;A.</li>
            <li><strong>Enterprise Multi-User Mode (Django + PostgreSQL/SQLite):</strong> Full user authentication, persistent conversation history, and saved clause bookmarks for ongoing legal audits.</li>
          </ul>
        `
      }
    ]
  },
  {
    id: "power-apps-leave-expense-portal",
    num: "09",
    category: "mlops",
    categoryLabel: "Power Platform",
    solutionType: "Approval App & Workflow",
    filterGroups: ["power-platform"],
    role: "Power Platform Business Automation Specialist",
    title: "Leave & Expense Approval Portal",
    cardSummary: "Internal app and approval workflow for ~400 staff that cut manager sign-off from days to ~1 day.",
    outcomeBadge: "~400 staff · ~1-day approval",
    cardTags: ["Power Apps", "Power Automate", "SharePoint", "Power BI"],
    shortDesc: "Replaces scattered email requests and shared Excel reconciliation for ~400 staff with a role-based Power Apps Canvas portal, 5 indexed SharePoint Lists, automated Teams Adaptive Card approvals with 48-hour escalations, and an embedded Power BI reporting tab.",
    domain: "Microsoft Power Platform · SharePoint Lists · Power Automate · Power BI · Entra ID",
    execution: "Confidential client M365 tenant delivery (de-identified architecture)",
    models: "Power Apps (Canvas) · Power Automate · 5 SharePoint Lists · Entra ID · Power BI",
    featured: true,
    liveDemo: "demo-power-platform.html#sharepoint",
    liveDemoTitle: "Interactive SharePoint Schema & Approval Flow Simulator",
    liveDemoDesc: "Inspect the 5 indexed SharePoint Lists (5,000-item safe), step through Teams Adaptive Card approvals with 48-hour escalations, and simulate Try/Catch admin recovery.",
    highlights: [
      "~400-staff Canvas App portal eliminating lost email requests and hours of manual HR Excel reconciliation",
      "5 SharePoint Lists (Requests ~20 cols, Employees, Departments, Request Types, Audit/Log) with Status, Employee, and Created indexed early past the 5,000-item limit",
      "Power Automate approval flows send Teams Adaptive Cards + Outlook emails, 48-hour reminders, and next-level escalation",
      "Entra ID security groups (Employee, Manager, HR) plus item-level permissions on sensitive items and Try/Catch admin error alerts",
      "Teams-tab Power BI report tracking request volume, approval turnaround (~days down to ~1 day), and pending items by manager"
    ],
    techStack: ["Microsoft Power Apps (Canvas)", "Power Fx", "Microsoft Power Automate", "SharePoint Lists", "Power BI", "Teams Adaptive Cards", "Microsoft Entra ID Groups", "Managed Solutions ALM"],
    starSummary: {
      situation: "A mid-size services company (~400 staff) handled leave and expense requests over email threads and a shared Excel workbook, causing lost approvals, zero status visibility, and hours of manual HR reconciliation.",
      task: "Replace the ad-hoc email/Excel process with a governed self-service request portal, enforceable manager approvals, role-scoped permissions, and leadership turnaround reporting.",
      action: "Modeled 5 SharePoint Lists with Lookup/Choice columns and upfront 5,000-item view indexing (Status, Employee, Created), built a role-based Canvas App with pre-submit duplicate checks, automated Teams/Outlook approvals with 48-hour reminders and escalations under Service Account Connection References, and added a Power BI Teams tab.",
      result: "Cut average approval turnaround from days to ~1 day, eliminated manual HR reconciliation, kept requests viewable strictly by requester, manager, and HR, and handed over user guides, admin checklists, and trained champions."
    },
    sections: [
      {
        title: "Stakeholder Bottleneck & 5-List SharePoint Data Design",
        icon: "fa-table-list",
        content: `
          <p>Inside the client's Microsoft 365 tenant, roughly 400 employees across multiple departments submitted leave and expense requests by email, leaving HR to reconcile approvals manually in Excel. Starting data-first before building screens ensured long-term SharePoint scalability:</p>
          <ul>
            <li><strong>5 Normalized Lists:</strong> Structured <code>Requests</code> (~20 columns), <code>Employees</code>, <code>Departments</code>, <code>Request Types</code>, and an append-only <code>Audit/Log</code> list linked via Lookup and Choice columns (<code>Status</code>, <code>Type</code>).</li>
            <li><strong>Upfront 5,000-Item Indexing:</strong> Indexed <code>Status</code>, <code>Employee</code>, and <code>Created</code> at launch so filtered galleries and OData flow queries remain delegation-safe past SharePoint's 5,000-item threshold.</li>
            <li><strong>Pre-Submit Guardrails:</strong> Canvas App validation prevents missing receipts, invalid date ranges, and duplicate submissions before creating records.</li>
          </ul>
        `
      },
      {
        title: "Multi-Stage Teams Approvals & Try/Catch Resilience",
        icon: "fa-code-branch",
        content: `
          <p>Power Automate orchestrates the full lifecycle from submission to audit logging:</p>
          <ul>
            <li><strong>Teams &amp; Outlook Actionable Approvals:</strong> On submission, the flow sets <code>Status = Pending</code> and sends a Teams Adaptive Card plus an Outlook actionable email to the employee's line manager.</li>
            <li><strong>48-Hour Reminder &amp; Escalation:</strong> Sends a reminder after 48 hours of inactivity and escalates overdue approvals to the next-level manager listed on <code>Departments</code>.</li>
            <li><strong>Service Account Governance &amp; Try/Catch:</strong> Runs via a Service Account and Connection References (preventing broken flows when staff leave) wrapped in <code>Try/Catch</code> scopes that email admins direct flow run links on failure.</li>
          </ul>
        `
      },
      {
        title: "Entra Security Groups, Power BI & Interactive Demo",
        icon: "fa-chart-column",
        content: `
          <p>Delivered inside Managed Solutions (<code>Dev &rarr; Test &rarr; Prod</code>) with clear access boundaries and visibility:</p>
          <ul>
            <li><strong>Role-Based Access:</strong> Enforced <code>Employee</code>, <code>Manager</code>, and <code>HR</code> Entra ID security groups with item-level SharePoint permissions restricting sensitive items to the requester, approver, and HR.</li>
            <li><strong>Teams Power BI Reporting:</strong> Published a Power BI report inside a Microsoft Teams tab tracking request counts, pending approvals per manager, and approval turnaround (reduced from days to <code>~1 day</code>).</li>
            <li><strong>Interactive Demo:</strong> Inspect the 5-list schema and simulate approvals or <code>Try/Catch</code> errors in the <a href="../../demo-power-platform.html#sharepoint" style="color:var(--accent-bright); text-decoration:underline; font-weight:600;">SharePoint &amp; Approval Flow Simulator</a>.</li>
          </ul>
        `
      }
    ]
  },
  {
    id: "dataverse-hr-onboarding-tracker",
    num: "10",
    category: "mlops",
    categoryLabel: "Power Platform",
    solutionType: "HR & IT Onboarding App",
    filterGroups: ["power-platform"],
    role: "Power Platform Business Automation Specialist",
    title: "Employee Onboarding Tracker",
    cardSummary: "Centralized onboarding app that automatically assigns and tracks Day-1 HR, IT, and manager tasks in one place.",
    outcomeBadge: "Automated Day-1 HR/IT tasks",
    cardTags: ["Model-Driven Apps", "Dataverse", "Power Automate"],
    shortDesc: "Replaces fragmented email and tracker checklists across HR, IT, and hiring managers with a Microsoft Dataverse Model-Driven App across 4 relational tables—automatically expanding template tasks, alerting owners in Teams, sending overdue digests, and closing completed cases.",
    domain: "Microsoft Dataverse · Model-Driven Power Apps · Power Automate · Managed Solutions",
    execution: "Confidential client M365 tenant delivery (de-identified architecture)",
    models: "Model-Driven Power Apps · Dataverse (1:N & Business Rules) · Power Automate",
    featured: false,
    liveDemo: "demo-power-platform.html#dataverse",
    liveDemoTitle: "Interactive Dataverse 1:N Schema Simulator",
    liveDemoDesc: "Explore the 4-table 1:N Dataverse onboarding data model (Employee, Onboarding Case, Task, Task Template) and task automation lifecycle.",
    highlights: [
      "4 relational Dataverse (1:N) tables: Employee, Onboarding Case, Task, and Task Template",
      "Role-scoped views and forms tailored for HR, IT provisioning teams, and hiring managers inside one Model-Driven App",
      "Dataverse Business Rules enforce required fields and start-date dependency logic directly in the form",
      "Power Automate expands template tasks on case creation, sends Teams notifications, dispatches Outlook overdue digests, and auto-closes cases",
      "Business Unit Dataverse security roles restrict case access between standard employees, managers, and HR"
    ],
    techStack: ["Microsoft Dataverse", "Model-Driven Power Apps", "Dataverse Business Rules", "Microsoft Power Automate", "Teams Notifications", "Business Unit Security Roles", "Managed Solutions ALM"],
    starSummary: {
      situation: "HR, IT, and hiring managers tracked new-hire checklists separately across spreadsheets and emails, causing missed Day-1 laptop setups, system access delays, and constant status follow-ups.",
      task: "Unify HR, IT, and manager onboarding workflows inside one structured relational application with automated task assignment, overdue accountability, and role-appropriate security.",
      action: "Designed a 4-table 1:N Dataverse schema (Employee, Onboarding Case, Task, Task Template) with Business Rules, role-based Model-Driven views/forms, Business Unit security roles, and Power Automate flows generating template tasks, Teams alerts, Outlook overdue digests, and automatic case closure.",
      result: "Gave HR, IT, and managers a single source of truth for every hire, prevented missed Day-1 setup tasks, eliminated manual chase emails, and shipped across Dev/Test/Prod Managed Solutions."
    },
    sections: [
      {
        title: "Cross-Team Problem & 4-Table Dataverse Schema",
        icon: "fa-database",
        content: `
          <p>Previously, HR emailed start-date details to IT and managers separately, making it easy for equipment or account setup tasks to slip past a new hire's start date. Because onboarding required structured parent-child records and role-based views, Dataverse and a Model-Driven App were chosen over spreadsheets:</p>
          <ul>
            <li><strong>4 Relational 1:N Tables:</strong> Modeled <code>Employee</code> (1:N <code>Onboarding Case</code>), <code>Onboarding Case</code> (1:N <code>Task</code>), and reusable <code>Task Template</code> definitions seeded into each new case.</li>
            <li><strong>Dataverse Business Rules:</strong> Enforced conditional required fields, due-date offsets, and validation rules directly at the data layer.</li>
          </ul>
        `
      },
      {
        title: "Automated Task Generation, Digests & Case Closure",
        icon: "fa-list-check",
        content: `
          <p>Power Automate removes manual coordination across departments:</p>
          <ul>
            <li><strong>Auto-Seeded Task Plans:</strong> Creating an <code>Onboarding Case</code> automatically generates standard HR, IT, and manager <code>Task</code> rows from active <code>Task Templates</code> with target SLA dates.</li>
            <li><strong>Teams Alerts &amp; Overdue Digests:</strong> Sends immediate Teams task assignments to owners and scheduled Outlook digest summaries highlighting overdue tasks before Day 1.</li>
            <li><strong>Auto-Close Governance:</strong> Automatically marks the parent <code>Onboarding Case</code> complete once every child task reaches Done status.</li>
          </ul>
        `
      },
      {
        title: "Role Views, Business Unit RBAC & Simulation",
        icon: "fa-shield-halved",
        content: `
          <p>Built for clear ownership across teams without exposing sensitive HR records:</p>
          <ul>
            <li><strong>Role-Based Views &amp; Security Roles:</strong> Configured dedicated HR, IT, and Manager queues paired with Business Unit Dataverse security roles (<code>Employee</code>, <code>Manager</code>, <code>HR</code>).</li>
            <li><strong>ALM &amp; Handover:</strong> Deployed as Managed Solutions (<code>Dev &rarr; Test &rarr; Prod</code>) with admin checklists and live department training. Inspect the schema in the <a href="../../demo-power-platform.html#dataverse" style="color:var(--accent-bright); text-decoration:underline; font-weight:600;">Dataverse &amp; Copilot Studio Simulator</a>.</li>
          </ul>
        `
      }
    ]
  },
  {
    id: "canvas-app-performance-rescue",
    num: "11",
    category: "mlops",
    categoryLabel: "Power Platform",
    solutionType: "App Performance Optimization",
    filterGroups: ["power-platform"],
    role: "Power Platform Business Automation Specialist",
    title: "Operations App Speed & Scale Rescue",
    cardSummary: "Rescued a slow, abandoned inventory app—cutting screen load time from ~9s to ~3s so staff actually used it.",
    outcomeBadge: "Load time cut ~9s → ~3s",
    cardTags: ["Power Apps (Canvas)", "Power Fx", "SharePoint"],
    shortDesc: "Audited and refactored an abandoned third-party inventory/operations Canvas App—eliminating delegation warnings, N+1 gallery lookups, and full-list client filtering to cut screen load time from ~9 seconds to ~3 seconds and restore staff adoption.",
    domain: "Power Apps Optimization · Power Fx · SharePoint Delegation · UX Reliability",
    execution: "Confidential client M365 rescue engagement (de-identified code patterns)",
    models: "Power Apps (Canvas) · Power Fx Refactoring · Indexed SharePoint OData · ClearCollect",
    featured: false,
    liveDemo: "demo-power-platform.html#rescue",
    liveDemoTitle: "Interactive Canvas App Before/After Rescue Simulator",
    liveDemoDesc: "Toggle Before vs. After refactoring to inspect the exact Power Fx formula changes that eliminated delegation warnings and cut load time from ~9s to ~3s.",
    highlights: [
      "Cut initial screen load time by ~67%—from ~9 seconds down to ~3 seconds",
      "Resolved ignored Power Apps delegation warnings that silently truncated records past 500/2,000 rows",
      "Replaced non-delegable Search(AddColumns(...)) patterns with server-side Filter() on indexed SharePoint columns first",
      "Eliminated N+1 per-row LookUp() network calls inside gallery cards using one-time Concurrent(ClearCollect(...)) caching",
      "Trimmed home screen control count, deferred secondary panels, and added explicit loading spinners and error states"
    ],
    techStack: ["Microsoft Power Apps (Canvas)", "Power Fx", "SharePoint Delegation & Indexing", "Concurrent() / ClearCollect()", "Gallery Optimization", "Managed Solutions ALM"],
    starSummary: {
      situation: "A client had inherited a third-party inventory/operations Canvas App that took ~9 seconds to load, missed older records behind silent delegation limits, and frustrated staff enough that they abandoned it for spreadsheets.",
      task: "Diagnose the root causes behind slow rendering and missing records, eliminate delegation issues, and restore a fast, reliable user experience without rebuilding from scratch unless necessary.",
      action: "Replaced full-list client filtering with delegable server-side Filter() on indexed SharePoint columns before local Search(), cached small static lookup lists once via Concurrent(ClearCollect(...)) instead of N+1 per-row LookUp() calls, removed redundant OnVisible reloads, reduced control bloat, and added explicit loading/error states.",
      result: "Dropped screen load time from ~9s to ~3s (~67% faster), reduced delegation warnings to zero, stopped silent row truncation, and brought daily staff adoption back into the app."
    },
    sections: [
      {
        title: "Root-Cause Audit of the Abandoned App",
        icon: "fa-magnifying-glass-chart",
        content: `
          <p>The legacy app failed users not because SharePoint could not handle the data, but because every screen load forced client memory to pull and recalculate too much at once:</p>
          <ul>
            <li><strong>Ignored Delegation Warnings:</strong> Non-delegable <code>Search(AddColumns(...))</code> formulas silently capped SharePoint results at 500 rows and hid older inventory items.</li>
            <li><strong>N+1 Per-Row Network Calls:</strong> Each rendered gallery card fired repeated <code>LookUp()</code> queries against <code>Departments</code> and <code>Employees</code>.</li>
            <li><strong>Bloated OnVisible &amp; Controls:</strong> Navigation triggered redundant data refreshes and rendered secondary admin tables upfront without loading indicators.</li>
          </ul>
        `
      },
      {
        title: "Delegation-Safe Power Fx & Caching Refactor",
        icon: "fa-bolt",
        content: `
          <p>Targeted Power Fx changes delivered immediate speed and data completeness gains:</p>
          <ul>
            <li><strong>Server-Side Filter() First:</strong> Wrapped indexed equality/date filters (<code>Status</code>, <code>Created</code>) inside a <code>With()</code> block pushed to SharePoint before running text search on the small returned slice.</li>
            <li><strong>One-Time Lookup Caching:</strong> Loaded static reference tables once at startup using <code>Concurrent(ClearCollect(...))</code> so gallery labels resolve from RAM in under a millisecond.</li>
            <li><strong>Lean Screens &amp; Explicit States:</strong> Trimmed control count, deferred secondary panels until selected, and added clean loading spinners plus user-friendly error banners.</li>
          </ul>
        `
      },
      {
        title: "Verified Impact & Before/After Code Simulator",
        icon: "fa-gauge-high",
        content: `
          <p>Deployed cleanly through <code>Dev &rarr; Test &rarr; Prod</code> Managed Solutions with column-change safety checks:</p>
          <ul>
            <li><strong>Outcome:</strong> Screen load dropped from <code>~9 seconds</code> to <code>~3 seconds</code> with <code>0</code> delegation warnings, restoring trust and day-to-day usage across operations staff.</li>
            <li><strong>Interactive Demo:</strong> Compare the exact Before vs. After Power Fx code and KPI breakdown in the <a href="../../demo-power-platform.html#rescue" style="color:var(--accent-bright); text-decoration:underline; font-weight:600;">Canvas App Rescue Simulator</a>.</li>
          </ul>
        `
      }
    ]
  },
  {
    id: "copilot-studio-hr-it-policy-bot",
    num: "12",
    category: "llm",
    categoryLabel: "Copilot Studio",
    solutionType: "Teams AI Chatbot",
    filterGroups: ["power-platform", "chatbots-voice"],
    role: "Power Platform Business Automation Specialist",
    title: "HR & IT Service Desk Policy Bot",
    cardSummary: "Microsoft Teams chatbot that answers staff policy questions from approved docs or raises a support ticket.",
    outcomeBadge: "Instant Teams Q&A + ticket handoff",
    cardTags: ["Copilot Studio", "SharePoint", "Power Automate", "Teams"],
    shortDesc: "Publishes a governed Microsoft Teams agent built in Copilot Studio with 15–20 custom topics grounded strictly in approved SharePoint policy documents—refusing to guess outside verified sources and handing unresolved requests directly to IT/HR via a Power Automate ticket flow.",
    domain: "Microsoft Copilot Studio · SharePoint Knowledge · Power Automate · Microsoft Teams",
    execution: "Confidential client M365 tenant delivery (de-identified architecture)",
    models: "Microsoft Copilot Studio · SharePoint Grounding · Power Automate Fallback · MS Teams",
    featured: false,
    liveDemo: "demo-power-platform.html#dataverse",
    liveDemoTitle: "Interactive Copilot Studio Grounding & Ticket Handoff Simulator",
    liveDemoDesc: "Test approved SharePoint document answers vs. guardrail refusal and automated Power Automate service-desk ticket creation.",
    highlights: [
      "Published inside Microsoft Teams so staff get immediate HR & IT answers without digging through intranet folders",
      "Authored 15–20 structured custom topics covering high-frequency staff questions (leave policy, expense receipts, laptop requests, password resets)",
      "Grounded strictly in approved SharePoint policy libraries with explicit refusal rules outside verified documents",
      "Power Automate fallback flow raises a service-desk ticket with user identity and conversation transcript when policy docs don't cover a case",
      "Post-launch optimization cadence: reviewed unanswered query logs to expand topics and tighten SharePoint source coverage"
    ],
    techStack: ["Microsoft Copilot Studio", "Microsoft Teams", "SharePoint Knowledge Sources", "Microsoft Power Automate", "Microsoft Entra ID Auth", "Managed Solutions ALM"],
    starSummary: {
      situation: "HR and IT service-desk staff fielded repetitive Teams messages and emails asking questions already documented across internal policy PDFs, while leadership strictly prohibited ungrounded AI answers.",
      task: "Deploy a Teams chatbot that answers recurring policy questions accurately from approved documents only, refuses to hallucinate on missing topics, and escalates uncovered edge cases seamlessly.",
      action: "Built 15–20 Copilot Studio topics grounded strictly in approved SharePoint HR/IT libraries, configured explicit no-source refusal behavior, wired a Power Automate flow to raise service-desk tickets with transcript context, and tuned topics from unanswered query logs post-launch.",
      result: "Gave employees fast 24/7 answers inside Microsoft Teams, diverted repeat policy pings away from HR/IT, prevented unverified policy fabrication, and created a measurable backlog of missing documentation."
    },
    sections: [
      {
        title: "Stakeholder Goal: Fast Teams Help Without Hallucinations",
        icon: "fa-comments",
        content: `
          <p>Employees rarely knew which SharePoint folder held the latest HR or IT guide, so they defaulted to messaging service-desk teams directly in Microsoft Teams. At the same time, HR and compliance stakeholders needed a hard rule: the bot could never guess or invent company policy.</p>
          <ul>
            <li><strong>15–20 High-Frequency Topics:</strong> Structured dedicated conversation paths for common requests such as leave balances, travel receipt limits, onboarding equipment requests, and access resets.</li>
            <li><strong>Strict SharePoint Knowledge Scope:</strong> Connected generative answers strictly to approved SharePoint HR/IT policy folders while blocking open-web fallbacks.</li>
          </ul>
        `
      },
      {
        title: "Power Automate Service-Desk Ticket Handoff",
        icon: "fa-ticket",
        content: `
          <p>When an employee asks about an edge case not covered by approved documentation, the agent bridges cleanly into human support:</p>
          <ul>
            <li><strong>Explicit Refusal Guardrail:</strong> Informs the staff member clearly when approved documents do not cover the rule instead of synthesizing an uncertain answer.</li>
            <li><strong>One-Click Ticket Flow:</strong> Calls a Power Automate flow under Service Account credentials to log a service-desk ticket containing the employee's identity, question summary, and chat context.</li>
          </ul>
        `
      },
      {
        title: "Post-Launch Tuning & Interactive Simulator",
        icon: "fa-sliders",
        content: `
          <p>Sustained accuracy through real usage telemetry and structured handover:</p>
          <ul>
            <li><strong>Continuous Topic Tuning:</strong> Reviewed unanswered query logs after rollout to spot missing synonyms, update SharePoint SOP wording, and add new topics where patterns emerged.</li>
            <li><strong>Interactive Demo:</strong> Try grounded Q&amp;A vs. guardrail fallback in Tab 3 of the <a href="../../demo-power-platform.html#dataverse" style="color:var(--accent-bright); text-decoration:underline; font-weight:600;">Power Platform &amp; Copilot Studio Simulator</a>.</li>
          </ul>
        `
      }
    ]
  }
];

// Helper functions
function getProjectById(id) {
  return PORTFOLIO_PROJECTS.find(p => p.id === id);
}

function getAllProjects() {
  return PORTFOLIO_PROJECTS;
}
