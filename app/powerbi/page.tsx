'use client'

import { useState } from 'react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  FunnelChart,
  Funnel,
  AreaChart,
  Area,
} from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Target,
  ArrowUp,
  ArrowDown,
} from 'lucide-react'

const colors = {
  solidOrange: '#F57418',
  lightOrange: '#FA9A34',
  green: '#22C55E',
  red: '#DC2626',
  yellow: '#EAB308',
  lightGray: '#E5E7EB',
  darkGray: '#6B7280',
}

// ========== TAB 1: EXECUTIVE ==========
const executiveKPIs = [
  { label: 'Active Policies', value: '24,567', trend: '+12.5%', status: 'up' },
  { label: 'Avg Processing Time', value: '2.3 days', trend: '-8.2%', status: 'down' },
  { label: 'System Uptime', value: '99.8%', trend: '+0.2%', status: 'up' },
  { label: 'Q1 Revenue', value: '$1.65M', trend: 'vs $2.0M goal', status: 'neutral' },
]

const efficiencyData = [
  { month: 'Jan', volume: 2400, quality: 95, efficiency: 78, cost: 45 },
  { month: 'Feb', volume: 2800, quality: 96, efficiency: 82, cost: 42 },
  { month: 'Mar', volume: 3200, quality: 97, efficiency: 85, cost: 38 },
]

const policyBreakdownData = [
  { name: 'Active', value: 24567, fill: colors.green },
  { name: 'Pending', value: 3421, fill: colors.yellow },
  { name: 'Lapsed', value: 2156, fill: colors.red },
]

const mgaAdoptionData = [
  { carrier: 'Trupanion', adoption: 92, claims: 2845, avgTime: 2.1 },
  { carrier: 'Nationwide', adoption: 78, claims: 1923, avgTime: 2.8 },
  { carrier: 'ASPCA', adoption: 85, claims: 2134, avgTime: 2.4 },
  { carrier: 'PetFirst', adoption: 72, claims: 1456, avgTime: 3.2 },
  { carrier: 'Embrace', adoption: 88, claims: 2067, avgTime: 2.2 },
]

const carrierPerformanceData = [
  { carrier: 'Trupanion', processed: 2800, autoApproved: 2600, denied: 80, manual: 120 },
  { carrier: 'Nationwide', processed: 1920, autoApproved: 1500, denied: 240, manual: 180 },
  { carrier: 'ASPCA', processed: 2130, autoApproved: 1810, denied: 160, manual: 160 },
  { carrier: 'Embrace', processed: 2060, autoApproved: 1815, denied: 123, manual: 122 },
]

// ========== TAB 2: AUTOMATION ==========
const automationFunnelData = [
  { name: 'Submitted', value: 8500 },
  { name: 'MGA Routed', value: 7820 },
  { name: 'Auto-Processed', value: 7234 },
  { name: 'Completed', value: 6875 },
]

const falloutData = [
  { stage: 'MGA Validation', percentage: 8.0, volume: 680, avgTime: 2.3 },
  { stage: 'Data Quality', percentage: 7.5, volume: 630, avgTime: 1.8 },
  { stage: 'Coverage Check', percentage: 5.2, volume: 520, avgTime: 3.1 },
  { stage: 'Manual Review', percentage: 5.2, volume: 359, avgTime: 4.2 },
]

const ocrHealthData = [
  { name: 'Medical Records OCR', value: 94, fill: colors.green },
  { name: 'Invoice OCR', value: 88, fill: colors.lightOrange },
]

const practiceConnectData = [
  { month: 'Jan', active: 450, inactive: 150, churn: 25, addition: 35 },
  { month: 'Feb', active: 520, inactive: 130, churn: 20, addition: 90 },
  { month: 'Mar', active: 580, inactive: 120, churn: 18, addition: 88 },
]

const automationByTypeData = [
  { type: 'Auto-Approve', count: 3245, percentage: 45 },
  { type: 'Manual Review', count: 2134, percentage: 29 },
  { type: 'Escalation', count: 1456, percentage: 20 },
  { type: 'Failed', count: 340, percentage: 5 },
]

const processingTimeByStageData = [
  { stage: 'Submission', time: 0.2 },
  { stage: 'Routing', time: 0.5 },
  { stage: 'Processing', time: 1.2 },
  { stage: 'Approval', time: 0.3 },
  { stage: 'Notification', time: 0.1 },
]

// ========== TAB 3: QUALITY ==========
const feedbackCoverageData = [
  { metric: 'Feedback Coverage', current: 75, target: 80 },
  { metric: 'System Accuracy', current: 94, target: 96 },
  { metric: 'User Satisfaction', current: 88, target: 92 },
]

const accuracyTrendData = [
  { week: 'Week 1', accuracy: 92, reviewCount: 345 },
  { week: 'Week 2', accuracy: 94, reviewCount: 412 },
  { week: 'Week 3', accuracy: 95, reviewCount: 456 },
  { week: 'Week 4', accuracy: 96, reviewCount: 523 },
]

const overrideData = [
  { category: 'Medical Necessity', overrides: 340, percentage: 42 },
  { category: 'Coverage Decision', overrides: 280, percentage: 34 },
  { category: 'Cost Exception', overrides: 195, percentage: 24 },
]

const qualityMetrics = [
  { label: 'MRS Accuracy', value: '94.2%', trend: '+3.8%', status: 'up' },
  { label: 'Fraud Detection Rate', value: '98.5%', trend: '+1.2%', status: 'up' },
  { label: 'False Positive Rate', value: '2.1%', trend: '-0.8%', status: 'down' },
  { label: 'Manual Review Rate', value: '18%', trend: '-2.3%', status: 'down' },
]

const errorCategoriesData = [
  { category: 'Data Format', count: 234, severity: 'low' },
  { category: 'Missing Fields', count: 189, severity: 'medium' },
  { category: 'Invalid Coverage', count: 145, severity: 'high' },
  { category: 'System Error', count: 67, severity: 'critical' },
]

// ========== TAB 4: COMMERCIALS ==========
const revenueData = [
  { product: 'Claims Automation', q1: 850, q2: 920, q3: 1050, q4: 1200, growth: '+12.5%' },
  { product: 'Data Integration', q1: 550, q2: 620, q3: 710, q4: 850, growth: '+8.2%' },
  { product: 'Medical Summarizer', q1: 250, q2: 330, q3: 480, q4: 650, growth: '+15.3%' },
]

const productAdoptionData = [
  { name: 'Onboarded', value: 85 },
  { name: 'Active Users', value: 78 },
  { name: 'Engaged Daily', value: 64 },
  { name: 'Paid Tier', value: 45 },
]

const incrementalValueData = [
  { product: 'Claims Automation', value: 450, clinics: 234, users: 1200 },
  { product: 'Data Integration', value: 350, clinics: 156, users: 890 },
  { product: 'Medical Summarizer', value: 200, clinics: 89, users: 420 },
]

const financialImpactData = [
  { name: 'Base Revenue', value: 1200 },
  { name: 'New Clinics', value: 250 },
  { name: 'Automation Growth', value: 350 },
  { name: 'Product Mix', value: 200 },
  { name: 'Q1 Target', value: 2000 },
]

const customerSegmentData = [
  { segment: 'Enterprise', clinics: 45, revenue: 650, churn: '2.1%', nps: 82 },
  { segment: 'Mid-Market', clinics: 156, revenue: 580, churn: '5.3%', nps: 78 },
  { segment: 'SMB', clinics: 234, revenue: 420, churn: '8.9%', nps: 72 },
]

const revenueByGeoData = [
  { region: 'North', revenue: 620, growth: '+8.5%', adoption: '85%' },
  { region: 'South', revenue: 480, growth: '+6.2%', adoption: '78%' },
  { region: 'East', revenue: 320, growth: '+5.1%', adoption: '72%' },
  { region: 'West', revenue: 245, growth: '+3.8%', adoption: '68%' },
]

export default function PowerBIDashboard() {
  const [activeTab, setActiveTab] = useState('executive')

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#000000] mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-[#5F5F5F]">Q1 2026 Detailed Performance Analysis</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white border border-[#E5E7EB] p-1">
            <TabsTrigger
              value="executive"
              className="data-[state=active]:bg-[#F57418] data-[state=active]:text-white"
            >
              Executive
            </TabsTrigger>
            <TabsTrigger
              value="automation"
              className="data-[state=active]:bg-[#F57418] data-[state=active]:text-white"
            >
              Automation
            </TabsTrigger>
            <TabsTrigger
              value="quality"
              className="data-[state=active]:bg-[#F57418] data-[state=active]:text-white"
            >
              Quality
            </TabsTrigger>
            <TabsTrigger
              value="commercials"
              className="data-[state=active]:bg-[#F57418] data-[state=active]:text-white"
            >
              Commercials
            </TabsTrigger>
          </TabsList>

          {/* ========== EXECUTIVE TAB ========== */}
          <TabsContent value="executive" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {executiveKPIs.map((kpi, idx) => (
                <Card
                  key={idx}
                  className="bg-white border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="pt-6">
                    <p className="text-sm text-[#5F5F5F] mb-2">{kpi.label}</p>
                    <div className="flex items-end justify-between">
                      <p className="text-2xl font-bold text-[#000000]">
                        {kpi.value}
                      </p>
                      <div
                        className={`flex items-center gap-1 text-sm font-semibold ${
                          kpi.status === 'up'
                            ? 'text-green-600'
                            : kpi.status === 'down'
                              ? 'text-red-600'
                              : 'text-orange-600'
                        }`}
                      >
                        {kpi.status === 'up' ? (
                          <ArrowUp className="w-4 h-4" />
                        ) : kpi.status === 'down' ? (
                          <ArrowDown className="w-4 h-4" />
                        ) : (
                          <Target className="w-4 h-4" />
                        )}
                        {kpi.trend}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Operational Efficiency Trend */}
            <Card className="bg-white border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#000000]">
                  Operational Efficiency Trend
                </CardTitle>
                <CardDescription>Volume, Quality, Efficiency, and Cost metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={efficiencyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.lightGray} />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="volume" fill={colors.solidOrange} />
                    <Line yAxisId="left" type="monotone" dataKey="quality" stroke={colors.green} strokeWidth={2} />
                    <Line yAxisId="left" type="monotone" dataKey="efficiency" stroke={colors.darkGray} strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="cost" stroke={colors.red} strokeWidth={2} />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Policy Status Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-[#E5E7EB]">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#000000]">
                    Policy Status Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={policyBreakdownData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value.toLocaleString()}`}
                      >
                        {policyBreakdownData.map((entry, index) => (
                          <Cell key={index} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => value.toLocaleString()} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Performance Scorecard */}
              <Card className="bg-white border-[#E5E7EB]">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#000000]">
                    Key Performance Indicators
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#5F5F5F]">Claims Processed</span>
                      <span className="font-bold text-[#000000]">7,234</span>
                    </div>
                    <div className="w-full bg-[#E5E7EB] rounded-full h-2">
                      <div className="bg-[#F57418] h-2 rounded-full" style={{ width: '85%' }} />
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-[#5F5F5F]">Auto-Approval Rate</span>
                      <span className="font-bold text-[#000000]">82.4%</span>
                    </div>
                    <div className="w-full bg-[#E5E7EB] rounded-full h-2">
                      <div className="bg-[#22C55E] h-2 rounded-full" style={{ width: '82.4%' }} />
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-[#5F5F5F]">Avg Response Time</span>
                      <span className="font-bold text-[#000000]">2.3 days</span>
                    </div>
                    <div className="w-full bg-[#E5E7EB] rounded-full h-2">
                      <div className="bg-[#F57418] h-2 rounded-full" style={{ width: '72%' }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Carrier Performance Breakdown */}
            <Card className="bg-white border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#000000]">
                  MGA Carrier Performance Detailed Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={carrierPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.lightGray} />
                    <XAxis dataKey="carrier" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="autoApproved" fill={colors.green} />
                    <Bar dataKey="manual" fill={colors.solidOrange} />
                    <Bar dataKey="denied" fill={colors.red} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* MGA Adoption Table */}
            <Card className="bg-white border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#000000]">
                  MGA Carrier Adoption & Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                        <th className="text-left py-3 px-4 font-semibold text-[#000000]">
                          Carrier
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-[#000000]">
                          Adoption Rate
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-[#000000]">
                          Claims Processed
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-[#000000]">
                          Avg Processing Time
                        </th>
                        <th className="text-center py-3 px-4 font-semibold text-[#000000]">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mgaAdoptionData.map((row, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]"
                        >
                          <td className="py-3 px-4 text-[#000000] font-medium">
                            {row.carrier}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-20 bg-[#E5E7EB] rounded-full h-2">
                                <div
                                  className="bg-[#F57418] h-2 rounded-full"
                                  style={{ width: `${row.adoption}%` }}
                                />
                              </div>
                              <span className="font-semibold text-[#000000] w-8 text-right">
                                {row.adoption}%
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right text-[#000000] font-semibold">
                            {row.claims.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-right text-[#5F5F5F]">
                            {row.avgTime} days
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Badge className={row.avgTime < 2.5 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {row.avgTime < 2.5 ? 'Optimal' : 'Monitor'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========== AUTOMATION TAB ========== */}
          <TabsContent value="automation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Funnel */}
              <Card className="bg-white border-[#E5E7EB]">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#000000]">
                    Claims Processing Funnel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <FunnelChart data={automationFunnelData}>
                      <Tooltip />
                      <Funnel
                        dataKey="value"
                        data={automationFunnelData}
                        fill={colors.solidOrange}
                        stroke={colors.solidOrange}
                      >
                        {automationFunnelData.map((entry, index) => (
                          <Cell key={index} fill={colors.solidOrange} opacity={1 - index * 0.15} />
                        ))}
                      </Funnel>
                    </FunnelChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Automation Breakdown */}
              <Card className="bg-white border-[#E5E7EB]">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#000000]">
                    Automation Type Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={automationByTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={90}
                        paddingAngle={3}
                        dataKey="count"
                        label={({ type, percentage }) => `${type}: ${percentage}%`}
                      >
                        {automationByTypeData.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={
                              index === 0
                                ? colors.green
                                : index === 1
                                  ? colors.solidOrange
                                  : index === 2
                                    ? colors.yellow
                                    : colors.red
                            }
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Fallout Analysis */}
            <Card className="bg-white border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#000000]">
                  Fallout Analysis by Stage - Detailed Metrics
                  </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={falloutData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.lightGray} />
                    <XAxis dataKey="stage" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="percentage" fill={colors.red} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Fallout Table */}
            <Card className="bg-white border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#000000]">
                  Fallout Breakdown Table
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                        <th className="text-left py-3 px-4 font-semibold text-[#000000]">
                          Stage
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-[#000000]">
                          Fallout %
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-[#000000]">
                          Volume
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-[#000000]">
                          Avg Time (hours)
                        </th>
                        <th className="text-center py-3 px-4 font-semibold text-[#000000]">
                          Impact
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {falloutData.map((row, idx) => (
                        <tr key={idx} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
                          <td className="py-3 px-4 text-[#000000] font-medium">{row.stage}</td>
                          <td className="py-3 px-4 text-right">
                            <span className={row.percentage > 7 ? 'text-red-600 font-bold' : 'text-[#000000]'}>
                              {row.percentage}%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right text-[#000000]">
                            {row.volume}
                          </td>
                          <td className="py-3 px-4 text-right text-[#5F5F5F]">
                            {row.avgTime}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Badge
                              className={
                                row.percentage > 8
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }
                            >
                              {row.percentage > 8 ? 'Critical' : 'Monitor'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* OCR Health */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-[#E5E7EB]">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#000000]">
                    OCR Health Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={ocrHealthData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {ocrHealthData.map((entry, index) => (
                          <Cell key={index} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}% Accuracy`} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Practice Connect Status */}
              <Card className="bg-white border-[#E5E7EB]">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#000000]">
                    Practice Connect Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={practiceConnectData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={colors.lightGray} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="active"
                        fill={colors.green}
                        stroke={colors.green}
                        opacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="inactive"
                        fill={colors.red}
                        stroke={colors.red}
                        opacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Processing Time Breakdown */}
            <Card className="bg-white border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#000000]">
                  Average Processing Time by Stage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={processingTimeByStageData} layout="vertical" margin={{ left: 120 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.lightGray} />
                    <XAxis type="number" />
                    <YAxis dataKey="stage" type="category" width={115} />
                    <Tooltip formatter={(value) => `${value} hours`} />
                    <Bar dataKey="time" fill={colors.solidOrange} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Practice Connect Details */}
            <Card className="bg-white border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#000000]">
                  Practice Connect Monthly Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                        <th className="text-left py-3 px-4 font-semibold text-[#000000]">
                          Month
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-[#000000]">
                          Active
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-[#000000]">
                          Inactive
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-[#000000]">
                          New Additions
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-[#000000]">
                          Churn
                        </th>
                        <th className="text-center py-3 px-4 font-semibold text-[#000000]">
                          Growth %
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {practiceConnectData.map((row, idx) => {
                        const growthRate = idx === 0 ? 0 : ((row.active - practiceConnectData[idx - 1].active) / practiceConnectData[idx - 1].active * 100).toFixed(1)
                        return (
                          <tr key={idx} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
                            <td className="py-3 px-4 text-[#000000] font-medium">{row.month}</td>
                            <td className="py-3 px-4 text-right text-[#000000]">{row.active}</td>
                            <td className="py-3 px-4 text-right text-[#5F5F5F]">{row.inactive}</td>
                            <td className="py-3 px-4 text-right text-green-600 font-semibold">
                              +{row.addition}
                            </td>
                            <td className="py-3 px-4 text-right text-red-600">-{row.churn}</td>
                            <td className="py-3 px-4 text-center">
                              <span className="text-green-600 font-semibold">{growthRate}%</span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========== QUALITY TAB ========== */}
          <TabsContent value="quality" className="space-y-6">
            {/* Quality Scorecard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {qualityMetrics.map((metric, idx) => (
                <Card
                  key={idx}
                  className="bg-gradient-to-br from-[#F57418]/10 to-[#FA9A34]/10 border-[#E5E7EB]"
                >
                  <CardContent className="pt-6">
                    <p className="text-sm text-[#5F5F5F] mb-2">{metric.label}</p>
                    <div className="flex items-end justify-between">
                      <p className="text-3xl font-bold text-[#F57418]">
                        {metric.value}
                      </p>
                      <Badge
                        className={
                          metric.status === 'up'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }
                      >
                        {metric.trend}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Coverage vs Target */}
            <Card className="bg-white border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#000000]">
                  Coverage & Target Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={feedbackCoverageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.lightGray} />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="current" fill={colors.solidOrange} />
                    <Bar dataKey="target" fill={colors.lightGray} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Accuracy Trend */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-[#E5E7EB]">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#000000]">
                    System Accuracy Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={accuracyTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={colors.lightGray} />
                      <XAxis dataKey="week" />
                      <YAxis domain={[85, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="accuracy"
                        stroke={colors.green}
                        strokeWidth={3}
                        dot={{ fill: colors.solidOrange, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Override Analysis */}
              <Card className="bg-white border-[#E5E7EB]">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#000000]">
                    Manual Override Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                      data={overrideData}
                      layout="vertical"
                      margin={{ left: 120 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={colors.lightGray} />
                      <XAxis type="number" />
                      <YAxis dataKey="category" type="category" width={115} />
                      <Tooltip />
                      <Bar dataKey="overrides" fill={colors.solidOrange} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Accuracy Trend Details Table */}
            <Card className="bg-white border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#000000]">
                  Weekly Accuracy Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                        <th className="text-left py-3 px-4 font-semibold text-[#000000]">
                          Period
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-[#000000]">
                          Accuracy
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-[#000000]">
                          Records Reviewed
                        </th>
                        <th className="text-center py-3 px-4 font-semibold text-[#000000]">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {accuracyTrendData.map((row, idx) => (
                        <tr key={idx} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
                          <td className="py-3 px-4 text-[#000000] font-medium">{row.week}</td>
                          <td className="py-3 px-4 text-right">
                            <span className={row.accuracy >= 95 ? 'text-green-600 font-bold' : 'text-orange-600 font-bold'}>
                              {row.accuracy}%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right text-[#5F5F5F]">
                            {row.reviewCount}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Badge className={row.accuracy >= 95 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {row.accuracy >= 95 ? 'Good' : 'Fair'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Error Categories */}
            <Card className="bg-white border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#000000]">
                  Error Categories & Severity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                        <th className="text-left py-3 px-4 font-semibold text-[#000000]">
                          Error Category
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-[#000000]">
                          Count
                        </th>
                        <th className="text-center py-3 px-4 font-semibold text-[#000000]">
                          Severity
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {errorCategoriesData.map((row, idx) => (
                        <tr key={idx} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
                          <td className="py-3 px-4 text-[#000000]">{row.category}</td>
                          <td className="py-3 px-4 text-right text-[#000000] font-bold">
                            {row.count}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Badge
                              className={
                                row.severity === 'critical'
                                  ? 'bg-red-100 text-red-800'
                                  : row.severity === 'high'
                                    ? 'bg-orange-100 text-orange-800'
                                    : row.severity === 'medium'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-green-100 text-green-800'
                              }
                            >
                              {row.severity.charAt(0).toUpperCase() + row.severity.slice(1)}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========== COMMERCIALS TAB ========== */}
          <TabsContent value="commercials" className="space-y-6">
            {/* Revenue Trend */}
            <Card className="bg-white border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#000000]">
                  Revenue Trend by Product
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.lightGray} />
                    <XAxis dataKey="product" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value}K`} />
                    <Legend />
                    <Bar dataKey="q1" fill={colors.solidOrange} />
                    <Bar dataKey="q2" fill={colors.lightOrange} />
                    <Bar dataKey="q3" fill={colors.green} />
                    <Bar dataKey="q4" fill={colors.darkGray} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Revenue Table */}
            <Card className="bg-white border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#000000]">
                  Revenue by Product Line - Quarterly Breakdown ($K)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                        <th className="text-left py-3 px-4 font-semibold text-[#000000]">
                          Product
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-[#000000]">
                          Q1
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-[#000000]">
                          Q2
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-[#000000]">
                          Q3
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-[#000000]">
                          Q4
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-[#000000]">
                          Growth
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {revenueData.map((row, idx) => (
                        <tr key={idx} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
                          <td className="py-3 px-4 text-[#000000] font-medium">
                            {row.product}
                          </td>
                          <td className="py-3 px-4 text-right text-[#000000]">
                            ${row.q1}K
                          </td>
                          <td className="py-3 px-4 text-right text-[#000000]">
                            ${row.q2}K
                          </td>
                          <td className="py-3 px-4 text-right text-[#000000]">
                            ${row.q3}K
                          </td>
                          <td className="py-3 px-4 text-right text-[#000000]">
                            ${row.q4}K
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className="text-green-600 font-bold">{row.growth}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Product Adoption & Value */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-[#E5E7EB]">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#000000]">
                    Product Adoption Funnel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <FunnelChart data={productAdoptionData}>
                      <Tooltip />
                      <Funnel dataKey="value" data={productAdoptionData} fill={colors.solidOrange}>
                        {productAdoptionData.map((entry, index) => (
                          <Cell key={index} fill={colors.solidOrange} opacity={1 - index * 0.2} />
                        ))}
                      </Funnel>
                    </FunnelChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Incremental Value */}
              <Card className="bg-white border-[#E5E7EB]">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#000000]">
                    Incremental Value by Product ($K)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={incrementalValueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={colors.lightGray} />
                      <XAxis dataKey="product" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value}K`} />
                      <Bar dataKey="value" fill={colors.green} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Incremental Value Table */}
            <Card className="bg-white border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#000000]">
                  Product Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                        <th className="text-left py-3 px-4 font-semibold text-[#000000]">
                          Product
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-[#000000]">
                          Incremental Value ($K)
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-[#000000]">
                          Clinics Engaged
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-[#000000]">
                          Active Users
                        </th>
                        <th className="text-center py-3 px-4 font-semibold text-[#000000]">
                          Health
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {incrementalValueData.map((row, idx) => (
                        <tr key={idx} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
                          <td className="py-3 px-4 text-[#000000] font-medium">
                            {row.product}
                          </td>
                          <td className="py-3 px-4 text-right font-bold text-green-600">
                            ${row.value}K
                          </td>
                          <td className="py-3 px-4 text-right text-[#000000]">
                            {row.clinics}
                          </td>
                          <td className="py-3 px-4 text-right text-[#000000]">
                            {row.users}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Customer Segment Performance */}
            <Card className="bg-white border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#000000]">
                  Customer Segment Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                        <th className="text-left py-3 px-4 font-semibold text-[#000000]">
                          Segment
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-[#000000]">
                          Clinics
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-[#000000]">
                          Revenue ($K)
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-[#000000]">
                          Churn Rate
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-[#000000]">
                          NPS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {customerSegmentData.map((row, idx) => (
                        <tr key={idx} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
                          <td className="py-3 px-4 text-[#000000] font-medium">
                            {row.segment}
                          </td>
                          <td className="py-3 px-4 text-right text-[#000000]">
                            {row.clinics}
                          </td>
                          <td className="py-3 px-4 text-right text-[#000000]">
                            ${row.revenue}K
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className={parseFloat(row.churn) > 5 ? 'text-red-600' : 'text-green-600'}>
                              {row.churn}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right font-semibold text-[#000000]">
                            {row.nps}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Geographic Performance */}
            <Card className="bg-white border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#000000]">
                  Revenue by Geographic Region
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueByGeoData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.lightGray} />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value}K`} />
                    <Legend />
                    <Bar dataKey="revenue" fill={colors.solidOrange} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Regional Details Table */}
            <Card className="bg-white border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#000000]">
                  Regional Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                        <th className="text-left py-3 px-4 font-semibold text-[#000000]">
                          Region
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-[#000000]">
                          Revenue ($K)
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-[#000000]">
                          Growth
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-[#000000]">
                          Adoption Rate
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {revenueByGeoData.map((row, idx) => (
                        <tr key={idx} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]">
                          <td className="py-3 px-4 text-[#000000] font-medium">
                            {row.region}
                          </td>
                          <td className="py-3 px-4 text-right font-bold text-[#000000]">
                            ${row.revenue}K
                          </td>
                          <td className="py-3 px-4 text-right text-green-600 font-semibold">
                            {row.growth}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-16 bg-[#E5E7EB] rounded-full h-2">
                                <div
                                  className="bg-[#F57418] h-2 rounded-full"
                                  style={{ width: row.adoption }}
                                />
                              </div>
                              <span className="font-semibold text-[#000000] w-12 text-right">
                                {row.adoption}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
