export interface PokerAction {
  action: string;
  amount?: number;
}

export interface PokerHand {
  publicId: string;
  datePlayed: string;
  board: string;
  hand: string;
  amountWon: number;
  totalPot: number;
  marked: boolean;
  position: string;
  site: string;
  status: string;
  actions: {
    preflopActions: PokerAction[];
    flopActions: PokerAction[];
    turnActions: PokerAction[];
    riverActions: PokerAction[];
  };
  gameProperties: {
    format: string;
    variant: string;
    defaultPlayers: number;
  };
}

export function parseHandHistory(handHistoryText: string): PokerHand[] {
  const hands: PokerHand[] = [];
  const handHistoryBlocks = handHistoryText.split('\n\n\n\n');

  handHistoryBlocks.forEach((handText) => {
    const hand: PokerHand = {
      publicId: '',
      datePlayed: '',
      board: '',
      hand: '',
      amountWon: 0,
      totalPot: 0,
      marked: false,
      position: '',
      site: '',
      status: '',
      actions: {
        preflopActions: [],
        flopActions: [],
        turnActions: [],
        riverActions: [],
      },
      gameProperties: {
        format: '',
        variant: '',
        defaultPlayers: 0,
      },
    };

    const lines = handText.split('\n');

    const line1 = firstLine(lines[0]);

    hand.site = line1.site;
    hand.publicId = line1.publicId;
    hand.datePlayed = line1.datePlayed;

    hands.push(hand);
  });

  return hands;
}

type FirstLineReturn = {
  publicId: string;
  datePlayed: string;
  site: string;
};

function firstLine(textLine: string): FirstLineReturn {
  const match = textLine.match(
    /^(.*?) Hand #(\d+):  (.*) \((\d+\/\d+)\) - (.*)\s\[(.*)\]$/,
  );
  if (!match) return { publicId: '', datePlayed: '', site: '' };
  return {
    site: match[1].trim(),
    publicId: match[2].trim(),
    datePlayed: match[5].trim(),
  };
}
