"use client"

import { Button } from "@/components/ui/button"

export default function InputSection({ inputNotes, onInputChange, onGenerate, isLoading, hasContent }) {
  const charCount = inputNotes.length
  const maxChars = 2000

  return (
    <div className="bg-card border border-border p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-light tracking-tight text-foreground mb-2">Content Notes</h2>
        <p className="text-sm font-light text-muted-foreground">What should be included in this month's newsletter?</p>
      </div>

      <textarea
        value={inputNotes}
        onChange={(e) => onInputChange(e.target.value.slice(0, maxChars))}
        placeholder="E.g., upcoming exhibition, new series, workshop dates, sales, announcements, personal reflections..."
        className="w-full h-56 p-5 border border-border bg-background text-foreground placeholder-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none font-light"
      />

      <div className="flex justify-between items-center">
        <span className={`text-xs font-light ${charCount > 1800 ? "text-teal" : "text-muted-foreground"}`}>
          {charCount} / {maxChars} characters
        </span>
      </div>

      <Button
        onClick={onGenerate}
        disabled={inputNotes.trim().length === 0 || isLoading}
        className="w-full bg-warm-sky hover:bg-warm-sky/90 text-white font-light py-3 text-base transition-colors"
        size="lg"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Generating...
          </div>
        ) : (
          "Generate Newsletter"
        )}
      </Button>
    </div>
  )
}
