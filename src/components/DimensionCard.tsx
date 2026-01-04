import { motion } from "framer-motion";
import { 
  CheckCircle, 
  Target, 
  GitCompare, 
  Clock, 
  Fingerprint, 
  ShieldCheck, 
  Link2 
} from "lucide-react";

interface DimensionCardProps {
  name: string;
  score: number;
  description: string;
  index: number;
}

const iconMap: Record<string, React.ElementType> = {
  Completeness: CheckCircle,
  Accuracy: Target,
  Consistency: GitCompare,
  Timeliness: Clock,
  Uniqueness: Fingerprint,
  Validity: ShieldCheck,
  Integrity: Link2,
};

export function DimensionCard({ name, score, description, index }: DimensionCardProps) {
  const Icon = iconMap[name] || CheckCircle;

  const getScoreStyles = (score: number) => {
    if (score >= 80) return "bg-success/10 text-success border-success/20";
    if (score >= 60) return "bg-warning/10 text-warning border-warning/20";
    return "bg-destructive/10 text-destructive border-destructive/20";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-success";
    if (score >= 60) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-card rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-border/50"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-foreground">{name}</h4>
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          </div>
        </div>
        <div className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getScoreStyles(score)}`}>
          {score}%
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${getProgressColor(score)}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}
