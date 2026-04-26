'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, Calendar, Filter } from 'lucide-react'
import Image from 'next/image'

const claimsData = [
  { month: 'Jan', dogs: 4200, cats: 3200, birds: 1200, exotic: 800 },
  { month: 'Feb', dogs: 4500, cats: 3400, birds: 1400, exotic: 900 },
  { month: 'Mar', dogs: 4800, cats: 3600, birds: 1300, exotic: 950 },
  { month: 'Apr', dogs: 5100, cats: 3900, birds: 1500, exotic: 1050 },
  { month: 'May', dogs: 5400, cats: 4200, birds: 1600, exotic: 1100 },
  { month: 'Jun', dogs: 5800, cats: 4500, birds: 1700, exotic: 1200 },
]

const regionData = [
  { name: 'Northeast', value: 28, fill: '#FEBCD7' },
  { name: 'Southeast', value: 22, fill: '#C4D0E6' },
  { name: 'Midwest', value: 25, fill: '#ACAC92' },
  { name: 'West', value: 25, fill: '#FA9829' },
]

const policyTypeData = [
  { type: 'Basic', premium: 2400, claims: 1600, fill: '#FEBCD7' },
  { type: 'Standard', premium: 3200, claims: 2400, fill: '#C4D0E6' },
  { type: 'Premium', premium: 4100, claims: 2800, fill: '#ACAC92' },
  { type: 'Deluxe', premium: 4900, claims: 3200, fill: '#FA9829' },
]

export default function AnalyticsDashboard() {
  const [selectedYear, setSelectedYear] = useState('2026')

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FBA43B] to-[#F57418] p-6">
      {/* Header */}
      <header className="bg-white px-6 py-3 border-b border-[#E5E7EB] shadow-sm sticky top-0 z-50 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Clarus%20-%20Full%20color-WyHkfsKMBIfHDT1HdgKN9kuIjUp9Z4.png"
              alt="Clarus Logo"
              width={140}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          <div className="flex items-center gap-3 text-xs text-[#5F5F5F]">
            <span>Last Refresh: Apr 6, 2026 · 09:41 UTC</span>
            <span className="text-[#F57418] font-semibold">|</span>
            <span className="font-semibold text-[#F57418]">Analytics View</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto mt-6">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          {/* Report Headline */}
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#000000] to-[#FA9A34] bg-clip-text text-transparent mb-2">
            Claims Analytics & Insights
          </h1>
          <p className="text-[#5F5F5F] mb-6">Detailed analysis of claims by pet type, region, and policy tier</p>

          {/* Filters */}
          <Card className="bg-white border border-[#E5E7EB] mb-6 shadow-sm">
            <CardContent className="pt-4">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#F57418]" />
                  <select className="px-3 py-2 border border-[#E5E7EB] rounded bg-[#F5F7F8] text-[#000000] text-sm">
                    <option>2024</option>
                    <option selected>2026</option>
                    <option>2025</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#F57418]" />
                  <select className="px-3 py-2 border border-[#E5E7EB] rounded bg-[#F5F7F8] text-[#000000] text-sm">
                    <option>All Quarters</option>
                    <option>Q1</option>
                    <option>Q2</option>
                    <option>Q3</option>
                    <option>Q4</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Claims by Pet Type */}
            <Card className="bg-white border border-[#E5E7EB] shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-[#F57418]">Claims Trend by Pet Type</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={claimsData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis stroke="#5F5F5F" />
                    <YAxis stroke="#5F5F5F" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#FFF8E7', border: '1px solid #E5E7EB' }}
                      labelStyle={{ color: '#000000' }}
                    />
                    <Legend wrapperStyle={{ color: '#5F5F5F' }} />
                    <Line type="monotone" dataKey="dogs" stroke="#FEBCD7" strokeWidth={2} dot={false} name="Dogs" />
                    <Line type="monotone" dataKey="cats" stroke="#C4D0E6" strokeWidth={2} dot={false} name="Cats" />
                    <Line type="monotone" dataKey="birds" stroke="#ACAC92" strokeWidth={2} dot={false} name="Birds" />
                    <Line type="monotone" dataKey="exotic" stroke="#FA9829" strokeWidth={2} dot={false} name="Exotic" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Regional Distribution */}
            <Card className="bg-white border border-[#E5E7EB] shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-[#F57418]">Claims Distribution by Region</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={regionData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {regionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Policy Type Analysis */}
          <Card className="bg-white border border-[#E5E7EB] shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-[#F57418]">Premium vs Claims by Policy Type</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={policyTypeData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="type" stroke="#5F5F5F" />
                  <YAxis stroke="#5F5F5F" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FFF8E7', border: '1px solid #E5E7EB' }}
                    labelStyle={{ color: '#000000' }}
                  />
                  <Legend wrapperStyle={{ color: '#5F5F5F' }} />
                  <Bar dataKey="premium" name="Premium Collected" fill="#FEBCD7" />
                  <Bar dataKey="claims" name="Claims Paid" fill="#C4D0E6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Insights Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="bg-gradient-to-br from-[#FFF8E7] to-white border border-[#E5E7EB] shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-[#F57418] font-semibold">Top Performing Region</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-[#000000]">Northeast</p>
                <p className="text-sm text-[#5F5F5F] flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  28% of total claims
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#FFF8E7] to-white border border-[#E5E7EB] shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-[#F57418] font-semibold">Most Claimed Pet Type</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-[#000000]">Dogs</p>
                <p className="text-sm text-[#5F5F5F] mt-1">
                  Highest claim volume YTD
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#FFF8E7] to-white border border-[#E5E7EB] shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-[#F57418] font-semibold">Avg Claims Ratio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-[#000000]">62.4%</p>
                <p className="text-sm text-[#5F5F5F] mt-1">
                  Within acceptable range
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-[#E5E7EB] text-center">
            <p className="text-xs text-[#5F5F5F]">
              This dashboard demonstrates the Clarus Pet Insurance color theme with secondary palette applied to data visualizations
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
