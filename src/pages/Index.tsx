import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ActivityIcon, AlertCircle, CheckCircle2 } from "lucide-react";
import medicalIcon from "@/assets/medical-icon.png";

const formSchema = z.object({
  gender: z.string().min(1, "Please select gender"),
  age: z.coerce.number().min(1, "Age must be at least 1").max(120, "Age must be less than 120"),
  hypertension: z.string().min(1, "Please select hypertension status"),
  heartDisease: z.string().min(1, "Please select heart disease status"),
  smokingHistory: z.string().min(1, "Please select smoking history"),
  bmi: z.coerce.number().min(10, "BMI must be at least 10").max(60, "BMI must be less than 60"),
  hba1c: z.coerce.number().min(3, "HbA1c must be at least 3").max(15, "HbA1c must be less than 15"),
  bloodGlucose: z.coerce.number().min(50, "Blood glucose must be at least 50").max(400, "Blood glucose must be less than 400"),
});

type FormData = z.infer<typeof formSchema>;

interface PredictionResult {
  prediction: "diabetic" | "non-diabetic";
  confidence?: number;
}

const Index = () => {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setResult(null);

    // Simulate API call - Replace with actual API endpoint
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock prediction logic for demo
    const mockPrediction: PredictionResult = {
      prediction: Math.random() > 0.5 ? "diabetic" : "non-diabetic",
      confidence: Math.random() * 0.3 + 0.7,
    };

    setResult(mockPrediction);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-background">
      {/* Hero Section */}
      <header className="pt-12 pb-8 px-4 text-center animate-fade-in-up">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={medicalIcon}
                alt="Medical AI Icon"
                className="w-20 h-20 object-contain"
              />
              <ActivityIcon className="absolute -bottom-2 -right-2 w-8 h-8 text-primary animate-pulse-glow" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Diabetes Prediction System
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
            Hybrid AI Model: SVM + XGBoost + Neural Network
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 pb-16">
        <div className="medical-card medical-hover animate-scale-in p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-sm font-medium">
                Gender <span className="text-destructive">*</span>
              </Label>
              <Select onValueChange={(value) => setValue("gender", value)}>
                <SelectTrigger id="gender" className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-sm text-destructive">{errors.gender.message}</p>
              )}
            </div>

            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age" className="text-sm font-medium">
                Age <span className="text-destructive">*</span>
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter age"
                {...register("age")}
                className="w-full"
              />
              {errors.age && (
                <p className="text-sm text-destructive">{errors.age.message}</p>
              )}
            </div>

            {/* Hypertension */}
            <div className="space-y-2">
              <Label htmlFor="hypertension" className="text-sm font-medium">
                Hypertension <span className="text-destructive">*</span>
              </Label>
              <Select onValueChange={(value) => setValue("hypertension", value)}>
                <SelectTrigger id="hypertension" className="w-full">
                  <SelectValue placeholder="Select hypertension status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
              {errors.hypertension && (
                <p className="text-sm text-destructive">{errors.hypertension.message}</p>
              )}
            </div>

            {/* Heart Disease */}
            <div className="space-y-2">
              <Label htmlFor="heartDisease" className="text-sm font-medium">
                Heart Disease <span className="text-destructive">*</span>
              </Label>
              <Select onValueChange={(value) => setValue("heartDisease", value)}>
                <SelectTrigger id="heartDisease" className="w-full">
                  <SelectValue placeholder="Select heart disease status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
              {errors.heartDisease && (
                <p className="text-sm text-destructive">{errors.heartDisease.message}</p>
              )}
            </div>

            {/* Smoking History */}
            <div className="space-y-2">
              <Label htmlFor="smokingHistory" className="text-sm font-medium">
                Smoking History <span className="text-destructive">*</span>
              </Label>
              <Select onValueChange={(value) => setValue("smokingHistory", value)}>
                <SelectTrigger id="smokingHistory" className="w-full">
                  <SelectValue placeholder="Select smoking history" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Never</SelectItem>
                  <SelectItem value="current">Current</SelectItem>
                  <SelectItem value="former">Former</SelectItem>
                  <SelectItem value="ever">Ever</SelectItem>
                  <SelectItem value="not_current">Not Current</SelectItem>
                </SelectContent>
              </Select>
              {errors.smokingHistory && (
                <p className="text-sm text-destructive">{errors.smokingHistory.message}</p>
              )}
            </div>

            {/* BMI */}
            <div className="space-y-2">
              <Label htmlFor="bmi" className="text-sm font-medium">
                BMI (Body Mass Index) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="bmi"
                type="number"
                step="0.01"
                placeholder="Enter BMI (e.g., 24.50)"
                {...register("bmi")}
                className="w-full"
              />
              {errors.bmi && (
                <p className="text-sm text-destructive">{errors.bmi.message}</p>
              )}
            </div>

            {/* HbA1c Level */}
            <div className="space-y-2">
              <Label htmlFor="hba1c" className="text-sm font-medium">
                HbA1c Level (%) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="hba1c"
                type="number"
                step="0.1"
                placeholder="Enter HbA1c level (e.g., 5.7)"
                {...register("hba1c")}
                className="w-full"
              />
              {errors.hba1c && (
                <p className="text-sm text-destructive">{errors.hba1c.message}</p>
              )}
            </div>

            {/* Blood Glucose Level */}
            <div className="space-y-2">
              <Label htmlFor="bloodGlucose" className="text-sm font-medium">
                Blood Glucose Level (mg/dL) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="bloodGlucose"
                type="number"
                placeholder="Enter blood glucose level"
                {...register("bloodGlucose")}
                className="w-full"
              />
              {errors.bloodGlucose && (
                <p className="text-sm text-destructive">{errors.bloodGlucose.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="medical"
              size="lg"
              className="w-full text-base font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <ActivityIcon className="animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Predict Risk"
              )}
            </Button>
          </form>

          {/* Result Display */}
          {result && (
            <div className="mt-8 animate-fade-in-up">
              <Alert
                variant={result.prediction === "diabetic" ? "destructive" : "default"}
                className={
                  result.prediction === "diabetic"
                    ? "border-destructive bg-destructive/10"
                    : "border-success bg-success/10"
                }
              >
                {result.prediction === "diabetic" ? (
                  <AlertCircle className="h-5 w-5 text-destructive" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                )}
                <AlertDescription className="ml-2">
                  <div className="space-y-2">
                    <p className="font-semibold text-base">
                      {result.prediction === "diabetic"
                        ? "High Risk: Diabetes Detected"
                        : "Low Risk: No Diabetes Detected"}
                    </p>
                    {result.confidence && (
                      <p className="text-sm opacity-90">
                        Confidence: {(result.confidence * 100).toFixed(1)}%
                      </p>
                    )}
                    <p className="text-sm mt-3 pt-3 border-t border-current/20">
                      This is a model-generated medical risk estimation and not a diagnosis.
                      Please consult with a healthcare professional for proper medical advice.
                    </p>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="pb-8 px-4 text-center text-sm text-muted-foreground">
        <p className="mb-1">AI Clinical Decision Support Prototype</p>
        <p className="text-xs">
          Created by Manasa Rajendran, Bhattula Bhavyasree, Chillara Bhavya, Kalathoti Rishitha
        </p>
      </footer>
    </div>
  );
};

export default Index;
