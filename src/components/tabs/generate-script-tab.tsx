"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Sparkles } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

const EXAMPLE_PROMPTS = [
  "Tech review for a new smartphone",
  "Gaming tutorial for beginners",
  "Travel vlog script",
  "Product unboxing",
  "Educational explainer video",
]

export default function GenerateScriptTab() {
  const [topic, setTopic] = useState("")
  const [script, setScript] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    if (!topic.trim()) return

    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockScript = `[INTRO - 0:00-0:15]
Hook: "Wait until you see this..."
Establish the topic and why viewers should care.

[MAIN CONTENT - 0:15-2:30]
Point 1: Key insight about ${topic}
- Explain with examples
- Show visuals

Point 2: Why this matters
- Real-world application
- Audience benefit

Point 3: Call to action
- Encourage engagement

[OUTRO - 2:30-3:00]
Recap main points
Subscribe CTA
Thank you message`

      setScript(mockScript)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(script)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleExampleClick = (prompt: string) => {
    setTopic(prompt)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <label className="block text-sm font-semibold mb-3 text-foreground">Script Topic or Description</label>
        <Textarea
          placeholder="Describe what your YouTube script should be about..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="min-h-32 resize-none"
        />

        <div className="mt-4 space-y-3">
          <p className="text-xs font-medium text-muted-foreground">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_PROMPTS.map((prompt) => (
              <Badge
                key={prompt}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => handleExampleClick(prompt)}
              >
                {prompt}
              </Badge>
            ))}
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={!topic.trim() || loading}
          className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          {loading ? (
            <>
              <Spinner className="w-4 h-4 mr-2" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Script
            </>
          )}
        </Button>
      </Card>

      {script && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Generated Script</h3>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-2" />
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap text-sm text-foreground font-mono overflow-auto max-h-96">
            {script}
          </div>
        </Card>
      )}
    </div>
  )
}
