import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="container max-w-screen-sm mx-auto px-4 py-8">
      <div className="flex flex-col items-center space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">
            Login to your account to continue your reading journey
          </p>
        </div>
        
        <AuthForm type="login" />
        
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup">
            <Button variant="link" className="p-0">
              Sign up
            </Button>
          </Link>
        </p>
      </div>
    </div>
  );
}