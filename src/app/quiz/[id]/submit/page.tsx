'use client'
import Navbar from '@/components/Navbar'
import { Card, CardContent } from '@/components/ui/card'
import { signOut } from 'next-auth/react'
import React from 'react'

const Page = () => {
  const handleSignOut = () => {
    signOut()
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime/10 to-teal/10">
      <Navbar isLoggedIn onSignOut={handleSignOut} />

      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <Card className="shadow-xl border-teal-700-300">
          <CardContent className="p-12">
            <div className="animate-spin w-16 h-16 border-4 border-teal-700 border-t-transparent rounded-full mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold bg-white text-indigo-900 mb-4">
              Processing Your Submission
            </h2>
            <p className="text-secondary">
              Please wait while we calculate your results...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Page
