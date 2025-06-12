"use client"

import { useState, useEffect } from "react"
import { type User, onAuthStateChanged, signInWithEmailAndPassword, signOut, type AuthError } from "firebase/auth"
import { auth } from "@/lib/firebase"

interface AuthResult {
  success: boolean
  error?: string
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return { success: true }
    } catch (error) {
      const authError = error as AuthError
      return { success: false, error: authError.message }
    }
  }

  const logout = async (): Promise<AuthResult> => {
    try {
      await signOut(auth)
      return { success: true }
    } catch (error) {
      const authError = error as AuthError
      return { success: false, error: authError.message }
    }
  }

  return {
    user,
    loading,
    login,
    logout,
  }
}
