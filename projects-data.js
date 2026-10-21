/* ==========================================================================
   PORTFOLIO PROJECTS DATA REPOSITORY
   All 9 projects from Work Done.txt sanitized of proprietary brand URLs/clients
   ========================================================================== */

const PORTFOLIO_PROJECTS = [
  {
    id: "mapping-to-sql-gemma",
    num: "01",
    category: "llm",
    categoryLabel: "LLMs & Fine-Tuning",
    role: "Full-Stack AI Engineer",
    title: "Mapping-to-SQL Neural Generation Engine",
    shortDesc: "Domain-adapted Google Gemma 2B model fine-tuned with QLoRA to synthesize schema-valid SQL and structured JSON from Excel/CSV mapping rules.",
    domain: "Generative AI · LLM Fine-Tuning · Structured JSON",
    execution: "Production AI Service & Handover",
    models: "Gemma 2B · QLoRA · PyTorch",
    featured: true,
    highlights: [
      "Fine-tuned Gemma 2B using QLoRA across 1,500–2,000 synthetic pairs",
      "Handled complex SQL expressions: COALESCE, multi-table JOINs, aliases",
      "Integrated Python REST API with upload frontend & one-click clipboard copy",
      "Achieved qualitative schema convergence with monotonically decreasing loss"
    ],
    techStack: ["Google Gemma 2B", "QLoRA", "PyTorch", "Few-Shot Learning", "Python REST API", "Excel/CSV Ingestion", "JSON Schema", "ANSI SQL"],
    sections: [
      {
        title: "Executive Overview & Objective",
        icon: "fa-bullseye",
        content: `
          <p>Enterprise data migrations and warehouse consolidations require transforming legacy column-mapping spreadsheets (Excel/CSV) into production-grade data pipelines. This project engineered and fine-tuned a custom domain-specific language model to automatically ingest source-to-target data mapping spreadsheets and generate deterministic, structured JSON payloads embedding production-ready SQL queries.</p>
          <p>By eliminating manual syntax translations and standardizing relational schema generation, the engine safeguards enterprise data engineering workflows against schema drift and manual transcription oversights.</p>
        `
      },
      {
        title: "Dataset Engineering & QLoRA Fine-Tuning",
        icon: "fa-database",
        content: `
          <p>The training and generalization pipeline was constructed methodically across multiple iterative learning stages:</p>
          <ul>
            <li><strong>Baseline Benchmarking:</strong> Started with a curated set of representative mapping samples to isolate failure modes and syntax ambiguities.</li>
            <li><strong>Dataset Expansion:</strong> Expanded the training data with high-fidelity synthetic mapping-query pairs covering complex relational schemas.</li>
            <li><strong>QLoRA Parameter Efficiency:</strong> Applied 4-bit Quantized Low-Rank Adaptation (QLoRA) to Google Gemma 2B, drastically minimizing GPU memory footprints while preserving reasoning fidelity.</li>
            <li><strong>Few-Shot In-Context Strategy:</strong> Designed structured few-shot prompting patterns to generalize across unfamiliar column nomenclatures and irregular mapping tables.</li>
          </ul>
        `
      },
      {
        title: "Prompt Engineering & SQL Edge-Case Debugging",
        icon: "fa-code",
        content: `
          <p>Early model checkpoints struggled with hallucinated table aliases or missed specific nested transformation operations. The following architectural corrections were applied:</p>
          <ul>
            <li><strong>Transformation Integrity:</strong> Adjusted model context capacity and reinforced prompt constraints to reliably handle fallback handling via <code>COALESCE</code> expressions.</li>
            <li><strong>Relational Multi-Table Joins:</strong> Enforced structural correctness across Inner, Left, and Full/Right Outer joins with deterministic join-key validation.</li>
            <li><strong>Strict Column Aliasing:</strong> Eliminated ambiguity by forcing canonical alias formats.</li>
            <li><strong>Guaranteed JSON Validity:</strong> Enforced strict schema-consistent JSON syntax directly, preventing downstream deserialization errors.</li>
          </ul>
        `
      },
      {
        title: "Full-Stack API & UI Integration",
        icon: "fa-cubes",
        content: `
          <p>The model was containerized behind a high-performance Python service exposing REST API endpoints for batch mapping evaluations. An intuitive, responsive frontend interface was built to allow non-technical data architects to upload mapping spreadsheets, preview live syntax-highlighted SQL/JSON outputs, and export query specifications with a single-click copy button.</p>
          <p>The solution was packaged with deployment scripts, configuration manifests, model checkpoints, and technical documentation for production handoff.</p>
        `
      }
    ]
  },
  {
    id: "wearable-ecg-survival-model",
    num: "02",
    category: "cv",
    categoryLabel: "Deep Learning & Healthcare AI",
    role: "Deep Learning & Signal Processing Engineer",
    title: "Wearable-to-Clinical ECG Signal Transformation Pipeline",
    shortDesc: "End-to-end signal processing and deep neural transformation translating consumer wearable ECG signals toward clinical research use for AFib survival modeling.",
    domain: "Biomedical Signal Processing · Deep Learning · Survival Analysis",
    execution: "Clinical Research Pipeline Delivery",
    models: "1D U-Net · ResNet50 (Dual Attention) · 1D Autoencoder",
    featured: false,
    highlights: [
      "Built 5-step bio-signal pipeline improving Cosine Similarity to 0.77–0.96",
      "Preserved sharp R-peak morphology using PeakAware & Cosine loss combinations",
      "Investigated 1D U-Net, LSTM sequence models, and modified ResNet50",
      "Delivered publication-grade editable figures and reproducible Jupyter workflows"
    ],
    techStack: ["PyTorch", "1D U-Net", "LSTM", "ResNet50 Dual Attention", "SciPy/NumPy", "Butterworth Filtering", "R-Peak Alignment", "Survival Modeling"],
    sections: [
      {
        title: "Clinical Objective & Challenge",
        icon: "fa-heart-pulse",
        content: `
          <p>Predicting 1-year Atrial Fibrillation (AFib) recurrence from consumer wearable devices faces an extreme domain-shift barrier: single-lead smartwatches record noisier, lower-fidelity signals than 12-lead clinical ECGs, yielding weak baseline survival concordance.</p>
          <p>This initiative developed a neural transformation framework designed to align consumer wearable ECG recordings with research-grade waveform representations before feeding them into a modified ResNet50 featuring Dual Attention for risk modeling.</p>
        `
      },
      {
        title: "Deterministic 5-Step Preprocessing Pipeline",
        icon: "fa-wave-square",
        content: `
          <p>Formulated an end-to-end signal engineering pipeline that bridged the wearable and clinical research domains using paired ECG recordings:</p>
          <ul>
            <li><strong>1. Signal Resampling:</strong> Standardizing consumer sampling rates to align with hospital instrumentation frequencies.</li>
            <li><strong>2. Butterworth Bandpass Filtering:</strong> Applying a 4th-order Butterworth bandpass filter to eliminate muscle tremor and 50/60Hz electromagnetic hum.</li>
            <li><strong>3. Baseline Wander Removal:</strong> Eliminating respiratory motion drift and sensor contact variances.</li>
            <li><strong>4. Z-Score Normalization:</strong> Standardizing waveform voltage amplitudes and dynamic energy.</li>
            <li><strong>5. Peak-Based Alignment:</strong> Synchronizing localized cardiac intervals centered on R-peaks.</li>
          </ul>
          <p><strong>Metric Proof:</strong> Demonstrated that Cosine Similarity (evaluating angular morphological waveform shape agreement) is the mathematically rigorous evaluation metric over Pearson correlation once signals are synchronized within the same domain.</p>
        `
      },
      {
        title: "Deep Architectures & Multi-Objective Loss Formulations",
        icon: "fa-brain",
        content: `
          <p>Explored multiple neural transformation paradigms:</p>
          <ul>
            <li><strong>1D U-Net:</strong> Encoder-decoder architecture with skip connections engineered to reconstruct high-frequency cardiac features.</li>
            <li><strong>LSTM Sequence Models & Autoencoders:</strong> Evaluated for temporal sequence-to-sequence reconstruction.</li>
            <li><strong>Loss Function Engineering:</strong> Standard MSE produced flattened reconstructions; formulated a compound multi-objective loss combining <strong>Weighted MSE + PeakAware Loss (penalizing R-peak blunting) + Cosine Distance Loss</strong> to capture dynamic QRS complexes.</li>
          </ul>
        `
      },
      {
        title: "Experimental Findings & Deliverables",
        icon: "fa-microscope",
        content: `
          <p>While the signal preprocessing pipeline reliably achieved strong alignment, deep neural generative architectures faced substantial generalization hurdles across diverse physiological heart rate variances. The complete experimental pipeline was packaged for further research evaluation without overstating unverified downstream gains.</p>
        `
      }
    ]
  },
  {
    id: "enterprise-json-query-enhancer",
    num: "03",
    category: "llm",
    categoryLabel: "LLMs & Enterprise Systems",
    role: "Full-Stack AI Engineer",
    title: "Enterprise JSON Generator & Natural Language Query Enhancer",
    shortDesc: "High-speed enterprise system powered by Gemini Flash 2.5 to transform complex data mapping spreadsheets and ambiguous queries into optimized JSON/SQL pipelines.",
    domain: "Large Language Models · Query Optimization · Full-Stack Integration",
    execution: "Rapid Production Release (6-8 Days)",
    models: "Gemini Flash 2.5 · Natural Language to SQL",
    featured: false,
    highlights: [
      "Built complete end-to-end system with Gemini Flash 2.5 in a 6-8 day sprint",
      "Engineered dedicated Query Enhancer module for query validation and rewriting",
      "Modernized frontend interface with multi-step generation & live inspection",
      "Completed live walkthroughs with successful client handover and deployment"
    ],
    techStack: ["Google Gemini Flash 2.5", "Python REST API", "JSON Generator", "Query Enhancer", "Schema Parser", "Excel/CSV Ingestion", "JSON Schema", "Enterprise SQL"],
    sections: [
      {
        title: "Project Scope & Rapid Sprint Execution",
        icon: "fa-rocket",
        content: `
          <p>Conceived as Phase 2 of the intelligent mapping suite, this initiative expanded the architecture from raw static mapping extraction into an enterprise-grade <strong>JSON Generator & Natural Language Query Enhancer</strong> engine. The entire full-stack pipeline was architected, evaluated, and delivered in an intensive 6-to-8 day development cycle.</p>
          <p>The system was powered by Google Gemini Flash 2.5 to leverage its massive context window, low latency, and enhanced semantic comprehension of intricate enterprise database schemas.</p>
        `
      },
      {
        title: "Dual-Engine Architecture",
        icon: "fa-diagram-project",
        content: `
          <p>The platform introduced two coupled core engines:</p>
          <ul>
            <li><strong>Structured JSON Generator:</strong> Ingests complex multi-tab mapping workbooks and deterministically generates schema-compliant JSON representations preserving source, target, transformation logic, and foreign key relations.</li>
            <li><strong>Natural Language Query Enhancer:</strong> A specialized cognitive layer that ingests conversational business analyst queries, cross-references active schema definitions, and produces optimized, dialect-specific query specifications.</li>
          </ul>
        `
      },
      {
        title: "Frontend Modernization & Delivery",
        icon: "fa-desktop",
        content: `
          <p>Modernized the frontend user interface to support multi-stage generation workflows: uploading spreadsheets, inspecting AST-level query decompositions, validating schema mappings, and applying real-time enhancement overrides before final payload export.</p>
          <p>Validated the system against complex edge-case mapping spreadsheets and delivered the finalized codebase with integration documentation.</p>
        `
      }
    ]
  },
  {
    id: "ai-classroom-monitor",
    num: "04",
    category: "cv",
    categoryLabel: "Computer Vision & Edge",
    role: "Full-Stack AI Engineer (Sole Developer)",
    title: "AI Classroom Analytics & Behavior Monitoring Platform",
    shortDesc: "Real-time educational video analytics platform featuring privacy-conscious face analysis, engagement signals, and server-side video telemetry rendering.",
    domain: "Computer Vision · Video Analytics · Cloud Infrastructure · EdTech",
    execution: "Production Educational Video Analytics Platform",
    models: "AWS Rekognition Video · OpenCV · MoviePy",
    featured: false,
    highlights: [
      "Delivered an end-to-end computer vision system for educational video analytics",
      "Engineered hybrid DynamoDB/SQLite persistence with token-based security",
      "Implemented server-side video rendering with dynamic bounding-box overlays",
      "Optimized real-time dashboard video delivery via S3 pre-signed URLs"
    ],
    techStack: ["Django", "React/Vite", "AWS Rekognition Video", "OpenCV/MoviePy", "AWS DynamoDB", "SQLite", "AWS S3", "Token-Based Access"],
    sections: [
      {
        title: "System Overview & Deployment Scale",
        icon: "fa-chalkboard-user",
        content: `
          <p>Architected and built end to end, this classroom analytics platform provides instructors and researchers with objective behavioral telemetry. The system processes classroom video feeds to evaluate presence, engagement signals, and activity patterns over time.</p>
        `
      },
      {
        title: "Computer Vision & Video Rendering Pipeline",
        icon: "fa-video",
        content: `
          <p>The processing architecture combines cloud-native vision services with localized media manipulation:</p>
          <ul>
            <li><strong>Visual Presence Analysis:</strong> Integrated AWS Rekognition Video for structured visual analysis across classroom footage.</li>
            <li><strong>Engagement Signals:</strong> Classified high-level attention and activity signals across multi-frame temporal windows.</li>
            <li><strong>Server-Side Video Overlays:</strong> Built an automated rendering pipeline using OpenCV and MoviePy that composites tracking bounding boxes and behavioral heatmaps directly onto video frames.</li>
          </ul>
        `
      },
      {
        title: "Cloud Data Layer & Secure Streaming",
        icon: "fa-cloud",
        content: `
          <p>Engineered a high-throughput hybrid storage architecture:</p>
          <ul>
            <li><strong>AWS DynamoDB:</strong> Ingests millisecond-level telemetry snapshots, attention indexes, and timestamped facial detections for instant querying.</li>
            <li><strong>SQLite/PostgreSQL:</strong> Maintains transactional records and access policies guarded by role-based authentication.</li>
            <li><strong>Secure Cloud Video Delivery:</strong> Processed video assets are stored in Amazon S3 and delivered securely to the React/Vite dashboard.</li>
          </ul>
        `
      }
    ]
  },
  {
    id: "ai-healthcare-scribe",
    num: "05",
    category: "mlops",
    categoryLabel: "Healthcare AI & MLOps",
    role: "Full-Stack AI Engineer (Sole Developer)",
    title: "Automated AI Healthcare & Ambient Clinical Scribe Platform",
    shortDesc: "Multi-tenant healthcare platform utilizing OpenAI Whisper to transform domain-specific voice notes into structured clinical documentation and operational workflows.",
    domain: "Healthcare AI · Speech-to-Text · Multi-Tenant SaaS · MLOps",
    execution: "Production Multi-Tenant Healthcare Platform",
    models: "OpenAI Whisper · n8n Workflow Automation",
    featured: false,
    highlights: [
      "Built a multi-tenant healthcare SaaS platform with role-based workflows",
      "Integrated OpenAI Whisper to reduce documentation workload",
      "Engineered automated scheduling and task dispatching using n8n",
      "Formulated zero-downtime GitHub Actions CI/CD with PostgreSQL and S3"
    ],
    techStack: ["FastAPI", "React/TypeScript", "OpenAI Whisper", "n8n Workflows", "PostgreSQL", "AWS S3", "Docker", "GitHub Actions CI/CD"],
    sections: [
      {
        title: "Clinical Objective & Operational Impact",
        icon: "fa-notes-medical",
        content: `
          <p>As the full-stack engineer, I architected an automated multi-tenant healthcare platform that transforms free-form voice dictations into structured clinical documentation and reduces administrative workload.</p>
        `
      },
      {
        title: "Speech AI & EHR Structuring Engine",
        icon: "fa-microphone-lines",
        content: `
          <p>The audio intelligence pipeline converts unstructured clinical dictations into clean medical records:</p>
          <ul>
            <li><strong>OpenAI Whisper Pipeline:</strong> Transcribes domain-specific voice notes into structured text.</li>
            <li><strong>Automated Template Mapping:</strong> Post-processing parsers restructure raw transcriptions into standard EHR soap notes, symptom logs, and medication administrations.</li>
            <li><strong>Workflow Automation with n8n:</strong> Integrated automations that route completed transcriptions into follow-up tasks and operational workflows.</li>
          </ul>
        `
      },
      {
        title: "Multi-Tenant Architecture & DevOps",
        icon: "fa-shield-halved",
        content: `
          <p>The infrastructure uses multi-tenant isolation and role-based access patterns:</p>
          <ul>
            <li><strong>Granular RBAC:</strong> Role-based access control for distinct administrative and operational user groups.</li>
            <li><strong>Database Layer:</strong> Configured PostgreSQL for production alongside SQLite for automated test suites.</li>
            <li><strong>Secure Cloud Storage:</strong> Audio recordings and attachments stored in protected AWS S3 buckets.</li>
            <li><strong>CI/CD Pipelines:</strong> Formulated GitHub Actions automation running automated unit/integration tests and deploying zero-downtime updates.</li>
          </ul>
        `
      }
    ]
  },
  {
    id: "ai-quiz-generation-saas",
    num: "06",
    category: "llm",
    categoryLabel: "Generative AI & Multimodal SaaS",
    role: "Full-Stack AI Engineer (Sole Developer)",
    title: "Multimodal AI Assessment & Quiz Generation SaaS Platform",
    shortDesc: "Full-stack AI SaaS transforming unstructured text, multi-page PDFs, and visual diagrams into standardized interactive quizzes across multiple question formats.",
    domain: "Generative AI · EdTech · Multimodal Document Parsing · Microservices",
    execution: "Full-Stack SaaS Platform (FastAPI + React)",
    models: "OpenAI GPT-4 · OpenAI Vision API",
    featured: false,
    highlights: [
      "Sole full-stack developer architecting FastAPI backend & React frontend",
      "Multimodal ingestion: text, multi-page PDFs, and handwritten/drawn diagrams",
      "Supported 4 quiz types: MCQ, True/False, Fill in the Blanks, and Matching",
      "Built JWT auth, usage tracking quotas, interactive editor, and multi-format exports"
    ],
    techStack: ["FastAPI", "React/TypeScript", "OpenAI GPT", "OpenAI Vision", "MySQL/Docker", "SQLAlchemy", "Zustand", "PDF/JSON Export"],
    sections: [
      {
        title: "Platform Overview & Scope",
        icon: "fa-graduation-cap",
        content: `
          <p>Architected and built the entire full-stack software system—from the FastAPI microservices to the React/TypeScript frontend—for an AI-powered educational SaaS platform. The product allows educators, students, and corporate trainers to convert diverse study materials into interactive, verified assessment quizzes within seconds.</p>
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
    num: "07",
    category: "llm",
    categoryLabel: "Enterprise Systems & Analytics",
    role: "Full-Stack AI Engineer (Sole Developer)",
    title: "Enterprise PMS & Strategic Innovation Analytics Platform",
    shortDesc: "Enterprise project management and innovation system featuring Statistical Process Control (SPC), bilingual English/Arabic CMS, and generative AI strategy workflows.",
    domain: "Enterprise PMS · Innovation Intelligence · Statistical Process Control · Bilingual CMS",
    execution: "Full-Stack Enterprise Web Application",
    models: "Google Gemini AI · OpenAI DALL-E 3 · Statistical Process Control",
    featured: false,
    highlights: [
      "Sole full-stack developer delivering Django DRF API and React dashboard",
      "Engineered Statistical Process Control (SPC) and Cost-Benefit analysis modules",
      "Built bilingual (English/Arabic) CMS with automated AI blog and image generation",
      "Integrated real-time multi-room chat, whiteboard collaboration, and risk escalations"
    ],
    techStack: ["Django REST Framework", "React/Vite", "PostgreSQL", "Google Gemini AI", "OpenAI DALL-E 3", "Statistical Process Control", "ApexCharts", "Mermaid.js"],
    sections: [
      {
        title: "Enterprise PMS Overview",
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
    num: "08",
    category: "cv",
    categoryLabel: "HealthTech & Trimodal Emotion AI",
    role: "Full-Stack AI Engineer (Sole Developer)",
    title: "Bio-Adaptive Trimodal AI Music Meditation & Wellness Platform",
    shortDesc: "Real-time closed-loop wellness system synthesizing personalized audio soundscapes and imagery driven by trimodal facial, voice, and Arduino biometric telemetry.",
    domain: "HealthTech · Bio-Signal Processing · Trimodal Emotion AI · IoT Closed-Loop",
    execution: "Full-Stack Platform with IoT Hardware Integration",
    models: "AWS Rekognition · Hugging Face Audio · Meta MusicGen · Stable Diffusion",
    featured: false,
    highlights: [
      "Sole full-stack developer architecting sessionless Django therapy backend",
      "Trimodal emotion fusion combining AWS Rekognition, HF Transformers, and Arduino sensors",
      "Dynamic closed-loop generative wellness: live BPM modulates MusicGen and Stable Diffusion",
      "Zero-config hardware fallback to simulated telemetry and multi-CSV ZIP session export"
    ],
    techStack: ["Django", "AWS Rekognition Video", "Hugging Face Transformers", "Meta MusicGen", "Stable Diffusion", "Arduino BPM/GSR", "PySerial", "PostgreSQL"],
    sections: [
      {
        title: "Closed-Loop Wellness Concept",
        icon: "fa-spa",
        content: `
          <p>Traditional meditation applications deliver static, pre-recorded audio tracks that cannot adapt to a user's changing state. As the sole full-stack engineer, I architected a bio-adaptive closed-loop wellness system that evaluates multimodal signals in real time and synthesizes customized acoustic and visual experiences.</p>
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
    num: "09",
    category: "mlops",
    categoryLabel: "Autonomous Agents & Social MLOps",
    role: "Full-Stack AI Engineer",
    title: "Autonomous Social Content Orchestration & Multi-Agent Engine",
    shortDesc: "Multi-agent autonomous system using PyAutoGen and OpenAI to conduct live research, generate bilingual executive articles, and automate end-to-end social publication.",
    domain: "Autonomous Agents · Social Automation · LLM Orchestration · Podcast Generation",
    execution: "Production Autonomous Content Engine",
    models: "PyAutoGen · OpenAI GPT-4.1 · OpenAI TTS · DALL-E",
    featured: false,
    highlights: [
      "Architected PyAutoGen multi-agent research pipeline scouring live web & industry portals",
      "Engineered automated 3-tier comment strategy driving high organic engagement",
      "Automated dual-speaker podcast audio synthesis using OpenAI TTS and PyDub",
      "Native bilingual English/Arabic generation with scheduled queue automation"
    ],
    techStack: ["Django", "Django-Q2", "PyAutoGen", "OpenAI GPT-4.1", "OpenAI TTS", "Image Generation", "Social Platform APIs", "Gmail API/PyDub"],
    sections: [
      {
        title: "Autonomous Content Orchestration",
        icon: "fa-robot",
        content: `
          <p>Maintaining authoritative thought leadership across enterprise social channels demands continuous industry synthesis, graphic design, and community interaction. This system acts as an autonomous AI editorial team—researching trending industry reports, planning editorial calendars, generating multi-format media, and scheduling publication automatically.</p>
        `
      },
      {
        title: "Multi-Agent Research & Drafting Architecture",
        icon: "fa-network-wired",
        content: `
          <p>The platform is orchestrated via collaborative autonomous agents:</p>
          <ul>
            <li><strong>PyAutoGen Research Agents:</strong> Conduct automated industry research and extract structured insights for editorial planning.</li>
            <li><strong>Structured Editorial Planning:</strong> Plans structured briefs containing executive summaries, strategic implications, ApexCharts data series, and Mermaid.js architecture diagrams.</li>
            <li><strong>Multi-Modal Asset Creation:</strong> Automatically writes compelling post copy and synthesizes high-resolution banner graphics via OpenAI DALL-E.</li>
            <li><strong>Bilingual Localization:</strong> Native generation in English, Arabic, or dual-language parallel translations.</li>
          </ul>
        `
      },
      {
        title: "Intelligent Comment Engine & Podcast Synthesis",
        icon: "fa-podcast",
        content: `
          <p>Key operational and audience engagement capabilities:</p>
          <ul>
            <li><strong>Audience Engagement Workflows:</strong> Generates contextual follow-up content and replies aligned with each published article.</li>
            <li><strong>Content Operations:</strong> Coordinates publishing queues and engagement workflows while respecting platform policies and rate limits.</li>
            <li><strong>Dual-Speaker Podcast Synthesis:</strong> Converts generated articles into natural two-person (male/female) audio dialogues via OpenAI TTS, stitched seamlessly with PyDub.</li>
            <li><strong>Newsletter Automation:</strong> Broadcasts curated campaign digests through an email delivery workflow with unsubscribe support.</li>
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
