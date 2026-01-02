"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { toast } from "sonner"
import axios from "axios"
import api from "@/lib/axios"
import { Loader2, UserCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function SelectRolePage() {
  const router = useRouter()
  const [roles, setRoles] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Retrieve roles from localStorage or User state
    const userData = localStorage.getItem("user")
    if (userData) {
      try {
        const parsed = JSON.parse(userData)
        if (parsed.roles && Array.isArray(parsed.roles)) {
          setRoles(parsed.roles)
        }
      } catch (e) {
        console.error("Failed to parse user data")
      }
    }
  }, [])

  const handleSelectRole = async (roleCode: string) => {
    setIsLoading(true)
    try {
      const response = await api.post("/auth/select-role", { roleCode })
      const data = response.data

      // Update token and user data
      localStorage.setItem("token", data.data.token)
      // Update cookie
      Cookies.set("token", data.data.token, { expires: 1 })
      Cookies.remove("role_selection_pending")
      
      // Update active role in local storage (optional, mostly for UI reference)
      const userData = localStorage.getItem("user")
      if (userData) {
          const parsed = JSON.parse(userData)
          parsed.activeRole = roleCode;
          localStorage.setItem("user", JSON.stringify(parsed))
      }

      toast.success(`Role ${roleCode} selected`)
      router.push("/dashboard")
      // Refresh to ensure sidebar re-renders with new token permissions
      router.refresh() 
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            toast.error(error.response.data.message || "Failed to select role")
        } else {
            toast.error(error.message || "Something went wrong")
        }
    } finally {
      setIsLoading(false)
    }
  }

  if (roles.length === 0) {
      return (
          <div className="flex h-screen items-center justify-center">
              <Loader2 className="animate-spin" />
              <span className="ml-2">Loading roles...</span>
          </div>
      )
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-neutral-100 dark:bg-neutral-900 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Select Role</CardTitle>
          <CardDescription>
            Please select the role you wish to continue with
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            {roles.map((role) => (
                <Button 
                    key={role} 
                    variant="outline" 
                    className="h-16 justify-start text-lg px-6"
                    onClick={() => handleSelectRole(role)}
                    disabled={isLoading}
                >
                    <UserCircle className="mr-4 h-6 w-6" />
                    {role}
                </Button>
            ))}
      </CardContent>
      </Card>
    </div>
  )
}
