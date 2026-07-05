export const experiences = [
  {
    id: 'zenalyst',
    role: 'Founding Developer',
    company: 'Zenalyst.ai',
    location: 'Bangalore',
    dateRange: 'May 2025 – Present',
    type: 'current',
    description:
      'Building a production LLM analytics platform for financial insights. Leading a 20-member engineering team.',
    highlights: [
      'Shipped POC in 7 days and MVP in 15 days — accelerated go-to-market by ~3x',
      'Architected the platform on AWS (EC2/ECS/EKS) achieving >99% uptime across microservices',
      'Designed an LLM caching layer that reduced monthly inference costs by 10%',
      'Built the External KnowledgeBase pipeline — scrapes, cleans, and indexes external sources into RAG-ready datasets, improving retrieval accuracy by ~25%',
      'Fine-tuned Financial LLMs using LoRA/QLoRA + SFT for domain-specific reasoning and SQL execution',
      'Integrated GraphRAG and structured retrieval pipelines for multi-hop reasoning over financial documents',
      'Organized a company-wide hackathon that surfaced 6+ strong engineering candidates',
    ],
    techStack: ['Python', 'FastAPI', 'AWS', 'Docker', 'LLMs', 'RAG', 'GraphRAG', 'ChromaDB'],
  },
  {
    id: 'ieee',
    role: 'Research Intern',
    company: 'IEEE Signal Processing Society',
    location: 'Gujarat Section · Remote',
    dateRange: 'May 2025 – Present',
    type: 'current',
    description:
      'Researching Self-Supervised Learning methods for medical image analysis where labeled data is scarce.',
    highlights: [
      'Identified Barlow Twins as 18-25% superior to SimCLR/BYOL in low-data medical imaging regimes through review of 20+ papers',
      'Established baseline Faster R-CNN on VinDr-CXR dataset (18K images) — 0.32 mAP',
      'Pretraining Barlow Twins encoder on 112,120 unlabeled CheXpert chest X-rays with domain-relevant augmentations',
    ],
    techStack: ['PyTorch', 'Barlow Twins', 'Faster R-CNN', 'SSL', 'Medical Imaging'],
  },
  {
    id: 'schiffer',
    role: 'Data Analyst Intern',
    company: 'Schiffer and Menezes',
    location: 'Goa',
    dateRange: 'May 2024 – July 2024',
    type: 'past',
    description:
      'Built predictive maintenance models and automated equipment log analysis for manufacturing operations.',
    highlights: [
      'Increased machine uptime by 8% with a predictive maintenance model using XGBoost — directly reduced unplanned downtime',
      'Processed and analyzed 30,000+ equipment logs to identify failure patterns and maintenance windows',
    ],
    techStack: ['Python', 'XGBoost', 'Pandas', 'NumPy', 'Matplotlib'],
  },
];
