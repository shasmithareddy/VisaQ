import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  index: number;
}

export function MetricCard({ title, value, subtitle, icon: Icon, trend = "neutral", index }: MetricCardProps) {
  const getTrendColor = () => {
    if (trend === "up") return "text-success";
    if (trend === "down") return "text-destructive";
    return "text-muted-foreground";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-card rounded-xl p-5 shadow-md border border-border/50 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="p-2.5 rounded-lg bg-gradient-primary">
          <Icon className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className={`text-xs font-medium ${getTrendColor()}`}>{subtitle}</span>
      </div>
      <h4 className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{title}</h4>
      <p className="text-2xl font-display font-bold text-foreground">{value}</p>
    </motion.div>
  );
}
