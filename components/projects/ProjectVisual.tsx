'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ProjectVisualVariant } from '@/data/projects';
import { soundController } from '@/lib/sound';

interface ProjectVisualProps {
  variant: ProjectVisualVariant;
  caption?: string;
  interactive?: boolean;
  className?: string;
}

const REPO_RIDDLE_NODES = [
  {
    id: 'server',
    label: 'WEB-ui/server.ts',
    role: 'EXPRESS PROXY',
    summary:
      'Models how the Express server packages repository context and proxies requests to @google/genai.',
  },
  {
    id: 'ast',
    label: 'AST Symbol Graph',
    role: 'DEPENDENCY TRACE',
    summary:
      'Illustrates cross-file import inspection and module dependency mapping across a repository.',
  },
  {
    id: 'genai',
    label: '@google/genai',
    role: 'REASONING LAYER',
    summary:
      'Represents the server-side Gemini SDK analysis step governed by system prompt rules.',
  },
  {
    id: 'design',
    label: 'WEB-ui/DESIGN.md',
    role: 'DESIGN TOKENS',
    summary:
      'Documents the workspace color tokens, typography scale, and Android-ui layout concepts.',
  },
];

const CARESYNC_PORTALS = [
  {
    id: 'doctor',
    label: 'Doctor View',
    cred: 'smith@neurocore.med (Seeded Demo)',
    rxStatus: 'Prescription Authoring + Auto-Suggest UI',
    qrHash: 'QR-RX-DEMO-89F2',
    metrics: 'Seeded SQLite Demo Records · ReportLab PDF Layout',
  },
  {
    id: 'admin',
    label: 'Admin View',
    cred: 'admin@neurocore.med (Seeded Demo)',
    rxStatus: 'Role-Based Session Guard (Flask)',
    qrHash: 'SEED-DB-READY',
    metrics: 'SQLAlchemy Models · Chart.js Dashboard Views',
  },
  {
    id: 'patient',
    label: 'Patient View',
    cred: 'patient@neurocore.med (Seeded Demo)',
    rxStatus: 'Downloadable PDF Prescription Format',
    qrHash: 'QR-CHECK-DEMO',
    metrics: 'Appointment History & QR Prescription Preview',
  },
];

const FACULYNK_VIEWS = [
  {
    id: 'current',
    label: 'Unbalanced Sample',
    note: 'Simulated dataset · Illustrates uneven departmental credit allocation',
    bars: [
      { name: 'Faculty A (CSE)', credits: 18, pct: 90, alert: true },
      { name: 'Faculty B (CSE)', credits: 14, pct: 70, alert: false },
      { name: 'Faculty C (CSE)', credits: 12, pct: 60, alert: false },
    ],
  },
  {
    id: 'balanced',
    label: 'Rebalanced Sample',
    note: 'Simulated rebalance · Models target credit distribution across faculty',
    bars: [
      { name: 'Faculty A (CSE)', credits: 15, pct: 75, alert: false },
      { name: 'Faculty B (CSE)', credits: 15, pct: 75, alert: false },
      { name: 'Faculty C (CSE)', credits: 14, pct: 70, alert: false },
    ],
  },
];

const READY_MAP_NODES = [
  {
    id: 'n1',
    code: '01',
    title: 'Web & TS Foundations',
    prereq: 'Entry Milestone',
    detail: 'Semantic HTML5, CSS Grid, and TypeScript fundamentals.',
  },
  {
    id: 'n2',
    code: '02',
    title: 'React 19 Architecture',
    prereq: 'Requires 01',
    detail: 'Component composition, state hooks, and Vite bundling.',
  },
  {
    id: 'n3',
    code: '03',
    title: '@xyflow/react Graphs',
    prereq: 'Requires 02',
    detail: 'Spatial node canvases, directed edges, and pan/zoom controls.',
  },
  {
    id: 'n4',
    code: '04',
    title: 'Interactive UI Motion',
    prereq: 'Requires 02 & 03',
    detail: 'Spring transitions with motion/react for node selection feedback.',
  },
];

export function ProjectVisual({
  variant,
  caption,
  interactive = true,
  className = '',
}: ProjectVisualProps) {
  const [activeRiddleIdx, setActiveRiddleIdx] = useState(0);
  const [activePortalIdx, setActivePortalIdx] = useState(0);
  const [qrVerified, setQrVerified] = useState(true);
  const [faculynkMode, setFaculynkMode] = useState<0 | 1>(0);
  const [completedNodes, setCompletedNodes] = useState<string[]>(['n1', 'n2']);
  const [selectedMapNode, setSelectedMapNode] = useState<string>('n3');

  const toggleReadyMapNode = (id: string) => {
    if (!interactive) return;
    soundController.playSubtleTick(620);
    setSelectedMapNode(id);
    setCompletedNodes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div
      className={`relative w-full bg-[#F1FAEE] overflow-hidden select-none flex flex-col justify-between ${className}`}
    >
      {/* Focused Technical Blueprint Grid inside the Simulation Viewport */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-55"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id={`grid-${variant}`}
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="#A8DADC"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${variant})`} />
      </svg>

      {/* Top Architectural Annotation Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 px-5 py-3 border-b border-[#A8DADC] text-xs font-mono text-[#1D3557] bg-[#A8DADC]/30">
        <span className="font-semibold">
          {variant === 'repo-riddle' &&
            'UI SIMULATION 01 · REPO-RIDDLE ARCHITECTURE FLOW'}
          {variant === 'caresync' &&
            'UI SIMULATION 02 · CARESYNC ROLE & QR-RX CONCEPT'}
          {variant === 'faculynk' &&
            'UI SIMULATION 03 · FACULYNK WORKLOAD CHART'}
          {variant === 'ready-map' &&
            'UI SIMULATION 04 · READY-MAP PREREQUISITE GRAPH'}
        </span>
        <span className="text-[#457B9D] font-medium">
          Interactive UI Simulation
        </span>
      </div>

      {/* Main Interactive Simulation Body */}
      <div className="relative z-10 flex-1 flex flex-col justify-between p-5 sm:p-6 min-h-[250px] gap-4">
        {/* 1. REPO-RIDDLE INTERACTIVE UI SIMULATION */}
        {variant === 'repo-riddle' && (
          <div className="space-y-4 my-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {REPO_RIDDLE_NODES.map((node, idx) => {
                const isSelected = activeRiddleIdx === idx;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => {
                      if (!interactive) return;
                      soundController.playSubtleTick(580);
                      setActiveRiddleIdx(idx);
                    }}
                    className={`p-3 text-left border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946] ${
                      isSelected
                        ? 'bg-[#1D3557] text-[#F1FAEE] border-[#1D3557]'
                        : 'bg-white text-[#1D3557] border-[#A8DADC] hover:border-[#457B9D]'
                    }`}
                  >
                    <p
                      className={`text-[10px] font-mono font-semibold ${
                        isSelected ? 'text-[#A8DADC]' : 'text-[#E63946]'
                      }`}
                    >
                      {node.role}
                    </p>
                    <p
                      className={`text-xs font-mono font-semibold mt-1 truncate ${
                        isSelected ? 'text-[#F1FAEE]' : 'text-[#1D3557]'
                      }`}
                    >
                      {node.label}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Directed Flow SVG */}
            <svg
              viewBox="0 0 520 68"
              className="w-full h-12"
              role="img"
              aria-label="Simulated Repo-Riddle pipeline from file tree inspection to Express proxy"
            >
              <line
                x1="65"
                y1="34"
                x2="455"
                y2="34"
                stroke="#457B9D"
                strokeWidth="1.75"
              />
              <motion.circle
                cx={65 + activeRiddleIdx * 130}
                cy="34"
                r="7"
                fill="#E63946"
                animate={{ cx: 65 + activeRiddleIdx * 130 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              />
              {[0, 1, 2, 3].map((step) => (
                <g key={step} transform={`translate(${65 + step * 130}, 34)`}>
                  <circle
                    r="13"
                    fill="none"
                    stroke={activeRiddleIdx === step ? '#E63946' : '#1D3557'}
                    strokeWidth="1.5"
                  />
                </g>
              ))}
            </svg>

            {/* Active Node Explanation Box */}
            <div className="p-3.5 bg-white border border-[#A8DADC] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <p className="text-[11px] font-mono font-semibold text-[#E63946]">
                  INSPECTED MODULE · {REPO_RIDDLE_NODES[activeRiddleIdx].label}
                </p>
                <p className="text-xs text-[#1D3557] leading-relaxed">
                  {REPO_RIDDLE_NODES[activeRiddleIdx].summary}
                </p>
              </div>
              <span className="text-[11px] font-mono text-[#457B9D] shrink-0">
                Select module above
              </span>
            </div>
          </div>
        )}

        {/* 2. CARESYNC / NEURO-CORE INTERACTIVE UI SIMULATION */}
        {variant === 'caresync' && (
          <div className="space-y-4 my-auto">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div
                role="group"
                aria-label="Select simulated CareSync role view"
                className="inline-flex flex-wrap items-center gap-1 bg-white p-1 border border-[#A8DADC]"
              >
                {CARESYNC_PORTALS.map((portal, idx) => (
                  <button
                    key={portal.id}
                    type="button"
                    onClick={() => {
                      if (!interactive) return;
                      soundController.playSubtleTick(560);
                      setActivePortalIdx(idx);
                    }}
                    className={`px-2.5 py-1.5 text-xs font-mono transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946] ${
                      activePortalIdx === idx
                        ? 'bg-[#1D3557] text-[#F1FAEE] font-semibold'
                        : 'text-[#457B9D] hover:text-[#1D3557]'
                    }`}
                  >
                    {portal.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  soundController.playSubtleTick(640);
                  setQrVerified((prev) => !prev);
                }}
                className="px-2.5 py-1.5 text-xs font-mono bg-white border border-[#A8DADC] text-[#1D3557] hover:border-[#E63946] hover:text-[#E63946] transition-colors cursor-pointer"
              >
                {qrVerified ? 'Demo QR: Checked' : 'Test QR Check'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-stretch">
              <div className="sm:col-span-8 bg-white border border-[#A8DADC] p-4 flex flex-col justify-between space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] font-mono text-[#457B9D]">
                  <span>DEMO ACCOUNT</span>
                  <span className="text-[#E63946] font-semibold">
                    {CARESYNC_PORTALS[activePortalIdx].cred}
                  </span>
                </div>
                <p className="text-sm font-semibold text-[#1D3557]">
                  {CARESYNC_PORTALS[activePortalIdx].rxStatus}
                </p>
                <p className="text-xs font-mono text-[#457B9D]">
                  {CARESYNC_PORTALS[activePortalIdx].metrics}
                </p>
              </div>

              {/* Stylized ReportLab QR-Rx Verification Preview */}
              <div className="sm:col-span-4 bg-white border border-[#A8DADC] p-3.5 flex flex-col items-center justify-center text-center space-y-1.5">
                <svg
                  viewBox="0 0 64 64"
                  className="w-11 h-11"
                  aria-label="Simulated ReportLab QR prescription code"
                >
                  <rect
                    x="4"
                    y="4"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="#1D3557"
                    strokeWidth="3.5"
                  />
                  <rect x="10" y="10" width="10" height="10" fill="#E63946" />
                  <rect
                    x="38"
                    y="4"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="#1D3557"
                    strokeWidth="3.5"
                  />
                  <rect x="44" y="10" width="10" height="10" fill="#1D3557" />
                  <rect
                    x="4"
                    y="38"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="#1D3557"
                    strokeWidth="3.5"
                  />
                  <rect x="10" y="44" width="10" height="10" fill="#1D3557" />
                  <rect x="38" y="38" width="10" height="10" fill="#E63946" />
                  <rect x="50" y="50" width="10" height="10" fill="#457B9D" />
                </svg>
                <p className="text-[10px] font-mono font-semibold text-[#1D3557]">
                  {CARESYNC_PORTALS[activePortalIdx].qrHash}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. FACULYNK INTERACTIVE RECHARTS WORKLOAD SIMULATION */}
        {variant === 'faculynk' && (
          <div className="space-y-4 my-auto">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono font-semibold text-[#1D3557]">
                CREDIT ALLOCATION PREVIEW
              </span>
              <div className="inline-flex items-center bg-white p-1 border border-[#A8DADC]">
                {FACULYNK_VIEWS.map((view, idx) => (
                  <button
                    key={view.id}
                    type="button"
                    onClick={() => {
                      if (!interactive) return;
                      soundController.playSubtleTick(580);
                      setFaculynkMode(idx as 0 | 1);
                    }}
                    className={`px-2.5 py-1.5 text-xs font-mono transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946] ${
                      faculynkMode === idx
                        ? 'bg-[#1D3557] text-[#F1FAEE] font-semibold'
                        : 'text-[#457B9D] hover:text-[#1D3557]'
                    }`}
                  >
                    {view.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#A8DADC] p-4 space-y-3">
              {FACULYNK_VIEWS[faculynkMode].bars.map((row) => (
                <div key={row.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#1D3557] font-medium">
                      {row.name}
                    </span>
                    <span
                      className={`tabular-nums ${
                        row.alert
                          ? 'text-[#E63946] font-semibold'
                          : 'text-[#457B9D]'
                      }`}
                    >
                      {row.credits} hrs/wk{' '}
                      {row.alert ? '· HIGH LOAD' : '· BALANCED'}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-[#F1FAEE] border border-[#A8DADC] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${row.pct}%` }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className={`h-full ${
                        row.alert ? 'bg-[#E63946]' : 'bg-[#1D3557]'
                      }`}
                    />
                  </div>
                </div>
              ))}
              <p className="text-[11px] font-mono text-[#457B9D] pt-1 border-t border-[#A8DADC]">
                {FACULYNK_VIEWS[faculynkMode].note}
              </p>
            </div>
          </div>
        )}

        {/* 4. READY-MAP INTERACTIVE @XYFLOW/REACT GRAPH SIMULATION */}
        {variant === 'ready-map' && (
          <div className="space-y-3.5 my-auto">
            <div className="flex items-center justify-between text-xs font-mono text-[#1D3557]">
              <span>SELECT A NODE TO TOGGLE MILESTONE STATE</span>
              <span className="text-[#E63946] font-semibold tabular-nums">
                {completedNodes.length} / {READY_MAP_NODES.length} DONE
              </span>
            </div>

            {/* Interactive Node Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {READY_MAP_NODES.map((node) => {
                const isDone = completedNodes.includes(node.id);
                const isSelected = selectedMapNode === node.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => toggleReadyMapNode(node.id)}
                    className={`p-3 text-left border transition-colors cursor-pointer flex flex-col justify-between gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946] ${
                      isDone
                        ? 'bg-[#1D3557] text-[#F1FAEE] border-[#1D3557]'
                        : isSelected
                          ? 'bg-white text-[#1D3557] border-[#E63946]'
                          : 'bg-white text-[#1D3557] border-[#A8DADC] hover:border-[#457B9D]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full text-[10px] font-mono">
                      <span
                        className={`tabular-nums font-semibold ${
                          isDone ? 'text-[#A8DADC]' : 'text-[#E63946]'
                        }`}
                      >
                        NODE {node.code}
                      </span>
                      <span
                        className={
                          isDone
                            ? 'text-[#E63946] font-semibold'
                            : 'text-[#457B9D]'
                        }
                      >
                        {isDone ? 'DONE' : 'NEXT'}
                      </span>
                    </div>
                    <p
                      className={`text-xs font-semibold leading-snug ${
                        isDone ? 'text-[#F1FAEE]' : 'text-[#1D3557]'
                      }`}
                    >
                      {node.title}
                    </p>
                    <p
                      className={`text-[10px] font-mono ${
                        isDone ? 'text-[#A8DADC]' : 'text-[#457B9D]'
                      }`}
                    >
                      {node.prereq}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Selected Node Readout */}
            {(() => {
              const activeNode =
                READY_MAP_NODES.find((n) => n.id === selectedMapNode) ||
                READY_MAP_NODES[0];
              return (
                <div className="p-3 bg-white border border-[#A8DADC] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-mono font-semibold text-[#E63946]">
                      PROTOTYPE NODE {activeNode.code} · {activeNode.title}
                    </p>
                    <p className="text-xs text-[#1D3557]">
                      {activeNode.detail}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-[#457B9D] shrink-0">
                    Local Prototype UI
                  </span>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Bottom Caption Footer */}
      {caption && (
        <div className="relative z-10 px-5 py-2.5 border-t border-[#A8DADC] bg-[#A8DADC]/25 flex flex-wrap items-center justify-between gap-2 text-xs text-[#457B9D]">
          <span>{caption}</span>
          <span className="font-mono text-[11px] text-[#1D3557] font-semibold shrink-0">
            PORTFOLIO UI SIMULATION
          </span>
        </div>
      )}
    </div>
  );
}
