import {
  Atom, BookOpen, Landmark, Languages, MessageSquareText, Percent, Sigma, Dna, Cpu, Globe2, Lightbulb, FlaskConical, Scale, Brain,
  Calculator, Microscope, Leaf, Map, Clock, Users, Feather, Pen, Quote, Theater, Music, Palette, Camera, Film, Newspaper, Flag,
  Crown, Swords, Factory, Building2, Tractor, Mountain, Waves, Zap, Sun, Eye, Magnet, Gauge, Rocket, Thermometer, Droplet, Flame,
  Heart, Shield, Bug, Code2, Terminal, Database, Network, Server, Binary, Table, Search, ListOrdered, GitBranch, Lock, Globe,
  Laptop, Smartphone, Star, Target, Trophy, CheckCircle2, AlertTriangle, Info, HelpCircle, Compass, Ruler, Triangle, Circle, Square,
  TrendingUp, BarChart3, PieChart, LineChart, Dice5, Infinity as InfinityIcon, Puzzle, GraduationCap, School, Library, Mic, Ear,
  Handshake, Scroll, Church, Ship, Train, Plane, Car, Wheat, TreePine, Fish, Bird, Sprout, Recycle, CloudRain, Wind, Activity,
  Pill, Syringe, Stethoscope, HeartPulse, Fingerprint, Layers, Box, Hash, Type, Image, Video, Monitor, Wifi, Key, Gavel, Vote,
  Megaphone, BookMarked, NotebookPen, ClipboardList, Sparkles, type LucideIcon,
} from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  Atom, BookOpen, Landmark, Languages, MessageSquareText, Percent, Sigma, Dna, Cpu, Globe2, Lightbulb, FlaskConical, Scale, Brain,
  Calculator, Microscope, Leaf, Map, Clock, Users, Feather, Pen, Quote, Theater, Music, Palette, Camera, Film, Newspaper, Flag,
  Crown, Swords, Factory, Building2, Tractor, Mountain, Waves, Zap, Sun, Eye, Magnet, Gauge, Rocket, Thermometer, Droplet, Flame,
  Heart, Shield, Bug, Code2, Code: Code2, Terminal, Database, Network, Server, Binary, Table, Search, ListOrdered, GitBranch, Lock, Globe,
  Laptop, Smartphone, Star, Target, Trophy, CheckCircle2, AlertTriangle, Info, HelpCircle, Compass, Ruler, Triangle, Circle, Square,
  TrendingUp, BarChart3, PieChart, LineChart, Dice5, Infinity: InfinityIcon, Puzzle, GraduationCap, School, Library, Mic, Ear,
  Handshake, Scroll, Church, Ship, Train, Plane, Car, Wheat, TreePine, Fish, Bird, Sprout, Recycle, CloudRain, Wind, Activity,
  Pill, Syringe, Stethoscope, HeartPulse, Fingerprint, Layers, Box, Hash, Type, Image, Video, Monitor, Wifi, Key, Gavel, Vote,
  Megaphone, BookMarked, NotebookPen, ClipboardList, Sparkles,
}

export function DynamicIcon({ name, className }: { name?: string; className?: string }) {
  const I = (name && ICONS[name]) || Sparkles
  return <I className={className} />
}
