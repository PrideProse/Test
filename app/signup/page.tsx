import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  return (
    <div className="container max-w-screen-sm mx-auto px-4 py-8">
      <div className="flex flex-col items-center space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-muted-foreground">
            Join BookVerse to start your reading journey
          </p>
        </div>
        
        <AuthForm type="register" />
        
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login">
            <Button variant="link" className="p-0">
              Login
            </Button>
          </Link>
        </p>
      </div>
    </div>
  );
}