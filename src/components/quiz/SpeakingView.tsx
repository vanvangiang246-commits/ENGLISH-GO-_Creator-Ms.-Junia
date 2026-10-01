import React, { useState, useEffect, useRef } from 'react';
import { QuizQuestion } from '../../types/quiz';
import {
  Mic,
  Square,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Volume2,
  Pause,
  XCircle,
} from 'lucide-react';
import { speakEnglish } from '../../utils/audioEffects';
import {
  evaluateSpokenPhrase,
  SpeakingEvaluationResult,
} from '../../utils/speakingEvaluator';

interface SpeakingViewProps {
  question: QuizQuestion;
  selectedAnswer: any;
  isAnswerSubmitted: boolean;
  onSubmit: (result: { transcript: string; isCorrect: boolean; audioUrl?: string }) => void;
  onNext?: () => void;
  onRetry?: () => void;
  isLastQuestion?: boolean;
  isNavigating?: boolean;
}

/**
 * Real-time dynamic visual waveform reacting to microphone input
 */
const LiveWaveform: React.FC<{ stream: MediaStream | null; isRecording: boolean }> = ({
  stream,
  isRecording,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!isRecording || !stream) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        try {
          audioContextRef.current.close();
        } catch {
          // ignore
        }
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let analyser: AnalyserNode | null = null;
    let dataArray: Uint8Array | null = null;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const audioCtx = new AudioCtx();
        audioContextRef.current = audioCtx;
        const source = audioCtx.createMediaStreamSource(stream);
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 64; // 32 frequency bins
        analyser.smoothingTimeConstant = 0.65;
        source.connect(analyser);
        dataArray = new Uint8Array(analyser.frequencyBinCount);
      }
    } catch (e) {
      console.warn('AudioContext not available for waveform:', e);
    }

    let phase = 0;
    const draw = () => {
      animFrameRef.current = requestAnimationFrame(draw);
      const width = canvas.width;
      const height = canvas.height;
      phase += 0.08;

      ctx.clearRect(0, 0, width, height);

      // Dark background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      // Center baseline
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      let hasVoice = false;
      let avgVolume = 0;

      if (analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray as any);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        avgVolume = sum / dataArray.length;
        if (avgVolume > 6) hasVoice = true;
      }

      // 24 animated waveform bars
      const numBars = 24;
      const barWidth = 4;
      const gap = (width - numBars * barWidth) / (numBars + 1);

      for (let i = 0; i < numBars; i++) {
        let value = 0;
        if (dataArray && analyser) {
          const bin = Math.min(Math.floor((i / numBars) * dataArray.length), dataArray.length - 1);
          value = dataArray[bin] / 255;
        }

        const idleWave = Math.sin(phase + i * 0.4) * 0.12 + 0.15;
        const normalizedHeight = Math.max(idleWave, value);
        const barHeight = Math.max(4, normalizedHeight * (height * 0.85));
        const x = gap + i * (barWidth + gap);
        const y = (height - barHeight) / 2;

        const grad = ctx.createLinearGradient(0, y, 0, y + barHeight);
        if (hasVoice) {
          if (avgVolume > 60) {
            grad.addColorStop(0, '#fb7185'); // rose peak
            grad.addColorStop(1, '#f59e0b'); // amber
          } else {
            grad.addColorStop(0, '#22d3ee'); // cyan
            grad.addColorStop(1, '#10b981'); // emerald
          }
        } else {
          grad.addColorStop(0, '#38bdf8'); // sky blue
          grad.addColorStop(1, '#3b82f6'); // blue
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(x, y, barWidth, barHeight, 2);
        } else {
          ctx.rect(x, y, barWidth, barHeight);
        }
        ctx.fill();
      }
    };

    draw();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        try {
          audioContextRef.current.close();
        } catch {
          // ignore
        }
      }
    };
  }, [stream, isRecording]);

  return (
    <div className="flex flex-col items-center w-full max-w-sm my-3 animate-in fade-in">
      <div className="relative w-full">
        <canvas
          ref={canvasRef}
          width={320}
          height={60}
          className="w-full h-15 rounded-2xl border-2 border-rose-300 shadow-md block"
        />
        <div className="absolute top-1.5 right-2.5 flex items-center gap-1.5 text-[10px] font-black text-rose-400 uppercase tracking-widest bg-slate-900/80 px-2 py-0.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span>Active Listening</span>
        </div>
      </div>
    </div>
  );
};

export const SpeakingView: React.FC<SpeakingViewProps> = ({
  question,
  selectedAnswer: _selectedAnswer,
  isAnswerSubmitted: _isAnswerSubmitted,
  onSubmit,
  onNext,
  onRetry,
  isLastQuestion = false,
  isNavigating = false,
}) => {
  // Recording & Playback States
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isPlayingRecorded, setIsPlayingRecorded] = useState(false);
  const [isPlayingModel, setIsPlayingModel] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Live Speech Recognition States
  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [evaluation, setEvaluation] = useState<SpeakingEvaluationResult | null>(null);

  // Refs for audio stream, recorder, recognition, and playback
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const playbackAudioRef = useRef<HTMLAudioElement | null>(null);
  const speechRecognitionRef = useRef<any>(null);
  const recognizedTranscriptRef = useRef<string>('');
  const [activeStream, setActiveStream] = useState<MediaStream | null>(null);

  const targetPhrase =
    question.speakingData?.targetPhrase ||
    (typeof question.correctAnswer === 'string' ? question.correctAnswer : '') ||
    question.audioText ||
    question.promptText ||
    'ball';

  const acceptableVariants = question.speakingData?.acceptableVariants || [];

  // Target phonetic guide
  const phonetic =
    question.speakingData?.phoneticHint ||
    (targetPhrase === 'ball'
      ? '/bɔːl/'
      : targetPhrase === 'book'
      ? '/bʊk/'
      : targetPhrase === 'bike'
      ? '/baɪk/'
      : targetPhrase === 'Bill'
      ? '/bɪl/'
      : '');

  // Cleanup on unmount or question change
  useEffect(() => {
    resetComponentState();
    return () => {
      cleanupResources();
    };
  }, [question.id]);

  const resetComponentState = () => {
    cleanupResources();
    setIsRecording(false);
    setRecordedAudioUrl(null);
    setIsPlayingRecorded(false);
    setIsPlayingModel(false);
    setErrorMessage(null);
    setLiveTranscript('');
    setEvaluation(null);
    recognizedTranscriptRef.current = '';
    setActiveStream(null);
  };

  const cleanupResources = () => {
    // Stop Speech Recognition
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.abort();
      } catch {
        // ignore
      }
      speechRecognitionRef.current = null;
    }

    // Stop MediaRecorder
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch {
        // ignore
      }
    }

    // Stop microphone tracks
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {
          // ignore
        }
      });
      mediaStreamRef.current = null;
    }

    // Stop playback audio
    if (playbackAudioRef.current) {
      playbackAudioRef.current.pause();
      playbackAudioRef.current = null;
    }

    // Revoke object URL
    if (recordedAudioUrl) {
      URL.revokeObjectURL(recordedAudioUrl);
    }
  };

  // 1. Play target model audio (LISTEN TO EXAMPLE)
  const handleListenToExample = () => {
    setIsPlayingModel(true);
    const spoken = speakEnglish(targetPhrase, 0.8, () => setIsPlayingModel(false));
    if (!spoken) {
      setIsPlayingModel(false);
      setErrorMessage('Audio example could not be played on this device.');
    }
  };

  // 2. Start Microphone Recording and Speech Recognition strictly on user click "TAP TO SPEAK"
  const handleStartRecording = async () => {
    setErrorMessage(null);
    setLiveTranscript('');
    setEvaluation(null);
    recognizedTranscriptRef.current = '';

    let stream: MediaStream;
    try {
      if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } else {
        const legacyGetUserMedia =
          (navigator as any).getUserMedia ||
          (navigator as any).webkitGetUserMedia ||
          (navigator as any).mozGetUserMedia ||
          (navigator as any).msGetUserMedia;
        if (legacyGetUserMedia) {
          stream = await new Promise<MediaStream>((resolve, reject) => {
            legacyGetUserMedia.call(navigator, { audio: true }, resolve, reject);
          });
        } else {
          throw new Error('NOT_SUPPORTED');
        }
      }
    } catch (err: any) {
      setIsRecording(false);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setErrorMessage(
          'Please allow microphone access to practise speaking. If blocked, click the lock or microphone icon in your browser address bar to allow access and try again.'
        );
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setErrorMessage('No microphone was found on this device. Please connect a microphone to continue.');
      } else if (err.message === 'NOT_SUPPORTED' || typeof MediaRecorder === 'undefined') {
        setErrorMessage('Voice recording is not supported in this browser. Please use Chrome, Edge, Safari, or Firefox.');
      } else {
        setErrorMessage('Please allow microphone access to practise speaking.');
      }
      return;
    }

    try {
      mediaStreamRef.current = stream;
      setActiveStream(stream);
      audioChunksRef.current = [];

      // Determine supported mimeType with safe fallbacks
      let mimeType = '';
      if (typeof MediaRecorder !== 'undefined' && typeof MediaRecorder.isTypeSupported === 'function') {
        const candidateTypes = [
          'audio/webm;codecs=opus',
          'audio/webm',
          'audio/mp4',
          'audio/ogg',
          'audio/aac',
        ];
        for (const t of candidateTypes) {
          if (MediaRecorder.isTypeSupported(t)) {
            mimeType = t;
            break;
          }
        }
      }

      let recorder: MediaRecorder;
      try {
        recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      } catch {
        recorder = new MediaRecorder(stream);
      }

      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const outputMime = recorder.mimeType || mimeType || 'audio/webm';
        const blob = new Blob(audioChunksRef.current, { type: outputMime });
        const url = URL.createObjectURL(blob);

        setRecordedAudioUrl(url);
        setIsRecording(false);
        setActiveStream(null);

        // Allow SpeechRecognition engine a short window to flush any trailing recognized tokens
        setTimeout(() => {
          const finalTranscript = (recognizedTranscriptRef.current || liveTranscript).trim();
          const evalResult = evaluateSpokenPhrase(
            targetPhrase,
            finalTranscript,
            acceptableVariants
          );

          setEvaluation(evalResult);

          // Submit the strict evaluation result to parent practice session
          onSubmit({
            transcript: finalTranscript,
            isCorrect: evalResult.isCorrect,
            audioUrl: url,
          });
        }, 150);

        // Release mic stream tracks
        if (mediaStreamRef.current) {
          mediaStreamRef.current.getTracks().forEach((track) => {
            try {
              track.stop();
            } catch {
              // ignore
            }
          });
          mediaStreamRef.current = null;
        }
      };

      recorder.onerror = () => {
        setErrorMessage('An error occurred during voice recording. Please try again.');
        setIsRecording(false);
      };

      // 3. Initialize Browser Speech Recognition (en-US)
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.lang = 'en-US';
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.maxAlternatives = 3;

          recognition.onresult = (event: any) => {
            let fullText = '';
            for (let i = 0; i < event.results.length; i++) {
              fullText += event.results[i][0].transcript + ' ';
            }
            const clean = fullText.trim();
            recognizedTranscriptRef.current = clean;
            setLiveTranscript(clean);
          };

          recognition.onerror = (event: any) => {
            console.warn('SpeechRecognition event error:', event.error);
            // Non-fatal: if 'no-speech', user hasn't spoken yet; keep listening until stop
          };

          recognition.onend = () => {
            // Keep recognized text intact
          };

          recognition.start();
          speechRecognitionRef.current = recognition;
        } catch (e) {
          console.warn('Could not start SpeechRecognition:', e);
        }
      }

      // Start recorder
      try {
        recorder.start(200);
      } catch {
        recorder.start();
      }

      setIsRecording(true);
    } catch {
      setIsRecording(false);
      setErrorMessage('Could not start recording. Please try again.');
    }
  };

  // 3. Stop Microphone Recording on user click ⏹ STOP
  const handleStopRecording = () => {
    // Stop Speech Recognition to finalize transcript
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch {
        // ignore
      }
    }

    // Stop MediaRecorder (triggers recorder.onstop)
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      try {
        mediaRecorderRef.current.stop();
      } catch (err) {
        console.warn('Error stopping MediaRecorder:', err);
      }
    }
  };

  // 4. Play Student's Own Recorded Audio (PLAY MY VOICE)
  const handlePlayMyVoice = () => {
    if (!recordedAudioUrl) return;

    if (isPlayingRecorded && playbackAudioRef.current) {
      playbackAudioRef.current.pause();
      setIsPlayingRecorded(false);
      return;
    }

    const audio = new Audio(recordedAudioUrl);
    playbackAudioRef.current = audio;
    setIsPlayingRecorded(true);

    audio.onended = () => {
      setIsPlayingRecorded(false);
      playbackAudioRef.current = null;
    };

    audio.onerror = () => {
      setIsPlayingRecorded(false);
      playbackAudioRef.current = null;
      setErrorMessage('Could not play recorded audio.');
    };

    audio.play().catch((err) => {
      console.warn('Playback error:', err);
      setIsPlayingRecorded(false);
    });
  };

  // 5. Retry speaking (TRY AGAIN)
  const handleTryAgain = () => {
    if (playbackAudioRef.current) {
      playbackAudioRef.current.pause();
      playbackAudioRef.current = null;
    }
    setIsPlayingRecorded(false);

    if (recordedAudioUrl) {
      URL.revokeObjectURL(recordedAudioUrl);
      setRecordedAudioUrl(null);
    }

    setEvaluation(null);
    setLiveTranscript('');
    recognizedTranscriptRef.current = '';
    setErrorMessage(null);

    // Call onRetry prop to reset parent state so question can be answered again
    if (onRetry) {
      onRetry();
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Target Picture Prompt */}
      {question.promptImage && (
        <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden bg-slate-100 border-2 border-slate-200/80 mb-5 shadow-sm">
          <img
            src={question.promptImage}
            alt={targetPhrase}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Target Word & Audio Model Card */}
      <div className="bg-sky-50 border-2 border-sky-200 rounded-3xl p-5 sm:p-6 text-center max-w-sm w-full mb-6 shadow-2xs">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
          LISTEN AND SAY
        </span>
        <div className="font-display font-black text-3xl sm:text-4xl text-slate-900 mb-1">
          &ldquo;{targetPhrase}&rdquo;
        </div>

        {phonetic && (
          <div className="font-mono text-sm text-slate-600 font-bold mb-3">
            {phonetic}
          </div>
        )}

        {/* [🔊 LISTEN TO EXAMPLE] Button */}
        <button
          type="button"
          onClick={handleListenToExample}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-blue-700 border border-slate-200 text-xs sm:text-sm font-bold shadow-2xs transition-all cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          aria-label="Listen to example pronunciation"
        >
          <Volume2 className="w-4 h-4 text-blue-600" />
          <span>{isPlayingModel ? 'Playing...' : 'LISTEN TO EXAMPLE'}</span>
        </button>
      </div>

      {/* Error Message Display */}
      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-rose-800 text-xs sm:text-sm font-medium max-w-md w-full mb-6 flex items-start gap-3 animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold">{errorMessage}</p>
            <button
              type="button"
              onClick={handleStartRecording}
              className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-rose-700 cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>TAP TO ALLOW &amp; SPEAK</span>
            </button>
          </div>
        </div>
      )}

      {/* Interactive Microphone & Voice Controls */}
      <div className="flex flex-col items-center w-full max-w-md">
        {/* STATE 1: Initial state (Not recording, no evaluation yet) */}
        {!isRecording && !evaluation && (
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={handleStartRecording}
              className="px-8 py-4 rounded-2xl font-display font-black text-lg sm:text-xl text-white shadow-md transition-all duration-150 flex items-center justify-center gap-3 cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400"
              aria-label="Tap to speak"
            >
              <Mic className="w-6 h-6" />
              <span>🎤 TAP TO SPEAK</span>
            </button>
            <p className="text-xs text-slate-500 font-medium mt-3 text-center">
              Click to start speaking English. The system assesses your pronunciation.
            </p>
          </div>
        )}

        {/* STATE 2: Recording is actively listening */}
        {isRecording && (
          <div className="flex flex-col items-center w-full animate-in fade-in zoom-in-95 duration-150">
            {/* Pulsing Recording Indicator */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-100 text-rose-700 border-2 border-rose-300 font-display font-black text-base mb-2">
              <span className="w-3 h-3 rounded-full bg-rose-600 animate-ping" />
              <span>🔴 LISTENING... SPEAK NOW</span>
            </div>

            {/* Real-time Dynamic Waveform Animation */}
            <LiveWaveform stream={activeStream} isRecording={isRecording} />

            {/* Real-time Interim Live Transcript Display */}
            <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 my-2 text-center min-h-[46px] flex items-center justify-center">
              {liveTranscript ? (
                <p className="text-sm font-bold text-slate-800 animate-in fade-in">
                  Hearing: <span className="italic text-blue-700">&ldquo;{liveTranscript}&rdquo;</span>
                </p>
              ) : (
                <p className="text-xs text-slate-400 italic">
                  Say &ldquo;{targetPhrase}&rdquo; into your microphone...
                </p>
              )}
            </div>

            {/* Stop Recording Button */}
            <button
              type="button"
              onClick={handleStopRecording}
              className="mt-3 px-8 py-4 rounded-2xl font-display font-black text-lg sm:text-xl text-white shadow-lg transition-all duration-150 flex items-center justify-center gap-3 cursor-pointer bg-rose-600 hover:bg-rose-700 hover:scale-105 active:scale-95 ring-4 ring-rose-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400"
              aria-label="Stop recording"
            >
              <Square className="w-5 h-5 fill-current" />
              <span>⏹ STOP</span>
            </button>

            <p className="text-xs text-rose-600 font-bold mt-3">
              Say &ldquo;{targetPhrase}&rdquo;, then click ⏹ STOP to assess.
            </p>
          </div>
        )}

        {/* STATE 3: Assessment Completed (Recognized Transcript & Score evaluated) */}
        {evaluation && !isRecording && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-200 w-full">
            {/* Evaluation Status Banner */}
            {evaluation.isCorrect ? (
              <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-100 text-emerald-800 border-2 border-emerald-400 font-display font-extrabold text-base sm:text-lg shadow-xs mb-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <span>✓ CORRECT PRONUNCIATION!</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-100 text-amber-900 border-2 border-amber-400 font-display font-extrabold text-base sm:text-lg shadow-xs mb-3">
                <XCircle className="w-6 h-6 text-amber-600 shrink-0" />
                <span>↻ TRY AGAIN</span>
              </div>
            )}

            {/* What the system recognized: Teacher and Student inspection box */}
            <div className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 mb-4 text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                WHAT THE SYSTEM HEARD
              </span>
              <div className="font-display font-black text-xl text-slate-900 mb-1">
                {evaluation.transcript ? (
                  <span className="italic text-slate-900">&ldquo;{evaluation.transcript}&rdquo;</span>
                ) : (
                  <span className="text-slate-400 font-medium italic text-base">
                    (No speech detected)
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-500 font-semibold mt-1">
                Target phrase: <span className="text-blue-700 font-bold">&ldquo;{targetPhrase}&rdquo;</span>
              </div>
            </div>

            {/* Descriptive pedagogical feedback */}
            <p
              className={`text-sm font-bold text-center mb-5 px-3 py-2 rounded-xl w-full ${
                evaluation.isCorrect
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'bg-amber-50 text-amber-900 border border-amber-200'
              }`}
            >
              {evaluation.feedback}
            </p>

            {/* Action Buttons: [▶ PLAY MY VOICE] and [🔄 TRY AGAIN] */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full mb-4">
              {recordedAudioUrl && (
                <button
                  type="button"
                  onClick={handlePlayMyVoice}
                  className={`flex-1 min-w-[150px] px-5 py-3 rounded-2xl font-display font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
                    isPlayingRecorded
                      ? 'bg-amber-500 text-white ring-4 ring-amber-100'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:scale-105 active:scale-95'
                  }`}
                  aria-label="Play recorded voice"
                >
                  {isPlayingRecorded ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>⏸ PLAYING...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>▶ PLAY MY VOICE</span>
                    </>
                  )}
                </button>
              )}

              <button
                type="button"
                onClick={handleTryAgain}
                className="flex-1 min-w-[150px] px-5 py-3 rounded-2xl border-2 border-slate-300 bg-white hover:bg-slate-100 text-slate-800 font-display font-black text-sm sm:text-base flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer hover:scale-105 active:scale-95"
                aria-label="Try speaking again"
              >
                <RotateCcw className="w-4 h-4 text-slate-600" />
                <span>🔄 TRY AGAIN</span>
              </button>
            </div>

            {/* Primary Action Button: NEXT QUESTION / FINISH PRACTICE */}
            {onNext && (
              <button
                type="button"
                onClick={onNext}
                disabled={isNavigating}
                className="w-full px-6 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-display font-black text-base sm:text-lg shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={isLastQuestion ? 'Finish practice' : 'Next question'}
              >
                <span>{isLastQuestion ? 'FINISH PRACTICE' : 'NEXT QUESTION →'}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
