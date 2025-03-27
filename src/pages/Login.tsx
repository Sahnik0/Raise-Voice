
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

const Login: React.FC = () => {
  const [loginMobile, setLoginMobile] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [forgotMobile, setForgotMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, requestOTP, verifyOTP, resetPassword } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(loginMobile, loginPassword);
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back to the Grievance Portal.",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid mobile number or password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await requestOTP(forgotMobile);
      
      if (success) {
        setIsOtpSent(true);
        toast({
          title: "OTP sent",
          description: `A verification code has been sent to ${forgotMobile}.`,
        });
      } else {
        toast({
          title: "Failed to send OTP",
          description: "Please check your mobile number and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "OTP request error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await verifyOTP(forgotMobile, otp);
      
      if (success) {
        setIsOtpVerified(true);
        toast({
          title: "OTP verified",
          description: "Please set a new password.",
        });
      } else {
        toast({
          title: "Invalid OTP",
          description: "The OTP you entered is incorrect. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "OTP verification error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await resetPassword(forgotMobile, otp, newPassword);
      
      if (success) {
        toast({
          title: "Password reset successful",
          description: "You can now login with your new password.",
        });
        setIsOtpSent(false);
        setIsOtpVerified(false);
        setForgotMobile("");
        setOtp("");
        setNewPassword("");
      } else {
        toast({
          title: "Password reset failed",
          description: "Failed to reset password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Password reset error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="forgot">Forgot Password</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={loginMobile}
                  onChange={(e) => setLoginMobile(e.target.value)}
                  required
                  pattern="[0-9]{10}"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
            
            <div className="text-center text-sm">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary font-medium hover:underline">
                  Register here
                </Link>
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="forgot" className="space-y-4">
            {!isOtpSent && (
              <form onSubmit={handleRequestOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgot-mobile">Mobile Number</Label>
                  <Input
                    id="forgot-mobile"
                    type="tel"
                    placeholder="Enter your registered mobile number"
                    value={forgotMobile}
                    onChange={(e) => setForgotMobile(e.target.value)}
                    required
                    pattern="[0-9]{10}"
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending OTP..." : "Send OTP"}
                </Button>
              </form>
            )}
            
            {isOtpSent && !isOtpVerified && (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code (OTP)</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    maxLength={6}
                    pattern="[0-9]{6}"
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </Button>
                
                <div className="text-center text-sm">
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => {
                      setIsOtpSent(false);
                      setForgotMobile("");
                      setOtp("");
                    }}
                  >
                    Go back
                  </button>
                </div>
              </form>
            )}
            
            {isOtpSent && isOtpVerified && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={6}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
