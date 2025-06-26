import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface NavbarProps {
  isLoggedIn?: boolean
  onSignOut?: () => void
  isHomePage?: boolean
}

const Navbar = ({
  isLoggedIn = false,
  onSignOut,
  isHomePage = false,
}: NavbarProps) => {
  return (
    <nav className="bg-indigo-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-white">QuizApp</div>
          </Link>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white hover:text-indigo-900 "
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={onSignOut}
                  variant="outline"
                  className="border-white text-indigo-900-900 hover:bg-red-600 hover:text-white"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              isHomePage && (
                <>
                  <Link href="/sign-in">
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-teal-600 hover:text-white"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button className="bg-teal-600 hover:bg-teal-400 text-white">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
