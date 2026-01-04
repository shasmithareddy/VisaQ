import { motion } from "framer-motion";
import { Shield, Database } from "lucide-react";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between py-6"
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-gold blur-lg opacity-50" />
          <div className="relative p-2.5 rounded-xl bg-gradient-primary">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-gradient-primary">
            VisaQ
          </h1>
          <p className="text-xs text-muted-foreground">GenAI Data Quality Scoring</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
          <Database className="w-3.5 h-3.5 text-success" />
          <span className="text-xs font-medium text-success">Secure Mode</span>
        </div>
      </div>
    </motion.header>
  );
}
