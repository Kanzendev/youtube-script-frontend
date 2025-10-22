"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles } from "lucide-react"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import GenerateScriptTab from "@/components/tabs/generate-script-tab"
import AnalyzeToneTab from "@/components/tabs/analyze-tone-tab"
import ReplicateToneTab from "@/components/tabs/replicate-tone-tab"

export default function Home() {
  const [activeTab, setActiveTab] = useState("generate")
  const [toneAnalysis, setToneAnalysis] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="generate" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Generate Script
            </TabsTrigger>
            <TabsTrigger value="analyze" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Analyze Tone
            </TabsTrigger>
            <TabsTrigger value="replicate" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Replicate Tone
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate">
            <GenerateScriptTab />
          </TabsContent>

          <TabsContent value="analyze">
            <AnalyzeToneTab onAnalysisComplete={setToneAnalysis} />
          </TabsContent>

          <TabsContent value="replicate">
            <ReplicateToneTab toneAnalysis={toneAnalysis} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
