import type { LucideProps } from "lucide-react";
import {
  Bike,
  Phone,
  Clock,
  MapPin,
  MessageCircle,
  Menu,
  X,
  PartyPopper,
  Truck,
  ShieldCheck,
  Headphones,
  RefreshCw,
  Star,
  Zap,
  Quote,
  Play,
  Image as ImageIcon,
  Wrench,
  Puzzle,
  Settings,
  HardHat,
  Users,
  Timer,
  BadgeCheck,
  Check,
  Backpack,
  UserRound,
} from "lucide-react";

const MAP = {
  bike: Bike,
  phone: Phone,
  clock: Clock,
  mapPin: MapPin,
  messageCircle: MessageCircle,
  menu: Menu,
  x: X,
  partyPopper: PartyPopper,
  truck: Truck,
  shieldCheck: ShieldCheck,
  headphones: Headphones,
  refreshCw: RefreshCw,
  star: Star,
  zap: Zap,
  quote: Quote,
  play: Play,
  image: ImageIcon,
  wrench: Wrench,
  puzzle: Puzzle,
  settings: Settings,
  hardHat: HardHat,
  users: Users,
  timer: Timer,
  badgeCheck: BadgeCheck,
  check: Check,
  backpack: Backpack,
  userRound: UserRound,
} as const;

export type LucideIconName = keyof typeof MAP;

type Props = LucideProps & {
  name: LucideIconName;
};

export default function LucideIcon({ name, className, ...rest }: Props) {
  const Cmp = MAP[name];
  return <Cmp className={className} {...rest} />;
}
