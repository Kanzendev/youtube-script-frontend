"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Copy, Sparkles } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

export default function ReplicateToneTab({ toneAnalysis }: { toneAnalysis: string | null }) {
  const [scriptContent, setScriptContent] = useState("")
  const [replicatedScript, setReplicatedScript] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleReplicate = async () => {
    if (!scriptContent.trim() || !toneAnalysis) return

    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockReplicatedScript = `[INTRO - 0:00-0:15]
Hook: "You won't believe what I discovered..."
Establish context with the same tone and energy as the analyzed script.

[MAIN CONTENT - 0:15-2:30]
Point 1: ${scriptContent.split("\n")[0] || "Key insight"}
- Explained with matching tone and style
- Maintains the analyzed voice and pacing

Point 2: Supporting evidence
- Delivered with consistent energy
- Mirrors the original tone characteristics

Point 3: Engaging transition
- Keeps audience attention
- Follows the analyzed pattern

[OUTRO - 2:30-3:00]
Recap with matching enthusiasm
Call to action in the same voice
Sign-off that mirrors the original tone`

      setReplicatedScript(mockReplicatedScript)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(replicatedScript)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {!toneAnalysis && (
        <Card className="p-6 border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
          <p className="text-sm text-amber-900 dark:text-amber-100">
            💡 First, analyze a transcript in the "Analyze Tone" tab to extract tone characteristics, then come back
            here to replicate that tone in a new script.
          </p>
        </Card>
      )}

      <Card className="p-6">
        <label className="block text-sm font-semibold mb-3 text-foreground">Script Content to Replicate Tone</label>
        <Textarea
          placeholder="Paste the script content you want to rewrite with the analyzed tone..."
          value={scriptContent}
          onChange={(e) => setScriptContent(e.target.value)}
          className="min-h-32 resize-none"
          disabled={!toneAnalysis}
        />

        <Button
          onClick={handleReplicate}
          disabled={!scriptContent.trim() || !toneAnalysis || loading}
          className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          {loading ? (
            <>
              <Spinner className="w-4 h-4 mr-2" />
              Replicating Tone...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Replicate Tone
            </>
          )}
        </Button>
      </Card>

      {replicatedScript && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Script with Replicated Tone</h3>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-2" />
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap text-sm text-foreground font-mono overflow-auto max-h-96">
            {replicatedScript}
          </div>
        </Card>
      )}
    </div>
  )
}
