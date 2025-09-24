import Briefing from './Briefing';
import Chatbot from '../Chatbot';

export default function BriefingSection() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <Briefing />
      <Chatbot />
    </div>
  );
}
