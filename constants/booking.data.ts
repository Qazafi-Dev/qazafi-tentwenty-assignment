export const colors = {
  bg: "#F6F6FA",
  white: "#FFFFFF",
  text: "#202C43",
  muted: "#8F95A3",
  blue: "#61C3F2",
  vip: "#564CAD",
  selected: "#CD9D0F",
  unavailable: "#D9D9DE",
  chip: "#EFEFF4",
  border: "#E6E6EC",
};

export type SeatType = "regular" | "vip";
export interface Seat {
  id: string;
  row: number;
  number: number;
  type: SeatType;
  available: boolean;
}
export interface SeatRow {
  row: number;
  sections: (Seat | null)[][];
}

export const MOVIE = {
  title: "The King's Man",
  releaseDate: "December 22, 2021",
};

export const PRICES: Record<SeatType, number> = { regular: 50, vip: 150 };

export const DATES = Array.from({ length: 6 }, (_, i) => ({
  id: `2021-03-${5 + i}`,
  label: `${5 + i} Mar`,
  full: `March ${5 + i}, 2021`,
}));

export const SHOWTIMES = [
  {
    id: "1",
    time: "12:30",
    cinema: "Cinetech",
    hall: "Hall 1",
    fromPrice: 50,
    bonus: 2500,
  },
  {
    id: "2",
    time: "13:30",
    cinema: "Cinetech",
    hall: "Hall 2",
    fromPrice: 75,
    bonus: 3000,
  },
];

// R = regular, V = VIP, X = not available, . = gap, | = aisle
const LAYOUT = [
  "...XX|RRXRXRRXRRXRRR|XX...",
  ".RRRX|XXRRXRRXRRXRRX|RRRR.",
  ".XXRX|XXRXRRXRRXRRXR|XXRX.",
  ".XXXX|XRXRXRRXRXRRXR|XRXXX",
  "RRRXX|RXRRXRRXRRXRRX|XXXRR",
  "XXRRX|XRXRRXRXRRXRRX|XXRRX",
  "RXRRX|RXRXRRXRRXRRXR|XXRXR",
  "XRRXX|XRXRRXRXRRXRXR|XXRXX",
  "RRXRX|RRXRRRXRRXRRXR|XXXRR",
  "VVVVV|VVVVXVVVVVVVVV|VVVVV",
];

export const SEAT_ROWS: SeatRow[] = LAYOUT.map((line, i) => {
  const row = i + 1;
  let col = 0;
  const sections = line.split("|").map((chunk) =>
    chunk.split("").map((ch): Seat | null => {
      col += 1;
      if (ch === ".") return null;
      return {
        id: `${row}-${col}`,
        row,
        number: col,
        type: ch === "V" ? "vip" : "regular",
        available: ch !== "X",
      };
    }),
  );
  return { row, sections };
});

export const seatColor = (seat: Seat, selected = false) => {
  if (!seat.available) return colors.unavailable;
  if (selected) return colors.selected;
  return seat.type === "vip" ? colors.vip : colors.blue;
};
