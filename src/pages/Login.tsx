
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await redirectBasedOnRole(session.user.id);
      }
    };
    checkUser();
  }, []);

  const redirectBasedOnRole = async (userId: string) => {
    try {
      // Check user roles
      const { data: userRoles, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching user roles:', error);
        navigate('/');
        return;
      }

      const roles = userRoles?.map(r => r.role) || [];
      
      if (roles.includes('admin')) {
        navigate('/admin');
      } else if (roles.includes('vendor')) {
        navigate('/vendor');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error during redirect:', error);
      navigate('/');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Clean up any existing session first
      await supabase.auth.signOut();
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        if (error.message === 'Invalid login credentials') {
          toast({
            title: "Login Failed",
            description: "Invalid email or password. Please try again.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Login Failed",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      if (data.user) {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        
        // Redirect based on user role
        await redirectBasedOnRole(data.user.id);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Upper Half - Background Image with Content */}
        <div 
          className="h-[50vh] bg-black bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
          style={{
            backgroundImage: `url('/lovable-uploads/1385246d-fb9d-4298-b4d8-ffaa5bba7537.png')`
          }}
        >
          {/* Header Text */}
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-markay-yellow mb-4">
              SIGN IN WITH YOUR <span className="italic">MYMARKAY</span> ACCOUNT
            </h1>
          </div>
        </div>

        {/* Lower Half - Yellow Background with Form */}
        <div className="min-h-[50vh] bg-markay-yellow flex items-start justify-center px-4 py-12 md:py-16">
          {/* Login Form Card */}
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
            {/* Logo */}
            <div className="text-center mb-8">
              <img 
                src="/lovable-uploads/85f7bafb-7dad-4662-829f-4442a1918638.png" 
                alt="My Markay Logo" 
                className="h-16 w-auto mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-900">
                Login to My Markay
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="sr-only">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-markay-yellow focus:border-transparent"
                />
              </div>

              <div>
                <Label htmlFor="password" className="sr-only">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-markay-yellow focus:border-transparent"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-markay-yellow hover:bg-yellow-400 text-black font-semibold rounded-lg transition-colors disabled:opacity-50"
              >
                {isLoading ? "Signing In..." : "Login"}
              </Button>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
