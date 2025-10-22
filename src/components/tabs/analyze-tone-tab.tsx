"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

export default function AnalyzeToneTab({ onAnalysisComplete }: { onAnalysisComplete: (analysis: string) => void }) {
  const [transcript, setTranscript] = useState("")
  const [analysis, setAnalysis] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleAnalyze = async () => {
    if (!transcript.trim()) return

    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockAnalysis = `Tone Analysis Results:

Primary Tone: Conversational & Engaging
- Friendly and approachable language
- Direct address to audience
- Enthusiasm and energy throughout

Key Characteristics:
- Informal vocabulary
- Short, punchy sentences
- Frequent use of rhetorical questions
- Storytelling elements

Emotional Resonance:
- Inspirational and motivational
- Relatable and authentic
- Builds connection with viewers

Recommended Applications:
- Educational content
- Product reviews
- Personal vlogs
- Tutorial videos`

      setAnalysis(mockAnalysis)
      onAnalysisComplete(mockAnalysis)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(analysis)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Paste Your Video Transcript</label>
        <Textarea
          placeholder="Paste the transcript of a video whose tone you want to analyze..."
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          className="min-h-32"
        />
      </div>

      <Button
        onClick={handleAnalyze}
        disabled={!transcript.trim() || loading}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
      >
        {loading ? "Analyzing..." : "Analyze Tone"}
      </Button>

      {analysis && (
        <Card className="p-6 bg-slate-900 border-slate-700">
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-semibold text-lg">Analysis Results</h3>
            <Button variant="outline" size="sm" onClick={handleCopy} className="text-xs bg-transparent">
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <pre className="whitespace-pre-wrap text-sm text-slate-300 font-mono">{analysis}</pre>
        </Card>
      )}
    </div>
  )
}
