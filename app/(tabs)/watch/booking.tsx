import {
  DATES,
  MOVIE,
  SEAT_ROWS,
  SHOWTIMES,
  colors,
  seatColor,
} from "@/constants/booking.data";
import styles from "@/styles/booking.styles";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
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
        styles.head,
        {
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <View style={styles.headRow}>
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Feather name="chevron-left" size={26} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

function HallPreview() {
  return (
    <View style={styles.preview}>
      <View style={styles.arc} />
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
                  style={[styles.dot, c && { backgroundColor: seatColor(c) }]}
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
    <View style={styles.screen}>
      <Header
        title={MOVIE.title}
        subtitle={`In Theaters ${MOVIE.releaseDate}`}
      />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: padX, paddingVertical: 28 }}
      >
        <Text style={styles.heading}>Date</Text>
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
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text style={[styles.chipText, active && { color: "#fff" }]}>
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
              <View style={styles.cardHead}>
                <Text style={styles.time}>{st.time}</Text>
                <Text style={styles.cinema}>
                  {st.cinema} + {st.hall}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setShowId(st.id)}
                style={[styles.card, st.id === showId && styles.cardActive]}
              >
                <HallPreview />
              </TouchableOpacity>
              <Text style={styles.from}>
                From <Text style={styles.bold}>{st.fromPrice}$</Text> or{" "}
                <Text style={styles.bold}>{st.bonus} bonus</Text>
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
          style={styles.button}
          onPress={() =>
            router.push({
              pathname: "/watch/select-seats",
              params: { dateId, showtimeId: showId },
            })
          }
        >
          <Text style={styles.buttonText}>Select Seats</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
