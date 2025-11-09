"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Download, RotateCcw } from "lucide-react"

export default function OutputSection({ newsletter, onSaveDraft, onClear, isLoading }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(newsletter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-card border border-border p-8 space-y-6">
      <h2 className="text-2xl font-light tracking-tight text-foreground">Generated Newsletter</h2>

      <div className="bg-background border border-border/50 p-8 max-h-96 overflow-auto">
        <div className="font-serif text-base leading-8 text-foreground whitespace-pre-wrap font-light">
          {newsletter}
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <Button
          onClick={handleCopy}
          variant="outline"
          size="sm"
          className="flex-1 bg-transparent border-gold/30 text-gold hover:bg-gold/5 font-light transition-colors"
        >
          <Copy size={14} />
          {copied ? "Copied!" : "Copy"}
        </Button>

        <Button
          onClick={onSaveDraft}
          variant="outline"
          size="sm"
          className="flex-1 bg-transparent border-teal/30 text-teal hover:bg-teal/5 font-light transition-colors"
          disabled={isLoading}
        >
          <Download size={14} />
          Save Draft
        </Button>

        <Button
          onClick={onClear}
          variant="ghost"
          size="sm"
          className="px-4 text-sage hover:bg-sage/10 font-light transition-colors"
        >
          <RotateCcw size={14} />
        </Button>
      </div>
    </div>
  )
}
