"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Target, CheckCircle2, AlertCircle } from "lucide-react"
import Image from "next/image"

const colors = {
  solidOrange: "#F57418",
  gradientOrange1: "#FBA43B",
  gradientOrange2: "#FA9A34",
  black: "#000000",
  darkGray: "#5F5F5F",
  lightGray: "#F5F7F8",
}

interface KPIItem {
  id: string
  title: string
  icon: React.ReactNode
  current?: number
  goal?: number
  unit: string
  status: "on-track" | "at-risk" | "achieved"
  trend?: number
  description: string
}

const kpis: KPIItem[] = [
  {
    id: "clinics-connected",
    title: "Clinics Connected",
    icon: <CheckCircle2 className="w-8 h-8" />,
    current: 1247,
    goal: 1500,
    unit: "clinics",
    status: "on-track",
    trend: 145,
    description: "Total integrated veterinary clinics in network (Q1 2026)",
  },
  {
    id: "revenue",
    title: "Revenue",
    icon: <TrendingUp className="w-8 h-8" />,
    goal: 2.0,
    unit: "M$",
    status: "on-track",
    description: "Total quarterly revenue target (Q1 2026)",
  },
  {
    id: "claims-automations",
    title: "Claims Automations",
    icon: <Target className="w-8 h-8" />,
    current: 8324,
    goal: 10000,
    unit: "automations",
    status: "on-track",
    trend: 1205,
    description: "Number of automated claim processing workflows (Q1 2026)",
  },
  {
    id: "medical-record-summarizer",
    title: "Medical Record Summarizer",
    icon: <CheckCircle2 className="w-8 h-8" />,
    current: 15847,
    unit: "records",
    status: "achieved",
    trend: 2340,
    description: "Total medical records summarized with AI (Q1 2026)",
  },
]

function getStatusColor(status: string): string {
  switch (status) {
    case "achieved":
      return "#22C55E"
    case "on-track":
      return "#F57418"
    case "at-risk":
      return "#DC2626"
    default:
      return "#5F5F5F"
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case "achieved":
      return "Achieved"
    case "on-track":
      return "On Track"
    case "at-risk":
      return "At Risk"
    default:
      return "Neutral"
  }
}

function calculateProgress(current: number, goal: number): number {
  const percentage = (current / goal) * 100
  return Math.min(percentage, 100)
}

export default function KPIsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FBA43B] to-[#F57418]">
      {/* Header */}
      <header className="bg-white px-6 py-3 border-b border-[#F5F7F8] shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Clarus%20-%20Full%20color-WyHkfsKMBIfHDT1HdgKN9kuIjUp9Z4.png"
              alt="Clarus Logo"
              width={140}
              height={40}
              className="h-10 w-auto"
            />
            <span className="text-[#5F5F5F] text-sm hidden sm:inline">KPI Dashboard</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#5F5F5F]">
            <span>Last Refresh: Apr 6, 2026 · 09:41 UTC</span>
            <span className="text-[#F57418] font-semibold">|</span>
            <span className="font-semibold text-[#F57418]">FY2026</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="bg-[#F5F7F8] rounded-lg p-6 shadow-lg">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#000000] to-[#FA9A34] bg-clip-text text-transparent mb-2">
              Key Performance Indicators
            </h1>
            <p className="text-[#5F5F5F] text-sm">
              Monitor your critical business metrics and track progress toward quarterly goals
            </p>
          </div>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {kpis.map((kpi) => {
              const progress = kpi.goal ? calculateProgress(kpi.current, kpi.goal) : 0
              const statusColor = getStatusColor(kpi.status)
              const statusLabel = getStatusLabel(kpi.status)

              return (
                <Card
                  key={kpi.id}
                  className="bg-white border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: `${colors.solidOrange}20` }}
                        >
                          <div style={{ color: colors.solidOrange }}>
                            {kpi.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-base font-semibold text-[#000000]">
                            {kpi.title}
                          </CardTitle>
                          <p className="text-xs text-[#5F5F5F] mt-1">
                            {kpi.description}
                          </p>
                        </div>
                      </div>
                      <div
                        className="px-2.5 py-1 rounded-full text-xs font-semibold text-white whitespace-nowrap ml-2"
                        style={{ backgroundColor: statusColor }}
                      >
                        {statusLabel}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Current Value and Goal */}
                    <div className="flex items-end justify-between">
                      {kpi.current !== undefined && (
                        <div>
                          <p className="text-xs text-[#5F5F5F] font-medium mb-1">
                            Current Value
                          </p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-[#000000]">
                              {kpi.current}
                            </span>
                            <span className="text-sm font-medium text-[#5F5F5F]">
                              {kpi.unit}
                            </span>
                          </div>
                        </div>
                      )}
                      {kpi.goal && (
                        <div className="text-right">
                          <p className="text-xs text-[#5F5F5F] font-medium mb-1">
                            Goal
                          </p>
                          <div className="flex items-baseline gap-1 justify-end">
                            <Target
                              className="w-4 h-4"
                              style={{ color: colors.solidOrange }}
                            />
                            <span className="text-lg font-semibold text-[#000000]">
                              {kpi.goal}
                            </span>
                            <span className="text-xs text-[#5F5F5F]">
                              {kpi.unit}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    {kpi.goal && kpi.current !== undefined && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-medium text-[#5F5F5F]">
                            Progress
                          </p>
                          <p className="text-xs font-semibold text-[#000000]">
                            {progress.toFixed(1)}%
                          </p>
                        </div>
                        <Progress
                          value={progress}
                          className="h-2"
                          style={{
                            backgroundColor: "#E5E7EB",
                          }}
                        />
                      </div>
                    )}

                    {/* Trend */}
                    {kpi.trend !== undefined && (
                      <div className="flex items-center gap-2 pt-2 border-t border-[#E5E7EB]">
                        <div
                          className="p-1.5 rounded-full"
                          style={{
                            backgroundColor:
                              kpi.trend > 0
                                ? "#22C55E20"
                                : kpi.trend < 0
                                  ? "#DC262620"
                                  : "#F5745820",
                          }}
                        >
                          <TrendingUp
                            className={`w-4 h-4 ${
                              kpi.trend > 0
                                ? "text-green-600 transform"
                                : kpi.trend < 0
                                  ? "text-red-600 transform rotate-180"
                                  : "text-orange-600"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-medium text-[#5F5F5F]">
                            vs. Last Period
                          </p>
                          <p
                            className="text-sm font-semibold"
                            style={{
                              color:
                                kpi.trend > 0
                                  ? "#22C55E"
                                  : kpi.trend < 0
                                    ? "#DC2626"
                                    : colors.solidOrange,
                            }}
                          >
                            {kpi.trend > 0 ? "+" : ""}
                            {kpi.trend}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Summary Section */}
          <Card className="bg-gradient-to-r from-[#F57418] to-[#FA9A34] border-0 shadow-md mt-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Q1 2026 KPI Health
                  </h3>
                  <p className="text-sm text-white/80">
                    All 4 KPIs are on track or achieved. Strong progress on clinic
                    integration and automation expansion toward 2M$ revenue target.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">100%</div>
                    <p className="text-xs text-white/80">On Track/Achieved</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-[#5F5F5F]">
            Last Updated: April 6, 2026 at 09:41 UTC | Data refreshes every hour
          </div>
        </div>
      </main>
    </div>
  )
}
