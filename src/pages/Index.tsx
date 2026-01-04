import { useState } from "react";
import { motion } from "framer-motion";
import { 
  AlertTriangle, 
  Users, 
  Store, 
  Wifi, 
  TrendingUp,
  BarChart3
} from "lucide-react";
import { Header } from "@/components/Header";
import { FileUpload } from "@/components/FileUpload";
import { DQSGauge } from "@/components/DQSGauge";
import { RadarChart } from "@/components/RadarChart";
import { DimensionCard } from "@/components/DimensionCard";
import { MetricCard } from "@/components/MetricCard";
import { AIRecommendations } from "@/components/AIRecommendations";
import { Button } from "@/components/ui/button";

const mockDimensions = [
  { name: "Completeness", shortName: "COMP", score: 92, description: "Missing value analysis" },
  { name: "Accuracy", shortName: "ACC", score: 78, description: "Data correctness checks" },
  { name: "Consistency", shortName: "CONS", score: 85, description: "Cross-field validation" },
  { name: "Timeliness", shortName: "TIME", score: 94, description: "Data freshness metrics" },
  { name: "Uniqueness", shortName: "UNIQ", score: 89, description: "Duplicate detection" },
  { name: "Validity", shortName: "VAL", score: 72, description: "Format & range validation" },
  { name: "Integrity", shortName: "INT", score: 88, description: "Referential constraints" },
];

const mockMetrics = [
  { title: "Fraud Risk Score", value: "Low", subtitle: "0.3% threshold", icon: AlertTriangle, trend: "down" as const },
  { title: "Customer Data Health", value: "94%", subtitle: "+2.1% vs last", icon: Users, trend: "up" as const },
  { title: "Merchant Reliability", value: "A+", subtitle: "Top quartile", icon: Store, trend: "up" as const },
  { title: "Network Latency", value: "12ms", subtitle: "Optimal range", icon: Wifi, trend: "neutral" as const },
];

const mockRecommendations = [
  {
    type: "warning" as const,
    title: "Address Completeness Below Threshold",
    description: "KYC address fields show 78% completeness. Consider implementing auto-fill suggestions to improve regulatory compliance and reduce manual review overhead.",
  },
  {
    type: "info" as const,
    title: "Transaction Amount Anomaly Detected",
    description: "15 transactions exceed 3 standard deviations from mean. Cross-reference with merchant category codes for potential fraud pattern analysis.",
  },
  {
    type: "success" as const,
    title: "Timestamp Consistency Excellent",
    description: "All transaction timestamps follow ISO 8601 format with consistent timezone handling. This supports accurate timeliness calculations.",
  },
];

export default function Index() {
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const overallScore = Math.round(
    mockDimensions.reduce((acc, d) => acc + d.score, 0) / mockDimensions.length
  );

  const handleFileSelect = (file: File) => {
    console.log("File selected:", file.name);
  };

  const handleAnalyze = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsAnalyzed(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--visa-lavender))_0%,_transparent_50%)] pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-6 pb-12">
        <Header />

        {!isAnalyzed ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto pt-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold text-foreground mb-3">
                Analyze Your Data Quality
              </h2>
              <p className="text-muted-foreground">
                Upload your transaction data to receive AI-powered quality scoring across 7 key dimensions
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50">
              <FileUpload onFileSelect={handleFileSelect} />
              
              <div className="mt-6 flex justify-center">
                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={handleAnalyze}
                  disabled={isLoading}
                  className="min-w-[200px]"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Analyzing...
                    </div>
                  ) : (
                    <>
                      <BarChart3 className="w-5 h-5" />
                      Generate DQS Report
                    </>
                  )}
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground mt-4">
                🔒 Your data is processed in-memory only. No raw data is stored.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { title: "7 Dimensions", desc: "Comprehensive scoring" },
                { title: "AI Insights", desc: "GenAI recommendations" },
                { title: "Privacy First", desc: "No data persistence" },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="text-center p-4 rounded-xl bg-card/50 border border-border/30"
                >
                  <p className="font-semibold text-sm text-foreground">{feature.title}</p>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="pt-6"
          >
            {/* Top section: Overview */}
            <div className="grid grid-cols-12 gap-6 mb-6">
              {/* Overall Score */}
              <div className="col-span-12 lg:col-span-3">
                <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50 h-full flex flex-col items-center justify-center">
                  <DQSGauge score={overallScore} />
                  <div className="mt-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-success" />
                    <span className="text-sm text-success font-medium">+3.2% vs baseline</span>
                  </div>
                </div>
              </div>

              {/* Radar Chart */}
              <div className="col-span-12 lg:col-span-5">
                <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50 h-full flex items-center justify-center">
                  <RadarChart dimensions={mockDimensions} />
                </div>
              </div>

              {/* Derived Metrics */}
              <div className="col-span-12 lg:col-span-4">
                <div className="grid grid-cols-2 gap-3 h-full">
                  {mockMetrics.map((metric, i) => (
                    <MetricCard key={i} {...metric} index={i} />
                  ))}
                </div>
              </div>
            </div>

            {/* Dimension Cards */}
            <div className="mb-6">
              <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                Quality Dimension Breakdown
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockDimensions.map((dimension, i) => (
                  <DimensionCard key={i} {...dimension} index={i} />
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            <AIRecommendations recommendations={mockRecommendations} />

            {/* Footer actions */}
            <div className="mt-8 flex justify-center gap-4">
              <Button variant="outline" onClick={() => setIsAnalyzed(false)}>
                Analyze New File
              </Button>
              <Button variant="gold">
                Export Full Report
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
