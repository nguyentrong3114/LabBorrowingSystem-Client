import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  // Sample users for demonstration
  const sampleUsers = [
    { email: 'admin@university.edu', password: 'admin123', role: 'Admin' },
    { email: 'sarah.johnson@university.edu', password: 'faculty123', role: 'Faculty' },
    { email: 'john.manager@university.edu', password: 'manager123', role: 'Lab Manager' },
    { email: 'student@university.edu', password: 'student123', role: 'Student' }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check credentials against sample users
      const user = sampleUsers.find(u => 
        u.email === formData.email && u.password === formData.password
      );

      if (user) {
        // Successful login
        localStorage.setItem('user', JSON.stringify({ 
          email: user.email, 
          role: user.role,
          loginTime: new Date().toISOString()
        }));
        
        if (formData.rememberMe) {
          localStorage.setItem('rememberLogin', 'true');
        }

        // Navigate to dashboard
        navigate('/');
      } else {
        // Invalid credentials
        setLoginAttempts(prev => prev + 1);
        setErrors({ 
          general: 'Invalid email or password. Please try again.' 
        });
      }
    } catch (error) {
      setErrors({ 
        general: 'Login failed. Please check your connection and try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof LoginFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = field === 'rememberMe' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field-specific error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const isAccountLocked = loginAttempts >= 5;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Lab Borrowing System
          </h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Sign in to your account
          </h2>
          <p className="text-gray-600">
            Enter your credentials to access the system
          </p>
        </div>

        {/* Sample Accounts Info */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-blue-800 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Demo Accounts
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-1 text-blue-700">
            <p><strong>Admin:</strong> admin@university.edu / admin123</p>
            <p><strong>Faculty:</strong> sarah.johnson@university.edu / faculty123</p>
            <p><strong>Manager:</strong> john.manager@university.edu / manager123</p>
            <p><strong>Student:</strong> student@university.edu / student123</p>
          </CardContent>
        </Card>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Please enter your email and password to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* General Error */}
              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-red-700">{errors.general}</p>
                    {loginAttempts > 2 && (
                      <p className="text-xs text-red-600 mt-1">
                        Attempts remaining: {Math.max(0, 5 - loginAttempts)}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Account Locked Warning */}
              {isAccountLocked && (
                <div className="bg-red-100 border border-red-300 rounded-md p-3 flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-red-800 font-medium">Account Temporarily Locked</p>
                    <p className="text-xs text-red-700 mt-1">
                      Too many failed attempts. Please wait before trying again.
                    </p>
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="email"
                    className={`w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    disabled={isAccountLocked}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`w-full pl-10 pr-10 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.password ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    disabled={isAccountLocked}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isAccountLocked}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={formData.rememberMe}
                    onChange={handleInputChange('rememberMe')}
                    disabled={isAccountLocked}
                  />
                  <span className="ml-2 text-sm text-gray-700">Remember me</span>
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || isAccountLocked}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            {/* Additional Links */}
            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-600 hover:text-blue-500 font-medium">
                  Contact your administrator
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>© 2024 Lab Borrowing System. All rights reserved.</p>
          <p className="mt-1">
            For technical support, contact IT at{' '}
            <a href="mailto:support@university.edu" className="text-blue-600 hover:underline">
              support@university.edu
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;