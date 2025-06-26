'use client'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
  const { data: session } = useSession()
  console.log(session)
  const {id} = useParams()
  const handleSignOut = () => {
    signOut()
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-100/10 to-teal-100/10">
      <Navbar isLoggedIn onSignOut={handleSignOut} />

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-6 rounded-full">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-white mb-4">
            Quiz Submitted Successfully!
          </h1>
          <p className="text-xl text-indigo-900">
            Congratulations on completing Quiz
          </p>
        </div>

        {/* Results Summary */}
        <Card className="shadow-xl border-teal-700-300 mb-8">
          <CardContent className="pt-8">
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-indigo-900/90 text-white w-full sm:w-auto"
                >
                  Back to Dashboard
                </Button>
              </Link>

              <Link href={`/quiz/${id}/result`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white w-full sm:w-auto"
                >
                  View Detailed Results
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default page
