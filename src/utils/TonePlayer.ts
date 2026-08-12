import * as Tone from "tone";

const C_DIATONIC_SCALE = ["C", "D", "E", "F", "G", "A", "B"];

export default class TonePlayer {
  private synth: Tone.Synth | null = null;
  private polySynth: Tone.PolySynth | null = null;

  constructor() {}

  private getSynth(): Tone.Synth {
    if (!this.synth) this.synth = new Tone.Synth().toDestination();
    return this.synth;
  }

  private getPolySynth(): Tone.PolySynth {
    if (!this.polySynth) this.polySynth = new Tone.PolySynth().toDestination();
    return this.polySynth;
  }

  public play_chord(notes: string[]) {
    const now = Tone.now();
    this.play_note_by_note(notes, now);
    this.getPolySynth().triggerAttackRelease(this.getPlayables(notes), 1, now + 2);
  }

  public play_note_by_note(notes: string[], time?: number) {
    const now = time ? time : Tone.now();
    this.getPlayables(notes).forEach((note, index) => {
      this.getSynth().triggerAttackRelease(note, "8n", now + index / 2, 0.6);
    });
  }

  public getOctaveNumber(fond: string, note: string, start: number = 4) {
    fond = fond.replace("#", "").replace("b", "");
    note = note.replace("#", "").replace("b", "");

    const fondIndex = C_DIATONIC_SCALE.findIndex((n) => n === fond);
    const noteIndex = C_DIATONIC_SCALE.findIndex((n) => n === note);

    if (fondIndex === -1) throw new Error(`fond not found: ${fond}`);
    if (noteIndex === -1) throw new Error(`note not found: ${note}`);

    return noteIndex < fondIndex ? start + 1 : start;
  }

  public getPlayables(notes: string[]): string[] {
    notes = notes.map((note) => note.replace("♯", "#").replace("♭", "b"));
    const playableNotes: string[] = [];

    notes.forEach((note) => {
      const octave = this.getOctaveNumber(notes[0], note);
      const noteWithOctave = `${note}${octave}`;
      playableNotes.push(noteWithOctave);
    });

    return playableNotes;
  }
}
