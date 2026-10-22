/* ==========================================================================
   PORTFOLIO PROJECTS DATA REPOSITORY
   Eight public projects. Client brand names and account URLs stay out of copy.
   ========================================================================== */

const PORTFOLIO_PROJECTS = [
  {
    id: "mapping-to-sql-gemma",
    num: "01",
    category: "llm",
    categoryLabel: "Fine-tuning",
    role: "Lead AI Engineer / MLOps",
    title: "Automated SQL Generation System",
    shortDesc: "Turns analyst mapping sheets into dialect-exact SQL with a fine-tuned 7B model that fits in 8.5 GB of VRAM.",
    domain: "LLM Fine-Tuning · PEFT / QLoRA · Enterprise Data Engineering · MLOps",
    execution: "Client delivery — local model serving",
    models: "Mistral-7B-Instruct-v0.3 · LoRA (r=8, α=16) · bitsandbytes 8-bit",
    featured: true,
    liveDemo: "demo-sql-finetuning.html",
    liveDemoTitle: "Interactive Model Evaluation & Fine-Tuning Inspector",
    liveDemoDesc: "Inspect step-by-step training loss curves (1.049 → 0.184), compare base vs fine-tuned sample SQL generation, and test typo-normalization in an interactive browser simulation.",
    highlights: [
      "Fine-tuned Mistral-7B-Instruct-v0.3 on 900 curated JSONL enterprise pairs with 8-bit QLoRA (r=8, alpha=16)",
      "Reduced cross-entropy training loss from 1.049 (step 10) to 0.184 (step 700), with a minimum of 0.173 (step 500)",
      "Engineered autonomous typo-healing: semantically resolves misspellings like 'COLEASE' to 'COALESCE'",
      "Constrained training & inference VRAM to 8.5 GB for cost-effective deployment on commodity GPUs (NVIDIA T4 / RTX 3090)",
      "Automated foreign key extraction and join alias projection (t1...tN) without cloud metadata leakage"
    ],
    techStack: ["Mistral-7B-Instruct-v0.3", "PEFT / LoRA", "bitsandbytes (8-bit)", "PyTorch", "HuggingFace SFTTrainer", "Transformers", "FastAPI", "JSONL Dataset (900 pairs)", "ANSI SQL"],
    starSummary: {
      situation: "Enterprise migrations require converting messy source-to-target mapping sheets into SQL. Off-the-shelf models repeatedly hallucinated join aliases and failed to handle null-fallback expressions.",
      task: "Fine-tune an open-source, air-gappable foundation model on 900 enterprise mapping pairs to synthesize deterministic ANSI SQL with consistent schema structure and zero cloud data leaks.",
      action: "Evaluated Google Gemma 2B baseline before adapting Mistral-7B-Instruct-v0.3 with 8-bit quantized LoRA (r=8, alpha=16); built an automated typo-healing preprocessor; served via Python API.",
      result: "Training loss dropped from 1.049 to 0.184 over 700 steps (minimum 0.173 at step 500); verified syntactically valid ANSI SQL across client test datasets; delivered valuation report with sign-off."
    },
    sections: [
      {
        title: "System Overview & Privacy-Constrained Scope",
        icon: "fa-bullseye",
        content: `
          <p>Enterprise data warehouse modernizations require converting business analyst mapping workbooks into production SQL queries. Because financial and regulatory policies strictly prohibit sending proprietary banking schemas to multi-tenant cloud APIs, the objective was building a self-contained, air-gappable neural compiler running on modest commodity GPUs (8.5 GB VRAM budget) for deterministic ANSI SQL synthesis.</p>
        `
      },
      {
        title: "Quantized LoRA Adaptation & Preprocessing",
        icon: "fa-brain",
        content: `
          <p>Base foundation models failed to resolve complex joins or suffered prompt truncation. The fine-tuning and preprocessing pipeline was engineered with:</p>
          <ul>
            <li><strong>8-Bit Quantized LoRA:</strong> Adapted Mistral-7B-Instruct-v0.3 using bitsandbytes and Hugging Face SFTTrainer (rank r=8, alpha=16) targeting attention projections (q_proj, k_proj, v_proj, o_proj) within 8.5 GB peak VRAM.</li>
            <li><strong>Dataset Curation:</strong> Built 900 verified enterprise mapping-to-SQL JSONL pairs enforcing explicit table-column relationship prompts.</li>
            <li><strong>Heuristic Typo Resilience:</strong> Pre-tokenization normalization algorithm resolving common analyst misspellings (e.g. COLEASE to COALESCE, LOWWER to LOWER) and inferring required foreign keys from join conditions.</li>
          </ul>
        `
      },
      {
        title: "System Architecture, Evaluation & Demo",
        icon: "fa-server",
        content: `
          <p>Production engineering and verification highlights:</p>
          <ul>
            <li><strong>Local API Serving:</strong> Packaged a FastAPI service with a local web UI so the client could evaluate generations without sending schemas to a multi-tenant cloud API.</li>
            <li><strong>Loss Convergence:</strong> Training cross-entropy loss decreased from 1.049 at step 10 to 0.184 at step 700 (minimum 0.173 at step 500) without general syntax degradation.</li>
            <li><strong>Dialect & Join Verification:</strong> Checked syntactic validity across client test sets, including sequential alias projection (t1..tN).</li>
            <li><strong>Interactive Demo:</strong> Inspect training loss curves, compare base vs. fine-tuned SQL generation, and test typo normalization in the <a href="../../demo-sql-finetuning.html" style="color:var(--accent-bright); text-decoration:underline; font-weight:600;">Interactive SQL Fine-Tuning Demo</a>.</li>
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
    role: "Full-Stack AI & Data Systems Engineer",
    title: "AI-Powered Query Automation",
    shortDesc: "A one-week sprint compiler that turns mapping workbooks into Spark DAG JSON and patches schemas incrementally.",
    domain: "Data Systems Engineering · Spark DAG Generation · Cloud LLMs · Data Lakehouse",
    execution: "Sprint deliverable (6–8 days)",
    models: "Google Gemini 2.0 Flash · AST Validation · Spark DAG Compiler · Flask REST API",
    featured: false,
    liveDemo: "demo-etl-generator.html",
    liveDemoTitle: "Interactive ETL DAG Compiler Demo",
    liveDemoDesc: "Explore the browser-side sample compiler: upload or choose mapping spreadsheets, inspect join keys, compile Spark DAG manifests, and test the Incremental Schema Enhancer.",
    highlights: [
      "Architected and delivered compiler system during an intensive 6–8 day client sprint",
      "Compiles 7-flow DAG manifests: Date partitions, N source extractions, unified integration, target loader",
      "Engineered Incremental Schema Enhancer: patches new tables/attributes into live DAGs without rewriting existing flows",
      "Embedded 10 automated pre-flight checks: validates service availability, sequence dependencies, and path writeability",
      "Integrated structured JSON export and interactive browser testing demo"
    ],
    techStack: ["Google Gemini 2.0 Flash", "Python / Flask REST API", "Pandas", "Apache Spark DAG Manifest", "Incremental Schema Enhancer", "ANSI SQL", "10 Pre-Flight Checks", "JSON Schema Validation"],
    starSummary: {
      situation: "During large enterprise migrations (e.g., merging banks, migrating to Snowflake), business analysts map legacy data fields to target schemas across dozens of messy Excel sheets.",
      task: "Data engineers traditionally spend 2 to 4 weeks manually handwriting thousands of lines of SQL joins, fallback rules, and pipeline DAG configs, causing human syntax errors.",
      action: "I built an AI generation engine that ingests the raw spreadsheet, automatically infers table join keys & aliases (t1...tN), converts business rules into ANSI SQL, and formats complete execution DAGs.",
      result: "Automated pipeline DAG manifest generation from spreadsheets, ensuring consistent schema structure and validating integration logic across test scenarios."
    },
    sections: [
      {
        title: "Platform Overview & Scope",
        icon: "fa-bullseye",
        content: `
          <p>Enterprise data warehouse migrations require orchestrating multi-stage Spark Directed Acyclic Graphs (DAGs) through structured JSON manifests. Designed and delivered during an intensive 6–8 day forward-deployed sprint, this compiler automates spreadsheet ingestion, schema extraction, and execution manifest synthesis with Google Gemini 2.0 Flash.</p>
        `
      },
      {
        title: "Multi-Stage Spark DAG Manifest Pipeline",
        icon: "fa-diagram-project",
        content: `
          <p>The compiler translates complex tabular mapping rules into a deterministic 7-stage Spark execution sequence:</p>
          <ul>
            <li><strong>Date Partitioning (Flow 1):</strong> Extracts execution date parameters into isolated partition dataframes to prevent full-table scans.</li>
            <li><strong>Isolated Source Extractions (Flows 2..N+1):</strong> Emits parallel extraction queries for each unique source table with sequential dataframe aliases (t1..tN).</li>
            <li><strong>Unified SQL Integration (Flow N+2):</strong> Executes joined business transformations, fallback COALESCE expressions, and registers integration tables.</li>
            <li><strong>Target Persistence (Flow N+3):</strong> Registers target warehouse write-through partitions with automated partition overwrites.</li>
          </ul>
        `
      },
      {
        title: "Incremental Schema Patching, Validation & Demo",
        icon: "fa-shield-halved",
        content: `
          <p>Production reliability and validation features:</p>
          <ul>
            <li><strong>Incremental Schema Enhancer:</strong> Core delta diffing algorithm that patches new source tables and attributes into existing live DAG manifests without rewriting tested upstream flows.</li>
            <li><strong>10 Pre-Flight Verification Checks:</strong> Validates database connectivity, target table writeability, schema compatibility, and DAG dependency acyclicity before cluster execution.</li>
            <li><strong>Schema Hygiene & AST Validation:</strong> Isolates raw JSON array boundaries and enforces schema contracts for flow IDs, sequence dependencies, and register names.</li>
            <li><strong>Interactive Demo:</strong> Test full pipeline compilation and delta schema patching in the <a href="../../demo-etl-generator.html" style="color:var(--accent-bright); text-decoration:underline; font-weight:600;">Interactive ETL DAG Compiler Demo</a>.</li>
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
    role: "Full-Stack AI Engineer (Sole Developer)",
    title: "AI Classroom Monitoring System",
    shortDesc: "Rekognition video analytics with attentiveness scoring and server-side overlay compositing for recorded lectures.",
    domain: "Computer Vision · Video Analytics · Cloud Infrastructure · Distributed Systems",
    execution: "Client delivery — classroom video analytics",
    models: "AWS Rekognition Video · OpenCV · MoviePy · AWS DynamoDB",
    featured: true,
    liveDemo: "demo-classroom-cv.html",
    liveDemoTitle: "Interactive Computer Vision Telemetry Demo",
    liveDemoDesc: "Experience live video telemetry simulation: inspect bounding boxes (faces, laptops, phones, sleeping alerts), scrub through time-aligned events, and test the mathematical attentiveness scoring algorithm in real time.",
    highlights: [
      "Engineered an end-to-end video analytics pipeline for recorded lectures: enrollment, analysis, and overlay playback",
      "Integrated AWS Rekognition Video for face search, 8 discrete emotions, and object label detection",
      "Formulated mathematical attentiveness scoring & heuristic sleeping detection (head pose roll/pitch + eye closure)",
      "Built server-side video compositing engine burning color-coded bounding-box overlays via MoviePy & OpenCV",
      "Architected DynamoDB telemetry with SQLite session metadata and S3 pre-signed HTTP Range streaming"
    ],
    techStack: ["AWS Rekognition Video", "OpenCV / MoviePy", "Django 5", "AWS DynamoDB", "AWS S3 (Pre-Signed URLs)", "SQLite", "Preact / Vite", "REST APIs", "Token Authentication"],
    starSummary: {
      situation: "Institutions require objective engagement, attendance, and distraction metrics across recorded lectures, but manual auditing is subjective and takes dozens of human proctor hours.",
      task: "Architect an end-to-end cloud video pipeline to recognize enrolled students, detect phone/sleeping distractions, score attentiveness, and burn video telemetry overlays.",
      action: "Sole developer of a Django 5 system orchestrating AWS Rekognition Video, OpenCV/MoviePy overlay compositing, mathematical scoring algorithms, and hybrid DynamoDB/SQLite persistence.",
      result: "Delivered student face search, engagement tracking, overlay playback, and secure video streaming via S3 pre-signed URLs."
    },
    sections: [
      {
        title: "Platform Overview & Scope",
        icon: "fa-graduation-cap",
        content: `
          <p>Manual classroom auditing across recorded lectures is labor-intensive and subjective. As sole full-stack developer, I architected an enterprise video intelligence platform leveraging AWS Rekognition Video and OpenCV/MoviePy to automate student face identification, detect classroom distractions, score attentiveness quantitatively, and burn visual overlays.</p>
        `
      },
      {
        title: "Asynchronous Vision Pipeline & Scoring Engine",
        icon: "fa-video",
        content: `
          <p>The platform translates raw computer vision signals into actionable pedagogical telemetry:</p>
          <ul>
            <li><strong>AWS Rekognition Video Orchestration:</strong> Parallel asynchronous jobs for student face search (75% confidence threshold against indexed collections), 8 discrete emotions, and object label detection (phones, laptops).</li>
            <li><strong>Mathematical Attentiveness Formulation:</strong> Continuous 0–100 score weighted by facial emotion confidence (60%), forward eye gaze (40%), and active mobile phone proximity penalties.</li>
            <li><strong>Multi-Factor Sleeping Detection:</strong> Sustained heuristic combining closed eyes (confidence ≥ 80%) with abnormal head pose pitch/roll (|Roll| ≥ 45° or |Pitch| ≥ 35°) across temporal windows.</li>
            <li><strong>Spatial IoU Tracking:</strong> Intersection-over-Union spatial clustering to track unrecognized visitors across frames without double-counting.</li>
          </ul>
        `
      },
      {
        title: "Compositing Engine, Cloud Persistence & Demo",
        icon: "fa-server",
        content: `
          <p>Full-stack backend architecture and deployment details:</p>
          <ul>
            <li><strong>Server-Side Overlay Compositing:</strong> OpenCV and MoviePy engine burning color-coded bounding boxes (green for enrolled, red for unauthorized/distractions) into H.264 video for instant browser playback.</li>
            <li><strong>Hybrid Storage Architecture:</strong> AWS DynamoDB for telemetry search paired with Django and SQLite for audit logs and session metadata.</li>
            <li><strong>Secure Media Delivery:</strong> S3 pre-signed URLs with dynamic 1-hour expiration and HTTP Range header streaming for buffer-free timeline scrubbing.</li>
            <li><strong>Interactive Demo:</strong> Inspect bounding boxes, scrub time-aligned distraction events, and test scoring formulas in the <a href="../../demo-classroom-cv.html" style="color:var(--accent-bright); text-decoration:underline; font-weight:600;">Interactive Computer Vision Telemetry Demo</a>.</li>
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
    role: "Full-Stack AI & Systems Engineer (Sole Developer)",
    title: "Voice AI Front Desk & EHR",
    shortDesc: "Voice Receptionist front-desk prototype where the agent talks and deterministic backend tools book, triage, and close the lab loop.",
    execution: "Architecture & working prototype",
    models: "ElevenLabs Conversational AI · n8n Workflows · FHIR R4 Adapters",
    featured: false,
    highlights: [
      "Core tenet: 'The Voice Agent talks, the Backend decides' via deterministic tool calling",
      "Swappable record backend: Standalone multi-tenant EHR, Integrated HIS adapter, or Hybrid",
      "Multi-factor patient identity verification (phone, name, DOB) resolving shared family lines",
      "Restricted Diagnostic Lab Portal with minimal field-level RBAC and report loop closure",
      "Event-driven healthcare notifications and post-call workflows automated via n8n",
      "Native HL7 FHIR R4 canonical data model aligned with ABDM and DPDP Act governance"
    ],
    techStack: ["FastAPI", "Python", "ElevenLabs Conversational AI", "n8n Workflows", "HL7 FHIR R4", "React/Next.js", "PostgreSQL", "WhatsApp API", "AWS S3", "Docker"],
    starSummary: {
      situation: "Hospitals and specialty clinics face high front-desk phone congestion and missed booking requests, while disjointed diagnostic lab reporting delays critical doctor follow-ups and patient treatment.",
      task: "Architect and build an end-to-end voice AI front desk and central electronic health record (EHR) platform capable of autonomous conversational booking, doctor consultation workflows, and lab report loop closure.",
      action: "Built inbound voice agent on ElevenLabs SIP telephony with deterministic slot reservation tools; architected swappable EHR/HIS adapters; orchestrated WhatsApp notifications and lab report alerts using n8n; implemented FHIR R4 canonical schemas and restricted diagnostic center report portals.",
      result: "Delivered working architecture and closed-loop prototype from telephony booking through lab report ingestion, implementing deterministic slot verification, emergency triage guardrails, and DPDP/HIPAA-aligned privacy controls."
    },
    sections: [
      {
        title: "Platform Overview & Architecture Modes",
        icon: "fa-shield-halved",
        content: `
          <p>CareLoop bridges conversational voice agents with hospital information infrastructure through a strict architectural principle: <strong>the voice agent talks, the backend decides</strong>. ElevenLabs manages natural dialogue and multilingual switching, while deterministic backend APIs execute doctor slot availability, patient identification, and transactional bookings without exposing database models to LLM hallucination.</p>
          <ul>
            <li><strong>Standalone Deployment (Mode A):</strong> Complete native multi-tenant EHR stack (scheduling, clinical records, doctor portal, lab portal, voice agent) for clinics without legacy systems.</li>
            <li><strong>Integrated HIS Deployment (Mode B):</strong> Connects into existing hospital information systems via swappable adapters (FHIR R4 REST, HL7 v2, database views) with write-through booking idempotency.</li>
            <li><strong>Hybrid Architecture (Mode C):</strong> High-throughput voice telephony and diagnostic ordering managed natively while mirroring patient masters to enterprise hospital databases.</li>
          </ul>
        `
      },
      {
        title: "Conversational Telephony & Clinical Workflows",
        icon: "fa-phone-volume",
        content: `
          <p>The platform orchestrates the complete patient care journey across four integrated touchpoints:</p>
          <ul>
            <li><strong>Inbound Conversational Front Desk:</strong> Ingests patient calls over SIP trunks with mandatory AI disclosure, resolves shared family phone numbers via multi-factor matching (phone, name, DOB), checks doctor slots, holds reservations, and dispatches WhatsApp/SMS confirmations.</li>
            <li><strong>Clinical Refusal & Emergency Triaging:</strong> Deterministic refusal guardrails detect acute medical emergencies (chest pain, trauma) to trigger instant emergency directives and warm transfers to hospital ops staff.</li>
            <li><strong>Doctor Consultation Portal:</strong> Clinicians review patient history, previous lab reports, and AI call transcripts, recording ICD diagnoses and issuing structured diagnostic orders with unique order IDs.</li>
            <li><strong>Minimal-Access Diagnostic Lab Portal:</strong> Diagnostic centers access operational order details with zero exposure to confidential doctor notes, uploading finalized reports to close the clinical loop.</li>
          </ul>
        `
      },
      {
        title: "Workflow Automation & Privacy Governance",
        icon: "fa-lock",
        content: `
          <p>Built to adhere to healthcare regulatory standards and data protection mandates:</p>
          <ul>
            <li><strong>Workflow Automation with n8n:</strong> Event-driven pipelines handle WhatsApp booking confirmations, payment link generation, post-call summary ingestion, and instant clinician alerts when diagnostic reports are submitted.</li>
            <li><strong>HL7 FHIR R4 Canonical Modeling:</strong> Core schemas natively model Patient, Practitioner, Slot, Appointment, ServiceRequest, and DiagnosticReport, providing an extensible foundation for ABDM (ABHA M1/M2).</li>
            <li><strong>Privacy Governance & Conformance:</strong> Purpose-specific consent capture logged with timestamp and audio verification hash, field-level RBAC, clinical note encryption, signed short-lived AWS S3 URLs, and TRAI-compliant regulated calling windows (9 AM–9 PM).</li>
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
    role: "Full-Stack AI Engineer",
    title: "Multimodal Quiz Generation SaaS",
    shortDesc: "Turns text, PDFs, and diagrams into editable quizzes across four question types.",
    domain: "Generative AI · EdTech · Multimodal Document Parsing · Microservices",
    execution: "Full-stack SaaS prototype",
    models: "OpenAI GPT-4 · OpenAI Vision API",
    featured: false,
    highlights: [
      "Sole full-stack developer architecting FastAPI backend & React frontend",
      "Multimodal ingestion: text, multi-page PDFs, and handwritten/drawn diagrams",
      "Supported 4 quiz types: MCQ, True/False, Fill in the Blanks, and Matching",
      "Built JWT auth, usage tracking quotas, interactive editor, and multi-format exports"
    ],
    techStack: ["FastAPI", "React/TypeScript", "OpenAI GPT", "OpenAI Vision", "MySQL/Docker", "SQLAlchemy", "Zustand", "PDF/JSON Export"],
    starSummary: {
      situation: "Educators and corporate trainers spend dozens of hours manually authoring quizzes and assessments from textbooks, PDFs, and hand-drawn lecture whiteboards.",
      task: "Architect an end-to-end full-stack SaaS platform capable of multimodal ingestion (text, PDFs, diagrams) to generate standardized interactive quizzes across 4 question formats.",
      action: "Sole developer of FastAPI + React/TypeScript platform; integrated OpenAI GPT-4 and Vision API; implemented JWT auth with token rotation, Zustand practice state, and PDF/JSON exporters.",
      result: "Shipped a working SaaS prototype with weekly usage quotas, four question formats, an interactive editor, and Docker Compose for MySQL."
    },
    sections: [
      {
        title: "Platform Overview & Scope",
        icon: "fa-graduation-cap",
        content: `
          <p>Architected and built the full-stack software system—from the FastAPI microservices to the React/TypeScript frontend—for an AI-powered educational SaaS platform. The product allows educators, students, and corporate trainers to convert diverse study materials into interactive assessment quizzes across multiple formats.</p>
        `
      },
      {
        title: "Multimodal Document & Vision Ingestion",
        icon: "fa-file-lines",
        content: `
          <p>The platform accepts three distinct input modalities, each parsed with dedicated pipelines:</p>
          <ul>
            <li><strong>Direct Raw Text:</strong> Paste notes, lecture outlines, or articles for prompt synthesis.</li>
            <li><strong>Smart PDF Processing:</strong> Custom document parsing extracting clean text while preserving paragraph structure, tables, and section hierarchies.</li>
            <li><strong>OpenAI Vision Integration:</strong> Ingests uploaded diagrams, lecture whiteboards, textbook screenshots, and handwritten notes to extract visual concepts into question stems.</li>
          </ul>
          <p>Supports 4 distinct assessment formats: <strong>Multiple Choice Questions (MCQ), True/False, Fill in the Blanks, and Matching pairs</strong>.</p>
        `
      },
      {
        title: "Full-Stack SaaS Architecture & State Management",
        icon: "fa-server",
        content: `
          <p>Key full-stack engineering features include:</p>
          <ul>
            <li><strong>Authentication & Security:</strong> JWT-based authentication with access and refresh tokens, automatic token rotation, and bcrypt password encryption.</li>
            <li><strong>Usage Quotas & Subscription Tiers:</strong> Database-backed rate limits tracking weekly generation counts for free users with upgrade triggers for pro accounts.</li>
            <li><strong>Interactive Quiz Editor & Practice Mode:</strong> React + Zustand state engine allowing users to take quizzes interactively with instant scoring feedback or edit questions before export.</li>
            <li><strong>Multi-Format Exporters:</strong> Programmatic export to styled PDF, JSON schemas, or plain text.</li>
            <li><strong>Containerized Infrastructure:</strong> Docker Compose running MySQL 8.0 with utf8mb4 character sets and SQLAlchemy ORM migrations.</li>
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
    role: "Junior AI Engineer",
    title: "Enterprise PMS & Innovation Analytics",
    shortDesc: "Innovation project system with statistical process control, collaboration, and a bilingual CMS.",
    domain: "Enterprise PMS · Innovation Intelligence · Statistical Process Control · Bilingual CMS",
    execution: "Full-stack enterprise web application",
    models: "Google Gemini AI · OpenAI DALL-E 3 · Statistical Process Control",
    featured: false,
    highlights: [
      "Sole full-stack developer delivering Django DRF API and React dashboard",
      "Engineered Statistical Process Control (SPC) and Cost-Benefit analysis modules",
      "Built bilingual (English/Arabic) CMS with automated AI blog and image generation",
      "Integrated real-time multi-room chat, whiteboard collaboration, and risk escalations"
    ],
    techStack: ["Django REST Framework", "React/Vite", "PostgreSQL", "Google Gemini AI", "OpenAI DALL-E 3", "Statistical Process Control", "ApexCharts", "Mermaid.js"],
    starSummary: {
      situation: "Enterprise organizations lack a unified system to guide strategic ideas from ideation to quantitative execution, resulting in disconnected spreadsheets and unmonitored delivery risks.",
      task: "Design and develop a full-stack enterprise innovation and Project Management System (PMS) featuring Statistical Process Control, bilingual CMS, and automated risk escalation.",
      action: "Sole developer building Django REST Framework + React/Vite dashboard; engineered SPC control charts, hierarchical RBAC across 3 tiers, real-time multi-room chat, and Gemini AI blog synthesis.",
      result: "Shipped enterprise platform supporting multi-tenant division hierarchies, automated Cost-Benefit analyses, bilingual English/Arabic content workflows, and real-time collaboration tools."
    },
    sections: [
      {
        title: "Platform Overview & Scope",
        icon: "fa-briefcase",
        content: `
          <p>Architected and developed the comprehensive full-stack enterprise platform—spanning Django REST Framework APIs, PostgreSQL persistence, and a modern React single-page frontend—for an innovation-driven Project Management System. The platform guides ideas systematically from initial brainstorms to structured project execution, risk escalation, and quantifiable performance auditing.</p>
        `
      },
      {
        title: "Organizational Hierarchy & Innovation Workflows",
        icon: "fa-sitemap",
        content: `
          <p>Designed structured organizational modeling accommodating enterprise complexities:</p>
          <ul>
            <li><strong>Multi-Tier Hierarchy:</strong> Organizations &gt; Divisions &gt; Departments &gt; Strategic Themes &gt; Teams &gt; Roles.</li>
            <li><strong>Generative Strategy Modules:</strong> Automated AI-assisted workflows that transform strategic briefs into problem statements, ideas, milestones, scorecards, and task breakdowns.</li>
            <li><strong>Statistical Process Control (SPC):</strong> Engineered quantitative metrics tracking, control charts, and automated Cost-Benefit data models.</li>
            <li><strong>Risk & Escalation Engine:</strong> Built risk severity scoring matrices with hierarchical approval escalations.</li>
          </ul>
        `
      },
      {
        title: "Real-Time Collaboration & Bilingual CMS",
        icon: "fa-language",
        content: `
          <p>Integrated real-time tools and publishing infrastructure:</p>
          <ul>
            <li><strong>Collaboration Suite:</strong> Multi-room user messaging and collaborative whiteboard drawing tools for cross-departmental planning.</li>
            <li><strong>Bilingual CMS Engine:</strong> Content publishing supporting English and Arabic, with rich markdown formatting, interactive ApexCharts, and Mermaid.js flowcharts.</li>
            <li><strong>Automated AI Content Synthesis:</strong> Integrated Google Gemini AI for drafting comprehensive strategic articles and OpenAI DALL-E 3 for generating branded high-resolution banner imagery.</li>
          </ul>
        `
      }
    ]
  },
  {
    id: "bio-adaptive-music-meditation",
    num: "07",
    category: "cv",
    categoryLabel: "Production ML",
    role: "Backend Engineer",
    title: "Bio-Adaptive AI Music & Wellness",
    shortDesc: "Closed-loop generative audio and imagery from face, voice, and sensor readings, with a hardware fallback.",
    domain: "HealthTech · Bio-Signal Processing · Trimodal Emotion AI · IoT Closed-Loop",
    execution: "Wellness research prototype with IoT hardware",
    models: "AWS Rekognition · Hugging Face Audio · Meta MusicGen · Stable Diffusion",
    featured: false,
    highlights: [
      "Django backend with session auth for users and session-stored guest preferences",
      "Trimodal emotion fusion combining AWS Rekognition, HF Transformers, and Arduino sensors",
      "Dynamic closed-loop generative wellness: live BPM modulates MusicGen and Stable Diffusion",
      "Zero-config hardware fallback to simulated telemetry and multi-CSV ZIP session export"
    ],
    techStack: ["Django", "AWS Rekognition Video", "Hugging Face Transformers", "Meta MusicGen", "Stable Diffusion", "Arduino BPM/GSR", "PySerial", "PostgreSQL"],
    starSummary: {
      situation: "Conventional wellness and meditation applications deliver static pre-recorded audio tracks that cannot respond to a user's fluctuating physiological state or autonomic stress.",
      task: "Build a bio-adaptive closed-loop wellness prototype that evaluates multimodal signals in real time and synthesizes personalized generative soundscapes as sole developer.",
      action: "Built a Django backend with session login and guest-preference storage; fused facial (Rekognition), voice (Hugging Face), and Arduino BPM/GSR signals; modulated MusicGen and image generation from that state.",
      result: "Achieved real-time closed-loop synthesis with zero-config hardware fallback, 9 accessibility profile parameters, and automated multi-CSV ZIP session telemetry export for research."
    },
    sections: [
      {
        title: "Platform Overview & Closed-Loop Concept",
        icon: "fa-spa",
        content: `
          <p>Traditional meditation applications deliver static, pre-recorded audio tracks that cannot adapt to a user's changing state. As the sole backend engineer, I built a Django wellness API with session login for registered users and session-stored guest preferences, then closed the loop from multimodal signals to generative audio and imagery.</p>
        `
      },
      {
        title: "Trimodal Emotion Fusion & Precedence Engine",
        icon: "fa-dna",
        content: `
          <p>The system establishes baseline and real-time affective states through a fused trimodal architecture:</p>
          <ul>
            <li><strong>1. Facial Emotion Telemetry:</strong> AWS Rekognition Video integration analyzing batch facial frames with confidence-weighted voting.</li>
            <li><strong>2. Vocal Tone Analysis:</strong> Hugging Face Transformer audio model predicting emotional valence and arousal from recorded voice reflections.</li>
            <li><strong>3. Biometric Telemetry:</strong> Continuous heart rate (Pulse BPM) and Galvanic Skin Response (GSR) signals via physical sensors.</li>
            <li><strong>Adaptive State Fusion:</strong> Combined user-reported state, biometric signals, and multimodal model predictions into a unified session state.</li>
          </ul>
        `
      },
      {
        title: "Generative Audio/Visuals & Hardware Integration",
        icon: "fa-microchip",
        content: `
          <p>Technical implementation details across software and hardware layers:</p>
          <ul>
            <li><strong>Generative Bio-Loop:</strong> User BPM and inferred state are continuously injected into Meta MusicGen audio prompts to guide musical tempo and timbre, while Stable Diffusion synthesizes synchronized visual imagery.</li>
            <li><strong>Arduino IoT Integration:</strong> Direct serial communication interfacing pulse sensors, galvanic sensors, and haptic vibrator motors for tactile breathing pacing.</li>
            <li><strong>Smart Mock Fallback:</strong> Automatic zero-config fallback to realistic synthetic telemetry when physical Arduino hardware is disconnected.</li>
            <li><strong>Accessibility & Export:</strong> Added accessibility controls and complete time-series session export for research and evaluation.</li>
          </ul>
        `
      }
    ]
  },
  {
    id: "autonomous-social-content-engine",
    num: "08",
    category: "mlops",
    categoryLabel: "Customer integration",
    role: "Junior AI Engineer",
    title: "LinkedIn Content Operations Platform",
    shortDesc: "Django app that researches, queues, and publishes bilingual LinkedIn posts, long-form articles, comments, and podcasts.",
    domain: "Content Operations · LinkedIn API · Background Queues · Bilingual Publishing",
    execution: "Client delivery — Django publishing operations",
    models: "OpenAI GPT-4.1 · OpenAI TTS · Image generation · Django-Q2",
    featured: true,
    highlights: [
      "Category-based LinkedIn posts in English or Arabic, with generated images, for personal or company pages",
      "Research articles via OpenAI web search, a consulting-insights search API, and structured section planning with charts",
      "Django-Q2 weekly automation that pre-builds the next five days of drafts and skips duplicate slots",
      "Three-step comment chain into the client CMS, plus replies that tag commenters and avoid duplicate replies",
      "Gmail newsletters with signed unsubscribe links, dual-speaker podcasts, and a post analytics dashboard"
    ],
    techStack: ["Django 3.2", "OpenAI Responses API", "Django-Q2", "LinkedIn OAuth 2.0", "OpenAI TTS", "PyDub", "Gmail API", "BeautifulSoup", "Pillow"],
    starSummary: {
      situation: "Publishing thought leadership meant researching a topic, writing a post and a long article, recording audio, and answering comments — twice, for English and Arabic.",
      task: "Build one Django application that drafts that package, queues it, publishes through official APIs, and engages without burst-posting.",
      action: "Implemented a research generator on OpenAI web search and structured outputs, a five-day Django-Q2 lookahead, LinkedIn OAuth, a three-step comment and reply pipeline, and dual-speaker text-to-speech.",
      result: "Operators review pre-generated drafts, publish to personal or company pages, and keep comments, newsletters, and podcasts on the same record. Rate limits and token checks sit in the queue, not in a promise of zero policy risk."
    },
    sections: [
      {
        title: "Product Surface",
        icon: "fa-layer-group",
        content: `
          <p>The product is a Django operations console for one publishing team, not a generic social network bot. The surfaces that shipped:</p>
          <ul>
            <li><strong>Posts:</strong> Category and subcategory prompts, OpenAI draft text, generated images, English or Arabic, and a choice of personal or company LinkedIn page.</li>
            <li><strong>Articles:</strong> A pluggable research generator that plans sections, charts, and diagrams, then stores bilingual article fields on the same record as the post.</li>
            <li><strong>Schedule:</strong> One-off scheduled prompts and weekly rules. A background worker pre-generates the next five days.</li>
            <li><strong>Engagement:</strong> Three sequential comments after publish, plus a reply view that answers comments on posts already sent.</li>
            <li><strong>Distribution:</strong> Gmail newsletter lists with signed unsubscribe links, dual-speaker podcast audio, and an analytics dashboard for published posts.</li>
          </ul>
        `
      },
      {
        title: "Research Pipeline",
        icon: "fa-magnifying-glass",
        content: `
          <p>Long-form articles use <code>ResearchV1Generator</code>. It is an OpenAI Responses pipeline with structured outputs, not a five-agent theatre.</p>
          <ul>
            <li><strong>Web search:</strong> A research call with the web-search tool gathers notes and chart-ready figures for the topic.</li>
            <li><strong>Consulting-insights search:</strong> A search-term model queries an external insights index, then BeautifulSoup pulls article text for the planner.</li>
            <li><strong>Plan and write:</strong> Structured parsing produces a title and sections (including whether a chart or diagram is needed), then section, chart, and Mermaid calls fill the article. English and Arabic are both stored.</li>
            <li><strong>Where AutoGen fits:</strong> Some post-generation views use an AutoGen assistant as an optional helper. The research path itself is the Responses API.</li>
          </ul>
        `
      },
      {
        title: "Queue and LinkedIn Constraints",
        icon: "fa-clock",
        content: `
          <p>Scheduling is Django-Q2 against the application database, so the app does not need a separate Redis broker.</p>
          <ul>
            <li><strong>Five-day lookahead:</strong> A daily midnight job walks today plus four days, matches weekday rules, picks a subcategory, and generates text and an image. If a prompt already exists for that time and topic, it is skipped.</li>
            <li><strong>OAuth:</strong> Personal and company pages use LinkedIn OAuth. Access tokens last about 60 days; a health check warns operators before expiry and refreshes when a refresh token is available.</li>
            <li><strong>Replies:</strong> Mentioning someone in a reply requires a <code>urn:li:person</code> tag. The reply job records which comments were already answered and waits with jitter between calls so the account does not burst-reply.</li>
            <li><strong>Comments:</strong> After a successful publish, three comments go out in order: a deeper point from the post, a hook into a related article on the client CMS, and a call to action. The CMS is selected by the model from the client's blog API. The public write-up does not name that product.</li>
          </ul>
        `
      },
      {
        title: "Trade-offs",
        icon: "fa-scale-balanced",
        content: `
          <p>Choices that kept the deployment small:</p>
          <ul>
            <li><strong>Django-Q2 instead of Celery:</strong> The queue runs on the relational database. That avoids operating Redis for a single publishing app, at the cost of less isolation than a dedicated broker.</li>
            <li><strong>OpenAI TTS instead of a specialist voice vendor:</strong> Dual-speaker English and Arabic podcasts are stitched with PyDub from alternating TTS clips. The voices are consistent and priced per character; they are not a studio recording.</li>
            <li><strong>Approval before publish:</strong> Weekly automation prepares drafts. A person still approves what goes to LinkedIn. The system does not claim unattended posting is risk-free.</li>
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
