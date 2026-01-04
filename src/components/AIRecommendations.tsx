import { motion } from "framer-motion";
import { Sparkles, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";

interface Recommendation {
  type: "warning" | "success" | "info";
  title: string;
  description: string;
}

interface AIRecommendationsProps {
  recommendations: Recommendation[];
}

export function AIRecommendations({ recommendations }: AIRecommendationsProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "warning": return AlertTriangle;
      case "success": return CheckCircle;
      default: return Sparkles;
    }
  };

  const getStyles = (type: string) => {
    switch (type) {
      case "warning": return "bg-warning/10 border-warning/20 text-warning";
      case "success": return "bg-success/10 border-success/20 text-success";
      default: return "bg-primary/10 border-primary/20 text-primary";
    }
  };

  return (
    <div className="bg-card rounded-xl p-5 shadow-md border border-border/50">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-gradient-gold">
          <Sparkles className="w-4 h-4 text-accent-foreground" />
        </div>
        <h3 className="font-display font-semibold text-foreground">AI Insights & Recommendations</h3>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, index) => {
          const Icon = getIcon(rec.type);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15, duration: 0.4 }}
              className={`p-4 rounded-lg border ${getStyles(rec.type)}`}
            >
              <div className="flex items-start gap-3">
                <Icon className="w-5 h-5 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <h4 className="font-medium text-foreground text-sm">{rec.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {rec.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
