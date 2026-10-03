import {
  DATES,
  MOVIE,
  SEAT_ROWS,
  SHOWTIMES,
  colors,
  seatColor,
} from "@/constants/booking.data";
import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function Header({ title, subtitle }: { title: string; subtitle: string }) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View
      style={[
        s.head,
        {
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <View style={s.headRow}>
        <TouchableOpacity style={s.back} onPress={() => router.back()}>
          <Feather name="chevron-left" size={26} color={colors.text} />
        </TouchableOpacity>
        <Text style={s.title}>{title}</Text>
        <Text style={s.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

function HallPreview() {
  return (
    <View style={s.preview}>
      <View style={s.arc} />
      {SEAT_ROWS.map((r) => (
        <View key={r.row} style={{ flexDirection: "row" }}>
          {r.sections.map((sec, i) => (
            <View
              key={i}
              style={{ flexDirection: "row", marginLeft: i ? 8 : 0 }}
            >
              {sec.map((c, j) => (
                <View
                  key={j}
                  style={[s.dot, c && { backgroundColor: seatColor(c) }]}
                />
              ))}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

export default function SelectShowScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [dateId, setDateId] = useState(DATES[0].id);
  const [showId, setShowId] = useState(SHOWTIMES[0].id);

  const padX = 16 + Math.max(insets.left, insets.right);
  const cardW = isLandscape ? (width - padX * 2) / 2.3 : width * 0.62;

  return (
    <View style={s.screen}>
      <Header
        title={MOVIE.title}
        subtitle={`In Theaters ${MOVIE.releaseDate}`}
      />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: padX, paddingVertical: 28 }}
      >
        <Text style={s.heading}>Date</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}
        >
          {DATES.map((d) => {
            const active = d.id === dateId;
            return (
              <TouchableOpacity
                key={d.id}
                onPress={() => setDateId(d.id)}
                style={[s.chip, active && s.chipActive]}
              >
                <Text style={[s.chipText, active && { color: "#fff" }]}>
                  {d.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 32 }}
          contentContainerStyle={{ gap: 16 }}
        >
          {SHOWTIMES.map((st) => (
            <View key={st.id} style={{ width: cardW }}>
              <View style={s.cardHead}>
                <Text style={s.time}>{st.time}</Text>
                <Text style={s.cinema}>
                  {st.cinema} + {st.hall}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setShowId(st.id)}
                style={[s.card, st.id === showId && s.cardActive]}
              >
                <HallPreview />
              </TouchableOpacity>
              <Text style={s.from}>
                From <Text style={s.bold}>{st.fromPrice}$</Text> or{" "}
                <Text style={s.bold}>{st.bonus} bonus</Text>
              </Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>

      <View
        style={{
          paddingHorizontal: padX,
          paddingBottom: insets.bottom + 12,
          paddingTop: 12,
        }}
      >
        <TouchableOpacity
          style={s.button}
          onPress={() =>
            router.push({
              pathname: "/watch/select-seats",
              params: { dateId, showtimeId: showId },
            })
          }
        >
          <Text style={s.buttonText}>Select Seats</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primarybg },
  head: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headRow: { height: 68, justifyContent: "center", alignItems: "center" },
  back: { position: "absolute", left: 16, top: 22 },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.text,
    fontFamily: "Poppins-Medium",
  },
  subtitle: {
    fontSize: 13,
    color: colors.blue,
    marginTop: 4,
    fontFamily: "Poppins-Medium",
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 16,
    fontFamily: "Poppins-Medium",
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: colors.chip,
  },
  chipActive: { backgroundColor: colors.blue },
  chipText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
    fontFamily: "Poppins-Medium",
  },
  cardHead: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
    marginBottom: 10,
  },
  time: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
    fontFamily: "Poppins-Medium",
  },
  cinema: { fontSize: 14, color: colors.muted, fontFamily: "Poppins-Medium" },
  card: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "#fff",
  },
  cardActive: { borderColor: colors.blue, borderWidth: 2 },
  from: { marginTop: 10, fontSize: 14, color: colors.muted },
  bold: { fontWeight: "700", color: colors.text, fontFamily: "Poppins-Medium" },
  preview: { alignItems: "center", paddingVertical: 18 },
  arc: {
    width: "70%",
    height: 10,
    marginBottom: 6,
    borderTopWidth: 1,
    borderColor: colors.blue,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  dot: { width: 4, height: 4, margin: 1, borderRadius: 1 },
  button: {
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
    fontFamily: "Poppins-Medium",
  },
});
