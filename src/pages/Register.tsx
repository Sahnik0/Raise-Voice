
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { requestOTP, verifyOTP, register: registerUser } = useAuth();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await requestOTP(mobile);
      
      if (success) {
        setIsOtpSent(true);
        toast({
          title: "OTP sent",
          description: `A verification code has been sent to ${mobile}.`,
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

  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const otpVerified = await verifyOTP(mobile, otp);
      
      if (!otpVerified) {
        toast({
          title: "Invalid OTP",
          description: "The OTP you entered is incorrect. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Proceed with registration
      const success = await registerUser(name, mobile, password);
      
      if (success) {
        toast({
          title: "Registration successful",
          description: "Your account has been created successfully.",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Registration failed",
          description: "Failed to create your account. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Registration error",
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
        <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
        
        {!isOtpSent ? (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                type="tel"
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                pattern="[0-9]{10}"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending OTP..." : "Continue"}
            </Button>
            
            <div className="text-center text-sm">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-medium hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyAndRegister} className="space-y-4">
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
            
            <p className="text-sm text-gray-600">
              We've sent a verification code to your mobile number {mobile}.
            </p>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Create Account"}
            </Button>
            
            <div className="text-center text-sm">
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => setIsOtpSent(false)}
              >
                Go back
              </button>
            </div>
            
            <div className="text-center text-sm">
              <p className="text-gray-600">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  className="text-primary font-medium hover:underline"
                  onClick={() => handleSendOTP}
                  disabled={isLoading}
                >
                  Resend OTP
                </button>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
