"use client"

import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import InputSection from "@/components/input-section"
import OutputSection from "@/components/output-section"
import FeedbackSection from "@/components/feedback-section"
import { Draft, Message, GenerateResponse } from "@/lib/types"

export default function Home() {
  const { toast } = useToast()
  const [inputNotes, setInputNotes] = useState("")
  const [generatedNewsletter, setGeneratedNewsletter] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackText, setFeedbackText] = useState("")
  const [drafts, setDrafts] = useState<Draft[]>([])
  const [selectedDraft, setSelectedDraft] = useState<Draft | null>(null)
  const [conversationHistory, setConversationHistory] = useState<Message[]>([])

  const handleGenerate = async () => {
    if (!inputNotes.trim()) {
      toast({
        title: "Error",
        description: "Please enter some content notes first",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputNotes,
          conversationHistory,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to generate newsletter")
      }

      const data: GenerateResponse = await response.json()
      setGeneratedNewsletter(data.newsletter)
      setConversationHistory(data.conversationHistory)
      setShowFeedback(true)
      toast({
        title: "Success",
        description: "Newsletter generated successfully!",
      })
    } catch (error) {
      console.error("Generation error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate newsletter. Make sure your API key is set.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleApplyFeedback = async () => {
    if (!feedbackText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some feedback first",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputNotes: feedbackText,
          conversationHistory,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to refine newsletter")
      }

      const data: GenerateResponse = await response.json()
      setGeneratedNewsletter(data.newsletter)
      setConversationHistory(data.conversationHistory)
      setFeedbackText("")
      toast({
        title: "Success",
        description: "Newsletter refined successfully!",
      })
    } catch (error) {
      console.error("Feedback error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to refine newsletter",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Load drafts from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("newsletter-drafts")
      if (saved) {
        const parsed = JSON.parse(saved)
        setDrafts(parsed)
      }
    } catch (error) {
      console.error("Failed to load drafts:", error)
    }
  }, [])

  // Save drafts to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("newsletter-drafts", JSON.stringify(drafts))
    } catch (error) {
      console.error("Failed to save drafts:", error)
    }
  }, [drafts])

  const handleSaveDraft = () => {
    const now = new Date()
    const draftName = now.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })

    const newDraft: Draft = {
      id: Date.now().toString(),
      name: draftName,
      inputNotes,
      newsletter: generatedNewsletter,
      conversationHistory,
      createdAt: now,
      updatedAt: now,
    }

    setDrafts([newDraft, ...drafts])
    toast({
      title: "Success",
      description: "Draft saved successfully!",
    })
  }

  const handleLoadDraft = (draft: Draft) => {
    setSelectedDraft(draft)
    setGeneratedNewsletter(draft.newsletter)
    setInputNotes(draft.inputNotes)
    setConversationHistory(draft.conversationHistory)
    setShowFeedback(true)
    setFeedbackText("")
  }

  const handleDeleteDraft = (id: string) => {
    setDrafts(drafts.filter((d) => d.id !== id))
    if (selectedDraft?.id === id) {
      setSelectedDraft(null)
    }
    toast({
      title: "Success",
      description: "Draft deleted",
    })
  }

  const handleClear = () => {
    setInputNotes("")
    setGeneratedNewsletter("")
    setShowFeedback(false)
    setFeedbackText("")
    setSelectedDraft(null)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar drafts={drafts} onLoadDraft={handleLoadDraft} onDeleteDraft={handleDeleteDraft} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 overflow-auto">
          <div className="max-w-3xl mx-auto p-6 md:p-12 w-full">
            <div className="flex flex-col gap-10">
              {/* Input Section */}
              <InputSection
                inputNotes={inputNotes}
                onInputChange={setInputNotes}
                onGenerate={handleGenerate}
                isLoading={isLoading}
                hasContent={generatedNewsletter.length > 0}
              />

              {/* Output Section */}
              {generatedNewsletter && (
                <div className="space-y-10">
                  <OutputSection
                    newsletter={generatedNewsletter}
                    onSaveDraft={handleSaveDraft}
                    onClear={handleClear}
                    isLoading={isLoading}
                  />

                  {/* Feedback Section */}
                  <FeedbackSection
                    feedbackText={feedbackText}
                    onFeedbackChange={setFeedbackText}
                    onApplyFeedback={handleApplyFeedback}
                    isLoading={isLoading}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
