import { Trophy, Zap } from 'lucide-react';
import Badge from '@/components/ui/Badge';
export default function MasterBadges({
  master,
  compact
}) {
  return <div className="flex flex-wrap items-center gap-1.5">
      {master.topMaster && <Badge tone="warning" className="!gap-1"><Trophy className="h-3 w-3" /> {compact ? 'Top' : 'Top usta'}</Badge>}
      {master.fastResponder && <Badge tone="primary" className="!gap-1"><Zap className="h-3 w-3" /> {compact ? 'Tez' : 'Tez javob beradi'}</Badge>}
    </div>;
}
