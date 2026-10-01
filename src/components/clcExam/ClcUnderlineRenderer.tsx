import React from 'react';
import { underlineWord } from '../../data/clcExamIntegrity';

interface ClcUnderlineRendererProps {
  text: string;
  underlinedPart?: string;
  className?: string;
}

/**
 * Visual Underline Renderer for authentic CLC Entrance Exam Questions
 * Renders clear, prominent, accessible visual underlines for tested phonemes and error correction phrases.
 */
export const ClcUnderlineRenderer: React.FC<ClcUnderlineRendererProps> = ({
  text,
  underlinedPart,
  className = '',
}) => {
  if (!text) return null;

  // If underlinedPart is specified and text does not yet have <u> tags, format it
  const formattedText =
    underlinedPart && !text.includes('<u>')
      ? underlineWord(text, underlinedPart)
      : text;

  // If no <u> tags present, render plain text
  if (!formattedText.includes('<u>')) {
    return <span className={className}>{text}</span>;
  }

  // Parse <u>...</u> tags into React nodes
  const parts: React.ReactNode[] = [];
  const regex = /<u>(.*?)<\/u>/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(formattedText)) !== null) {
    // Text before <u>
    if (match.index > lastIndex) {
      parts.push(formattedText.substring(lastIndex, match.index));
    }
    // Underlined content
    parts.push(
      <u
        key={match.index}
        className="underline decoration-[2.5px] decoration-rose-600 font-extrabold underline-offset-[3px] text-slate-900 bg-rose-50/60 px-0.5 rounded-xs"
      >
        {match[1]}
      </u>
    );
    lastIndex = regex.lastIndex;
  }

  // Trailing text
  if (lastIndex < formattedText.length) {
    parts.push(formattedText.substring(lastIndex));
  }

  return <span className={className}>{parts}</span>;
};
